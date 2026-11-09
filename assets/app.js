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
    try { lang = localStorage.getItem('onic-language'); } catch {  }
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
  const newBadge = item => window.ONIC_IS_NEW(item) ? '<span class="new-badge" title="'+t('Tài liệu cập nhật trong 7 ngày qua','Documentation updated within the last 7 days')+'">NEW</span>' : '';
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
    $('picker-options').innerHTML = window.ONIC_PRODUCT_GROUPS.map(group => '<div class="picker-group-title">'+esc(t(group.vi,group.en))+'</div>'+plugins.filter(p=>p.category===group.id).map(p => `<a href="#${p.route}" data-product="${p.id}" ${p.id === activeProduct ? 'aria-current="true"' : ''}><span class="picker-option-icon" aria-hidden="true">${esc(p.icon)}</span><span>${esc(p.name)} ${newBadge(p)}</span>${p.id === activeProduct ? '<span class="picker-check" aria-hidden="true">✓</span>' : ''}</a>`).join('')).join('');
  }
  function navigation(query = '') {
    const normalized = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').toLowerCase();
    const keywords = normalized(query).split(/\s+/).filter(Boolean);
    let count = 0;
    $('navigation').replaceChildren();
    for (const doc of docs) {
      if (!activeProduct || doc.product !== activeProduct) continue;
      const template = document.createElement('template');
      template.innerHTML = doc.html;
      const text = normalized(`${doc.title} ${doc.lead} ${template.content.textContent}`);
      if (!keywords.every(word => text.includes(word))) continue;
      count++;
      const standalone = doc.id.endsWith('-changelog');
      const link = document.createElement('a'); link.className = 'nav-link'; link.href = '#' + doc.id;
      if (standalone) link.classList.add('standalone-nav');
      if (currentId === doc.id) { link.classList.add('active'); link.setAttribute('aria-current', 'page'); }
      const icon = document.createElement('span'); icon.className = 'nav-symbol'; icon.textContent = doc.icon; icon.setAttribute('aria-hidden', 'true');
      const label = document.createElement('span'); label.textContent = doc.title;
      link.append(icon, label); if (window.ONIC_IS_NEW(doc)) link.insertAdjacentHTML('beforeend', newBadge(doc)); $('navigation').append(link);
    }
    if (!count) { const empty = document.createElement('p'); empty.className = 'search-empty'; empty.textContent = activeProduct ? t('Không có kết quả phù hợp.','No matching guides.') : t('Chọn plugin để xem tài liệu.','Choose a plugin to view its guides.'); $('navigation').append(empty); }
    $('search-status').textContent = query ? count + t(' bài phù hợp',' matching guides') : '';
  }
  function render() {
    let route;
    try { route = decodeURIComponent(location.hash.slice(1)); } catch { route = ''; }
    let [requested, section] = route.split('/');
    if (requested === 'wiki' && section === 'contributors') { requested = 'contributors'; section = undefined; }
    const movedGuides = window.ONIC_MOVED_GUIDES || {};
    const movedTo = Object.hasOwn(movedGuides,requested) ? movedGuides[requested] : null;
    if (movedTo) {
      const movedSection = section ? requested + '-' + section : requested;
      const parent = docs.find(d => d.id === movedTo);
      section = parent?.html.includes('id="' + movedSection + '"') ? movedSection : requested;
      requested = movedTo;
    }
    const doc = docs.find(d => d.id === requested) || (requested === 'phat-hanh' ? docs.find(d=>d.id==='xu-ly-loi') : docs[0]);
    const samePage = currentId === doc.id;
    currentId = doc.id;
    $('crumb').textContent = doc.title;
    activeProduct = doc.product === 'wiki' ? '' : doc.product;
    renderPicker();
    const product = (window.ONIC_PLUGINS || []).find(p => p.id === doc.product);
    document.title = product?.name || (doc.id === 'wiki' ? 'Onic Wiki' : doc.title);
    $('article').innerHTML = `<div class="eyebrow">${esc(doc.group)}</div><h1>${esc(doc.subtitle || doc.title)} ${newBadge(doc)}</h1><p class="lead">${esc(doc.lead)}</p>${doc.html}`;
    if (doc.id === 'wiki') $('article').insertAdjacentHTML('afterbegin',
      '<p class="ai-disclosure"><span aria-hidden="true">✦</span>'+t('Một số sản phẩm có sự hỗ trợ của AI trong quá trình phát triển.','Some products are developed with AI assistance.')+'</p>');
    if (doc.id === 'wiki') $('article').querySelector('.lead').insertAdjacentHTML('afterend',
      '<div class="wiki-cta"><a class="primary-cta" href="https://discord.gg/d3QfdMdsd2" target="_blank" rel="noopener">'+t('Mua sản phẩm','Buy products')+' <span aria-hidden="true">↗</span></a><a href="#wiki/plugins">'+t('Xem tài liệu','Browse docs')+' ↓</a></div>');
    $('article').querySelectorAll('a.card[href^="#"]').forEach(link => {
      const targetId = link.getAttribute('href').slice(1).split('/')[0];
      const target = docs.find(item => item.id === targetId);
      const targetProduct = (window.ONIC_PLUGINS || []).find(item => item.route === targetId);
      const badge = newBadge(window.ONIC_IS_NEW(target) ? target : targetProduct);
      if (badge) {
        const statusRow = document.createElement('div');
        statusRow.className = 'card-status-row';
        const status = link.querySelector(':scope > .product-status');
        if (status) statusRow.append(status);
        statusRow.insertAdjacentHTML('beforeend', badge);
        link.append(statusRow);
      }
    });
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
    try { localStorage.setItem('onic-language',lang); } catch {  }
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
