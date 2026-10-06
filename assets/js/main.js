/* Chỉ tăng cường tương tác. Toàn bộ nội dung và liên kết có sẵn trong HTML. */
(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#main-menu');
  const topButton = document.querySelector('.back-to-top');
  const mobileQuery = window.matchMedia('(max-width: 899px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function setMenu(open, returnFocus = false) {
    if (!toggle || !header || !menu) return;
    header.classList.toggle('menu-is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
    // inert ngăn Tab đi vào menu đang ẩn trên điện thoại.
    menu.inert = mobileQuery.matches && !open;
    if (returnFocus) toggle.focus();
  }

  if (header && toggle && menu) {
    document.documentElement.classList.add('js');
    setMenu(false);
    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', (event) => {
      if (event.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setMenu(false, true);
    });
    document.addEventListener('click', (event) => {
      if (!header.contains(event.target)) setMenu(false);
    });
    header.addEventListener('focusout', () => {
      window.requestAnimationFrame(() => {
        if (!header.contains(document.activeElement)) setMenu(false);
      });
    });
    mobileQuery.addEventListener('change', () => setMenu(false));
  }

  if (topButton) {
    let scheduled = false;
    function updateScroll() {
      topButton.hidden = window.scrollY < 480;
      header?.classList.toggle('has-scrolled', window.scrollY > 12);
      scheduled = false;
    }
    window.addEventListener('scroll', () => {
      if (!scheduled) {
        window.requestAnimationFrame(updateScroll);
        scheduled = true;
      }
    }, { passive: true });
    topButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
      const main = document.querySelector('main');
      if (main) {
        main.setAttribute('tabindex', '-1');
        main.focus({ preventScroll: true });
      }
    });
    updateScroll();
  }

  // Placeholder tại chỗ, không phụ thuộc dịch vụ ảnh bên ngoài.
  document.querySelectorAll('.photo img').forEach((img) => {
    const showFallback = () => { img.hidden = true; img.parentElement.classList.add('photo-unavailable'); };
    img.addEventListener('error', showFallback, { once: true });
    if (img.complete && img.naturalWidth === 0) showFallback();
  });

  // GitHub Pages dùng cùng 404.html cho cả URL lồng sâu.
  // Tìm đường dẫn repo từ URL của script, không giả định tên repository.
  if (document.body.classList.contains('is-not-found')) {
    const script = [...document.scripts].find((item) => item.src.includes('/assets/js/main.js'));
    if (script) {
      const homeUrl = new URL('../../', script.src);
      document.querySelectorAll('a').forEach((link) => {
        const raw = link.getAttribute('href');
        if (raw && !/^(?:https?:|tel:|mailto:|#)/i.test(raw)) {
          link.href = new URL(raw.replace(/^\.\//, ''), homeUrl).href;
        }
      });
    }
  }
})();
