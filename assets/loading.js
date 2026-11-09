'use strict';
(() => {
  const bar = document.createElement('div');
  bar.id = 'page-loading';
  bar.setAttribute('aria-hidden', 'true');
  document.documentElement.append(bar);
  let timeout;
  const finish = () => { clearTimeout(timeout); bar.remove(); };
  timeout = setTimeout(finish, 10000);
  document.addEventListener('DOMContentLoaded', finish, {once:true});
  window.addEventListener('pageshow', finish, {once:true});
})();
