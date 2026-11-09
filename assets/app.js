'use strict';
(() => {
  let docs = window.SOLAR_DOCS;
  const $ = id => document.getElementById(id);
  const search = $('search');
  const picker = $('plugin-picker');
  const pickerTrigger = picker.querySelector('summary');
  let activeProduct = '';
  const localeButtons = [...document.querySelectorAll('[data-lang]')];
  const headerSearch = document.querySelector('.header-search');
  let lang = new URLSearchParams(location.search).get('lang');
  if (!['vi','en'].includes(lang)) {
    try { lang = localStorage.getItem('onic-language'); } catch { /* Optional preference. */ }
  }
  if (lang !== 'en') lang = 'vi';
  const t = (vi,en) => lang === 'en' ? en : vi;
  function applyLanguage() {
    docs = lang === 'en' ? window.ONIC_ENGLISH : window.SOLAR_DOCS;
    document.documentElement.lang = lang;
    localeButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === lang)));
    headerSearch.querySelector('span').textContent = t('Tìm tài liệu','Search docs');
    headerSearch.setAttribute('aria-label', t('Tìm tài liệu','Search docs'));
    $('back-top').textContent = t('Về đầu trang ↑','Back to top ↑');
    search.placeholder = t('Tìm hướng dẫn…','Search guides…');
    search.setAttribute('aria-label',search.placeholder);
    document.querySelector('.plugin-label').textContent = t('SẢN PHẨM','PRODUCT');
    document.querySelector('.wiki-home').textContent = t('← Chọn plugin','← Choose plugin');
    $('picker-options').setAttribute('aria-label',t('Sản phẩm','Products'));
    document.querySelector('.toc > div').textContent = t('TRONG TRANG NÀY','ON THIS PAGE');
    document.querySelector('.feedback').textContent = t('Góp ý tài liệu ↗','Send feedback ↗');
    document.querySelector('.skip').textContent = t('Đi đến nội dung','Skip to content');
    document.querySelector('.sidebar-note').textContent = t('Tài liệu sản phẩm','Product documentation');
    $('theme').setAttribute('aria-label',t('Đổi giao diện sáng tối','Toggle light or dark theme'));
    $('menu').setAttribute('aria-label',t('Mở mục lục','Toggle navigation'));
  }
  let currentId = '', sectionObserver, toastTimer;
  function menu(open) {
    $('sidebar').classList.toggle('open', open);
    $('menu').setAttribute('aria-expanded', String(open));
    $('scrim').hidden = !open;
    if (!open) picker.open = false;
  }
  function renderPicker() {
    const plugins = window.ONIC_PLUGINS.filter(p => p.route);
    const selected = plugins.find(p => p.id === activeProduct);
    $('picker-name').textContent = selected?.name || t('Chọn sản phẩm','Choose a product');
    $('picker-icon').textContent = selected?.icon || '✳';
    $('picker-options').innerHTML = plugins.map(p => `<a href="#${p.route}" data-product="${p.id}" ${p.id === activeProduct ? 'aria-current="true"' : ''}><span class="picker-option-icon" aria-hidden="true">${esc(p.icon)}</span><span>${esc(p.name)}</span>${p.id === activeProduct ? '<span class="picker-check" aria-hidden="true">✓</span>' : ''}</a>`).join('');
  }
  function navigationGroup(doc) {
    if (doc.product !== 'solarshop') return doc.group;
    if (['bat-dau','cai-dat','thu-muc','shop-dau-tien'].includes(doc.id)) return t('Bắt đầu','Get started');
    if (['solarshop-config','vat-pham','tien-te','solarshards','smartspawner','gioi-han','giao-dien','tin-nhan'].includes(doc.id)) return t('Cấu hình shop','Shop setup');
    return t('Vận hành','Operations');
  }
  function navigation(query = '') {
    const normalized = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').toLowerCase();
    const keywords = normalized(query).split(/\s+/).filter(Boolean);
    const groups = new Map();
    let count = 0;
    $('navigation').replaceChildren();
    for (const doc of docs) {
      if (!activeProduct || doc.product !== activeProduct) continue;
      // Search decoded visible text, not HTML markup or entity codes.
      const template = document.createElement('template');
      template.innerHTML = doc.html;
      const text = normalized(`${doc.title} ${doc.lead} ${template.content.textContent}`);
      if (!keywords.every(word => text.includes(word))) continue;
      count++;
      const name = navigationGroup(doc);
      if (!groups.has(name)) {
        const group = document.createElement('details'); group.className = 'nav-section';
        const heading = document.createElement('summary'); heading.textContent = name;
        group.append(heading); groups.set(name,group); $('navigation').append(group);
      }
      const group = groups.get(name);
      if (keywords.length || currentId === doc.id) group.open = true;
      const link = document.createElement('a'); link.className = 'nav-link'; link.href = '#' + doc.id;
      if (currentId === doc.id) { link.classList.add('active'); link.setAttribute('aria-current', 'page'); }
      const icon = document.createElement('span'); icon.className = 'nav-symbol'; icon.textContent = doc.icon; icon.setAttribute('aria-hidden', 'true');
      const label = document.createElement('span'); label.textContent = doc.title;
      link.append(icon, label); group.append(link);
    }
    if (!count) { const empty = document.createElement('p'); empty.className = 'search-empty'; empty.textContent = activeProduct ? t('Không có kết quả phù hợp.','No matching guides.') : t('Chọn plugin để xem tài liệu.','Choose a plugin to view its guides.'); $('navigation').append(empty); }
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
    activeProduct = doc.product === 'wiki' ? '' : doc.product;
    renderPicker();
    const product = (window.ONIC_PLUGINS || []).find(p => p.id === doc.product);
    document.title = `${doc.title}${product ? ' · ' + product.name : ''} — Onic Wiki`;
    $('article').innerHTML = `<div class="eyebrow">${esc(doc.group)}</div><h1>${esc(doc.subtitle || doc.title)}</h1><p class="lead">${esc(doc.lead)}</p>${doc.html}`;
    if (doc.id === 'wiki') $('article').querySelector('.lead').insertAdjacentHTML('afterend',
      '<div class="wiki-cta"><a class="primary-cta" href="#wiki/plugins">'+t('Chọn sản phẩm','Choose a product')+' <span aria-hidden="true">↓</span></a><a href="#solarshop-config">'+t('Cấu hình SolarShop','SolarShop configuration')+' ↗</a></div>');
    if (doc.id === 'wiki') $('article').insertAdjacentHTML('beforeend',
      '<h2 id="contributors">Contributors</h2><p><strong>Onic Studio</strong> — '+t('phát triển sản phẩm.','product development.')+'<br><strong>ChatGPT</strong> — '+t('hỗ trợ xây dựng wiki và biên soạn tài liệu.','assisted with the wiki and documentation.')+'</p>');
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
  $('menu').addEventListener('click', () => menu(!$('sidebar').classList.contains('open')));
  $('scrim').addEventListener('click', () => menu(false));
  search.addEventListener('input', () => navigation(search.value));
  localeButtons.forEach(button => button.addEventListener('click', () => {
    if (lang === button.dataset.lang) return;
    lang = button.dataset.lang;
    try { localStorage.setItem('onic-language',lang); } catch { /* Optional preference. */ }
    const url = new URL(location.href);
    url.searchParams.set('lang',lang);
    history.replaceState(null,'',url);
    search.value = '';
    applyLanguage();
    render();
  }));
  function focusSearch() {
    if (window.innerWidth <= 760) menu(true);
    if (activeProduct) search.focus();
    else { picker.open = true; pickerTrigger.focus(); }
  }
  headerSearch.addEventListener('click', event => { event.preventDefault(); focusSearch(); });
  $('back-top').addEventListener('click', () => { window.scrollTo({top:0}); $('article').focus({preventScroll:true}); });
  $('picker-options').addEventListener('click', event => {
    if (!event.target.closest('[data-product]')) return;
    search.value = '';
    picker.open = false;
    pickerTrigger.focus();
  });
  document.addEventListener('click', event => { if (!picker.contains(event.target) && !headerSearch.contains(event.target)) picker.open = false; });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (picker.open) { picker.open = false; pickerTrigger.focus(); return; }
      menu(false); search.blur();
    }
    if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName) && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault(); focusSearch();
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
