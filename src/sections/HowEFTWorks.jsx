import { EFT_ACTORS } from '../data/content';

const FLOW_STEPS = [
  { label: 'Người gửi', icon: '👤', color: 'blue' },
  { label: 'Ngân hàng gửi', icon: '🏦', color: 'indigo' },
  { label: 'Clearing House', icon: '🔄', color: 'purple' },
  { label: 'Ngân hàng nhận', icon: '🏦', color: 'indigo' },
  { label: 'Người nhận', icon: '👤', color: 'green' },
];

const colorMap = {
  blue: 'bg-blue-600/20 border-blue-500/50 text-blue-300',
  indigo: 'bg-indigo-600/20 border-indigo-500/50 text-indigo-300',
  purple: 'bg-purple-600/20 border-purple-500/50 text-purple-300',
  green: 'bg-green-600/20 border-green-500/50 text-green-300',
};

export default function HowEFTWorks({ onGoToSimulator, onGoToSimulatorWithScenario }) {
  return (
    <section id="how-it-works" className="px-8 py-16 max-w-4xl mx-auto">
      <div className="mb-10">
        <div className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">Cơ chế hoạt động</div>
        <h2 className="text-3xl font-bold text-white mb-3">Luồng giao dịch EFT</h2>
        <p className="text-slate-400">Một giao dịch EFT đi qua nhiều chủ thể và hệ thống trước khi tiền đến tay người nhận.</p>
      </div>

      {/* Static flow diagram */}
      <div className="bg-slate-800/50 rounded-2xl p-6 mb-10 border border-slate-700">
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
          {FLOW_STEPS.map((step, i) => (
            <div key={step.label} className="flex items-center gap-2 flex-shrink-0">
              <div className={`rounded-xl border p-3 text-center min-w-[90px] ${colorMap[step.color]}`}>
                <div className="text-2xl mb-1">{step.icon}</div>
                <div className="text-xs font-medium">{step.label}</div>
              </div>
              {i < FLOW_STEPS.length - 1 && (
                <div className="text-slate-500 text-xl flex-shrink-0">→</div>
              )}
            </div>
          ))}
        </div>

        {/* Transaction lifecycle */}
        <div className="mt-6 grid grid-cols-3 md:grid-cols-6 gap-2">
          {['Initiate', 'Validate', 'Authenticate', 'Risk Check', 'Settle', 'Log'].map((step, i) => (
            <div key={step} className="text-center">
              <div className="w-7 h-7 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-xs text-slate-400 mx-auto mb-1">
                {i + 1}
              </div>
              <div className="text-slate-400 text-xs">{step}</div>
              {i < 5 && <div className="hidden md:block text-slate-600 text-xs">↓</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Actors */}
      <h3 className="text-white font-semibold mb-4 text-lg">Các chủ thể tham gia</h3>
      <div className="space-y-3 mb-10">
        {EFT_ACTORS.map((actor, i) => (
          <div key={actor.role} className="flex gap-4 bg-slate-800/40 rounded-xl p-4 border border-slate-700">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
              {i + 1}
            </div>
            <div>
              <div className="text-white font-medium text-sm mb-1">{actor.role}</div>
              <div className="text-slate-400 text-xs">{actor.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-blue-600/10 border border-blue-500/30 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <div className="text-white font-semibold mb-1">Muốn xem luồng này chạy thực tế?</div>
          <div className="text-slate-400 text-sm">Simulator sẽ highlight từng bước trong luồng theo thao tác của bạn.</div>
        </div>
        <button
          onClick={onGoToSimulator}
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors flex-shrink-0"
        >
          → Thử trong Simulator
        </button>
      </div>
    </section>
  );
}
