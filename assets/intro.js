'use strict';
(() => {
  const intro = document.getElementById('studio-intro');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!intro || !intro.showModal || motion.matches) return;
  const skip = intro.querySelector('button');
  skip.textContent = document.documentElement.lang === 'en' ? 'Skip intro ↗' : 'Bỏ qua ↗';
  let hold, fallback;
  const close = () => { if (intro.open) intro.close(); };
  const onMotionChange = event => { if (event.matches) close(); };
  intro.addEventListener('close', () => {
    clearTimeout(hold);
    clearTimeout(fallback);
    motion.removeEventListener('change', onMotionChange);
    intro.remove();
  }, { once: true });
  skip.addEventListener('click', close);
  intro.addEventListener('transitionend', event => {
    if (event.target === intro && event.propertyName === 'opacity') close();
  });
  intro.showModal();
  motion.addEventListener('change', onMotionChange);
  hold = setTimeout(() => intro.classList.add('is-opening'), 650);
  fallback = setTimeout(close, 1100);
})();
