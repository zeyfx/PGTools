/**
 * PGTools V2 — Navigation Component
 * Mobile-first, no emoji, Font Awesome icons
 */
import '../components/nav.css';

const base = import.meta.env.BASE_URL;

// Links that point to page sections (hash anchors) — NO data-route
const SECTION_LINKS = [
  {
    href: base + '#features',
    label: 'Features',
    sectionId: 'features',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
  },
  {
    href: base + '#download',
    label: 'Download',
    sectionId: 'download',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  },
];

// Links that navigate to separate routes — keep data-route
const ROUTE_LINKS = [
  {
    href: base + 'rocket-grunt',
    label: 'Rocket Grunt',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>`,
  },
  {
    href: base + 'raids',
    label: 'Raids',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  },
];

const ALL_LINKS = [...SECTION_LINKS, ...ROUTE_LINKS];

export function renderNav() {
  const desktopLinks = ALL_LINKS.map(l => {
    const isRoute = ROUTE_LINKS.includes(l);
    const dataRoute = isRoute ? ` data-route="${l.href}"` : '';
    return `<a href="${l.href}"${dataRoute} data-nav-link="${l.href}">${l.label}</a>`;
  }).join('');

  const drawerLinks = ALL_LINKS.map(l => {
    const isRoute = ROUTE_LINKS.includes(l);
    const dataRoute = isRoute ? ` data-route="${l.href}"` : '';
    return `
      <a href="${l.href}"${dataRoute} data-nav-link="${l.href}" class="drawer-link">
        ${l.icon}
        ${l.label}
      </a>`;
  }).join('');

  return `
    <nav class="nav" id="nav">
      <div class="nav-inner">

        <!-- Brand -->
        <a href="${base}" class="nav-brand" data-route="${base}" aria-label="PGTools — home">
          <div class="nav-brand-logo">
            <img src="${base}favicon.ico" alt="PGTools logo" width="32" height="32" />
          </div>
          <span class="nav-brand-text"><em>PG</em>&thinsp;Tools</span>
        </a>

        <!-- Desktop links -->
        <nav class="nav-links" aria-label="Main navigation">
          ${desktopLinks}
        </nav>

        <!-- Actions -->
        <div class="nav-actions">
          <button class="theme-btn" id="theme-toggle" aria-label="Toggle theme" title="Toggle theme">
            <svg id="theme-icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
            <svg id="theme-icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none">
              <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          </button>

          <a href="https://discord.gg/pgtools" class="discord-btn" target="_blank" rel="noopener noreferrer" aria-label="PGTools Discord">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.114 18.1.134 18.11a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Discord
          </a>

          <button class="nav-hamburger" id="nav-hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="nav-drawer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile Drawer -->
    <div class="nav-drawer" id="nav-drawer" aria-hidden="true" role="dialog" aria-label="Navigation menu">
      <div class="nav-drawer-backdrop" id="drawer-backdrop"></div>
      <div class="nav-drawer-panel">
        <button class="nav-drawer-close" id="drawer-close" aria-label="Close menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <nav class="nav-drawer-links">
          ${drawerLinks}
        </nav>

        <div class="nav-drawer-divider"></div>

        <a href="https://discord.gg/pgtools" class="nav-drawer-discord" target="_blank" rel="noopener noreferrer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink: 0;"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.114 18.1.134 18.11a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
          Join Discord
        </a>
      </div>
    </div>
  `;
}

export function initNav() {
  const nav       = document.getElementById('nav');
  const hamburger = document.getElementById('nav-hamburger');
  const drawer    = document.getElementById('nav-drawer');
  const backdrop  = document.getElementById('drawer-backdrop');
  const closeBtn  = document.getElementById('drawer-close');
  const themeBtn  = document.getElementById('theme-toggle');
  const iconMoon  = document.getElementById('theme-icon-moon');
  const iconSun   = document.getElementById('theme-icon-sun');

  // ---- Scroll shadow ----
  const scrollHandler = () => {
    nav.classList.toggle('scrolled', window.scrollY > 12);
  };
  window.addEventListener('scroll', scrollHandler, { passive: true });
  scrollHandler();

  // ---- Drawer open / close ----
  const openDrawer = () => {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };
  const closeDrawer = () => {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  hamburger?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
  });

  document.querySelectorAll('.drawer-link').forEach(a => {
    a.addEventListener('click', closeDrawer);
  });

  // ---- Active link logic ----
  const setActiveLink = (hrefKey) => {
    document.querySelectorAll('[data-nav-link]').forEach(el => {
      el.classList.toggle('active', el.getAttribute('data-nav-link') === hrefKey);
    });
  };

  // Section-aware observer for the home page
  let sectionObserver = null;

  const initSectionObserver = () => {
    if (sectionObserver) { sectionObserver.disconnect(); sectionObserver = null; }

    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '60');
    const visible = new Set();

    sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visible.add(entry.target.id);
        } else {
          visible.delete(entry.target.id);
        }
      });

      // Activate the first visible section in declaration order
      let activated = false;
      for (const link of SECTION_LINKS) {
        if (visible.has(link.sectionId)) {
          setActiveLink(link.href);
          activated = true;
          break;
        }
      }
      // At the very top (before first section): highlight Features
      if (!activated) {
        setActiveLink(window.scrollY < 80 ? SECTION_LINKS[0].href : null);
      }
    }, {
      // Trigger when a section crosses the area just below the nav
      rootMargin: `-${navH + 4}px 0px -55% 0px`,
      threshold: 0,
    });

    SECTION_LINKS.forEach(l => {
      const el = document.getElementById(l.sectionId);
      if (el) sectionObserver.observe(el);
    });
  };

  // Called by main.js after every navigation
  window.__pgNavActivate = (path) => {
    if (path === '/') {
      requestAnimationFrame(() => {
        initSectionObserver();
        setActiveLink(SECTION_LINKS[0].href); // default while observer kicks in
      });
    } else {
      if (sectionObserver) { sectionObserver.disconnect(); sectionObserver = null; }
      setActiveLink(path);
    }
  };

  // Initial + popstate
  window.__pgNavActivate(window.location.pathname);
  window.addEventListener('popstate', () => window.__pgNavActivate(window.location.pathname));

  // ---- Theme toggle ----
  const applyTheme = (mode) => {
    document.body.classList.toggle('light', mode === 'light');
    iconMoon.style.display = mode === 'light' ? 'block' : 'none';
    iconSun.style.display  = mode === 'light' ? 'none'  : 'block';
    localStorage.setItem('pgtools-theme', mode);
  };

  const savedTheme = localStorage.getItem('pgtools-theme') || 'dark';
  applyTheme(savedTheme);

  themeBtn?.addEventListener('click', () => {
    applyTheme(document.body.classList.contains('light') ? 'dark' : 'light');
  });
}
