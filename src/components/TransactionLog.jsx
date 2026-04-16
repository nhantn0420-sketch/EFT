import { formatCurrency } from '../data/mockData';

const statusStyle = {
  success: { bg: 'bg-green-600/10 border-green-500/30', badge: 'bg-green-500/20 text-green-400', icon: '✅' },
  failed: { bg: 'bg-red-600/10 border-red-500/30', badge: 'bg-red-500/20 text-red-400', icon: '❌' },
  suspicious: { bg: 'bg-orange-600/10 border-orange-500/30', badge: 'bg-orange-500/20 text-orange-400', icon: '⚠️' },
};

export default function TransactionLog({ logs, onClear }) {
  if (logs.length === 0) {
    return (
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-5">
        <div className="text-slate-300 text-sm font-semibold mb-3">📋 Nhật ký giao dịch</div>
        <div className="text-slate-500 text-xs text-center py-6">
          Chưa có giao dịch nào. Thực hiện giao dịch để xem nhật ký.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="text-slate-300 text-sm font-semibold">📋 Nhật ký giao dịch ({logs.length})</div>
        <button
          onClick={onClear}
          className="text-xs text-slate-500 hover:text-red-400 transition-colors"
        >
          Xóa log
        </button>
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {[...logs].reverse().map((log) => {
          const s = statusStyle[log.status] || statusStyle.failed;
          return (
            <div key={log.id} className={`log-entry rounded-xl border p-3 ${s.bg}`}>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{s.icon}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${s.badge}`}>
                    {log.status.toUpperCase()}
                  </span>
                </div>
                <span className="text-slate-500 text-xs flex-shrink-0">{log.time}</span>
              </div>
              <div className="text-white text-sm font-medium">{formatCurrency(log.amount)}</div>
              <div className="text-slate-400 text-xs mt-0.5">
                {log.from} → {log.to}
              </div>
              {log.reason && (
                <div className="text-slate-500 text-xs mt-1 italic">⚡ {log.reason}</div>
              )}
              <div className="text-slate-600 text-xs mt-1 font-mono">ID: {log.id}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
