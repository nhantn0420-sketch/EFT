const STEPS = [
  { id: 0, label: 'Initiate', icon: '📝', short: 'Khởi tạo' },
  { id: 1, label: 'Validate', icon: '✔️', short: 'Kiểm tra' },
  { id: 2, label: 'Authenticate', icon: '🔑', short: 'Xác thực' },
  { id: 3, label: 'Risk Check', icon: '⚠️', short: 'Rủi ro' },
  { id: 4, label: 'Settle', icon: '💸', short: 'Thanh toán' },
  { id: 5, label: 'Log', icon: '📋', short: 'Ghi log' },
];

const stepColors = {
  idle: 'bg-slate-800 border-slate-600 text-slate-400',
  active: 'bg-blue-600/20 border-blue-500 text-blue-300 step-active',
  success: 'bg-green-600/20 border-green-500 text-green-300',
  failed: 'bg-red-600/20 border-red-500 text-red-300',
  suspicious: 'bg-orange-600/20 border-orange-500 text-orange-300',
};

const connectorColors = {
  idle: 'bg-slate-700',
  success: 'bg-green-500',
  active: 'bg-blue-500',
};

export default function FlowDiagram({ currentStep, stepStatuses }) {
  return (
    <div className="bg-slate-800/60 rounded-2xl border border-slate-700 p-5">
      <div className="text-slate-300 text-sm font-semibold mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
        Luồng xử lý EFT
      </div>

      {/* Flow steps */}
      <div className="flex flex-col gap-1">
        {STEPS.map((step, i) => {
          const status = stepStatuses[i] || 'idle';
          const isActive = status === 'active';
          const isDone = status === 'success' || status === 'failed' || status === 'suspicious';

          return (
            <div key={step.id}>
              <div className={`flow-step flex items-center gap-3 rounded-xl border p-3 ${stepColors[status]}`}>
                {/* Step number / status icon */}
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold flex-shrink-0
                  ${status === 'success' ? 'bg-green-500/20 border-green-500' :
                    status === 'failed' ? 'bg-red-500/20 border-red-500' :
                    status === 'suspicious' ? 'bg-orange-500/20 border-orange-500' :
                    status === 'active' ? 'bg-blue-500/20 border-blue-500' :
                    'bg-slate-700/50 border-slate-600'}`}
                >
                  {status === 'success' ? '✓' :
                   status === 'failed' ? '✗' :
                   status === 'suspicious' ? '!' :
                   status === 'active' ? '⟳' :
                   (i + 1)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{step.icon} {step.label}</div>
                  <div className="text-xs opacity-60">{step.short}</div>
                </div>

                {/* Status badge */}
                {status !== 'idle' && (
                  <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0
                    ${status === 'success' ? 'bg-green-500/20 text-green-400' :
                      status === 'failed' ? 'bg-red-500/20 text-red-400' :
                      status === 'suspicious' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-blue-500/20 text-blue-400'}`}
                  >
                    {status === 'success' ? 'OK' :
                     status === 'failed' ? 'FAIL' :
                     status === 'suspicious' ? 'FLAG' :
                     'Running...'}
                  </span>
                )}
              </div>

              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="flex justify-center my-0.5">
                  <div className={`w-0.5 h-3 rounded transition-colors duration-500
                    ${stepStatuses[i] === 'success' ? 'bg-green-500' : 'bg-slate-700'}`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-slate-700 grid grid-cols-2 gap-1.5">
        {[
          { color: 'bg-slate-600', label: 'Chờ xử lý' },
          { color: 'bg-blue-500', label: 'Đang chạy' },
          { color: 'bg-green-500', label: 'Thành công' },
          { color: 'bg-red-500', label: 'Thất bại' },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className={`w-2 h-2 rounded-full ${l.color}`} />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
}
