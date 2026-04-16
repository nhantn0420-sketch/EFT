import { BENEFITS } from '../data/content';

const colorMap = {
  blue: { card: 'border-blue-500/30 bg-blue-600/10', tag: 'bg-blue-600/20 text-blue-400', dot: 'bg-blue-500' },
  green: { card: 'border-green-500/30 bg-green-600/10', tag: 'bg-green-600/20 text-green-400', dot: 'bg-green-500' },
  purple: { card: 'border-purple-500/30 bg-purple-600/10', tag: 'bg-purple-600/20 text-purple-400', dot: 'bg-purple-500' },
};

export default function Benefits() {
  return (
    <section id="benefits" className="px-8 py-16 max-w-4xl mx-auto">
      <div className="mb-10">
        <div className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">Lợi ích</div>
        <h2 className="text-3xl font-bold text-white mb-3">EFT mang lại gì?</h2>
        <p className="text-slate-400">Lợi ích của EFT phân bố rộng — từ cá nhân đến doanh nghiệp và cả hệ thống tài chính quốc gia.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {BENEFITS.map((group) => {
          const c = colorMap[group.color];
          return (
            <div key={group.group} className={`rounded-2xl border p-5 ${c.card}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">{group.icon}</div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${c.tag}`}>
                  {group.group}
                </span>
              </div>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2 text-slate-300 text-sm">
                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${c.dot}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
