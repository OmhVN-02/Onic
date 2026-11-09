# Onic Wiki

Wiki nhiều plugin Minecraft: **SolarShop 2.0-C05-NoKey**, **SolarShards** và **SolarTPA 1.1**.

Đây chỉ là website công khai. Không chứa mã nguồn plugin, JAR phát hành hoặc dữ liệu server.

## Chạy cục bộ

Yêu cầu Node.js 18+ để chạy công cụ preview/kiểm tra (website không cần Node trên hosting).

```sh
node scripts/generate-data.mjs
node scripts/check.mjs
node scripts/preview.mjs
```

Mở địa chỉ in trong terminal. Không cần cài dependency hoặc build.

## GitHub Pages

Workflow `.github/workflows/pages.yml` kiểm tra và deploy các file website. Trong Settings → Pages, chọn **GitHub Actions** làm Source. Đường dẫn dự kiến khi Pages được bật: https://omhvn-02.github.io/Onic/

Workflow chạy khi push `main` hoặc được chạy thủ công. Thư mục upload chỉ gồm index.html, assets và .nojekyll, không phải toàn bộ repository.

## Sửa tài liệu

- Nội dung: `assets/docs.js`, mỗi bài có ID ổn định, nhóm, tiêu đề và HTML.
- Chuyên mục plugin, trang chủ và bảng key: `assets/wiki.js`.
- YAML mặc định của các plugin nằm trong `assets/examples/`. `assets/config-data.js` được tạo từ đó khi build, không lưu bản trùng trong Git.
- Hướng dẫn SolarTPA và ảnh SolarShop: `assets/products.js`.
- Khi thêm plugin, tạo mục trong `ONIC_PLUGINS`, thêm option của bộ chọn và các bài có trường `product`. Bài chưa hoàn thành phải ghi rõ phạm vi.
- Giao diện: `assets/style.css`.
- Tìm kiếm, routing và copy: `assets/app.js`.
- Khung trang: `index.html`.

Các mẫu YAML là ví dụ công khai. Không chép cấu hình chứa mật khẩu thật lên repository. Tài liệu phản ánh bản C05 tại thời điểm 09/11/2026; kiểm tra lại mã nguồn khi nâng bản.

## Thiết kế & truy cập

Giao diện sáng/tối, menu điện thoại, tìm kiếm không dấu, mục lục bài, nút copy và chế độ in. Routing dùng hash nên không cần server rewrite khi mở link sâu trên GitHub Pages. Nội dung vẫn cần JavaScript; font tải từ Google Fonts nhưng có font hệ thống dự phòng.

## Kiểm tra

`scripts/check.mjs` kiểm tra cú pháp JS, ID trùng, link nội bộ và các asset được tham chiếu. Browser QA và kiểm tra nội dung API là các bước riêng; không được thay thế bằng kiểm tra tĩnh.
