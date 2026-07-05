# Kê giờ giáo viên

Web app tĩnh để lập bảng kê giờ theo tháng cho giáo viên Trường THCS Tây Phú.

## Chức năng

- Chọn tháng/năm và tự hiển thị các tuần tương ứng theo khung 35 tuần năm học 2025-2026.
- Đánh dấu từng tuần: Kê giờ, Không kê giờ, Nghỉ theo khung năm học.
- Nhập số tiết thường xuyên, tiết đột xuất, tiết giảm định mức.
- Tự tính tổng tiết thực dạy, định mức còn lại, số tiết thừa/thiếu và bằng chữ.
- Lưu dữ liệu trên trình duyệt bằng `localStorage`.
- In/xuất PDF bằng chức năng in của trình duyệt.
- Xuất bảng Excel-compatible `.xls`.

## Deploy Vercel

Đây là static app. Vercel deploy trực tiếp từ thư mục `public/`, không cần biến môi trường.

Thiết lập Vercel:

- Framework Preset: `Other`
- Build Command: để trống hoặc `npm run build`
- Output Directory: để trống nếu dùng `vercel.json`; app được route tĩnh từ `public/`

## Ghi chú an toàn dữ liệu

File Excel mẫu ban đầu không được commit vào repo vì có sheet ẩn legacy đáng ngờ. App sử dụng dữ liệu khung tuần đã trích sạch trong `app.js`.
