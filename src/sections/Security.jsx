import { SECURITY_THREATS, SECURITY_MEASURES } from '../data/content';

const riskColor = { 'Cao': 'text-red-400 bg-red-400/10 border-red-400/30', 'Trung bình': 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' };

export default function Security({ onGoToSimulatorWithScenario }) {
  return (
    <section id="security" className="px-8 py-16 max-w-4xl mx-auto">
      <div className="mb-10">
        <div className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">Bảo mật</div>
        <h2 className="text-3xl font-bold text-white mb-3">Rủi ro & Biện pháp bảo vệ</h2>
        <p className="text-slate-400">EFT là mục tiêu của nhiều hình thức tấn công. Hiểu rõ mối đe dọa và đối sách là nền tảng cho mọi hệ thống thanh toán an toàn.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Threats */}
        <div>
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <span className="text-red-400">⚠️</span> Mối đe dọa chính
          </h3>
          <div className="space-y-3">
            {SECURITY_THREATS.map((t) => (
              <div key={t.threat} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm font-medium">{t.threat}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${riskColor[t.risk]}`}>{t.risk}</span>
                </div>
                <p className="text-slate-400 text-xs">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Measures */}
        <div>
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <span className="text-green-400">🛡️</span> Biện pháp bảo vệ
          </h3>
          <div className="space-y-3">
            {SECURITY_MEASURES.map((m) => (
              <div key={m.measure} className="bg-slate-800/50 rounded-xl p-4 border border-green-500/20">
                <div className="flex items-start gap-2">
                  <span className="text-green-400 text-sm mt-0.5">✓</span>
                  <div>
                    <div className="text-white text-sm font-medium">{m.measure}</div>
                    <div className="text-slate-400 text-xs mt-0.5">{m.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demo CTA */}
      <div className="mt-10 grid sm:grid-cols-2 gap-4">
        <DemoCTA
          title="Demo: OTP sai"
          desc="Xem điều gì xảy ra khi bước Authentication thất bại."
          onClick={() => onGoToSimulatorWithScenario('otp_fail')}
          color="purple"
        />
        <DemoCTA
          title="Demo: Giao dịch đáng ngờ"
          desc="Xem Risk engine phát hiện pattern AML như thế nào."
          onClick={() => onGoToSimulatorWithScenario('suspicious')}
          color="orange"
        />
      </div>
    </section>
  );
}

function DemoCTA({ title, desc, onClick, color }) {
  const colors = {
    purple: 'border-purple-500/30 bg-purple-600/10 hover:border-purple-400/50',
    orange: 'border-orange-500/30 bg-orange-600/10 hover:border-orange-400/50',
  };
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border p-4 text-left transition-colors w-full ${colors[color]}`}
    >
      <div className="text-white font-semibold text-sm mb-1">{title} →</div>
      <div className="text-slate-400 text-xs">{desc}</div>
    </button>
  );
}
