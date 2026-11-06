# Website Thiệp Cưới Online & Công Cụ Tạo QR Mời Cưới

Website thiệp mời cưới song ngữ hiện đại được thiết kế với 2 phân hệ hoàn chỉnh:

1. **Trang Thiệp Mời Cho Khách (Guest Invitation)**: Trải nghiệm xem thiệp cá nhân hóa theo từng khách mời, phong bì mở thiệp với hiệu ứng pháo hoa, câu chuyện tình yêu, thông tin hai họ, lịch trình sự kiện kèm Google Maps, album ảnh, hộp mừng cưới QR và sổ lưu bút xác nhận tham dự (RSVP).
2. **Trang Tạo Link & QR Code (Admin / Couple Tool)**: Nhập tên khách, mối quan hệ để tự động sinh link có query params `?to=...&role=...`, kèm mã QR và **tấm thiệp mời được thiết kế sang trọng như thiệp cưới thật**, hỗ trợ tải ảnh PNG chất lượng cao để gửi trực tiếp qua Zalo / Messenger.

---

## 🚀 Hướng Dẫn Chạy Dự Án

### 1. Cài đặt thư viện:

```bash
npm install
```

### 2. Khởi chạy môi trường phát triển (Dev Server):

```bash
npm run dev
```


- **Trang thiệp mời (Dành cho khách)**: `http://localhost:5177/` _(Đã ẩn hoàn toàn các nút quản trị / tạo link, khách chỉ thấy nội dung thiệp mời)_
- **Trang tạo Link & QR Thiệp Mời (Đường dẫn riêng cho Dâu Rể)**: `http://localhost:5177/admin` hoặc `http://localhost:5177/#admin` hoặc `http://localhost:5177/tao-thiep`

### 3. Đóng gói cho GitHub Pages:

```bash
npm run build
```
Thư mục `dist` được tối ưu đường dẫn tương đối `./assets/`, sẵn sàng đưa lên GitHub Pages `https://namtv95it.github.io/`.

---

## ✨ Các Tính Năng Nổi Bật

### 1. Trang Hiển Thị Thiệp Cưới (Guest View)

- **Hiệu Ứng Phong Bì**: Phong bì mở ra kèm pháo hoa giấy (confetti) khi khách truy cập.
- **Cá Nhân Hóa Đích Danh**: Đọc query params `?to=Tên&role=QuanHệ` từ URL để hiển thị lời mời trân trọng.
- **Nhạc Nền Lãng Mạn**: Đĩa than vinly xoay tròn góc màn hình, tự động phát sau tương tác đầu tiên, có nút bật/tắt tiện lợi.
- **Đếm Ngược Thời Gian**: Bộ đếm Ngày, Giờ, Phút, Giây tới thời khắc hôn lễ.
- **Cô Dâu, Chú Rể & Hai Họ**: Hình ảnh, lời giới thiệu và thông tin bố mẹ hai bên gia đình.
- **Lịch Trình Sự Kiện**: Lễ Vu Quy, Lễ Thành Hôn, Tiệc Cưới kèm liên kết Google Maps chỉ đường.
- **Album Ảnh Cưới**: Bộ sưu tập ảnh kỷ niệm lộng lẫy, click để xem phóng to.
- **Hộp Mừng Cưới & QR Bank**: Thông tin chuyển khoản cho khách ở xa kèm nút sao chép STK 1 chạm.
- **Sổ Lưu Bút & RSVP**: Khách xác nhận tham dự và để lại lời chúc mừng hạnh phúc.

### 2. Trang Tạo Link & Thiệp QR (Generator Tool)

- **Nhập Tên & Quan Hệ**: Có sẵn các mẫu quan hệ thông dụng (Bạn Chú Rể, Bạn Cô Dâu, Đồng Nghiệp, Họ Hàng...) hoặc nhập tùy ý.
- **Tự Động Sinh Link**: Đường dẫn chuẩn UTF-8 mã hóa sẵn, có nút sao chép nhanh và xem thử.
- **Tấm Thiệp Mời Kèm QR Sang Trọng**: Thiết kế theo phong cách Gold Luxury & hoa văn nghệ thuật, tích hợp mã QR ở trung tâm.
- **Tải Ảnh Thiệp Mời (PNG)**: Xuất file ảnh độ phân giải cao 2.5x để dâu rể tải về gửi ngay qua Zalo, Messenger, Facebook.
- **Lưu Trữ Lịch Sử Khách**: Tự động lưu danh sách khách đã tạo vào LocalStorage để dễ quản lý.

---

## 🛠️ Tùy Chỉnh Thông Tin Đám Cưới

Tất cả thông tin (tên dâu rể, ngày cưới, địa điểm, ảnh, nhạc nền, STK ngân hàng) được lưu tập trung tại:
👉 `src/data/weddingData.js`
