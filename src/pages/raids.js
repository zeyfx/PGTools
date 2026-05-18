/**
 * PGTools V2 — Raids Tracker
 * Pokémon images from official Pokédex CDN, star tiers via SVG
 */
import '../components/dashboard.css';

// Raid bosses: { name, id (pokédex), tier (1–5 or 'mega') }
const RAID_BOSSES = [
  { name: 'Mewtwo',    id: 150, tier: 5 },
  { name: 'Rayquaza',  id: 384, tier: 5 },
  { name: 'Lugia',     id: 249, tier: 5 },
  { name: 'Ho-Oh',     id: 250, tier: 5 },
  { name: 'Darkrai',   id: 491, tier: 5 },
  { name: 'Giratina',  id: 487, tier: 5 },
  { name: 'Reshiram',  id: 643, tier: 5 },
  { name: 'Zekrom',    id: 644, tier: 5 },
  { name: 'Kyogre',    id: 382, tier: 3 },
  { name: 'Groudon',   id: 383, tier: 3 },
  { name: 'Charizard', id:   6, tier: 'mega' },
  { name: 'Gengar',    id:  94, tier: 'mega' },
  { name: 'Alakazam',  id:  65, tier: 1 },
  { name: 'Machamp',   id:  68, tier: 1 },
];

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

function pokemonImg(id, name, size = 44) {
  const padded = String(id).padStart(3, '0');
  return `<img
    src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${padded}.png"
    alt="${name}"
    width="${size}" height="${size}"
    loading="lazy"
    onerror="this.src='/pokeball.png'"
  />`;
}

function tierStars(tier) {
  const starSvg = (cls) => `<svg class="${cls}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
  if (tier === 'mega') {
    return `<span class="stars" aria-label="Mega Raid">
      ${starSvg('star-mega')}${starSvg('star-mega')}${starSvg('star-mega')}
      <span style="font-size:0.65rem;font-family:var(--font-display);font-weight:700;color:var(--blue);letter-spacing:0.05em">MEGA</span>
    </span>`;
  }
  return `<span class="stars" aria-label="${tier} stars">
    ${Array.from({ length: tier }, () => starSvg('star-filled')).join('')}
  </span>`;
}

function timeBadge(endTime) {
  const diff = new Date(endTime) - Date.now();
  const mins = Math.floor(diff / 60000);
  if (mins < 0)  return `<span class="time-badge time-badge-urgent">Expired</span>`;
  if (mins < 5)  return `<span class="time-badge time-badge-urgent"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:11px;height:11px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>in ${mins}&nbsp;min</span>`;
  if (mins < 20) return `<span class="time-badge time-badge-soon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:11px;height:11px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>in ${mins}&nbsp;min</span>`;
  return `<span class="time-badge time-badge-normal">in ${mins}&nbsp;min</span>`;
}

function coordBtn(lat, lng, id) {
  return `<button class="coord-btn" data-lat="${lat}" data-lng="${lng}" data-id="${id}" aria-label="Copy coordinates">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
    ${lat.toFixed(5)},&nbsp;${lng.toFixed(5)}
  </button>`;
}

function makeMockData(n = 100) {
  return Array.from({ length: n }, (_, i) => {
    const boss     = RAID_BOSSES[i % RAID_BOSSES.length];
    const location = CITIES[i % CITIES.length];
    const expMs    = Date.now() + (Math.random() * 55 + 5) * 60000;
    return {
      id: i + 1,
      boss: boss.name,
      pokemonId: boss.id,
      tier: boss.tier,
      lat: (Math.random() * 140 - 70),
      lng: (Math.random() * 360 - 180),
      gymName: `Gym ${i + 1}`,
      city:    location.city,
      country: location.country,
      endTime: new Date(expMs).toISOString(),
    };
  });
}

let state = {
  data: [], filtered: [],
  activeBosses: [], activeCities: [],
  page: 1, perPage: 15,
  autoUpdate: true, countdown: 60, timer: null,
};

export function renderRaids() {
  return `
    <div class="dashboard-page page-raids page-content">
      <div class="dash-header">
        <div class="container">
          <div class="dash-header-inner">
            <div class="dash-title-block">
              <div class="dash-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <div>
                <div class="dash-title">Raid Tracker</div>
                <div class="dash-subtitle">Live Gyms &mdash; updated every 60&nbsp;s</div>
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
          <button class="filter-toggle-btn" id="filter-toggle" aria-expanded="false">
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
                <div class="filter-label">Boss</div>
                <div class="chip-row" id="boss-chips"></div>
              </div>
              <div class="filter-group">
                <div class="filter-label">Tier</div>
                <div class="chip-row" id="tier-chips"></div>
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
          <div class="dash-count">Total: <strong id="total-count">—</strong> raids</div>
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
          <table class="data-table" id="raids-table">
            <thead>
              <tr>
                <th>Boss</th>
                <th>Tier</th>
                <th>Coordinates</th>
                <th>Gym</th>
                <th>City</th>
                <th>Expires</th>
              </tr>
            </thead>
            <tbody id="raids-tbody"></tbody>
          </table>
        </div>

        <!-- Mobile Cards -->
        <div class="data-cards" id="raids-cards"></div>

        <!-- Pagination -->
        <div class="pagination" id="raids-pagination"></div>
      </div>
    </div>
  `;
}

export function initRaids() {
  state.data = state.filtered = makeMockData(100);
  buildBossChips();
  buildTierChips();
  buildCityChips();
  renderPage();
  startAutoUpdate();
  bindEvents();
}

function buildBossChips() {
  const bosses = [...new Set(state.data.map(d => d.boss))];
  const el = document.getElementById('boss-chips');
  if (!el) return;
  el.innerHTML = bosses.map(b => {
    const boss = RAID_BOSSES.find(r => r.name === b);
    const padded = boss ? String(boss.id).padStart(3,'0') : null;
    return `<button class="chip" data-boss="${b}" style="padding:4px 10px 4px 6px">
      ${padded ? `<img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${padded}.png" width="22" height="22" alt="" style="object-fit:contain" onerror="this.style.display='none'" />` : ''}
      ${b}
    </button>`;
  }).join('');
  el.querySelectorAll('.chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const v = btn.dataset.boss;
      state.activeBosses = state.activeBosses.includes(v)
        ? state.activeBosses.filter(x => x !== v)
        : [...state.activeBosses, v];
      btn.classList.toggle('active');
      applyFilters();
    });
  });
}

function buildTierChips() {
  const tiers = ['1','3','5','mega'];
  const el = document.getElementById('tier-chips');
  if (!el) return;
  el.innerHTML = tiers.map(t => `<button class="chip" data-tier="${t}">${t === 'mega' ? 'Mega' : `Tier ${t}`}</button>`).join('');
  el.querySelectorAll('.chip').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      applyFilters();
    });
  });
}

function buildCityChips() {
  const cities = [...new Set(state.data.map(d => d.city))].sort();
  const el = document.getElementById('city-chips');
  if (!el) return;
  el.innerHTML = cities.map(c => `<button class="chip" data-city="${c}">${c}</button>`).join('');
  el.querySelectorAll('.chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const v = btn.dataset.city;
      state.activeCities = state.activeCities.includes(v)
        ? state.activeCities.filter(x => x !== v)
        : [...state.activeCities, v];
      btn.classList.toggle('active');
      applyFilters();
    });
  });
}

function applyFilters() {
  const activeTiers = [...document.querySelectorAll('#tier-chips .chip.active')].map(b => b.dataset.tier);
  state.filtered = state.data.filter(d => {
    const bossOk = state.activeBosses.length === 0 || state.activeBosses.includes(d.boss);
    const cityOk = state.activeCities.length === 0 || state.activeCities.includes(d.city);
    const tierOk = activeTiers.length === 0 || activeTiers.includes(String(d.tier));
    return bossOk && cityOk && tierOk;
  });
  state.page = 1;
  renderPage();
}

function renderPage() {
  const { filtered, page, perPage } = state;
  const slice = filtered.slice((page - 1) * perPage, page * perPage);
  const totalEl = document.getElementById('total-count');
  if (totalEl) totalEl.textContent = filtered.length;
  renderTable(slice);
  renderCards(slice);
  renderPagination(filtered.length);
}

function renderTable(rows) {
  const tbody = document.getElementById('raids-tbody');
  if (!tbody) return;
  if (!rows.length) {
    tbody.innerHTML = `<tr><td colspan="6"><div class="empty-state">
      <div class="empty-state-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
      <div class="empty-state-title">No raids found</div>
      <div class="empty-state-desc">Adjust filters to see more results.</div>
    </div></td></tr>`;
    return;
  }
  tbody.innerHTML = rows.map(d => `
    <tr>
      <td>
        <div style="display:flex;align-items:center;gap:10px">
          <div class="boss-avatar">${pokemonImg(d.pokemonId, d.boss, 40)}</div>
          <span style="font-family:var(--font-display);font-weight:700">${d.boss}</span>
        </div>
      </td>
      <td>${tierStars(d.tier)}</td>
      <td>${coordBtn(d.lat, d.lng, d.id)}</td>
      <td style="color:var(--text-secondary)">${d.gymName}</td>
      <td>
        <div class="country-cell">
          <img src="https://flagcdn.com/w20/${d.country.toLowerCase()}.png" alt="${d.country}" width="20" height="15" style="border-radius:2px; object-fit:cover;" onerror="this.style.display='none'">
          <span class="city-name">${d.city}</span>
        </div>
      </td>
      <td>${timeBadge(d.endTime)}</td>
    </tr>
  `).join('');
}

function renderCards(rows) {
  const el = document.getElementById('raids-cards');
  if (!el) return;
  if (!rows.length) {
    el.innerHTML = `<div class="empty-state">
      <div class="empty-state-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
      <div class="empty-state-title">No raids found</div>
    </div>`;
    return;
  }
  el.innerHTML = rows.map(d => `
    <div class="data-card">
      <div class="data-card-top">
        <div class="data-card-identity">
          <div class="boss-avatar">${pokemonImg(d.pokemonId, d.boss, 44)}</div>
          <div>
            <div class="data-card-name">${d.boss}</div>
            <div class="data-card-sub" style="margin-top:4px">${tierStars(d.tier)}</div>
          </div>
        </div>
        ${timeBadge(d.endTime)}
      </div>
      <div class="data-card-meta">
        <div class="data-card-meta-item">
          <span class="data-card-meta-key">Gym</span>
          <span class="data-card-meta-val">${d.gymName}</span>
        </div>
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
  const cur = state.page;
  const el = document.getElementById('raids-pagination');
  if (!el || pages <= 1) { if (el) el.innerHTML = ''; return; }

  const addPage = (p) => `<button class="page-btn${p === cur ? ' active' : ''}" data-page="${p}">${p}</button>`;
  const dots = `<button class="page-btn ellipsis">…</button>`;
  let btns = `<button class="page-btn" data-page="${cur - 1}" ${cur === 1 ? 'disabled style="opacity:.4;pointer-events:none"' : ''}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg></button>`;

  if (pages <= 7) { for (let i = 1; i <= pages; i++) btns += addPage(i); }
  else {
    btns += addPage(1);
    if (cur > 3) btns += dots;
    for (let i = Math.max(2, cur - 1); i <= Math.min(pages - 1, cur + 1); i++) btns += addPage(i);
    if (cur < pages - 2) btns += dots;
    btns += addPage(pages);
  }
  btns += `<button class="page-btn" data-page="${cur + 1}" ${cur === pages ? 'disabled style="opacity:.4;pointer-events:none"' : ''}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></button>`;

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
    const c = document.getElementById('au-countdown');
    const p = document.getElementById('au-progress');
    if (c) c.textContent = `${state.countdown}\u00a0s`;
    if (p) p.style.width = `${(state.countdown / 60) * 100}%`;
    if (state.countdown <= 0 && state.autoUpdate) {
      state.data = state.filtered = makeMockData(100);
      applyFilters();
      state.countdown = 60;
    }
  }, 1000);
}

function bindEvents() {
  const toggleBtn  = document.getElementById('filter-toggle');
  const filterBody = document.getElementById('filter-body');
  const chevron    = document.getElementById('filter-chevron');
  toggleBtn?.addEventListener('click', () => {
    const open = filterBody.classList.toggle('visible');
    chevron.classList.toggle('open', open);
    toggleBtn.setAttribute('aria-expanded', open);
  });

  document.getElementById('au-toggle')?.addEventListener('change', (e) => { state.autoUpdate = e.target.checked; });

  document.getElementById('per-page-select')?.addEventListener('change', (e) => {
    state.perPage = parseInt(e.target.value);
    state.page = 1;
    renderPage();
  });

  document.getElementById('btn-copy-all')?.addEventListener('click', () => {
    const coords = state.filtered.map(d => `${d.lat.toFixed(6)},${d.lng.toFixed(6)}`).join('\n');
    navigator.clipboard.writeText(coords).then(() => {
      const btn = document.getElementById('btn-copy-all');
      if (btn) { btn.textContent = 'Copied!'; setTimeout(() => { btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>Copy all`; }, 2000); }
    });
  });

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

export function destroyRaids() { clearInterval(state.timer); }
