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
  intro.querySelector('.intro-left').addEventListener('transitionend', event => {
    if (event.propertyName === 'transform') close();
  });
  intro.showModal();
  motion.addEventListener('change', onMotionChange);
  hold = setTimeout(() => intro.classList.add('is-opening'), 540);
  // Never leave the document covered if a transition event is skipped.
  fallback = setTimeout(close, 1050);
})();
