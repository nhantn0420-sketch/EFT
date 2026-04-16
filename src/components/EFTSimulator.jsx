import { useState, useRef } from 'react';
import { accounts, VALID_OTP, RISK_RULES, formatCurrency } from '../data/mockData';
import FlowDiagram from './FlowDiagram';
import PrinciplePanel from './PrinciplePanel';
import ScenarioSelector from './ScenarioSelector';
import TransactionForm from './TransactionForm';
import TransactionLog from './TransactionLog';

const DEFAULT_FORM = { fromAccount: '', toAccount: '', amount: '', otp: '' };
const STEP_DELAY = 700; // ms per step

function generateId() {
  return 'TXN-' + Math.random().toString(36).slice(2, 10).toUpperCase();
}

function now() {
  return new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export default function EFTSimulator({ initialScenarioId }) {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [stepStatuses, setStepStatuses] = useState(Array(6).fill('idle'));
  const [currentStep, setCurrentStep] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null); // { status, message, detail }
  const [logs, setLogs] = useState([]);
  const [activeScenarioId, setActiveScenarioId] = useState(initialScenarioId || null);
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

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

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
    await delay(STEP_DELAY);
    statuses = setStep(0, 'success', statuses);
    await delay(200);

    // ─── STEP 1: Validate ────────────────────────────────────────
    statuses = setStep(1, 'active', statuses);
    await delay(STEP_DELAY);

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
    await delay(STEP_DELAY);

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
    await delay(STEP_DELAY * 1.5); // Risk check takes longer

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
    await delay(STEP_DELAY);
    // Update in-memory balance (demo only)
    accounts[form.fromAccount].balance -= amount;
    accounts[form.toAccount].balance += amount;
    statuses = setStep(4, 'success', statuses);
    await delay(200);

    // ─── STEP 5: Log ──────────────────────────────────────────────
    statuses = setStep(5, 'active', statuses);
    await delay(STEP_DELAY * 0.7);
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

  return (
    <section id="simulator" className="px-4 py-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">Demo Tương Tác</div>
        <h2 className="text-3xl font-bold text-white mb-3">Secure EFT Simulator</h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          Chọn một kịch bản, điền form và thực hiện giao dịch. Flow diagram bên phải sẽ highlight từng bước xử lý và giải thích nguyên lý tương ứng.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left column: Scenario + Form + Result + Log */}
        <div className="lg:col-span-2 space-y-4">
          <ScenarioSelector onSelect={handleSelectScenario} activeScenarioId={activeScenarioId} />
          <TransactionForm
            form={form}
            onChange={handleFormChange}
            onSubmit={runTransaction}
            isProcessing={isProcessing}
          />

          {/* Result */}
          {result && <ResultCard result={result} onReset={handleReset} />}

          <TransactionLog logs={logs} onClear={() => setLogs([])} />
        </div>

        {/* Right column: Flow + Principle (sticky) */}
        <div className="lg:col-span-3 space-y-4 lg:sticky lg:top-6 lg:self-start">
          <FlowDiagram currentStep={currentStep} stepStatuses={stepStatuses} />
          <PrinciplePanel currentStep={currentStep} />
        </div>
      </div>
    </section>
  );
}

function ResultCard({ result, onReset }) {
  const styles = {
    success: { bg: 'bg-green-600/10 border-green-500/40', title: 'text-green-400', icon: '✅' },
    failed: { bg: 'bg-red-600/10 border-red-500/40', title: 'text-red-400', icon: '❌' },
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
        <button
          onClick={onReset}
          className="text-slate-500 hover:text-white text-xs flex-shrink-0 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
