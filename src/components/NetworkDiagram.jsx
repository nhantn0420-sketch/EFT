// NetworkDiagram.jsx — animated SVG showing money flowing between parties
import { useEffect, useRef } from 'react';

const NODES = [
  { id: 'sender',   label: 'Người gửi',         icon: '👤', x: 60,  y: 50 },
  { id: 'origBank', label: 'Ngân hàng gửi',      icon: '🏦', x: 220, y: 50 },
  { id: 'clearing', label: 'Clearing House',      icon: '🔄', x: 380, y: 50 },
  { id: 'recvBank', label: 'Ngân hàng nhận',      icon: '🏦', x: 540, y: 50 },
  { id: 'receiver', label: 'Người nhận',          icon: '👤', x: 700, y: 50 },
];

// Which step activates which edge (0-indexed step → edge index)
// Edges: sender→origBank, origBank→clearing, clearing→recvBank, recvBank→receiver
const STEP_TO_EDGE = {
  0: -1,      // Initiate: highlight sender node only
  1: -1,      // Validate: highlight origBank
  2: -1,      // Authenticate: highlight origBank
  3: -1,      // Risk: highlight clearing
  4: 'all',   // Settle: animate full flow
  5: -1,      // Log
};

const NODE_ACTIVE_STEP = { 0: 0, 1: 1, 2: 1, 3: 2, 4: [1,2,3,4], 5: 4 };

const statusColors = {
  idle:       { stroke: '#334155', fill: '#1e293b',  text: '#64748b' },
  active:     { stroke: '#3b82f6', fill: '#1e3a5f',  text: '#93c5fd' },
  success:    { stroke: '#22c55e', fill: '#14532d',  text: '#86efac' },
  failed:     { stroke: '#ef4444', fill: '#450a0a',  text: '#fca5a5' },
  suspicious: { stroke: '#f97316', fill: '#431407',  text: '#fdba74' },
};

export default function NetworkDiagram({ currentStep, stepStatuses, animateFlow }) {
  const svgRef = useRef(null);

  // Which nodes are active at each step
  const activeNodes = new Set();
  if (currentStep !== null) {
    const mapping = NODE_ACTIVE_STEP[currentStep];
    if (Array.isArray(mapping)) mapping.forEach((n) => activeNodes.add(n));
    else if (mapping !== undefined) activeNodes.add(mapping);
  }

  // Edge active: only during settle (step 4) or after success
  const allSuccess = stepStatuses.slice(0, 5).every((s) => s === 'success');
  const settling = currentStep === 4 && stepStatuses[4] === 'active';
  const edgeActive = settling || allSuccess;

  const nodeStatus = (idx) => {
    if (activeNodes.has(idx)) {
      const stepSt = stepStatuses[currentStep] || 'active';
      return stepSt === 'idle' ? 'active' : stepSt;
    }
    // Check if any previous step touched this node successfully
    if (idx === 0 && stepStatuses[0] === 'success') return 'success';
    if (idx === 1 && (stepStatuses[1] === 'success' || stepStatuses[2] === 'success')) return 'success';
    if (idx === 2 && stepStatuses[3] === 'success') return 'success';
    if (idx === 3 && stepStatuses[4] === 'success') return 'success';
    if (idx === 4 && stepStatuses[4] === 'success') return 'success';
    return 'idle';
  };

  return (
    <div className="bg-slate-800/60 rounded-2xl border border-slate-700 p-4">
      <div className="text-slate-300 text-sm font-semibold mb-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-purple-400 inline-block" />
        Luồng truyền tiền giữa các bên
      </div>
      <div className="overflow-x-auto">
        <svg ref={svgRef} viewBox="0 0 760 120" className="w-full min-w-[500px]" style={{ height: 120 }}>
          <defs>
            {/* Arrow marker */}
            <marker id="arrow-idle" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#334155" />
            </marker>
            <marker id="arrow-active" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#3b82f6" />
            </marker>
            <marker id="arrow-success" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#22c55e" />
            </marker>

            {/* Animated gradient for money flow */}
            <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                from="-1 0" to="1 0"
                dur="1.2s"
                repeatCount="indefinite"
              />
            </linearGradient>
          </defs>

          {/* Edges */}
          {NODES.slice(0, -1).map((node, i) => {
            const next = NODES[i + 1];
            const x1 = node.x + 28;
            const x2 = next.x - 28;
            const y = 50;
            const edgeSt = edgeActive ? 'active' : (allSuccess ? 'success' : 'idle');
            const color = statusColors[edgeSt];
            return (
              <g key={`edge-${i}`}>
                <line
                  x1={x1} y1={y} x2={x2} y2={y}
                  stroke={color.stroke}
                  strokeWidth={edgeActive ? 2.5 : 1.5}
                  markerEnd={`url(#arrow-${edgeSt})`}
                  strokeDasharray={edgeActive ? '6 3' : 'none'}
                >
                  {edgeActive && (
                    <animate
                      attributeName="stroke-dashoffset"
                      from="18" to="0"
                      dur="0.8s"
                      repeatCount="indefinite"
                    />
                  )}
                </line>
              </g>
            );
          })}

          {/* Nodes */}
          {NODES.map((node, i) => {
            const st = nodeStatus(i);
            const c = statusColors[st];
            const isActive = st === 'active';
            return (
              <g key={node.id} transform={`translate(${node.x - 28}, 20)`}>
                {/* Pulse ring for active */}
                {isActive && (
                  <circle cx="28" cy="30" r="30" fill="none" stroke={c.stroke} strokeWidth="1.5" opacity="0.4">
                    <animate attributeName="r" from="26" to="34" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.4" to="0" dur="1s" repeatCount="indefinite" />
                  </circle>
                )}
                {/* Node circle */}
                <circle
                  cx="28" cy="30" r="26"
                  fill={c.fill}
                  stroke={c.stroke}
                  strokeWidth={isActive ? 2.5 : 1.5}
                />
                {/* Icon */}
                <text x="28" y="26" textAnchor="middle" fontSize="16" dominantBaseline="middle">
                  {node.icon}
                </text>
                {/* Status icon */}
                {st === 'success' && (
                  <text x="28" y="38" textAnchor="middle" fontSize="10" fill="#22c55e" dominantBaseline="middle">✓</text>
                )}
                {st === 'failed' && (
                  <text x="28" y="38" textAnchor="middle" fontSize="10" fill="#ef4444" dominantBaseline="middle">✗</text>
                )}
                {/* Label */}
                <text x="28" y="70" textAnchor="middle" fontSize="9" fill={c.text} dominantBaseline="middle">
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
