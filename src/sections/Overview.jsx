import { OVERVIEW_EFT_TYPES, COMPARE_TABLE } from '../data/content';

export default function Overview() {
  return (
    <section id="overview" className="px-8 py-16 max-w-4xl mx-auto">
      <SectionHeader
        tag="Tổng quan"
        title="EFT là gì?"
        desc="Electronic Funds Transfer — hệ thống chuyển tiền điện tử giữa các tài khoản ngân hàng thông qua mạng máy tính, không cần giấy tờ hay tiền mặt."
      />

      {/* Definition callout */}
      <div className="bg-blue-600/10 border border-blue-500/30 rounded-xl p-5 mb-10 text-blue-200 text-sm leading-relaxed">
        <strong className="text-blue-400">Định nghĩa:</strong> EFT là bất kỳ giao dịch tài chính nào được thực hiện thông qua hệ thống điện tử — bao gồm ATM, internet banking, mobile banking, thẻ tín dụng/ghi nợ và chuyển khoản liên ngân hàng.
      </div>

      {/* EFT Types */}
      <h3 className="text-white font-semibold mb-4 text-lg">Các hình thức EFT phổ biến</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
        {OVERVIEW_EFT_TYPES.map((t) => (
          <div key={t.name} className="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-blue-500/50 transition-colors">
            <div className="text-2xl mb-2">{t.icon}</div>
            <div className="text-white font-medium text-sm mb-1">{t.name}</div>
            <div className="text-slate-400 text-xs">{t.desc}</div>
          </div>
        ))}
      </div>

      {/* Compare table */}
      <h3 className="text-white font-semibold mb-4 text-lg">EFT vs Thanh toán truyền thống</h3>
      <div className="overflow-x-auto rounded-xl border border-slate-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-800 text-slate-300">
              <th className="text-left px-4 py-3 font-medium">Tiêu chí</th>
              <th className="text-left px-4 py-3 font-medium text-blue-400">EFT</th>
              <th className="text-left px-4 py-3 font-medium text-slate-400">Truyền thống</th>
            </tr>
          </thead>
          <tbody>
            {COMPARE_TABLE.map((row, i) => (
              <tr key={row.criterion} className={i % 2 === 0 ? 'bg-slate-900' : 'bg-slate-800/40'}>
                <td className="px-4 py-3 text-slate-300 font-medium">{row.criterion}</td>
                <td className="px-4 py-3 text-blue-300">{row.eft}</td>
                <td className="px-4 py-3 text-slate-400">{row.traditional}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function SectionHeader({ tag, title, desc }) {
  return (
    <div className="mb-10">
      <div className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">{tag}</div>
      <h2 className="text-3xl font-bold text-white mb-3">{title}</h2>
      <p className="text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}
