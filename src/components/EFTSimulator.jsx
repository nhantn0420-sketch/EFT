import { useState, useRef } from 'react';
import { accounts, VALID_OTP, RISK_RULES, formatCurrency } from '../data/mockData';
import FlowDiagram from './FlowDiagram';
import PrinciplePanel from './PrinciplePanel';
import NetworkDiagram from './NetworkDiagram';
import ScenarioSelector from './ScenarioSelector';
import TransactionForm from './TransactionForm';
import TransactionLog from './TransactionLog';

const DEFAULT_FORM = { fromAccount: '', toAccount: '', amount: '', otp: '' };
const BASE_DELAY = 700; // ms per step at 1x speed

const SPEED_OPTIONS = [
  { label: '0.5×', value: 0.5 },
  { label: '1×',   value: 1   },
  { label: '2×',   value: 2   },
  { label: '3×',   value: 3   },
];

// Initialize mutable balances from accounts (so we can track real-time)
const initBalances = () => Object.fromEntries(Object.entries(accounts).map(([k, v]) => [k, v.balance]));

function generateId() {
  return 'TXN-' + Math.random().toString(36).slice(2, 10).toUpperCase();
}

function now() {
  return new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export default function EFTSimulator() {
  const [stepStatuses, setStepStatuses] = useState(Array(6).fill('idle'));
  const [currentStep, setCurrentStep] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [logs, setLogs] = useState([]);
  const [activeScenarioId, setActiveScenarioId] = useState(null);
  const [speed, setSpeed] = useState(1);
  const [balances, setBalances] = useState(initBalances);
  const lastTxnRef = useRef({ toAccount: null, time: null });

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectScenario = (scenario) => {
    setActiveScenarioId(scenario.id);
    setForm(scenario.form);
    setResult(null);
    setStepStatuses(Array(6).fill('idle'));
    setCurrentStep(null);
  };

  const setStep = (i, status, statuses) => {
    const next = [...statuses];
    next[i] = status;
    setStepStatuses(next);
    setCurrentStep(i);
    return next;
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms / speed));

  const runTransaction = async () => {
    if (isProcessing) return;

    // Reset
    const freshStatuses = Array(6).fill('idle');
    setStepStatuses(freshStatuses);
    setCurrentStep(null);
    setResult(null);
    setIsProcessing(true);

    const txId = generateId();
    const txTime = now();
    const amount = Number(form.amount);
    const fromAcc = accounts[form.fromAccount];
    const toAcc = accounts[form.toAccount];

    let statuses = [...freshStatuses];

    // ─── STEP 0: Initiate ────────────────────────────────────────
    statuses = setStep(0, 'active', statuses);
    await delay(BASE_DELAY);
    statuses = setStep(0, 'success', statuses);
    await delay(200);

    // ─── STEP 1: Validate ────────────────────────────────────────
    statuses = setStep(1, 'active', statuses);
    await delay(BASE_DELAY);

    if (!toAcc) {
      statuses = setStep(1, 'failed', statuses);
      setResult({ status: 'failed', message: 'Tài khoản nhận không tồn tại', detail: 'Hệ thống không tìm thấy tài khoản nhận trong cơ sở dữ liệu.' });
      addLog(txId, txTime, form.fromAccount, form.toAccount, amount, 'failed', 'Tài khoản nhận không tồn tại');
      setIsProcessing(false);
      return;
    }
    if (amount <= 0) {
      statuses = setStep(1, 'failed', statuses);
      setResult({ status: 'failed', message: 'Số tiền không hợp lệ', detail: 'Số tiền phải lớn hơn 0.' });
      addLog(txId, txTime, form.fromAccount, form.toAccount, amount, 'failed', 'Số tiền không hợp lệ');
      setIsProcessing(false);
      return;
    }
    if (fromAcc.balance < amount) {
      statuses = setStep(1, 'failed', statuses);
      setResult({ status: 'failed', message: 'Số dư không đủ', detail: `Số dư hiện tại: ${formatCurrency(fromAcc.balance)}. Cần: ${formatCurrency(amount)}.` });
      addLog(txId, txTime, form.fromAccount, form.toAccount, amount, 'failed', 'Số dư không đủ');
      setIsProcessing(false);
      return;
    }
    statuses = setStep(1, 'success', statuses);
    await delay(200);

    // ─── STEP 2: Authenticate ─────────────────────────────────────
    statuses = setStep(2, 'active', statuses);
    await delay(BASE_DELAY);

    if (form.otp !== VALID_OTP) {
      statuses = setStep(2, 'failed', statuses);
      setResult({ status: 'failed', message: 'OTP không hợp lệ', detail: 'Mã OTP sai hoặc đã hết hạn. Giao dịch bị từ chối để bảo vệ tài khoản.' });
      addLog(txId, txTime, form.fromAccount, form.toAccount, amount, 'failed', 'OTP không hợp lệ');
      setIsProcessing(false);
      return;
    }
    statuses = setStep(2, 'success', statuses);
    await delay(200);

    // ─── STEP 3: Risk Check ───────────────────────────────────────
    statuses = setStep(3, 'active', statuses);
    await delay(BASE_DELAY * 1.5);

    const isHighAmount = amount >= RISK_RULES.highAmount;
    const isRepeat =
      lastTxnRef.current.toAccount === form.toAccount &&
      lastTxnRef.current.time &&
      Date.now() - lastTxnRef.current.time < RISK_RULES.repeatWindowMs;

    // Check forceRepeat from scenario flag
    const activeScenario = activeScenarioId === 'suspicious';
    const isSuspicious = (activeScenario && logs.length > 0) || isRepeat;

    if (isSuspicious) {
      statuses = setStep(3, 'suspicious', statuses);
      setResult({
        status: 'suspicious',
        message: 'Giao dịch bị gắn cờ đáng ngờ (AML)',
        detail: 'Hệ thống phát hiện pattern chuyển tiền lặp nhanh đến cùng tài khoản. Giao dịch được giữ lại để xem xét thủ công theo quy trình AML.',
      });
      addLog(txId, txTime, form.fromAccount, form.toAccount, amount, 'suspicious', 'Pattern giao dịch đáng ngờ — AML flag');
      setIsProcessing(false);
      return;
    }

    if (isHighAmount) {
      statuses = setStep(3, 'suspicious', statuses);
      setResult({
        status: 'suspicious',
        message: `Cảnh báo: Số tiền lớn (${formatCurrency(amount)})`,
        detail: `Giao dịch vượt ngưỡng cảnh báo ${formatCurrency(RISK_RULES.highAmount)}. Đã ghi nhận và đưa vào hàng đợi xét duyệt thêm theo quy trình kiểm soát rủi ro.`,
      });
      addLog(txId, txTime, form.fromAccount, form.toAccount, amount, 'suspicious', `Số tiền vượt ngưỡng ${formatCurrency(RISK_RULES.highAmount)}`);
      setIsProcessing(false);
      return;
    }
    statuses = setStep(3, 'success', statuses);
    await delay(200);

    // ─── STEP 4: Settle ───────────────────────────────────────────
    statuses = setStep(4, 'active', statuses);
    await delay(BASE_DELAY);
    // Update real-time balances
    setBalances((prev) => ({
      ...prev,
      [form.fromAccount]: prev[form.fromAccount] - amount,
      [form.toAccount]:   prev[form.toAccount]   + amount,
    }));
    statuses = setStep(4, 'success', statuses);
    await delay(200);

    // ─── STEP 5: Log ──────────────────────────────────────────────
    statuses = setStep(5, 'active', statuses);
    await delay(BASE_DELAY * 0.7);
    lastTxnRef.current = { toAccount: form.toAccount, time: Date.now() };
    statuses = setStep(5, 'success', statuses);

    setResult({
      status: 'success',
      message: `Giao dịch thành công`,
      detail: `${formatCurrency(amount)} đã được chuyển từ ${fromAcc.name} đến ${toAcc.name}.`,
    });
    addLog(txId, txTime, form.fromAccount, form.toAccount, amount, 'success', null);
    setIsProcessing(false);
  };

  const addLog = (id, time, from, to, amount, status, reason) => {
    setLogs((prev) => [...prev, { id, time, from, to, amount, status, reason }]);
  };

  const handleReset = () => {
    setForm(DEFAULT_FORM);
    setStepStatuses(Array(6).fill('idle'));
    setCurrentStep(null);
    setResult(null);
    setActiveScenarioId(null);
  };

  const handleResetBalances = () => setBalances(initBalances());

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Top header bar */}
      <header className="bg-slate-900/80 backdrop-blur border-b border-slate-800 px-6 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm font-bold text-white">E</div>
          <div>
            <div className="text-white font-bold text-sm">Secure EFT Simulator</div>
            <div className="text-slate-400 text-xs">Electronic Funds Transfer — Demo tương tác</div>
          </div>
        </div>

        {/* Speed control */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-xs">⚡ Tốc độ:</span>
          <div className="flex gap-1">
            {SPEED_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSpeed(opt.value)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all
                  ${speed === opt.value
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-white'
                  }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main 3-column layout */}
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-7 gap-0 overflow-hidden">

        {/* ── LEFT PANEL: Scenarios + Form + Result ── */}
        <div className="xl:col-span-2 bg-slate-900/40 border-r border-slate-800 overflow-y-auto p-4 space-y-4">
          <ScenarioSelector onSelect={handleSelectScenario} activeScenarioId={activeScenarioId} />

          {/* Balance cards */}
          <BalanceCards balances={balances} form={form} onReset={handleResetBalances} />

          <TransactionForm
            form={form}
            onChange={handleFormChange}
            onSubmit={runTransaction}
            isProcessing={isProcessing}
          />

          {result && <ResultCard result={result} onReset={handleReset} />}
        </div>

        {/* ── CENTER PANEL: Network + Flow ── */}
        <div className="xl:col-span-3 overflow-y-auto p-4 space-y-4 border-r border-slate-800">
          <NetworkDiagram currentStep={currentStep} stepStatuses={stepStatuses} />
          <FlowDiagram currentStep={currentStep} stepStatuses={stepStatuses} />
        </div>

        {/* ── RIGHT PANEL: Principle + Log ── */}
        <div className="xl:col-span-2 overflow-y-auto p-4 space-y-4">
          <PrinciplePanel currentStep={currentStep} />
          <TransactionLog logs={logs} onClear={() => setLogs([])} />
        </div>

      </div>
    </div>
  );
}

function BalanceCards({ balances, form, onReset }) {
  const fromAcc = form.fromAccount ? { ...accounts[form.fromAccount], balance: balances[form.fromAccount] } : null;
  const toAcc   = form.toAccount   ? { ...accounts[form.toAccount],   balance: balances[form.toAccount]   } : null;

  if (!fromAcc && !toAcc) return null;

  return (
    <div className="bg-slate-900/70 rounded-2xl border border-slate-700 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-slate-300 text-sm font-semibold flex items-center gap-2">
          <span>💰</span> Số dư tài khoản
        </div>
        <button onClick={onReset} className="text-xs text-slate-600 hover:text-blue-400 transition-colors">↺ Reset</button>
      </div>
      <div className="space-y-2">
        {fromAcc && (
          <div className="flex items-center justify-between bg-slate-800/50 rounded-xl px-3 py-2">
            <div>
              <div className="text-xs text-slate-400">{fromAcc.name}</div>
              <div className="text-xs text-slate-500">{form.fromAccount} · {fromAcc.bank}</div>
            </div>
            <div className="text-right">
              <div className="text-red-400 text-xs mb-0.5">Gửi đi</div>
              <div className="text-white font-bold text-sm">{formatCurrency(balances[form.fromAccount])}</div>
            </div>
          </div>
        )}
        {toAcc && (
          <div className="flex items-center justify-between bg-slate-800/50 rounded-xl px-3 py-2">
            <div>
              <div className="text-xs text-slate-400">{toAcc.name}</div>
              <div className="text-xs text-slate-500">{form.toAccount} · {toAcc.bank}</div>
            </div>
            <div className="text-right">
              <div className="text-green-400 text-xs mb-0.5">Nhận về</div>
              <div className="text-white font-bold text-sm">{formatCurrency(balances[form.toAccount])}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ResultCard({ result, onReset }) {
  const styles = {
    success:    { bg: 'bg-green-600/10  border-green-500/40',  title: 'text-green-400',  icon: '✅' },
    failed:     { bg: 'bg-red-600/10    border-red-500/40',    title: 'text-red-400',    icon: '❌' },
    suspicious: { bg: 'bg-orange-600/10 border-orange-500/40', title: 'text-orange-400', icon: '⚠️' },
  };
  const s = styles[result.status] || styles.failed;

  return (
    <div className={`rounded-2xl border p-4 ${s.bg}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className={`font-semibold text-sm flex items-center gap-2 mb-2 ${s.title}`}>
            <span>{s.icon}</span> {result.message}
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">{result.detail}</p>
        </div>
        <button onClick={onReset} className="text-slate-500 hover:text-white text-xs flex-shrink-0 transition-colors">
          ↺ Reset
        </button>
      </div>
    </div>
  );
}
