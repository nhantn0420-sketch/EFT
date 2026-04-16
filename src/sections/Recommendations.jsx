import { RECOMMENDATIONS } from '../data/content';

const colorMap = {
  '⚙️': 'border-blue-500/30 bg-blue-600/5',
  '📋': 'border-green-500/30 bg-green-600/5',
  '👤': 'border-purple-500/30 bg-purple-600/5',
};
const checkColors = {
  '⚙️': 'text-blue-400',
  '📋': 'text-green-400',
  '👤': 'text-purple-400',
};

export default function Recommendations({ onGoToSimulator }) {
  return (
    <section id="recommendations" className="px-8 py-16 max-w-4xl mx-auto">
      <div className="mb-10">
        <div className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">Khuyến nghị</div>
        <h2 className="text-3xl font-bold text-white mb-3">Thực hành tốt nhất</h2>
        <p className="text-slate-400">Tổng hợp các khuyến nghị kỹ thuật và quản lý để xây dựng hệ thống EFT an toàn, hiệu quả và tuân thủ pháp luật.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mb-10">
        {RECOMMENDATIONS.map((rec) => (
          <div key={rec.category} className={`rounded-2xl border p-5 ${colorMap[rec.icon]}`}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{rec.icon}</span>
              <span className="text-white font-semibold text-sm">{rec.category}</span>
            </div>
            <ul className="space-y-2">
              {rec.items.map((item) => (
                <li key={item} className="flex gap-2 text-slate-300 text-xs leading-relaxed">
                  <span className={`flex-shrink-0 font-bold ${checkColors[rec.icon]}`}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bridge to simulator */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-6 text-center">
        <div className="text-white font-semibold text-lg mb-2">
          Xem những khuyến nghị này hoạt động thực tế
        </div>
        <p className="text-slate-400 text-sm mb-5">
          Simulator minh họa 2FA, risk monitoring và audit log — các trụ cột bảo mật trong mọi hệ thống EFT.
        </p>
        <button
          onClick={onGoToSimulator}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors"
        >
          🚀 Mở EFT Simulator
        </button>
      </div>
    </section>
  );
}
