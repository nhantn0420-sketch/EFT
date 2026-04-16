export const OVERVIEW_EFT_TYPES = [
  { icon: '🏧', name: 'ATM Transfer', desc: 'Rút/chuyển tiền qua máy ATM, nền tảng EFT sớm nhất' },
  { icon: '🏢', name: 'Wire Transfer', desc: 'Chuyển khoản liên ngân hàng qua SWIFT/RTGS, thường cho giá trị lớn' },
  { icon: '🔄', name: 'ACH / Napas', desc: 'Thanh toán bù trừ tự động theo lô, lương, hóa đơn định kỳ' },
  { icon: '💳', name: 'Debit/Credit Card', desc: 'POS và online payment — xử lý real-time qua Visa/Mastercard' },
  { icon: '📱', name: 'Mobile Banking', desc: 'Chuyển tiền qua app ngân hàng, tích hợp biometric + OTP' },
  { icon: '🌐', name: 'Internet Banking', desc: 'Giao dịch qua trình duyệt với TLS encryption và 2FA' },
];

export const COMPARE_TABLE = [
  { criterion: 'Phương tiện', eft: 'Điện tử — mạng máy tính', traditional: 'Giấy tờ, tiền mặt, séc' },
  { criterion: 'Tốc độ', eft: 'Real-time đến vài phút', traditional: 'Vài giờ đến vài ngày' },
  { criterion: 'Chi phí', eft: 'Thấp, nhiều giao dịch miễn phí', traditional: 'Cao hơn, phí xử lý thủ công' },
  { criterion: 'Audit trail', eft: 'Tự động, đầy đủ, không thể sửa', traditional: 'Phụ thuộc quy trình thủ công' },
  { criterion: 'Rủi ro', eft: 'Tấn công mạng, phishing, fraud', traditional: 'Mất giấy tờ, giả mạo chữ ký' },
];

export const EFT_ACTORS = [
  { role: 'Người gửi (Originator)', desc: 'Khởi tạo lệnh chuyển tiền, cung cấp thông tin giao dịch và xác thực danh tính.' },
  { role: 'Ngân hàng gửi (Originating Bank)', desc: 'Tiếp nhận lệnh, validate, xác thực và chuyển thông điệp qua mạng liên ngân hàng.' },
  { role: 'Clearing House (Napas/ACH/SWIFT)', desc: 'Trung gian bù trừ — đảm bảo cả hai phía ngân hàng nhận/gửi đúng số tiền.' },
  { role: 'Ngân hàng nhận (Receiving Bank)', desc: 'Nhận thông điệp từ clearing house, cộng tiền vào tài khoản nhận.' },
  { role: 'Người nhận (Beneficiary)', desc: 'Nhận tiền vào tài khoản và nhận thông báo giao dịch thành công.' },
];

export const BENEFITS = [
  {
    group: 'Cá nhân',
    icon: '👤',
    color: 'blue',
    items: ['Chuyển tiền 24/7, không cần đến ngân hàng', 'Tốc độ real-time, không chờ đợi', 'Chi phí thấp hoặc miễn phí', 'Lịch sử giao dịch đầy đủ trong app'],
  },
  {
    group: 'Doanh nghiệp',
    icon: '🏢',
    color: 'green',
    items: ['Tự động hóa trả lương, thanh toán nhà cung cấp', 'Tích hợp với ERP/accounting system', 'Giảm chi phí xử lý so với tiền mặt/séc', 'Đối chiếu tự động, giảm sai sót'],
  },
  {
    group: 'Ngân hàng & Quốc gia',
    icon: '🏛️',
    color: 'purple',
    items: ['Minh bạch dòng tiền, hỗ trợ chống rửa tiền', 'Cơ sở dữ liệu tài chính quốc gia đầy đủ', 'Giảm rủi ro vận chuyển tiền mặt', 'Nền tảng cho fintech và open banking'],
  },
];

export const SECURITY_THREATS = [
  { threat: 'Phishing / Social Engineering', risk: 'Cao', desc: 'Lừa người dùng cung cấp thông tin xác thực qua email/website giả mạo.' },
  { threat: 'Man-in-the-Middle (MitM)', risk: 'Cao', desc: 'Kẻ tấn công chặn và sửa dữ liệu trong quá trình truyền.' },
  { threat: 'Account Takeover (ATO)', risk: 'Cao', desc: 'Chiếm quyền tài khoản thông qua credential stuffing hoặc SIM swap.' },
  { threat: 'Replay Attack', risk: 'Trung bình', desc: 'Tái sử dụng gói dữ liệu giao dịch hợp lệ để thực hiện giao dịch trùng lặp.' },
  { threat: 'Insider Threat', risk: 'Trung bình', desc: 'Nhân viên ngân hàng có quyền truy cập lạm dụng hệ thống.' },
];

export const SECURITY_MEASURES = [
  { measure: 'TLS 1.3 Encryption', desc: 'Mã hóa toàn bộ dữ liệu truyền qua mạng.' },
  { measure: 'Two-Factor Auth (2FA)', desc: 'OTP + mật khẩu — xác thực hai lớp độc lập.' },
  { measure: 'Biometric Auth', desc: 'Vân tay, Face ID trên mobile banking.' },
  { measure: 'Real-time Monitoring', desc: 'AI phát hiện pattern bất thường tức thời.' },
  { measure: 'Session Token & Timeout', desc: 'Token ngắn hạn, hết hiệu lực sau thời gian không hoạt động.' },
  { measure: 'Rate Limiting', desc: 'Giới hạn số lần thử OTP/mật khẩu để ngăn brute-force.' },
];

export const LEGAL_ISSUES = [
  {
    title: 'Bảo vệ dữ liệu giao dịch',
    content: 'Dữ liệu EFT thuộc dữ liệu tài chính cá nhân — phải được bảo vệ theo Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân tại Việt Nam. Ngân hàng không được chia sẻ dữ liệu giao dịch với bên thứ ba không có thẩm quyền.',
  },
  {
    title: 'Tranh chấp và trách nhiệm',
    content: 'Khi xảy ra giao dịch trái phép, trách nhiệm phụ thuộc vào việc ai có lỗi. Nếu ngân hàng không có đủ biện pháp bảo mật, ngân hàng chịu trách nhiệm. Nếu người dùng tiết lộ OTP, người dùng có thể chịu một phần trách nhiệm.',
  },
  {
    title: 'Chống rửa tiền (AML)',
    content: 'Các tổ chức tín dụng phải báo cáo giao dịch đáng ngờ theo Luật Phòng, chống rửa tiền 2022. Giao dịch vượt 300 triệu đồng/ngày hoặc có dấu hiệu bất thường phải được ghi nhận và báo cáo AMLA.',
  },
  {
    title: 'Trốn thuế qua EFT',
    content: 'Dữ liệu EFT có thể được cơ quan thuế sử dụng để đối chiếu thu nhập khai báo. Pháp luật cho phép cơ quan thuế yêu cầu ngân hàng cung cấp thông tin giao dịch của đối tượng điều tra.',
  },
  {
    title: 'Khung quản lý & Tuân thủ',
    content: 'EFT tại Việt Nam chịu sự quản lý của NHNN, tuân thủ Thông tư 09/2020/TT-NHNN về an toàn hệ thống thông tin. Fintech và ví điện tử cần giấy phép trung gian thanh toán riêng.',
  },
];

export const RECOMMENDATIONS = [
  {
    category: 'Kỹ thuật',
    icon: '⚙️',
    items: [
      'Triển khai TLS 1.3 cho toàn bộ endpoint thanh toán',
      'Bắt buộc 2FA cho tất cả giao dịch > 1 triệu đồng',
      'Xây dựng hệ thống monitoring real-time với alert tự động',
      'Áp dụng rate limiting và CAPTCHA để chống brute-force',
      'Sử dụng tokenization thay vì lưu số tài khoản gốc',
    ],
  },
  {
    category: 'Quản lý',
    icon: '📋',
    items: [
      'Đào tạo người dùng nhận diện phishing và social engineering',
      'Thiết lập quy trình xử lý tranh chấp giao dịch rõ ràng',
      'Kiểm tra penetration test định kỳ 6 tháng/lần',
      'Tuân thủ PCI DSS cho các hệ thống xử lý thẻ',
      'Duy trì audit log tối thiểu 12 tháng theo PCI DSS',
    ],
  },
  {
    category: 'Người dùng',
    icon: '👤',
    items: [
      'Không chia sẻ OTP với bất kỳ ai, kể cả nhân viên ngân hàng',
      'Bật thông báo giao dịch real-time qua SMS/email',
      'Kiểm tra URL ngân hàng — chỉ dùng domain chính thức',
      'Đặt hạn mức chuyển tiền phù hợp với nhu cầu thực tế',
    ],
  },
];
