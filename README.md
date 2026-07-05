# Kê giờ giáo viên

Web app tĩnh để lập bảng kê giờ theo tháng cho giáo viên Trường THCS Tây Phú.

## Chức năng

- Chọn tháng/năm và tự hiển thị các tuần tương ứng theo khung 35 tuần năm học 2025-2026.
- Đánh dấu từng tuần: Kê giờ, Không kê giờ, Nghỉ theo khung năm học.
- Nhập số tiết thường xuyên, tiết đột xuất, tiết giảm định mức.
- Tự tính tổng tiết thực dạy, định mức còn lại, số tiết thừa/thiếu và bằng chữ.
- Lưu dữ liệu trên trình duyệt bằng `localStorage`.
- Đồng bộ tổng hợp theo tháng lên Google Sheet qua Google Apps Script Web App.
- In/xuất PDF bằng chức năng in của trình duyệt.
- Xuất bảng Excel `.xlsx`.

## Deploy Vercel

Đây là static app. Vercel deploy trực tiếp từ thư mục `public/`, không cần biến môi trường.

Thiết lập Vercel:

- Framework Preset: `Other`
- Build Command: `npm run build`
- Output Directory: `dist`

Production deploy should be rebuilt after changing Vercel project settings so the latest Framework Preset is applied.

## Tổng hợp Google Sheet

App tĩnh trên Vercel không lưu khóa Google API. Để tổng hợp cho hiệu trưởng:

1. Tạo một Google Sheet mới.
2. Vào `Extensions` -> `Apps Script`.
3. Dán toàn bộ nội dung file `google-apps-script.gs` trong repo này vào Apps Script.
4. Bấm `Deploy` -> `New deployment` -> chọn loại `Web app`.
5. `Execute as`: tài khoản của bạn. `Who has access`: Anyone with the link.
6. Copy Web App URL và dán vào ô `Apps Script Web App URL` trong app.

Khi giáo viên bấm `Lưu bảng kê`, sheet `Tong hop ke gio` sẽ có mỗi giáo viên một dòng. Từ tháng 9 đến tháng 5, mỗi tháng có 3 cột: tổng số tiết dạy, thừa, thiếu.

## Ghi chú an toàn dữ liệu

File Excel mẫu ban đầu không được commit vào repo vì có sheet ẩn legacy đáng ngờ. App sử dụng dữ liệu khung tuần đã trích sạch trong `app.js`.
