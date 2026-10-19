document.documentElement.classList.add('js-ready');

const menuButton = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('#primary-nav');
const navLinks = [...document.querySelectorAll('.nav-link')];

function closeMenu() {
  if (!menuButton || !primaryNav) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation menu');
  primaryNav.classList.remove('is-open');
}

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
  primaryNav?.classList.toggle('is-open', !isOpen);
});

navLinks.forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});
document.addEventListener('click', (event) => {
  if (primaryNav?.classList.contains('is-open') && event.target instanceof Element && !event.target.closest('.nav-wrap')) closeMenu();
});

const modeDescriptions = {
  builder: 'Turning ideas into functional digital experiences.',
  ai: 'Exploring machine learning and intelligent systems.',
  solver: 'Breaking complex problems into practical solutions.',
  innovator: 'Experimenting, building, and learning through projects.',
};
const modeButtons = [...document.querySelectorAll('.mode-option')];
const modeDescription = document.querySelector('#mode-description');
const selector = document.querySelector('.mode-selector');

modeButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    modeButtons.forEach((option) => {
      const selected = option === button;
      option.classList.toggle('is-selected', selected);
      option.setAttribute('aria-pressed', String(selected));
    });
    if (selector) selector.style.setProperty('--mode-index', String(index));
    if (modeDescription) modeDescription.textContent = modeDescriptions[button.dataset.mode] ?? '';
  });
});

const revealItems = [...document.querySelectorAll('[data-reveal]')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const observedSections = ['home', 'about', 'skills', 'projects', 'achievements', 'contact']
  .map((id) => document.getElementById(id))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visibleSections = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (!visibleSections.length) return;
    const currentId = visibleSections[0].target.id;
    navLinks.forEach((link) => {
      const current = link.hash === `#${currentId}`;
      link.classList.toggle('is-active', current);
      if (current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { threshold: [0.08, 0.22, 0.45], rootMargin: '-20% 0px -55% 0px' });
  observedSections.forEach((section) => sectionObserver.observe(section));
}
