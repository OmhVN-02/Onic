'use strict';
(() => {
  let docs = window.SOLAR_DOCS;
  const $ = id => document.getElementById(id);
  const search = $('search');
  const select = $('plugin-select');
  const language = $('language');
  let lang = new URLSearchParams(location.search).get('lang');
  if (!['vi','en'].includes(lang)) {
    try { lang = localStorage.getItem('onic-language'); } catch { /* Optional preference. */ }
  }
  if (lang !== 'en') lang = 'vi';
  const t = (vi,en) => lang === 'en' ? en : vi;
  function applyLanguage() {
    docs = lang === 'en' ? window.ONIC_ENGLISH : window.SOLAR_DOCS;
    document.documentElement.lang = lang;
    language.value = lang;
    search.placeholder = t('Tìm hướng dẫn…','Search guides…');
    search.setAttribute('aria-label',search.placeholder);
    document.querySelector('.plugin-label').textContent = t('CHUYÊN MỤC PLUGIN','PLUGIN');
    document.querySelector('.wiki-home').textContent = t('← Chọn plugin','← Choose plugin');
    select.options[0].textContent = t('Chọn plugin','Choose plugin');
    select.setAttribute('aria-label', select.options[0].textContent);
    document.querySelector('.toc > div').textContent = t('TRONG TRANG NÀY','ON THIS PAGE');
    document.querySelector('.feedback').textContent = t('Góp ý tài liệu ↗','Send feedback ↗');
    document.querySelector('.skip').textContent = t('Đi đến nội dung','Skip to content');
    document.querySelector('.sidebar-note').textContent = t('Tài liệu sản phẩm','Product documentation');
    $('theme').setAttribute('aria-label',t('Đổi giao diện sáng tối','Toggle light or dark theme'));
    $('menu').setAttribute('aria-label',t('Mở mục lục','Toggle navigation'));
  }
  let currentId = '', sectionObserver, toastTimer;
  const savedTheme = (() => { try { return localStorage.getItem('solarshop-theme'); } catch { return null; } })();
  if (savedTheme === 'light' || savedTheme === 'dark') document.documentElement.dataset.theme = savedTheme;
  function menu(open) {
    $('sidebar').classList.toggle('open', open);
    $('menu').setAttribute('aria-expanded', String(open));
    $('scrim').hidden = !open;
  }
  function navigation(query = '') {
    const normalized = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').toLowerCase();
    const keywords = normalized(query).split(/\s+/).filter(Boolean);
    let group = '', count = 0;
    $('navigation').replaceChildren();
    for (const doc of docs) {
      if (!select.value || doc.product !== select.value) continue;
      // Search decoded visible text, not HTML markup or entity codes.
      const template = document.createElement('template');
      template.innerHTML = doc.html;
      const text = normalized(`${doc.title} ${doc.lead} ${template.content.textContent}`);
      if (!keywords.every(word => text.includes(word))) continue;
      count++;
      if (doc.group !== group) {
        const heading = document.createElement('div'); heading.className = 'nav-group'; heading.textContent = doc.group;
        $('navigation').append(heading); group = doc.group;
      }
      const link = document.createElement('a'); link.className = 'nav-link'; link.href = '#' + doc.id;
      if (currentId === doc.id) { link.classList.add('active'); link.setAttribute('aria-current', 'page'); }
      const icon = document.createElement('span'); icon.className = 'nav-symbol'; icon.textContent = doc.icon; icon.setAttribute('aria-hidden', 'true');
      const label = document.createElement('span'); label.textContent = doc.title;
      link.append(icon, label); $('navigation').append(link);
    }
    if (!count) { const empty = document.createElement('p'); empty.className = 'search-empty'; empty.textContent = select.value ? t('Không có kết quả phù hợp.','No matching guides.') : t('Chọn plugin để xem tài liệu.','Choose a plugin to view its guides.'); $('navigation').append(empty); }
    $('search-status').textContent = query ? count + t(' bài phù hợp',' matching guides') : '';
  }
  function render() {
    let route;
    try { route = decodeURIComponent(location.hash.slice(1)); } catch { route = ''; }
    const [requested, section] = route.split('/');
    const doc = docs.find(d => d.id === requested) || docs[0];
    const samePage = currentId === doc.id;
    currentId = doc.id;
    $('crumb').textContent = doc.title;
    select.value = doc.product === 'wiki' ? '' : doc.product;
    const product = (window.ONIC_PLUGINS || []).find(p => p.id === doc.product);
    $('product-version').textContent = product ? [product.name,product.version].filter(Boolean).join(' · ') : 'PLUGIN KNOWLEDGE BASE';
    document.title = `${doc.title}${product ? ' · ' + product.name : ''} — Onic Wiki`;
    $('article').innerHTML = `<div class="eyebrow">${esc(doc.group)}</div><h1>${esc(doc.subtitle || doc.title)}</h1><p class="lead">${esc(doc.lead)}</p>${doc.html}`;
    const headings = [...$('article').querySelectorAll('h2[id]')];
    $('toc').innerHTML = headings.map(h => `<a href="#${doc.id}/${h.id}">${esc(h.textContent)}</a>`).join('');
    const siblings = docs.filter(d => d.product === doc.product);
    const index = siblings.indexOf(doc), previous = siblings[index - 1], next = siblings[index + 1];
    $('page-navigation').innerHTML = `${previous ? `<a href="#${previous.id}"><small>${t('← TRƯỚC','← PREVIOUS')}</small>${esc(previous.title)}</a>` : '<span></span>'}${next ? `<a href="#${next.id}"><small>${t('TIẾP THEO →','NEXT →')}</small>${esc(next.title)}</a>` : ''}`;
    if (lang === 'en') $('article').querySelectorAll('.copy').forEach(button => { button.textContent = 'Copy ⧉'; button.setAttribute('aria-label','Copy example'); });
    navigation(search.value);
    menu(false);
    if (section && headings.some(h => h.id === section)) document.getElementById(section).scrollIntoView();
    else if (!samePage) window.scrollTo({ top: 0, behavior: 'instant' });
    if (sectionObserver) sectionObserver.disconnect();
    sectionObserver = new IntersectionObserver(entries => {
      const visible = entries.find(entry => entry.isIntersecting);
      if (!visible) return;
      $('toc').querySelectorAll('a').forEach(a => a.classList.toggle('current', a.hash === '#' + doc.id + '/' + visible.target.id));
    }, { rootMargin: '-90px 0px -60% 0px' });
    headings.forEach(h => sectionObserver.observe(h));
  }
  $('theme').addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('solarshop-theme', theme); } catch { /* Preference persistence is optional. */ }
  });
  $('menu').addEventListener('click', () => menu(!$('sidebar').classList.contains('open')));
  $('scrim').addEventListener('click', () => menu(false));
  search.addEventListener('input', () => navigation(search.value));
  language.addEventListener('change', () => {
    lang = language.value;
    try { localStorage.setItem('onic-language',lang); } catch { /* Optional preference. */ }
    const url = new URL(location.href);
    url.searchParams.set('lang',lang);
    history.replaceState(null,'',url);
    search.value = '';
    applyLanguage();
    render();
  });
  select.addEventListener('change', () => {
    search.value = '';
    const target = (window.ONIC_PLUGINS || []).find(p => p.id === select.value)?.route;
    if (target) location.hash = target;
    navigation();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') { menu(false); search.blur(); }
    if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName) && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault(); menu(window.innerWidth <= 760); search.focus();
    }
  });
  document.addEventListener('click', async event => {
    const button = event.target.closest('.copy');
    if (!button) return;
    const value = button.closest('.code-block').querySelector('code').textContent;
    try {
      await navigator.clipboard.writeText(value);
      $('toast').textContent = t('Đã sao chép cấu hình','Copied to clipboard'); $('toast').classList.add('visible');
      clearTimeout(toastTimer); toastTimer = setTimeout(() => $('toast').classList.remove('visible'), 2000);
    } catch {
      const range = document.createRange(); range.selectNodeContents(button.closest('.code-block').querySelector('code'));
      window.getSelection().removeAllRanges(); window.getSelection().addRange(range);
      $('toast').textContent = t('Đã chọn nội dung. Nhấn Ctrl/Cmd + C để sao chép.','Text selected. Press Ctrl/Cmd + C to copy.'); $('toast').classList.add('visible');
      clearTimeout(toastTimer); toastTimer = setTimeout(() => $('toast').classList.remove('visible'), 4000);
    }
  });
  window.addEventListener('hashchange', render);
  applyLanguage();
  render();
})();
