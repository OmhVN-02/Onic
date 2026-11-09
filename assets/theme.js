'use strict';
(() => {
  const root = document.documentElement;
  const button = document.getElementById('theme');
  const key = 'solarshop-theme';
  function apply(theme) {
    root.dataset.theme = theme;
    button.setAttribute('aria-pressed', String(theme === 'light'));
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#fafbf8' : '#101311');
  }
  let saved;
  try { saved = localStorage.getItem(key); } catch {  }
  apply(saved === 'light' ? 'light' : 'dark');
  button.addEventListener('click', () => {
    const theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    apply(theme);
    try { localStorage.setItem(key, theme); } catch {  }
  });
})();
