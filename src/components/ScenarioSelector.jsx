import { SCENARIOS } from '../data/mockData';

export default function ScenarioSelector({ onSelect, activeScenarioId }) {
  return (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-4">
      <div className="text-slate-300 text-sm font-semibold mb-3">🎭 Chọn kịch bản demo</div>
      <div className="grid grid-cols-1 gap-2">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s)}
            className={`w-full text-left rounded-xl border p-3 transition-all duration-150
              ${activeScenarioId === s.id
                ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'
              }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-base">{s.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium truncate">{s.label}</div>
                <div className="text-xs opacity-60 truncate">{s.description}</div>
              </div>
              {activeScenarioId === s.id && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
