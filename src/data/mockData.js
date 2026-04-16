// Mock bank accounts
export const accounts = {
  '1001234567': { name: 'Nguyễn Văn An', bank: 'Vietcombank', balance: 15000000 },
  '1009876543': { name: 'Trần Thị Bình', bank: 'Techcombank', balance: 8500000 },
  '1005551234': { name: 'Lê Văn Cường', bank: 'BIDV', balance: 120000000 },
  '1007778888': { name: 'Phạm Minh Dũng', bank: 'MB Bank', balance: 3200000 },
};

// Valid OTP (hardcoded for demo)
export const VALID_OTP = '123456';

// Risk rules
export const RISK_RULES = {
  highAmount: 50000000,       // > 50 triệu → flag
  repeatWindowMs: 60000,      // giao dịch lặp trong 60 giây
};

// Predefined scenarios
export const SCENARIOS = [
  {
    id: 'success',
    label: 'Giao dịch thành công',
    description: 'Minh họa luồng happy-path đầy đủ từ đầu đến cuối.',
    icon: '✅',
    form: {
      fromAccount: '1001234567',
      toAccount: '1009876543',
      amount: '2000000',
      otp: '123456',
    },
  },
  {
    id: 'otp_fail',
    label: 'OTP sai / hết hạn',
    description: 'Xác thực thất bại — minh họa vai trò của 2FA trong EFT.',
    icon: '🔐',
    form: {
      fromAccount: '1001234567',
      toAccount: '1009876543',
      amount: '2000000',
      otp: '000000',
    },
  },
  {
    id: 'insufficient',
    label: 'Không đủ số dư',
    description: 'Validation từ chối giao dịch khi số dư tài khoản không đủ.',
    icon: '💸',
    form: {
      fromAccount: '1007778888',
      toAccount: '1009876543',
      amount: '5000000',
      otp: '123456',
    },
  },
  {
    id: 'high_risk',
    label: 'Số tiền lớn — Risk Flag',
    description: 'Risk engine phát hiện giao dịch vượt ngưỡng và yêu cầu xét duyệt thêm.',
    icon: '⚠️',
    form: {
      fromAccount: '1005551234',
      toAccount: '1009876543',
      amount: '80000000',
      otp: '123456',
    },
  },
  {
    id: 'suspicious',
    label: 'Giao dịch đáng ngờ — AML',
    description: 'Hệ thống phát hiện pattern chuyển lặp nhanh → cảnh báo AML.',
    icon: '🚨',
    form: {
      fromAccount: '1001234567',
      toAccount: '1009876543',
      amount: '2000000',
      otp: '123456',
    },
    forceRepeat: true,
  },
];

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
