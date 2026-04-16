import { accounts, formatCurrency } from '../data/mockData';

export default function TransactionForm({ form, onChange, onSubmit, isProcessing, disabled }) {
  const fromAcc = accounts[form.fromAccount];
  const toAcc = accounts[form.toAccount];

  return (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-5">
      <div className="text-slate-300 text-sm font-semibold mb-4">💳 Thông tin giao dịch</div>

      <div className="space-y-4">
        {/* From Account */}
        <div>
          <label className="block text-slate-400 text-xs font-medium mb-1.5">Tài khoản gửi</label>
          <select
            value={form.fromAccount}
            onChange={(e) => onChange('fromAccount', e.target.value)}
            disabled={isProcessing || disabled}
            className="w-full bg-slate-900 border border-slate-600 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-blue-500 disabled:opacity-50"
          >
            <option value="">-- Chọn tài khoản --</option>
            {Object.entries(accounts).map(([num, acc]) => (
              <option key={num} value={num}>{num} — {acc.name} ({acc.bank})</option>
            ))}
          </select>
          {fromAcc && (
            <div className="mt-1 text-xs text-slate-500 flex justify-between">
              <span>{fromAcc.name}</span>
              <span className="text-green-400">Số dư: {formatCurrency(fromAcc.balance)}</span>
            </div>
          )}
        </div>

        {/* To Account */}
        <div>
          <label className="block text-slate-400 text-xs font-medium mb-1.5">Tài khoản nhận</label>
          <select
            value={form.toAccount}
            onChange={(e) => onChange('toAccount', e.target.value)}
            disabled={isProcessing || disabled}
            className="w-full bg-slate-900 border border-slate-600 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-blue-500 disabled:opacity-50"
          >
            <option value="">-- Chọn tài khoản --</option>
            {Object.entries(accounts)
              .filter(([num]) => num !== form.fromAccount)
              .map(([num, acc]) => (
                <option key={num} value={num}>{num} — {acc.name} ({acc.bank})</option>
              ))}
          </select>
          {toAcc && (
            <div className="mt-1 text-xs text-slate-500">{toAcc.name} — {toAcc.bank}</div>
          )}
        </div>

        {/* Amount */}
        <div>
          <label className="block text-slate-400 text-xs font-medium mb-1.5">Số tiền (VND)</label>
          <input
            type="number"
            value={form.amount}
            onChange={(e) => onChange('amount', e.target.value)}
            disabled={isProcessing || disabled}
            placeholder="Nhập số tiền..."
            min="1000"
            className="w-full bg-slate-900 border border-slate-600 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-blue-500 disabled:opacity-50 placeholder-slate-600"
          />
          {form.amount && Number(form.amount) > 0 && (
            <div className="mt-1 text-xs text-blue-400">{formatCurrency(Number(form.amount))}</div>
          )}
        </div>

        {/* OTP */}
        <div>
          <label className="block text-slate-400 text-xs font-medium mb-1.5">
            Mã OTP
            <span className="ml-2 text-slate-600 font-normal">(OTP hợp lệ: 123456)</span>
          </label>
          <input
            type="text"
            value={form.otp}
            onChange={(e) => onChange('otp', e.target.value.replace(/\D/g, '').slice(0, 6))}
            disabled={isProcessing || disabled}
            placeholder="6 chữ số..."
            maxLength={6}
            className="w-full bg-slate-900 border border-slate-600 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-blue-500 disabled:opacity-50 placeholder-slate-600 tracking-widest"
          />
        </div>

        {/* Submit */}
        <button
          onClick={onSubmit}
          disabled={isProcessing || disabled || !form.fromAccount || !form.toAccount || !form.amount || !form.otp}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Đang xử lý...
            </span>
          ) : '▶ Thực hiện giao dịch'}
        </button>
      </div>
    </div>
  );
}
