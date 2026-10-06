# Trung tâm Đào tạo Báo Tuổi Trẻ

Website tĩnh làm trang trung gian cho QR trong brochure. HTML5, CSS3 và JavaScript thuần; không backend, database, CDN JavaScript, font bên ngoài hay thư viện. Trang chủ, 4 trang chương trình và trang 404 đã được tạo sẵn ở thư mục gốc, có thể đưa trực tiếp lên GitHub Pages.

## Xem website trên máy

Có Node.js 18 trở lên:

```sh
node scripts/serve.mjs
```

Mở **http://127.0.0.1:4173/**. Không cần `npm install`. Dừng bằng `Ctrl+C`.

Hoặc dùng Python:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Mở **http://127.0.0.1:4173/**. Có thể mở `index.html` trực tiếp để xem nhanh; dùng máy chủ local để kiểm tra đúng các URL thư mục.

Kiểm tra giống GitHub Pages dưới subpath:

```sh
node scripts/serve.mjs --base=/tuoitre-training/
```

Mở **http://127.0.0.1:4173/tuoitre-training/**, sau đó truy cập trực tiếp từng trang chương trình. Mọi liên kết và asset của 5 trang đều tương đối (`./assets/...`, `../assets/...`), không phụ thuộc tên repository.

## Cập nhật nội dung và cấu hình URL

Sửa **`assets/js/data.js`**. Mỗi chương trình có `slug`, tiêu đề, mô tả, ảnh đại diện và mảng `articles`. Mỗi bài có `title`, `url`, `thumbnail`. Nhãn VIDEO được xác định từ `/video/` trong URL.

Sau khi sửa, xuất lại các trang:

```sh
node scripts/build.mjs
node scripts/check.mjs
```

`build.mjs` dùng một bộ template chung để tạo đầy đủ HTML cho từng trang. Nội dung, điều hướng và metadata có sẵn ngay trong HTML, kể cả khi tắt JavaScript. Không cần chạy build trên GitHub: hãy push cả các tệp HTML đã xuất. `check.mjs` kiểm tra các trang, đủ 61 mục nội dung, nhãn video, link tab mới và các đường dẫn nội bộ/ảnh dưới subpath; không gọi mạng. Các trường tùy chọn `topicsHeading` và `topics` chứa nội dung trọng tâm, hiển thị trong phần mô tả chương trình.

Danh sách hiện tại gồm:

| Chương trình | Số mục | Bài viết | Video |
| --- | ---: | ---: | ---: |
| Đối tượng đào tạo sinh viên các trường đại học, cao đẳng | 37 | 36 | 1 |
| Làm báo cùng Tuổi Trẻ | 13 | 8 | 5 |
| Truyền thông trong tuyển sinh và xây dựng thương hiệu | 6 | 5 | 1 |
| Nâng cao năng lực truyền thông trong thời đại AI | 5 | 4 | 1 |

Tổng cộng **61 mục**, tương ứng **59 URL khác nhau**. Nhóm sinh viên giữ nguyên hai cặp URL trùng theo danh sách nguồn: mục **2 và 3** (Nguyễn Tất Thành), mục **5 và 33** (Hoa Sen). Không tự loại trùng hoặc đổi thứ tự.

`site.url` (có dấu `/` cuối) và `site.repository` đã được cấu hình cho tài khoản GitHub **`kimanaru-1010`**:

```js
url: 'https://kimanaru-1010.github.io/tuoitre-training/',
repository: 'tuoitre-training',
```

Rồi chạy `node scripts/build.mjs` và `node scripts/check.mjs` trước khi push. Build sẽ xuất canonical, `og:url`, URL ảnh chia sẻ tuyệt đối, `sitemap.xml` và đường dẫn phục hồi của 404 theo URL chính thức. Có thể dùng biến môi trường `SITE_URL` thay cho `site.url` khi build.

Khi `site.url` còn trống, nội dung và điều hướng vẫn hoạt động ngay trên GitHub Pages. Canonical và `og:url` được bỏ qua để tránh hostname giả; `og:image` tạm dùng đường dẫn tương đối. Cần cấu hình URL thật để hoàn thiện SEO và chia sẻ trước khi phát hành brochure. Trang 404 tự xác định repository trên miền `*.github.io`; với custom domain hoặc cách đặt subpath khác, hãy cấu hình `site.url` và xuất lại trang để 404 hoạt động đầy đủ cả khi tắt JavaScript.

## Ảnh và nhận diện

- Cả 61 mục đều có ảnh thật từ metadata Open Graph của đúng bài viết/video Tuổi Trẻ Online, lưu thành 59 thumbnail JPEG trong `assets/images/`. 18 ảnh đã có được giữ nguyên; 41 ảnh mới đã được tải và tối ưu. Các mục URL trùng dùng cùng ảnh bài nguồn. Website không fetch metadata khi người đọc truy cập; không có CORS hay backend lấy ảnh.
- Tiêu đề lấy từ metadata bài viết/video trên Tuổi Trẻ Online lúc biên soạn; 61 mục giữ nguyên URL và thứ tự người dùng cung cấp. Ảnh dùng cho card dẫn tới bài nguồn; nguồn bài viết/video hiển thị ở footer.
- `site.heroImage` và `program.image` chọn ảnh đã có trong dự án. Có thể thay bằng ảnh được Trung tâm cung cấp.
- `assets/images/social-preview.png` là ảnh chia sẻ tạm 1200 × 630 bằng chữ và màu thương hiệu. Thay file này hoặc `site.socialImage` khi có ảnh chính thức. Đây là mẫu nhận diện chữ, chưa phải bộ logo chính thức.
- Ảnh thiếu khi build được thay bằng `assets/images/placeholders/editorial.svg`. Khi ảnh lỗi lúc đọc, JavaScript hiển thị placeholder tại chỗ, giữ nguyên card và đường dẫn.
- Favicon SVG chữ T được nhúng trong HTML. Màu sắc, khoảng cách và typography chỉnh trong `assets/css/style.css`.

Tùy chọn lấy lại thumbnail khi biên soạn (cần Python 3.9+, Node.js và mạng; không cần cho việc xem/deploy):

```sh
python scripts/fetch-thumbnails.py
```

Script bỏ qua placeholder dùng chung và chỉ tải mỗi cặp URL/file ảnh một lần. Muốn bổ sung ảnh thật cho bài mới, trước tiên đặt `thumbnail` thành một đường dẫn riêng trong `assets/images/` (ví dụ `assets/images/sinh-vien-06.jpg`), rồi chạy script và build lại.

Nếu một ảnh bị hết thời gian chờ: `python scripts/fetch-thumbnails.py --retry`. Trên Windows, nén ảnh và tạo lại ảnh chia sẻ tạm bằng `powershell -ExecutionPolicy Bypass -File scripts/prepare-images.ps1`. Trên hệ điều hành khác, có thể cài Pillow để script Python tự nén các thumbnail hoặc tối ưu ảnh thủ công. Sau đó chạy build.

## Deploy GitHub Pages

1. Repository đích: **[kimanaru-1010/tuoitre-training](https://github.com/kimanaru-1010/tuoitre-training)**, công khai.
2. Push **nội dung thư mục dự án này vào thư mục gốc repository**, bao gồm `index.html`, 4 thư mục chương trình, `assets/`, `404.html` và `.nojekyll`. Không tạo thêm lớp thư mục `tuoitre-training/` bên trong repository.
3. Vào **Settings → Pages**.
4. **Source: Deploy from a branch**.
5. **Branch: `main`**, **Folder: `/ (root)`**, chọn **Save**.
6. Chờ GitHub hoàn tất, mở **https://kimanaru-1010.github.io/tuoitre-training/** và 4 URL bên dưới. `.nojekyll` giúp GitHub phục vụ trực tiếp các tệp tĩnh; không cần workflow hay GitHub Actions tự tạo.

Để cập nhật website, chạy build và check, commit các tệp đã sửa rồi push lên nhánh `main`. GitHub Pages tự triển khai phiên bản mới. Nếu đổi tên repository, thay URL cấu hình và các URL QR bên dưới; 5 trang chính vẫn dùng đường dẫn tương đối.

## 4 URL dùng để tạo QR

Các đường dẫn chính thức dùng tài khoản **`kimanaru-1010`** và repository **`tuoitre-training`**. Chỉ tạo và in QR sau khi 4 URL đã hoạt động:

```text
Đối tượng đào tạo sinh viên các trường đại học, cao đẳng:
https://kimanaru-1010.github.io/tuoitre-training/sinh-vien/

Làm báo cùng Tuổi Trẻ:
https://kimanaru-1010.github.io/tuoitre-training/lam-bao-cung-tuoi-tre/

Truyền thông trong tuyển sinh và xây dựng thương hiệu:
https://kimanaru-1010.github.io/tuoitre-training/truyen-thong-tuyen-sinh/

Nâng cao năng lực truyền thông trong thời đại AI:
https://kimanaru-1010.github.io/tuoitre-training/truyen-thong-ai/
```

## Cấu trúc

```text
.
├── index.html
├── sinh-vien/index.html
├── lam-bao-cung-tuoi-tre/index.html
├── truyen-thong-tuyen-sinh/index.html
├── truyen-thong-ai/index.html
├── assets/
│   ├── css/style.css
│   ├── js/data.js
│   ├── js/main.js
│   └── images/  (thumbnail, ảnh chia sẻ, placeholders/editorial.svg)
├── scripts/
│   ├── build.mjs
│   ├── check.mjs
│   ├── serve.mjs
│   ├── fetch-thumbnails.py
│   └── prepare-images.ps1
├── 404.html
├── sitemap.xml
├── .nojekyll
├── package.json
└── README.md
```

Menu sticky và hamburger hỗ trợ bàn phím, `Escape`, `aria-expanded`, `aria-current`; có skip link, breadcrumb, quay lại trang chủ, nút về đầu trang và tôn trọng giảm chuyển động. Các liên kết bài viết/video mở tab mới với `rel="noopener noreferrer"`. Toàn bộ nội dung và link vẫn dùng được khi tắt JavaScript.
