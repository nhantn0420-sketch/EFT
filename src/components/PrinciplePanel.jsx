import { principles } from '../data/principles';

const STEP_ILLUSTRATION = ['📝', '✅', '🔑', '🛡️', '💸', '📋'];

const colorScheme = {
  blue:   { border: 'border-blue-500/40',   bg: 'bg-blue-600/10',   tag: 'bg-blue-500/20   text-blue-400',   title: 'text-blue-300',   bar: 'bg-blue-500',   glow: 'shadow-blue-500/20'   },
  yellow: { border: 'border-yellow-500/40', bg: 'bg-yellow-600/10', tag: 'bg-yellow-500/20 text-yellow-400', title: 'text-yellow-300', bar: 'bg-yellow-500', glow: 'shadow-yellow-500/20' },
  purple: { border: 'border-purple-500/40', bg: 'bg-purple-600/10', tag: 'bg-purple-500/20 text-purple-400', title: 'text-purple-300', bar: 'bg-purple-500', glow: 'shadow-purple-500/20' },
  orange: { border: 'border-orange-500/40', bg: 'bg-orange-600/10', tag: 'bg-orange-500/20 text-orange-400', title: 'text-orange-300', bar: 'bg-orange-500', glow: 'shadow-orange-500/20' },
  green:  { border: 'border-green-500/40',  bg: 'bg-green-600/10',  tag: 'bg-green-500/20  text-green-400',  title: 'text-green-300',  bar: 'bg-green-500',  glow: 'shadow-green-500/20'  },
  teal:   { border: 'border-teal-500/40',   bg: 'bg-teal-600/10',   tag: 'bg-teal-500/20   text-teal-400',   title: 'text-teal-300',   bar: 'bg-teal-500',   glow: 'shadow-teal-500/20'   },
};

export default function PrinciplePanel({ currentStep }) {
  if (currentStep === null || currentStep === undefined) {
    return (
      <div className="bg-slate-900/70 rounded-2xl border border-slate-700 p-6 flex flex-col items-center justify-center min-h-48 text-center">
        <div className="text-5xl mb-4 opacity-30">💡</div>
        <div className="text-slate-500 text-sm font-medium mb-1">Nguyên lý sẽ hiển thị tại đây</div>
        <div className="text-slate-600 text-xs">Chọn kịch bản và bắt đầu giao dịch để xem giải thích từng bước.</div>
      </div>
    );
  }

  const p = principles[currentStep];
  if (!p) return null;

  const c = colorScheme[p.color] || colorScheme.blue;
  const emoji = STEP_ILLUSTRATION[currentStep];

  return (
    <div className={`rounded-2xl border p-5 transition-all duration-500 shadow-lg ${c.border} ${c.bg} ${c.glow}`}>
      {/* Step indicator bar */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i === currentStep ? c.bar : i < currentStep ? 'bg-slate-500' : 'bg-slate-700'}`} />
        ))}
      </div>

      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className={`text-4xl p-2 rounded-xl border ${c.border} ${c.bg} flex-shrink-0`}>
          {emoji}
        </div>
        <div>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.tag} mb-1.5 inline-block`}>
            Bước {currentStep + 1} / 6
          </span>
          <h4 className={`font-bold text-base leading-tight ${c.title}`}>{p.title}</h4>
        </div>
      </div>

      {/* Main content */}
      <p className="text-slate-300 text-sm leading-relaxed mb-4">{p.content}</p>

      {/* Technical detail */}
      <div className="bg-slate-950/50 rounded-xl p-3 mb-3 border border-slate-800">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-xs">⚙️</span>
          <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Chi tiết kỹ thuật</span>
        </div>
        <p className="text-slate-400 text-xs leading-relaxed font-mono">{p.technical}</p>
      </div>

      {/* Key takeaway */}
      <div className={`rounded-xl p-3 border ${c.border}`}>
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="text-sm">💡</span>
          <span className={`text-xs font-bold ${c.title}`}>Điểm mấu chốt</span>
        </div>
        <p className="text-slate-300 text-xs leading-relaxed">{p.keyPoint}</p>
      </div>
    </div>
  );
}
