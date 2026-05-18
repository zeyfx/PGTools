/**
 * PGTools V2 — Rocket Grunt Tracker
 * Pokémon images from official CDN, spritesheet for type/gender icons
 */
import '../components/dashboard.css';

// Type badge colors (Pokémon GO palette)
const TYPE_COLORS = {
  normal:   '#A8A878', fire:     '#F08030', water:    '#6890F0',
  electric: '#F8D030', grass:    '#78C850', ice:      '#98D8D8',
  fighting: '#C03028', poison:   '#A040A0', ground:   '#E0C068',
  flying:   '#A890F0', psychic:  '#F85888', bug:      '#A8B820',
  rock:     '#B8A038', ghost:    '#705898', dragon:   '#7038F8',
  dark:     '#705848', steel:    '#B8B8D0', fairy:    '#EE99AC',
};

function typeSprite(type) {
  const key   = type?.toLowerCase() || 'normal';
  const color = TYPE_COLORS[key] || '#888';
  return `<span style="
    display:inline-flex;align-items:center;justify-content:center;
    width:8px;height:8px;border-radius:50%;flex-shrink:0;
    background:${color};box-shadow:0 0 6px ${color}55;
  " title="${type}"></span>`;
}

function pokemonImg(id, name) {
  const padded = String(id).padStart(3, '0');
  return `<img
    src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${padded}.png"
    alt="${name}"
    width="36" height="36"
    loading="lazy"
    onerror="this.src='/pokeball.png'"
  />`;
}

function genderIcon(gender) {
  if (gender === 'f') return `<span class="gender-icon female" aria-label="Female"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="9" r="5"/><line x1="12" y1="14" x2="12" y2="21"/><line x1="9" y1="18" x2="15" y2="18"/></svg></span>`;
  if (gender === 'm') return `<span class="gender-icon male" aria-label="Male"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="10" cy="14" r="5"/><line x1="21" y1="3" x2="15" y2="9"/><polyline points="15 3 21 3 21 9"/></svg></span>`;
  return '';
}

function timeBadge(endTime) {
  const diff = new Date(endTime) - Date.now();
  const mins = Math.floor(diff / 60000);
  if (mins < 0)  return `<span class="time-badge time-badge-urgent">Expired</span>`;
  if (mins < 10) return `<span class="time-badge time-badge-urgent"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>in ${mins}&nbsp;min</span>`;
  if (mins < 30) return `<span class="time-badge time-badge-soon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>in ${mins}&nbsp;min</span>`;
  return `<span class="time-badge time-badge-normal">in ${mins}&nbsp;min</span>`;
}

function coordBtn(lat, lng, id) {
  return `<button class="coord-btn" data-lat="${lat}" data-lng="${lng}" data-id="${id}" aria-label="Copy coordinates">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
    ${lat.toFixed(5)},&nbsp;${lng.toFixed(5)}
  </button>`;
}

// ---------- Mock data (substitua pelas chamadas de API reais) ----------
const GRUNT_TYPES = ['Normal','Dragon','Water','Fire','Psychic','Dark','Steel','Ghost','Electric','Poison','Ice','Grass','Flying','Ground','Bug','Rock','Fairy','Fighting'];
const CITIES = [
  { city: 'São Paulo',        country: 'BR' },
  { city: 'Rio de Janeiro',   country: 'BR' },
  { city: 'Buenos Aires',     country: 'AR' },
  { city: 'Santiago',         country: 'CL' },
  { city: 'Lima',             country: 'PE' },
  { city: 'Bogotá',           country: 'CO' },
  { city: 'Cidade do México', country: 'MX' },
  { city: 'Nova York',        country: 'US' },
  { city: 'Paris',            country: 'FR' },
  { city: 'Tóquio',           country: 'JP' },
  { city: 'Sydney',           country: 'AU' },
  { city: 'Singapura',        country: 'SG' },
  { city: 'Londres',          country: 'GB' },
  { city: 'Berlim',           country: 'DE' },
  { city: 'Cidade do Cabo',   country: 'ZA' },
];

function makeMockData(n = 80) {
  const results = [];
  for (let i = 0; i < n; i++) {
    const type     = GRUNT_TYPES[i % GRUNT_TYPES.length];
    const location = CITIES[i % CITIES.length];
    const expMs    = Date.now() + (Math.random() * 90 + 3) * 60000;
    results.push({
      id: i + 1,
      type,
      pokemonId: 19 + (i % 120),
      pokemonName: `${type}-type Grunt`,
      lat: (Math.random() * 140 - 70),
      lng: (Math.random() * 360 - 180),
      stopName: `PokéStop ${i + 1}`,
      city:    location.city,
      country: location.country,
      gender: i % 3 === 0 ? 'f' : 'm',
      endTime: new Date(expMs).toISOString(),
    });
  }
  return results;
}

// ---------- State ----------
let state = {
  data: [],
  filtered: [],
  activeTypes: [],
  activeCities: [],
  page: 1,
  perPage: 15,
  autoUpdate: true,
  countdown: 60,
  timer: null,
};

// ---------- Render ----------
export function renderRocket() {
  return `
    <div class="dashboard-page page-rocket page-content">
      <div class="dash-header">
        <div class="container">
          <div class="dash-header-inner">
            <div class="dash-title-block">
              <div class="dash-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
              </div>
              <div>
                <div class="dash-title">Rocket Grunt Tracker</div>
                <div class="dash-subtitle">Live Invasions — updated every 60&nbsp;s</div>
              </div>
            </div>
            <div class="dash-header-actions">
              <div class="auto-update-ctrl">
                <label class="toggle-wrap" aria-label="Auto-update">
                  <input type="checkbox" id="au-toggle" checked />
                  <span class="toggle-track"></span>
                </label>
                <span class="auto-update-label">Auto</span>
                <span class="update-countdown" id="au-countdown">60&nbsp;s</span>
                <div class="update-progress-bar"><div class="update-progress-fill" id="au-progress" style="width:100%"></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <!-- Filters -->
        <div class="filter-panel" id="filter-panel">
          <button class="filter-toggle-btn" id="filter-toggle" aria-expanded="false" aria-controls="filter-body">
            <span style="display:flex;align-items:center;gap:8px">
              <svg class="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              Filters and settings
            </span>
            <svg class="filter-toggle-icon" id="filter-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="filter-body" id="filter-body">
            <div class="filter-row">
              <div class="filter-group">
                <div class="filter-label">On Click Action</div>
                <select id="action-select" class="select" style="width:100%; font-family:var(--font-display); background:var(--bg-surface-2); color:var(--text-primary); border:1px solid var(--border-subtle); padding:10px 12px; border-radius:var(--r-full); font-weight:600; font-size:var(--text-xs); cursor:pointer;">
                  <option value="copy">Copy Coordinates</option>
                  <option value="adb">ADB Teleport</option>
                  <option value="map">Open Map</option>
                </select>
              </div>
              <div class="filter-group">
                <div class="filter-label">Grunt type</div>
                <div class="chip-row" id="type-chips"></div>
              </div>
              <div class="filter-group">
                <div class="filter-label">City</div>
                <div class="chip-row" id="city-chips"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Toolbar -->
        <div class="dash-toolbar">
          <div class="dash-count">Total: <strong id="total-count">—</strong> grunts</div>
          <div class="toolbar-actions">
            <button class="btn-copy-all" id="btn-copy-all">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              Copy all
            </button>
            <div class="per-page-wrap">
              <span>Show</span>
              <select class="select" id="per-page-select">
                <option value="10">10</option>
                <option value="15" selected>15</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <span>/ page</span>
            </div>
          </div>
        </div>

        <!-- Desktop Table -->
        <div class="data-table-wrap">
          <table class="data-table" id="rocket-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Pokémon</th>
                <th>Coordinates</th>
                <th>PokéStop</th>
                <th>City</th>
                <th>Gender</th>
                <th>Expires</th>
              </tr>
            </thead>
            <tbody id="rocket-tbody"></tbody>
          </table>
        </div>

        <!-- Mobile Cards -->
        <div class="data-cards" id="rocket-cards"></div>

        <!-- Pagination -->
        <div class="pagination" id="rocket-pagination"></div>
      </div>
    </div>
  `;
}

export function initRocket() {
  state.data     = makeMockData(80);
  state.filtered = [...state.data];

  buildTypeChips();
  buildCityChips();
  renderPage();
  startAutoUpdate();
  bindEvents();
}

function buildTypeChips() {
  const types = [...new Set(state.data.map(d => d.type))].sort();
  const container = document.getElementById('type-chips');
  if (!container) return;
  container.innerHTML = types.map(t => `
    <button class="chip" data-type="${t}">
      ${typeSprite(t)} ${t}
    </button>
  `).join('');
  container.querySelectorAll('.chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const t = btn.dataset.type;
      if (state.activeTypes.includes(t)) {
        state.activeTypes = state.activeTypes.filter(x => x !== t);
        btn.classList.remove('active');
      } else {
        state.activeTypes.push(t);
        btn.classList.add('active');
      }
      applyFilters();
    });
  });
}

function buildCityChips() {
  const cities = [...new Set(state.data.map(d => d.city))].sort();
  const container = document.getElementById('city-chips');
  if (!container) return;
  container.innerHTML = cities.map(c => `
    <button class="chip" data-city="${c}">${c}</button>
  `).join('');
  container.querySelectorAll('.chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const c = btn.dataset.city;
      if (state.activeCities.includes(c)) {
        state.activeCities = state.activeCities.filter(x => x !== c);
        btn.classList.remove('active');
      } else {
        state.activeCities.push(c);
        btn.classList.add('active');
      }
      applyFilters();
    });
  });
}

function applyFilters() {
  state.filtered = state.data.filter(d => {
    const typeOk = state.activeTypes.length === 0 || state.activeTypes.includes(d.type);
    const cityOk = state.activeCities.length === 0 || state.activeCities.includes(d.city);
    return typeOk && cityOk;
  });
  state.page = 1;
  renderPage();
}

function renderPage() {
  const { filtered, page, perPage } = state;
  const start = (page - 1) * perPage;
  const slice = filtered.slice(start, start + perPage);

  const totalEl = document.getElementById('total-count');
  if (totalEl) totalEl.textContent = filtered.length;

  renderTable(slice);
  renderCards(slice);
  renderPagination(filtered.length);
}

function renderTable(rows) {
  const tbody = document.getElementById('rocket-tbody');
  if (!tbody) return;
  if (rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state">
      <div class="empty-state-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg></div>
      <div class="empty-state-title">No grunt found</div>
      <div class="empty-state-desc">Adjust filters to see more results.</div>
    </div></td></tr>`;
    return;
  }
  tbody.innerHTML = rows.map(d => `
    <tr>
      <td>
        <div class="grunt-type-cell">
          ${typeSprite(d.type)}
          ${d.type}
        </div>
      </td>
      <td>
        <div class="pokemon-avatar">
          <div class="pokemon-avatar-bg">${pokemonImg(d.pokemonId, d.type)}</div>
        </div>
      </td>
      <td>${coordBtn(d.lat, d.lng, d.id)}</td>
      <td style="color:var(--text-secondary)">${d.stopName}</td>
      <td>
        <div class="country-cell">
          <img src="https://flagcdn.com/w20/${d.country.toLowerCase()}.png" alt="${d.country}" width="20" height="15" style="border-radius:2px; object-fit:cover;" onerror="this.style.display='none'">
          <span class="city-name">${d.city}</span>
        </div>
      </td>
      <td>${genderIcon(d.gender)}</td>
      <td>${timeBadge(d.endTime)}</td>
    </tr>
  `).join('');
}

function renderCards(rows) {
  const container = document.getElementById('rocket-cards');
  if (!container) return;
  if (rows.length === 0) {
    container.innerHTML = `<div class="empty-state">
      <div class="empty-state-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg></div>
      <div class="empty-state-title">No grunt found</div>
    </div>`;
    return;
  }
  container.innerHTML = rows.map(d => `
    <div class="data-card">
      <div class="data-card-top">
        <div class="data-card-identity">
          <div class="pokemon-avatar">
            <div class="pokemon-avatar-bg">${pokemonImg(d.pokemonId, d.type)}</div>
          </div>
          <div>
            <div class="data-card-name" style="display:flex;align-items:center;gap:6px">
              ${typeSprite(d.type)} ${d.type}
            </div>
            <div class="data-card-sub">${d.stopName}</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          ${genderIcon(d.gender)}
          ${timeBadge(d.endTime)}
        </div>
      </div>
      <div class="data-card-meta">
        <div class="data-card-meta-item">
          <span class="data-card-meta-key">City</span>
          <span class="data-card-meta-val" style="display:flex;align-items:center;gap:6px">
            <img src="https://flagcdn.com/24x18/${d.country.toLowerCase()}.png" alt="${d.country}" width="16" height="12" style="border-radius:2px; object-fit:cover;" onerror="this.style.display='none'">
            ${d.city}
          </span>
        </div>
      </div>
      <div class="data-card-actions">
        ${coordBtn(d.lat, d.lng, d.id)}
      </div>
    </div>
  `).join('');
}

function renderPagination(total) {
  const pages = Math.ceil(total / state.perPage);
  const cur   = state.page;
  const el    = document.getElementById('rocket-pagination');
  if (!el || pages <= 1) { if (el) el.innerHTML = ''; return; }

  let btns = '';
  const addPage = (p) => `<button class="page-btn${p === cur ? ' active' : ''}" data-page="${p}">${p}</button>`;
  const dots     = `<button class="page-btn ellipsis">…</button>`;

  const prev = `<button class="page-btn" data-page="${cur - 1}" ${cur === 1 ? 'disabled style="opacity:.4;pointer-events:none"' : ''}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
  </button>`;
  const next = `<button class="page-btn" data-page="${cur + 1}" ${cur === pages ? 'disabled style="opacity:.4;pointer-events:none"' : ''}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
  </button>`;

  btns += prev;
  if (pages <= 7) {
    for (let i = 1; i <= pages; i++) btns += addPage(i);
  } else {
    btns += addPage(1);
    if (cur > 3) btns += dots;
    for (let i = Math.max(2, cur - 1); i <= Math.min(pages - 1, cur + 1); i++) btns += addPage(i);
    if (cur < pages - 2) btns += dots;
    btns += addPage(pages);
  }
  btns += next;

  el.innerHTML = btns;
  el.querySelectorAll('[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.page = parseInt(btn.dataset.page);
      renderPage();
      document.querySelector('.dash-header')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function startAutoUpdate() {
  clearInterval(state.timer);
  state.countdown = 60;

  state.timer = setInterval(() => {
    state.countdown--;
    const pct = (state.countdown / 60) * 100;
    const countdown = document.getElementById('au-countdown');
    const progress  = document.getElementById('au-progress');
    if (countdown) countdown.textContent = `${state.countdown}\u00a0s`;
    if (progress)  progress.style.width  = `${pct}%`;

    if (state.countdown <= 0 && state.autoUpdate) {
      state.data     = makeMockData(80); // Substitua: await fetchRocketData()
      state.filtered = [...state.data];
      applyFilters();
      state.countdown = 60;
    }
  }, 1000);
}

function bindEvents() {
  // Filter toggle
  const toggleBtn = document.getElementById('filter-toggle');
  const filterBody = document.getElementById('filter-body');
  const chevron    = document.getElementById('filter-chevron');
  toggleBtn?.addEventListener('click', () => {
    const open = filterBody.classList.toggle('visible');
    chevron.classList.toggle('open', open);
    toggleBtn.setAttribute('aria-expanded', open);
  });

  // Auto-update toggle
  document.getElementById('au-toggle')?.addEventListener('change', (e) => {
    state.autoUpdate = e.target.checked;
  });

  // Per-page select
  document.getElementById('per-page-select')?.addEventListener('change', (e) => {
    state.perPage = parseInt(e.target.value);
    state.page = 1;
    renderPage();
  });

  // Copy all
  document.getElementById('btn-copy-all')?.addEventListener('click', () => {
    const coords = state.filtered.map(d => `${d.lat.toFixed(6)},${d.lng.toFixed(6)}`).join('\n');
    navigator.clipboard.writeText(coords).then(() => {
      const btn = document.getElementById('btn-copy-all');
      if (btn) { btn.textContent = 'Copied!'; setTimeout(() => { btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>Copy all`; }, 2000); }
    });
  });

  // Coord copy (event delegation)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.coord-btn');
    if (!btn) return;
    const lat = btn.dataset.lat;
    const lng = btn.dataset.lng;
    const action = document.getElementById('action-select')?.value || 'copy';

    if (action === 'map') {
      window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
      return;
    }

    let content = `${lat},${lng}`;
    if (action === 'adb') {
      content = `adb shell am broadcast -a com.pgtools.broadcast.teleport --ef lat ${lat} --ef lng ${lng}`;
    }

    navigator.clipboard.writeText(content).then(() => {
      const originalHtml = btn.innerHTML;
      btn.classList.add('copied');
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copied!`;
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = originalHtml;
      }, 2000);
    });
  });
}

export function destroyRocket() {
  clearInterval(state.timer);
}
