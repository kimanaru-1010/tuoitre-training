import { mkdir, writeFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { site, programs } from '../assets/js/data.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const escape = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const totalArticles = programs.reduce((count, program) => count + program.articles.length, 0);
const number = (index) => String(index + 1).padStart(2, '0');
const configuredUrl = process.env.SITE_URL || site.url;
let baseUrl = '';
if (configuredUrl) {
  const parsed = new URL(configuredUrl);
  if (!['https:', 'http:'].includes(parsed.protocol) || parsed.search || parsed.hash || parsed.username || parsed.password) {
    throw new Error('SITE_URL phải là URL http(s) của website, không chứa query, hash hoặc thông tin đăng nhập.');
  }
  baseUrl = parsed.href.replace(/\/?$/, '/');
}
const absolute = (relative) => baseUrl ? new URL(relative, baseUrl).href : '';
const exists = async (filename) => { try { await access(path.join(root, filename)); return true; } catch { return false; } };
const availableImages = new Set();
for (const image of [site.heroImage, site.socialImage, ...programs.flatMap((p) => [p.image, ...p.articles.map((a) => a.thumbnail)])]) {
  if (image && await exists(image)) availableImages.add(image);
}
const imagePath = (image) => availableImages.has(image) ? image : 'assets/images/placeholders/editorial.svg';
const menuIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
const closeIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>';
const phoneIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3H5a2 2 0 0 0-2 2c0 9 7 16 16 16a2 2 0 0 0 2-2v-3l-5-2-2 2a12 12 0 0 1-6-6l2-2Z"/></svg>';
const qrIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h3v3h3v3h-6zM12 3v3M12 9v3h9M3 12h6M12 15v6"/></svg>';
const playIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 9 6-9 6Z"/></svg>';
const topIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 14 6-6 6 6"/></svg>';
const faviconData = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 64 64%22%3E%3Crect width=%2264%22 height=%2264%22 rx=%2210%22 fill=%22%23d71920%22/%3E%3Cpath d=%22M10 16h44v10H37v25H27V26H10z%22 fill=%22white%22/%3E%3C/svg%3E';

function header(prefix, active) {
  const nav = [{ slug: '', nav: 'Trang chủ' }, ...programs];
  return `<a class="skip-link" href="#noi-dung">Đến nội dung chính</a>
  <header class="site-header">
    <div class="container masthead">
      <a class="brand" href="${prefix}" aria-label="Tuổi Trẻ — Trung tâm Đào tạo, trang chủ">
        <span class="brand-wordmark">TUỔI TRẺ<span class="brand-rule"></span></span>
        <span class="brand-unit">TRUNG TÂM<br>ĐÀO TẠO</span>
      </a>
      <span class="masthead-note">Báo chí. Truyền thông. Công nghệ.</span>
      <a class="header-contact" href="tel:${site.phone}">${phoneIcon}<span>${site.phone}</span></a>
      <button class="menu-toggle" type="button" aria-label="Mở menu" aria-expanded="false" aria-controls="main-menu"><span class="menu-open-icon">${menuIcon}</span><span class="menu-close-icon">${closeIcon}</span></button>
    </div>
    <nav id="main-menu" class="main-nav" aria-label="Điều hướng chính"><div class="container nav-inner">${nav.map((item) => `<a href="${prefix}${item.slug ? item.slug + '/' : ''}"${active === item.slug ? ' aria-current="page"' : ''}>${escape(item.nav)}</a>`).join('')}</div></nav>
  </header>`;
}

function footer(prefix) {
  return `<footer class="site-footer">
    <div class="container footer-main">
      <div class="footer-identity"><a class="footer-wordmark" href="${prefix}" aria-label="Tuổi Trẻ, trang chủ">TUỔI TRẺ</a><p>BÁO ĐIỆN TỬ TUỔI TRẺ<br>TRUNG TÂM ĐÀO TẠO</p></div>
      <div class="footer-address"><span class="footer-label">ĐỊA CHỈ</span><address>${escape(site.address)}</address></div>
      <div class="footer-contact"><span class="footer-label">KẾT NỐI VỚI CHÚNG TÔI</span><a class="footer-phone" href="tel:${site.phone}">${site.phone}</a><a class="footer-website" href="${site.website}" target="_blank" rel="noopener noreferrer">Website Trung tâm Đào tạo<span class="visually-hidden"> (mở tab mới)</span></a></div>
    </div>
    <div class="container footer-bottom"><p>Nguồn bài viết và video: <a href="https://tuoitre.vn/" target="_blank" rel="noopener noreferrer">Tuổi Trẻ Online<span class="visually-hidden"> (mở tab mới)</span></a></p><span>Tri thức từ thực tiễn.</span></div>
  </footer>
  <button class="back-to-top" type="button" aria-label="Về đầu trang" hidden>${topIcon}</button>`;
}

function photo(image, alt, prefix, { eager = false, className = '' } = {}) {
  return `<div class="photo ${className}"><span class="image-fallback" aria-hidden="true"><span>TUỔI TRẺ</span><small>TRUNG TÂM ĐÀO TẠO</small></span><img src="${escape(prefix + imagePath(image))}" alt="${escape(alt)}" width="1100" height="750" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></div>`;
}

function programCard(program, index) {
  return `<article class="program-card">
    <a class="program-photo-link" href="${program.slug}/" tabindex="-1" aria-hidden="true">${photo(program.image, '', './')}<span class="program-number">${number(index)}</span></a>
    <div class="program-card-content"><p class="eyebrow">${escape(program.category)}</p><h3><a href="${program.slug}/">${escape(program.homeTitle)}</a></h3><p class="program-summary">${escape(program.summary)}</p><div class="program-card-bottom"><span class="resource-count">${program.articles.length} bài viết & video</span><a class="text-link" href="${program.slug}/" aria-label="Khám phá: ${escape(program.homeTitle)}">Khám phá</a></div></div>
  </article>`;
}

function home() {
  return `<main id="noi-dung" class="container">
    <section class="home-hero" aria-labelledby="hero-title">
      <div class="hero-copy"><p class="eyebrow hero-eyebrow">TRUNG TÂM ĐÀO TẠO BÁO TUỔI TRẺ</p><h1 id="hero-title">Kết nối tri thức<br>báo chí hiện đại <span>&amp; năng lực truyền thông thực chiến</span></h1><p class="hero-description">Học từ thực tiễn tòa soạn. Phát triển kỹ năng báo chí và truyền thông cùng đội ngũ của Báo Tuổi Trẻ.</p><a class="button button-primary" href="#chuong-trinh">Khám phá chương trình</a></div>
      <figure class="hero-figure">${photo(site.heroImage, site.heroAlt, './', { eager: true, className: 'hero-photo' })}<figcaption><span class="caption-label">HỌC TỪ THỰC TIỄN</span><span>Trải nghiệm thật. Kỹ năng thật.</span></figcaption></figure>
    </section>
    <section id="chuong-trinh" class="program-section" aria-labelledby="program-title"><div class="section-heading"><div><p class="eyebrow">KHÁM PHÁ CÙNG TUỔI TRẺ</p><h2 id="program-title">Chương trình đào tạo</h2></div><p class="section-note"><strong>${programs.length} chương trình</strong><span>${totalArticles} bài viết & video</span></p></div><div class="program-grid">${programs.map(programCard).join('\n')}</div></section>
    <aside class="brochure-note">${qrIcon}<div><strong>Từ brochure đến những câu chuyện thực tế</strong><p>Chọn chương trình để xem các bài viết và video trên Tuổi Trẻ Online.</p></div><span class="brochure-source">TUỔI TRẺ ONLINE</span></aside>
  </main>`;
}

function articleCard(article, program, index) {
  const isVideo = article.url.includes('/video/');
  const media = `<div class="article-media">${photo(article.thumbnail, '', '../', { eager: index === 0 })}<span class="media-badge${isVideo ? ' video-badge' : ''}">${isVideo ? playIcon : ''}${isVideo ? 'VIDEO' : 'BÀI VIẾT'}</span>${isVideo ? `<span class="video-play">${playIcon}</span>` : ''}</div>`;
  return `<article class="article-card"><a class="article-photo-link" href="${escape(article.url)}" target="_blank" rel="noopener noreferrer" tabindex="-1" aria-hidden="true">${media}</a><div class="article-card-content"><p class="article-source">TUỔI TRẺ ONLINE <span>${number(index)}</span></p><h3><a href="${escape(article.url)}" target="_blank" rel="noopener noreferrer">${escape(article.title)}<span class="visually-hidden"> (mở tab mới)</span></a></h3><a class="article-button" href="${escape(article.url)}" target="_blank" rel="noopener noreferrer" aria-label="Xem trên Tuổi Trẻ Online: ${escape(article.title)} (mở tab mới)">Xem trên Tuổi Trẻ Online</a></div></article>`;
}

function landing(program, index) {
  return `<main id="noi-dung" class="container landing-main">
    <nav class="breadcrumb" aria-label="Đường dẫn"><ol><li><a href="../">Trang chủ</a></li><li aria-current="page">${escape(program.title)}</li></ol></nav>
    <aside class="qr-note">${qrIcon}<div><strong>Quét QR từ brochure Trung tâm Đào tạo Báo Tuổi Trẻ</strong><p>Chọn bài viết hoặc video bạn muốn xem.</p></div></aside>
    <section class="landing-intro" aria-labelledby="landing-title"><div><p class="eyebrow">CHƯƠNG TRÌNH ${number(index)} <span class="eyebrow-separator">/</span> ${escape(program.category)}</p><h1 id="landing-title">${escape(program.title)}</h1><p class="landing-description">${escape(program.description)}</p>${program.topics?.length ? `<div class="landing-description"><p>${escape(program.topicsHeading)}</p><ul>${program.topics.map((topic) => `<li>${escape(topic)}</li>`).join('')}</ul></div>` : ''}</div><span class="landing-index" aria-hidden="true">${number(index)}</span></section>
    <section class="article-section" aria-labelledby="articles-title"><div class="article-section-heading"><h2 id="articles-title">Câu chuyện từ thực tiễn</h2><span class="resource-count">${program.articles.length} bài viết & video</span></div><div class="article-grid">${program.articles.map((a, i) => articleCard(a, program, i)).join('\n')}</div></section>
    <div class="landing-return"><a class="button button-secondary" href="../">Quay lại trang chủ</a><span>Khám phá các chương trình đào tạo khác của Tuổi Trẻ.</span></div>
  </main>`;
}

function page({ title, description, route = '', prefix = './', active = '', body, notFound = false }) {
  const canonical = absolute(route);
  // Không có hostname thật: giữ og:image tương đối, chờ cấu hình URL cuối.
  const social = absolute(site.socialImage) || prefix + site.socialImage;
  return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#d71920">
  ${notFound && !baseUrl ? `<script>
    // Base cho 404 ở URL lồng sâu; các trang khác luôn dùng asset tương đối.
    (() => {
      const parts = location.pathname.split('/').filter(Boolean);
      const repository = ${JSON.stringify(site.repository)};
      const project = location.hostname.endsWith('.github.io') ? parts[0] : (parts[0] === repository ? repository : '');
      const base = document.createElement('base');
      base.href = new URL(project ? '/' + encodeURIComponent(project) + '/' : '/', location.origin).href;
      document.head.append(base);
    })();
  </script>` : ''}
  <title>${escape(title)}</title>
  <meta name="description" content="${escape(description)}">
  ${notFound ? '<meta name="robots" content="noindex, follow">' : ''}
  ${canonical && !notFound ? `<link rel="canonical" href="${escape(canonical)}">` : '<!-- Điền site.url trong assets/js/data.js rồi chạy node scripts/build.mjs để xuất canonical. -->'}
  <meta property="og:type" content="website">
  <meta property="og:locale" content="vi_VN">
  <meta property="og:site_name" content="${escape(site.name)}">
  <meta property="og:title" content="${escape(title)}">
  <meta property="og:description" content="${escape(description)}">
  ${canonical && !notFound ? `<meta property="og:url" content="${escape(canonical)}">` : ''}
  <meta property="og:image" content="${escape(social)}">
  <meta property="og:image:alt" content="Trung tâm Đào tạo Báo Tuổi Trẻ — Kết nối tri thức báo chí hiện đại">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escape(title)}">
  <meta name="twitter:description" content="${escape(description)}">
  <meta name="twitter:image" content="${escape(social)}">
  <link rel="icon" type="image/svg+xml" href="${faviconData}">
  <link rel="stylesheet" href="${prefix}assets/css/style.css">
  <script src="${prefix}assets/js/main.js" defer></script>
</head>
<body${notFound ? ' class="is-not-found"' : ''}>
${header(prefix, active)}
${body}
${footer(prefix)}
</body>
</html>
`;
}

await writeFile(path.join(root, 'index.html'), page({ title: site.name, description: site.description, body: home() }));
for (const [index, program] of programs.entries()) {
  await mkdir(path.join(root, program.slug), { recursive: true });
  await writeFile(path.join(root, program.slug, 'index.html'), page({ title: `${program.title} | Đào tạo Tuổi Trẻ`, description: program.description, route: program.slug + '/', prefix: '../', active: program.slug, body: landing(program, index) }));
}
const errorHome = baseUrl || './';
await writeFile(path.join(root, '404.html'), page({
  title: 'Không tìm thấy trang | Đào tạo Tuổi Trẻ',
  description: 'Trang bạn tìm không còn tồn tại. Trở lại trang chủ Trung tâm Đào tạo Báo Tuổi Trẻ để chọn chương trình.',
  prefix: baseUrl || './', active: null, notFound: true,
  body: `<main id="noi-dung" class="container not-found"><p class="eyebrow">TRUNG TÂM ĐÀO TẠO BÁO TUỔI TRẺ</p><span class="error-code" aria-hidden="true">404</span><h1>Chưa tìm thấy trang bạn cần</h1><p>Đường dẫn có thể đã thay đổi. Bạn có thể trở lại trang chủ để chọn chương trình đào tạo.</p><a class="button button-primary" href="${escape(errorHome)}">Quay lại trang chủ</a></main>`,
}));
if (baseUrl) {
  await writeFile(path.join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['', ...programs.map((p) => p.slug + '/')].map((route) => `<url><loc>${escape(absolute(route))}</loc></url>`).join('')}</urlset>\n`);
} else {
  // Xóa sitemap cũ nếu URL cấu hình được bỏ đi.
  const { rm } = await import('node:fs/promises');
  await rm(path.join(root, 'sitemap.xml'), { force: true });
}
console.log(`Đã tạo trang chủ, ${programs.length} trang chương trình, 404 và ${totalArticles} nội dung.`);
console.log(baseUrl ? `Canonical: ${baseUrl}` : 'Chưa có URL chính thức: cấu hình site.url trước khi in QR để hoàn thiện canonical, chia sẻ và trang 404.');
