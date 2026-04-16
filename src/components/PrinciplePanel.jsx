import { principles } from '../data/principles';

const colorScheme = {
  blue: { border: 'border-blue-500/40', bg: 'bg-blue-600/10', tag: 'bg-blue-500/20 text-blue-400', title: 'text-blue-300' },
  yellow: { border: 'border-yellow-500/40', bg: 'bg-yellow-600/10', tag: 'bg-yellow-500/20 text-yellow-400', title: 'text-yellow-300' },
  purple: { border: 'border-purple-500/40', bg: 'bg-purple-600/10', tag: 'bg-purple-500/20 text-purple-400', title: 'text-purple-300' },
  orange: { border: 'border-orange-500/40', bg: 'bg-orange-600/10', tag: 'bg-orange-500/20 text-orange-400', title: 'text-orange-300' },
  green: { border: 'border-green-500/40', bg: 'bg-green-600/10', tag: 'bg-green-500/20 text-green-400', title: 'text-green-300' },
  teal: { border: 'border-teal-500/40', bg: 'bg-teal-600/10', tag: 'bg-teal-500/20 text-teal-400', title: 'text-teal-300' },
};

export default function PrinciplePanel({ currentStep }) {
  if (currentStep === null || currentStep === undefined) {
    return (
      <div className="bg-slate-800/40 rounded-2xl border border-slate-700 p-5 text-center">
        <div className="text-4xl mb-3">💡</div>
        <div className="text-slate-400 text-sm">
          Bắt đầu một giao dịch để xem giải thích nguyên lý từng bước.
        </div>
      </div>
    );
  }

  const p = principles[currentStep];
  if (!p) return null;

  const c = colorScheme[p.color] || colorScheme.blue;

  return (
    <div className={`rounded-2xl border p-5 transition-all duration-400 ${c.border} ${c.bg}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.tag}`}>
          Bước {currentStep + 1}/6
        </span>
        <span className="text-slate-500 text-xs">Nguyên lý</span>
      </div>

      <h4 className={`font-bold text-base mb-3 ${c.title}`}>{p.title}</h4>

      {/* Main content */}
      <p className="text-slate-300 text-sm leading-relaxed mb-4">{p.content}</p>

      {/* Technical detail */}
      <div className="bg-slate-900/50 rounded-xl p-3 mb-3">
        <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1.5">Kỹ thuật</div>
        <p className="text-slate-400 text-xs leading-relaxed">{p.technical}</p>
      </div>

      {/* Key takeaway */}
      <div className={`rounded-xl p-3 border ${c.border}`}>
        <div className={`text-xs font-semibold mb-1 ${c.title}`}>💡 Điểm mấu chốt</div>
        <p className="text-slate-300 text-xs leading-relaxed">{p.keyPoint}</p>
      </div>
    </div>
  );
}
