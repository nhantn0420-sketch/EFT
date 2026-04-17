import { formatCurrency } from '../data/mockData';

const STATUS_CONFIG = {
  success:    { dot: 'bg-green-500',  ring: 'border-green-500/40',  bg: 'bg-green-500/5',  badge: 'bg-green-500/20 text-green-400',  icon: '✅', label: 'SUCCESS'    },
  failed:     { dot: 'bg-red-500',    ring: 'border-red-500/40',    bg: 'bg-red-500/5',    badge: 'bg-red-500/20 text-red-400',      icon: '❌', label: 'FAILED'     },
  suspicious: { dot: 'bg-orange-500', ring: 'border-orange-500/40', bg: 'bg-orange-500/5', badge: 'bg-orange-500/20 text-orange-400', icon: '⚠️', label: 'SUSPICIOUS' },
};

export default function TransactionLog({ logs, onClear }) {
  return (
    <div className="bg-slate-900/70 rounded-2xl border border-slate-700 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="text-slate-300 text-sm font-semibold flex items-center gap-2">
          <span className="text-lg">📋</span>
          Nhật ký giao dịch
          {logs.length > 0 && (
            <span className="bg-slate-700 text-slate-300 text-xs px-2 py-0.5 rounded-full">{logs.length}</span>
          )}
        </div>
        {logs.length > 0 && (
          <button onClick={onClear} className="text-xs text-slate-500 hover:text-red-400 transition-colors">
            Xóa
          </button>
        )}
      </div>

      {logs.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-2 opacity-20">📭</div>
          <div className="text-slate-600 text-xs">Chưa có giao dịch nào.</div>
        </div>
      ) : (
        <div className="relative max-h-72 overflow-y-auto">
          {/* Timeline line */}
          <div className="absolute left-3.5 top-2 bottom-2 w-px bg-slate-700" />

          <div className="space-y-3 pl-2">
            {[...logs].reverse().map((log, i) => {
              const s = STATUS_CONFIG[log.status] || STATUS_CONFIG.failed;
              return (
                <div key={log.id} className="log-entry flex gap-3">
                  {/* Timeline dot */}
                  <div className="relative flex-shrink-0 mt-1">
                    <div className={`w-4 h-4 rounded-full border-2 ${s.ring} ${s.dot} flex-shrink-0 z-10 relative`} />
                  </div>

                  {/* Content */}
                  <div className={`flex-1 rounded-xl border p-3 ${s.bg} ${s.ring}`}>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${s.badge}`}>
                        {s.icon} {s.label}
                      </span>
                      <span className="text-slate-500 text-xs">{log.time}</span>
                    </div>

                    <div className="text-white font-bold text-sm">{formatCurrency(log.amount)}</div>

                    <div className="text-slate-400 text-xs mt-1 flex items-center gap-1">
                      <span className="font-mono">{log.from}</span>
                      <span>→</span>
                      <span className="font-mono">{log.to}</span>
                    </div>

                    {log.reason && (
                      <div className="mt-1.5 text-xs text-slate-500 flex items-start gap-1">
                        <span className="flex-shrink-0">⚡</span>
                        <span className="italic">{log.reason}</span>
                      </div>
                    )}

                    <div className="text-slate-700 text-xs mt-1 font-mono">{log.id}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

