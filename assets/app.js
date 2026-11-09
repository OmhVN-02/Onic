'use strict';
(() => {
  const docs = window.SOLAR_DOCS;
  const $ = id => document.getElementById(id);
  const search = $('search');
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
    if (!count) { const empty = document.createElement('p'); empty.className = 'search-empty'; empty.textContent = 'Chưa có kết quả. Thử “shards”, “quyền” hoặc “túi đầy”.'; $('navigation').append(empty); }
    $('search-status').textContent = query ? `${count} bài phù hợp` : '';
  }
  function render() {
    let route;
    try { route = decodeURIComponent(location.hash.slice(1)); } catch { route = ''; }
    const [requested, section] = route.split('/');
    const doc = docs.find(d => d.id === requested) || docs[0];
    const samePage = currentId === doc.id;
    currentId = doc.id;
    $('crumb').textContent = doc.title;
    document.title = `${doc.title} — SolarShop Docs`;
    $('article').innerHTML = `<div class="eyebrow">SOLARSHOP / ${esc(doc.group)}</div><h1>${esc(doc.subtitle || doc.title)}</h1><p class="lead">${esc(doc.lead)}</p>${doc.html}`;
    const headings = [...$('article').querySelectorAll('h2[id]')];
    $('toc').innerHTML = headings.map(h => `<a href="#${doc.id}/${h.id}">${esc(h.textContent)}</a>`).join('');
    const index = docs.indexOf(doc), previous = docs[index - 1], next = docs[index + 1];
    $('page-navigation').innerHTML = `${previous ? `<a href="#${previous.id}"><small>← TRƯỚC</small>${esc(previous.title)}</a>` : '<span></span>'}${next ? `<a href="#${next.id}"><small>TIẾP THEO →</small>${esc(next.title)}</a>` : ''}`;
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
      $('toast').textContent = 'Đã sao chép cấu hình'; $('toast').classList.add('visible');
      clearTimeout(toastTimer); toastTimer = setTimeout(() => $('toast').classList.remove('visible'), 2000);
    } catch {
      const range = document.createRange(); range.selectNodeContents(button.closest('.code-block').querySelector('code'));
      window.getSelection().removeAllRanges(); window.getSelection().addRange(range);
      $('toast').textContent = 'Đã chọn nội dung. Nhấn Ctrl/Cmd + C để sao chép.'; $('toast').classList.add('visible');
      clearTimeout(toastTimer); toastTimer = setTimeout(() => $('toast').classList.remove('visible'), 4000);
    }
  });
  window.addEventListener('hashchange', render);
  render();
})();
