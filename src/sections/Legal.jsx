import { useState } from 'react';
import { LEGAL_ISSUES } from '../data/content';

export default function Legal() {
  const [open, setOpen] = useState(null);

  return (
    <section id="legal" className="px-8 py-16 max-w-4xl mx-auto">
      <div className="mb-10">
        <div className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">Pháp lý & Quyền riêng tư</div>
        <h2 className="text-3xl font-bold text-white mb-3">Khung pháp lý của EFT</h2>
        <p className="text-slate-400">EFT không chỉ là bài toán kỹ thuật — các vấn đề pháp lý, quyền riêng tư và quản trị là nền tảng cho mọi hệ thống thanh toán hợp pháp.</p>
      </div>

      <div className="space-y-3">
        {LEGAL_ISSUES.map((issue, i) => (
          <div key={issue.title} className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-700/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-slate-500 text-sm">⚖️</span>
                <span className="text-white font-medium text-sm">{issue.title}</span>
              </div>
              <span className="text-slate-400 text-sm transition-transform duration-200" style={{ transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                ▾
              </span>
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-slate-300 text-sm leading-relaxed border-t border-slate-700 pt-3">
                {issue.content}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Highlight box */}
      <div className="mt-8 bg-yellow-600/10 border border-yellow-500/30 rounded-xl p-5">
        <div className="text-yellow-400 font-semibold mb-2 text-sm">⚠️ Lưu ý quan trọng tại Việt Nam</div>
        <p className="text-slate-300 text-sm leading-relaxed">
          Theo Thông tư 09/2020/TT-NHNN, các tổ chức cung cấp dịch vụ thanh toán phải đảm bảo an toàn hệ thống thông tin cấp độ 3 trở lên. Vi phạm có thể bị thu hồi giấy phép hoạt động.
        </p>
      </div>
    </section>
  );
}
