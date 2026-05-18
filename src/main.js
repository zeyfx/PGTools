/**
 * PGTools V2 — SPA Router
 */
import './style.css';
import { renderNav, initNav } from './components/nav.js';

const app = document.getElementById('app');

// Route registry
const ROUTES = {
  '/':             () => import('./pages/home.js'),
  '/rocket-grunt': () => import('./pages/rocket.js'),
  '/raids':        () => import('./pages/raids.js'),
};

let currentDestroy = null; // cleanup fn for current page

/** Smooth-scroll to a CSS selector, with optional offset for fixed nav */
function smoothScrollTo(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '60');
  const top = el.getBoundingClientRect().top + window.scrollY - navH - 8;
  window.scrollTo({ top, behavior: 'smooth' });
}

async function navigate(path) {
  const base = import.meta.env.BASE_URL;
  
  // Normalize path by stripping the base URL if present
  let normalizedPath = path;
  if (base !== '/' && normalizedPath.startsWith(base)) {
    normalizedPath = '/' + normalizedPath.slice(base.length);
  } else if (base !== '/' && normalizedPath + '/' === base) {
    normalizedPath = '/';
  }

  // Normalise trailing slash
  const key = normalizedPath === '/' ? '/' : normalizedPath.replace(/\/$/, '');
  const loader = ROUTES[key] || ROUTES['/'];

  // Cleanup previous page
  if (typeof currentDestroy === 'function') {
    currentDestroy();
    currentDestroy = null;
  }

  // Load module
  const mod = await loader();

  // Decide which render function to call
  let html = '';
  if (key === '/') {
    html = mod.renderHome();
  } else if (key === '/rocket-grunt') {
    html = mod.renderRocket();
  } else if (key === '/raids') {
    html = mod.renderRaids();
  } else {
    html = '<div class="page-content"><div class="container" style="padding-top:80px">Page not found.</div></div>';
  }

  // Mount
  const content = document.getElementById('pg-content');
  if (content) {
    content.innerHTML = html;
  }

  // Init
  if (key === '/') {
    mod.initHome?.();
  } else if (key === '/rocket-grunt') {
    mod.initRocket?.();
    currentDestroy = mod.destroyRocket || null;
  } else if (key === '/raids') {
    mod.initRaids?.();
    currentDestroy = mod.destroyRaids || null;
  }

  // If no hash: scroll to top; otherwise scroll to anchor
  if (window.location.hash) {
    // Give the DOM a tick to finish rendering before scrolling
    requestAnimationFrame(() => smoothScrollTo(window.location.hash));
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  document.title = buildTitle(key);

  // Tell the nav which path we're on (section observer or route active)
  window.__pgNavActivate?.(key);
}

function buildTitle(path) {
  const titles = {
    '/':             'PGTools — Pokémon GO Toolkit',
    '/rocket-grunt': 'Rocket Grunt Tracker | PGTools',
    '/raids':        'Raid Tracker | PGTools',
  };
  return titles[path] || 'PGTools';
}

// SPA link interception
document.addEventListener('click', (e) => {
  const a = e.target.closest('a');
  if (!a) return;

  const href = a.getAttribute('href');
  if (!href) return;

  // External links — let browser handle
  if (href.startsWith('http') || href.startsWith('//') || href.startsWith('mailto') || href.startsWith('tel')) return;

  // Resolve URL
  const url = new URL(href, window.location.origin);
  
  // If it's a hash link for the EXACT same page we are currently on
  if (url.hash && url.pathname === window.location.pathname) {
    e.preventDefault();
    history.pushState(null, '', href);
    smoothScrollTo(url.hash);
    return;
  }

  // SPA route link — must have data-route or point to a known route
  const base = import.meta.env.BASE_URL;
  let normalizedPath = url.pathname;
  if (base !== '/' && normalizedPath.startsWith(base)) {
    normalizedPath = '/' + normalizedPath.slice(base.length);
  } else if (base !== '/' && normalizedPath + '/' === base) {
    normalizedPath = '/';
  }

  const hasDataRoute = a.hasAttribute('data-route');
  const isKnownRoute = Object.keys(ROUTES).includes(normalizedPath);
  if (!hasDataRoute && !isKnownRoute) return;

  e.preventDefault();
  const path = url.pathname;
  history.pushState(null, '', href);
  navigate(path);
});

// Popstate (back/forward)
window.addEventListener('popstate', () => {
  navigate(window.location.pathname);
  if (window.location.hash) {
    requestAnimationFrame(() => smoothScrollTo(window.location.hash));
  }
});

// Bootstrap
function mount() {
  app.innerHTML = `
    ${renderNav()}
    <main id="pg-content" role="main"></main>
  `;
  initNav();
  navigate(window.location.pathname);
}

mount();


