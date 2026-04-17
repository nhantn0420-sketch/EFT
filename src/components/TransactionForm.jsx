import { accounts, formatCurrency, RISK_RULES, VALID_OTP } from "../data/mockData";

function FieldStatus({ ok, warn, msg }) {
  if (!msg) return null;
  return (
    <div className={`mt-1 text-xs flex items-center gap-1 ${ok ? "text-green-400" : warn ? "text-yellow-400" : "text-red-400"}`}>
      <span>{ok ? "✓" : warn ? "⚠" : "✗"}</span> {msg}
    </div>
  );
}

export default function TransactionForm({ form, onChange, onSubmit, isProcessing }) {
  const fromAcc = accounts[form.fromAccount];
  const toAcc = accounts[form.toAccount];
  const amount = Number(form.amount);

  // Real-time validation states
  const amountOk   = amount > 0 && fromAcc && fromAcc.balance >= amount;
  const amountWarn = amount > 0 && amount >= RISK_RULES.highAmount;
  const amountMsg  = !form.amount ? null
    : amount <= 0           ? "Số tiền phải lớn hơn 0"
    : !fromAcc              ? null
    : fromAcc.balance < amount ? `Không đủ số dư (${formatCurrency(fromAcc.balance)})`
    : amountWarn            ? `Cảnh báo: vượt ngưỡng ${formatCurrency(RISK_RULES.highAmount)} — sẽ bị Risk Check`
    : `Hợp lệ — ${formatCurrency(amount)}`;

  const otpOk  = form.otp.length === 6 && form.otp === VALID_OTP;
  const otpMsg = form.otp.length === 0 ? null
    : form.otp.length < 6  ? `Còn thiếu ${6 - form.otp.length} chữ số`
    : form.otp !== VALID_OTP ? "OTP không đúng"
    : "OTP hợp lệ";

  const canSubmit = form.fromAccount && form.toAccount && amountOk && otpOk && !isProcessing;

  return (
    <div className="bg-slate-900/70 rounded-2xl border border-slate-700 p-5">
      <div className="text-slate-300 text-sm font-semibold mb-4 flex items-center gap-2">
        <span className="text-lg">💳</span> Thông tin giao dịch
      </div>

      <div className="space-y-4">
        {/* From Account */}
        <div>
          <label className="block text-slate-400 text-xs font-medium mb-1.5">Tài khoản gửi</label>
          <select
            value={form.fromAccount}
            onChange={(e) => onChange("fromAccount", e.target.value)}
            disabled={isProcessing}
            className="w-full bg-slate-800 border border-slate-600 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-500 disabled:opacity-50 transition-colors"
          >
            <option value="">-- Chọn tài khoản --</option>
            {Object.entries(accounts).map(([num, acc]) => (
              <option key={num} value={num}>{num} — {acc.name}</option>
            ))}
          </select>
          {fromAcc && (
            <div className="mt-1.5 flex items-center justify-between px-1">
              <span className="text-slate-500 text-xs">{fromAcc.name} · {fromAcc.bank}</span>
              <span className={`text-xs font-semibold ${fromAcc.balance > 0 ? "text-green-400" : "text-red-400"}`}>
                {formatCurrency(fromAcc.balance)}
              </span>
            </div>
          )}
        </div>

        {/* Transfer arrow visual */}
        {form.fromAccount && form.toAccount && (
          <div className="flex items-center gap-2 py-1">
            <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-blue-600" />
            <span className="text-blue-400 text-lg">→</span>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-600 to-slate-700" />
          </div>
        )}

        {/* To Account */}
        <div>
          <label className="block text-slate-400 text-xs font-medium mb-1.5">Tài khoản nhận</label>
          <select
            value={form.toAccount}
            onChange={(e) => onChange("toAccount", e.target.value)}
            disabled={isProcessing}
            className="w-full bg-slate-800 border border-slate-600 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-500 disabled:opacity-50 transition-colors"
          >
            <option value="">-- Chọn tài khoản --</option>
            {Object.entries(accounts)
              .filter(([num]) => num !== form.fromAccount)
              .map(([num, acc]) => (
                <option key={num} value={num}>{num} — {acc.name}</option>
              ))}
          </select>
          {toAcc && (
            <div className="mt-1.5 px-1 text-slate-500 text-xs">{toAcc.name} · {toAcc.bank}</div>
          )}
        </div>

        {/* Amount */}
        <div>
          <label className="block text-slate-400 text-xs font-medium mb-1.5">Số tiền (VND)</label>
          <input
            type="number"
            value={form.amount}
            onChange={(e) => onChange("amount", e.target.value)}
            disabled={isProcessing}
            placeholder="Nhập số tiền..."
            className={`w-full bg-slate-800 border text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none disabled:opacity-50 placeholder-slate-600 transition-colors
              ${form.amount ? (amountOk ? (amountWarn ? "border-yellow-500 focus:border-yellow-400" : "border-green-500 focus:border-green-400") : "border-red-500 focus:border-red-400") : "border-slate-600 focus:border-blue-500"}`}
          />
          <FieldStatus ok={amountOk && !amountWarn} warn={amountWarn} msg={amountMsg} />
        </div>

        {/* OTP */}
        <div>
          <label className="block text-slate-400 text-xs font-medium mb-1.5 flex items-center justify-between">
            <span>Mã OTP</span>
            <span className="text-slate-600 font-normal text-xs">Hint: 123456</span>
          </label>
          <input
            type="text"
            value={form.otp}
            onChange={(e) => onChange("otp", e.target.value.replace(/\D/g, "").slice(0, 6))}
            disabled={isProcessing}
            placeholder="● ● ● ● ● ●"
            maxLength={6}
            className={`w-full bg-slate-800 border text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none disabled:opacity-50 placeholder-slate-600 tracking-[0.5em] transition-colors
              ${form.otp ? (otpOk ? "border-green-500 focus:border-green-400" : "border-red-500 focus:border-red-400") : "border-slate-600 focus:border-blue-500"}`}
          />
          <FieldStatus ok={otpOk} warn={false} msg={otpMsg} />
        </div>

        {/* Submit */}
        <button
          onClick={onSubmit}
          disabled={!canSubmit}
          className={`w-full font-semibold py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2
            ${canSubmit
              ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
              : "bg-slate-800 text-slate-500 cursor-not-allowed"
            }`}
        >
          {isProcessing ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Đang xử lý...
            </>
          ) : (
            <>▶ Thực hiện giao dịch</>
          )}
        </button>
      </div>
    </div>
  );
}
