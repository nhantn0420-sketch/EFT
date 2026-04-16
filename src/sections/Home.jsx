export default function Home({ onGoToSimulator }) {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-8 py-20">
      <div className="max-w-2xl text-center">
        <div className="inline-block bg-blue-600/20 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full mb-6 border border-blue-500/30 uppercase tracking-wider">
          Web Demo Tương Tác
        </div>
        <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
          Electronic Funds Transfer
        </h1>
        <p className="text-xl text-slate-400 mb-4">
          Khám phá cơ chế hoạt động của EFT — từ lý thuyết đến thực hành với simulator tương tác.
        </p>
        <p className="text-slate-500 mb-10 text-sm">
          Mỗi bước bạn thao tác trong simulator đều hiển thị luồng xử lý và nguyên lý kỹ thuật tương ứng.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button
            onClick={onGoToSimulator}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            🚀 Bắt đầu Demo
          </button>
          <button
            onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            📖 Tìm hiểu EFT
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: '9 Sections', label: 'Nội dung học thuật' },
            { value: '5 Scenarios', label: 'Kịch bản demo' },
            { value: '6 Bước', label: 'Luồng xử lý EFT' },
          ].map((s) => (
            <div key={s.label} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <div className="text-blue-400 font-bold text-lg">{s.value}</div>
              <div className="text-slate-400 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
