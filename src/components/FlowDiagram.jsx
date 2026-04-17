const STEPS = [
  { id: 0, label: 'Initiate',      icon: '📝', short: 'Khởi tạo giao dịch',    color: 'blue'   },
  { id: 1, label: 'Validate',      icon: '✅', short: 'Kiểm tra hợp lệ',        color: 'yellow' },
  { id: 2, label: 'Authenticate',  icon: '🔑', short: 'Xác thực danh tính',     color: 'purple' },
  { id: 3, label: 'Risk Check',    icon: '🛡️', short: 'Phân tích rủi ro',       color: 'orange' },
  { id: 4, label: 'Settle',        icon: '💸', short: 'Thanh toán bù trừ',       color: 'green'  },
  { id: 5, label: 'Log & Audit',   icon: '📋', short: 'Ghi nhật ký kiểm toán',  color: 'teal'   },
];

const STEP_THEME = {
  blue:   { idle: 'border-slate-700 bg-slate-800/60',  active: 'border-blue-500   bg-blue-500/10   text-blue-300',   done: 'border-blue-600/40   bg-blue-900/20'   },
  yellow: { idle: 'border-slate-700 bg-slate-800/60',  active: 'border-yellow-400 bg-yellow-500/10 text-yellow-300', done: 'border-yellow-600/40 bg-yellow-900/20' },
  purple: { idle: 'border-slate-700 bg-slate-800/60',  active: 'border-purple-500 bg-purple-500/10 text-purple-300', done: 'border-purple-600/40 bg-purple-900/20' },
  orange: { idle: 'border-slate-700 bg-slate-800/60',  active: 'border-orange-500 bg-orange-500/10 text-orange-300', done: 'border-orange-600/40 bg-orange-900/20' },
  green:  { idle: 'border-slate-700 bg-slate-800/60',  active: 'border-green-500  bg-green-500/10  text-green-300',  done: 'border-green-600/40  bg-green-900/20'  },
  teal:   { idle: 'border-slate-700 bg-slate-800/60',  active: 'border-teal-500   bg-teal-500/10   text-teal-300',   done: 'border-teal-600/40   bg-teal-900/20'   },
};

const STATUS_BADGE = {
  active:     'bg-blue-500/20   text-blue-400   border-blue-500/40',
  success:    'bg-green-500/20  text-green-400  border-green-500/40',
  failed:     'bg-red-500/20    text-red-400    border-red-500/40',
  suspicious: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
};
const STATUS_LABEL = { active: '⟳ Running', success: '✓ OK', failed: '✗ Fail', suspicious: '⚠ Flag' };

export default function FlowDiagram({ currentStep, stepStatuses }) {
  return (
    <div className="bg-slate-900/70 rounded-2xl border border-slate-700 p-5">
      <div className="text-slate-300 text-sm font-semibold mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse inline-block" />
          Luồng xử lý EFT
        </div>
        <span className="text-slate-500 text-xs">
          {stepStatuses.filter((s) => s === 'success').length}/6 bước
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-slate-700 rounded-full mb-5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500"
          style={{ width: `${(stepStatuses.filter((s) => s === 'success').length / 6) * 100}%` }}
        />
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-1.5">
        {STEPS.map((step, i) => {
          const status = stepStatuses[i] || 'idle';
          const theme = STEP_THEME[step.color];
          const isActive = status === 'active';
          const isDone = status !== 'idle' && status !== 'active';
          const stateClass = isActive ? theme.active : isDone ? theme.done : theme.idle;

          return (
            <div key={step.id}>
              <div
                className={`flow-step flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-all duration-400
                  ${stateClass} ${isActive ? 'step-active shadow-lg' : ''}`}
              >
                {/* Number circle */}
                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all
                  ${status === 'success'    ? 'bg-green-500  border-green-400  text-white' :
                    status === 'failed'     ? 'bg-red-500    border-red-400    text-white' :
                    status === 'suspicious' ? 'bg-orange-500 border-orange-400 text-white' :
                    status === 'active'     ? 'bg-blue-500   border-blue-300   text-white' :
                    'bg-slate-700 border-slate-600 text-slate-400'}`}
                >
                  {status === 'success' ? '✓' : status === 'failed' ? '✗' : status === 'suspicious' ? '!' : isActive ? '⟳' : i + 1}
                </div>

                {/* Icon + label */}
                <div className="flex-1 min-w-0 flex items-center gap-2">
                  <span className="text-base leading-none">{step.icon}</span>
                  <div>
                    <div className={`text-sm font-semibold leading-tight ${isActive || isDone ? '' : 'text-slate-400'}`}>{step.label}</div>
                    <div className="text-xs opacity-60 mt-0.5">{step.short}</div>
                  </div>
                </div>

                {/* Badge */}
                {status !== 'idle' && (
                  <span className={`text-xs px-2 py-0.5 rounded-full border flex-shrink-0 font-medium ${STATUS_BADGE[status]}`}>
                    {STATUS_LABEL[status]}
                  </span>
                )}
              </div>

              {/* Animated connector */}
              {i < STEPS.length - 1 && (
                <div className="flex items-center justify-center h-3 relative">
                  <div className={`w-0.5 h-full rounded transition-all duration-500
                    ${stepStatuses[i] === 'success' ? 'bg-green-500' : stepStatuses[i] === 'active' ? 'bg-blue-400' : 'bg-slate-700'}`}
                  />
                  {stepStatuses[i] === 'success' && (
                    <div className="absolute w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-4 gap-1">
        {[['bg-slate-600','Chờ'], ['bg-blue-500','Running'], ['bg-green-500','OK'], ['bg-red-500','Fail']].map(([c, l]) => (
          <div key={l} className="flex items-center gap-1 text-xs text-slate-500">
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${c}`} />{l}
          </div>
        ))}
      </div>
    </div>
  );
}
