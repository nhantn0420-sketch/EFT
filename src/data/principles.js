export const principles = [
  {
    step: 0,
    title: 'Initiate — Khởi tạo giao dịch',
    color: 'blue',
    content:
      'Người dùng tạo lệnh chuyển tiền bằng cách cung cấp tài khoản gửi, tài khoản nhận và số tiền. Hệ thống ghi nhận thông tin và tạo một transaction object với ID duy nhất, timestamp, và trạng thái PENDING.',
    technical: 'Transaction ID được sinh theo UUID v4. Mọi dữ liệu đầu vào đều được sanitize trước khi xử lý tiếp theo.',
    keyPoint: 'EFT số hóa toàn bộ lệnh chuyển — không cần chứng từ giấy như giao dịch truyền thống.',
  },
  {
    step: 1,
    title: 'Validate — Kiểm tra hợp lệ',
    color: 'yellow',
    content:
      'Hệ thống kiểm tra tính hợp lệ của giao dịch: tài khoản nhận có tồn tại trong hệ thống không, số tiền có lớn hơn 0 không, và tài khoản gửi có đủ số dư không.',
    technical: 'Validation thực hiện theo thứ tự: format check → account existence → balance check. Fail sớm ở bất kỳ bước nào sẽ dừng toàn bộ luồng.',
    keyPoint: 'Validate trước authenticate giúp tiết kiệm tài nguyên — giao dịch sai sẽ bị từ chối sớm mà không cần xác thực.',
  },
  {
    step: 2,
    title: 'Authenticate — Xác thực danh tính',
    color: 'purple',
    content:
      'OTP (One-Time Password) được gửi đến thiết bị đăng ký của người dùng. Người dùng phải nhập đúng OTP trong thời hạn hiệu lực. Đây là lớp 2FA (Two-Factor Authentication) bảo vệ khỏi unauthorized transfer.',
    technical: 'OTP thường có TTL 60–120 giây, dùng thuật toán TOTP (RFC 6238). Hệ thống so sánh hash, không so sánh plaintext.',
    keyPoint: 'Authentication là rào cản quan trọng nhất ngăn gian lận — ngay cả khi thông tin tài khoản bị lộ, giao dịch vẫn không thể thực hiện nếu thiếu OTP.',
  },
  {
    step: 3,
    title: 'Risk Check — Phân tích rủi ro',
    color: 'orange',
    content:
      'Risk engine phân tích giao dịch theo nhiều chiều: số tiền có vượt ngưỡng cảnh báo không, tài khoản nhận có trong danh sách đen không, có pattern giao dịch bất thường (lặp nhanh, giờ lạ) không.',
    technical: 'Các rule được đánh điểm risk score. Vượt ngưỡng → HOLD và yêu cầu manual review. Pattern lặp → cảnh báo AML (Anti-Money Laundering).',
    keyPoint: 'Risk Check bảo vệ cả người dùng lẫn hệ thống — phát hiện fraud, rửa tiền và các giao dịch bất thường trước khi tiền được chuyển.',
  },
  {
    step: 4,
    title: 'Settle — Thanh toán bù trừ',
    color: 'green',
    content:
      'Sau khi vượt qua tất cả các kiểm tra, hệ thống thực hiện debit tài khoản gửi và credit tài khoản nhận. Trong thực tế, quá trình này đi qua clearing house (ACH, SWIFT hoặc Napas tại Việt Nam).',
    technical: 'Settlement có thể là real-time (RTGS) hoặc deferred (batch). Atomic transaction đảm bảo không có tình trạng tiền bị trừ mà không được nhận.',
    keyPoint: 'Clearing house đóng vai trò trung gian tin cậy — đảm bảo cả hai phía ngân hàng đều nhận được thông báo và cập nhật số dư chính xác.',
  },
  {
    step: 5,
    title: 'Log & Audit — Ghi nhật ký',
    color: 'teal',
    content:
      'Mọi giao dịch đều được ghi lại đầy đủ: thời gian, tài khoản, số tiền, trạng thái, lý do từ chối (nếu có), IP nguồn và device fingerprint. Log không thể sửa xóa sau khi tạo.',
    technical: 'Audit log thường được lưu trên append-only storage. Tuân thủ PCI DSS yêu cầu lưu log tối thiểu 1 năm, với 3 tháng online.',
    keyPoint: 'Audit trail là nền tảng của traceability — khi xảy ra tranh chấp, log là bằng chứng pháp lý xác định ai làm gì, lúc nào và từ đâu.',
  },
];
