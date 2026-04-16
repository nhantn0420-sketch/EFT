export default function Conclusion({ onGoToSimulator }) {
  const messages = [
    { icon: '⚡', title: 'EFT là nền tảng', desc: 'Hệ thống thanh toán điện tử hiện đại — nhanh, an toàn và minh bạch hơn bất kỳ phương thức truyền thống nào.' },
    { icon: '🔐', title: 'Bảo mật là bắt buộc', desc: 'Không có hệ thống EFT nào hoàn thiện nếu thiếu 2FA, mã hóa, risk monitoring và audit trail.' },
    { icon: '⚖️', title: 'Pháp lý song hành', desc: 'Tuân thủ quy định không chỉ là nghĩa vụ — đó là lợi thế cạnh tranh và nền tảng niềm tin.' },
    { icon: '🚀', title: 'Tương lai: Open Banking', desc: 'EFT đang tiến hóa với API-first, real-time settlement và AI-powered fraud detection.' },
  ];

  return (
    <section id="conclusion" className="px-8 py-16 max-w-4xl mx-auto">
      <div className="mb-10">
        <div className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">Kết luận</div>
        <h2 className="text-3xl font-bold text-white mb-3">Thông điệp chính</h2>
        <p className="text-slate-400">Tổng kết những điểm cốt lõi về Electronic Funds Transfer và định hướng phát triển tiếp theo.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {messages.map((m) => (
          <div key={m.title} className="bg-slate-800/50 rounded-2xl border border-slate-700 p-5">
            <div className="text-3xl mb-3">{m.icon}</div>
            <div className="text-white font-semibold mb-2">{m.title}</div>
            <p className="text-slate-400 text-sm leading-relaxed">{m.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-blue-900/40 to-slate-800/40 rounded-2xl border border-blue-500/30 p-8 text-center">
        <div className="text-4xl mb-4">🏁</div>
        <h3 className="text-white font-bold text-xl mb-3">Cảm ơn đã theo dõi</h3>
        <p className="text-slate-400 text-sm mb-6">
          Hãy quay lại Simulator để thực hành và kiểm tra lại kiến thức.
        </p>
        <button
          onClick={onGoToSimulator}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          🚀 Chạy lại Simulator
        </button>
      </div>
    </section>
  );
}
