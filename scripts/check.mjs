// Kiểm tra offline: các trang đã xuất, asset và điều hướng dưới subpath Pages.
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { programs, site } from '../assets/js/data.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const origin = 'https://local.test/tuoitre-training/';
const routes = ['', ...programs.map((p) => p.slug + '/'), '404.html'];
let references = 0;
let articleCount = 0;
for (const route of routes) {
  const filename = route.endsWith('.html') ? route : route + 'index.html';
  const source = await readFile(path.join(root, filename), 'utf8');
  assert.match(source, /<html lang="vi">/, `${filename}: thiếu ngôn ngữ`);
  assert.match(source, /<title>[^<]+<\/title>/, `${filename}: thiếu title`);
  for (const meta of ['description', 'og:title', 'og:description', 'og:image']) {
    assert.ok(source.includes(`="${meta}" content="`), `${filename}: thiếu ${meta}`);
  }
  assert.equal((source.match(/<h1\b/g) || []).length, 1, `${filename}: cần đúng 1 h1`);
  assert.match(source, /<main id="noi-dung"/, `${filename}: thiếu main`);
  assert.match(source, /<footer\b/, `${filename}: thiếu footer`);
  const pageUrl = new URL(route, origin);
  for (const match of source.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const ref = match[1].replaceAll('&amp;', '&');
    if (/^(?:https?:|data:|tel:|mailto:)/.test(ref)) continue;
    assert.ok(!ref.startsWith('/'), `${filename}: đường dẫn root không tương thích repo: ${ref}`);
    if (ref.startsWith('#')) {
      assert.ok(source.includes(`id="${ref.slice(1)}"`), `${filename}: anchor không tồn tại: ${ref}`);
      continue;
    }
    const url = new URL(ref, pageUrl);
    assert.ok(url.pathname.startsWith('/tuoitre-training/'), `${filename}: link thoát khỏi repo: ${ref}`);
    let local = decodeURIComponent(url.pathname.slice('/tuoitre-training/'.length));
    if (local.endsWith('/') || !local) local += 'index.html';
    assert.ok((await stat(path.join(root, local))).isFile(), `${filename}: không tìm thấy ${ref}`);
    references++;
  }
  for (const match of source.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
    assert.match(match[0], /rel="noopener noreferrer"/, `${filename}: link tab mới thiếu rel`);
  }
  const program = programs.find((p) => route === p.slug + '/');
  if (program) {
    assert.equal((source.match(/class="article-card"/g) || []).length, program.articles.length);
    for (const article of program.articles) {
      assert.ok(source.includes(article.url), `${filename}: thiếu ${article.url}`);
      assert.equal(new URL(article.url).hostname, 'tuoitre.vn');
      assert.ok(article.title.length > 0);
    }
    articleCount += program.articles.length;
    const videoCount = program.articles.filter((a) => a.url.includes('/video/')).length;
    assert.equal((source.match(/class="media-badge video-badge"/g) || []).length, videoCount);
    assert.ok(source.includes('Chọn bài viết hoặc video bạn muốn xem.'));
  }
}
assert.equal(articleCount, programs.reduce((total, p) => total + p.articles.length, 0), 'Thiếu nội dung đã khai báo');
assert.ok((await stat(path.join(root, site.socialImage))).isFile(), 'Thiếu ảnh Open Graph');
console.log(`PASS: ${routes.length} trang, ${articleCount} nội dung, ${references} đường dẫn nội bộ/asset dưới /tuoitre-training/.`);
