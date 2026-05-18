/**
 * PGTools V2 — Homepage
 * No emoji, official Pokédex images, inline SVGs, mobile-first
 */
import '../components/home.css';

// Featured Pokémon carousel in hero (official CDN)
const FEATURED_POKEMON = [
  { id: 150, name: 'Mewtwo' },
  { id: 384, name: 'Rayquaza' },
  { id: 249, name: 'Lugia' },
  { id: 250, name: 'Ho-Oh' },
  { id: 491, name: 'Darkrai' },
];

function pokemonImg(id, name, size = 80) {
  const pad = String(id).padStart(3, '0');
  return `<img
    src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${pad}.png"
    alt="${name}"
    width="${size}" height="${size}"
    style="object-fit:contain"
    loading="eager"
    onerror="this.style.opacity='0'"
  />`;
}

const POKEBALL_SVG = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="color: var(--text-primary)">
  <!-- Subtle top hemisphere fill -->
  <path d="M 14,100 A 86,86 0 0,1 186,100 Z" fill="currentColor" opacity="0.03"/>
  
  <!-- Outer shell -->
  <circle cx="100" cy="100" r="86" fill="none" stroke="currentColor" stroke-width="12" opacity="0.12"/>
  
  <!-- Center button -->
  <circle cx="100" cy="100" r="26" fill="none" stroke="currentColor" stroke-width="12" opacity="0.12"/>
  <circle cx="100" cy="100" r="10" fill="currentColor" opacity="0.12"/>
  
  <!-- Horizontal belt -->
  <line x1="14" y1="100" x2="74" y2="100" stroke="currentColor" stroke-width="12" opacity="0.12"/>
  <line x1="126" y1="100" x2="186" y2="100" stroke="currentColor" stroke-width="12" opacity="0.12"/>
</svg>`;

export function renderHome() {
  const p = FEATURED_POKEMON[Math.floor(Math.random() * FEATURED_POKEMON.length)];

  return `
    <div class="page-content">

      <!-- ═══════════════════ HERO ═══════════════════ -->
      <section class="hero" aria-labelledby="hero-heading">
        <div class="hero-bg" aria-hidden="true"></div>
        <div class="hero-orb hero-orb-1" aria-hidden="true"></div>
        <div class="hero-orb hero-orb-2" aria-hidden="true"></div>

        <div class="container">
          <div class="hero-inner">

            <div class="hero-content reveal">

              <h1 class="hero-title" id="hero-heading">
                Dare to<br/>
                <span class="brand-pg">Dream</span><br/>
              </h1>

              <p class="hero-subtitle">
                Our mission is to challenge the standard. Tools that transform ordinary, traditional ideas into groundbreaking innovations that make the user's work easier and faster.
              </p>

              <div class="hero-ctas">
                <a href="#download" class="btn btn-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download Tools
                </a>
                <a href="#features" class="btn btn-outline">
                  View Features
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                </a>
              </div>

              <div class="hero-notice">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Requires a physical rooted Android device. Virtual machines and emulators are not supported.
              </div>
            </div>

            <!-- Hero visual: Pokémon + pokéball decorativo -->
            <div class="hero-visual reveal reveal-delay-2" aria-hidden="true">
              <div class="pokeball-main" style="width:80%;height:80%;display:flex;align-items:center;justify-content:center">
                ${pokemonImg(p.id, p.name, 240)}
              </div>
              <div class="pokeball-mini pokeball-mini-1" style="width:60px;height:60px">
                ${POKEBALL_SVG}
              </div>
              <div class="pokeball-mini pokeball-mini-2" style="width:44px;height:44px">
                ${POKEBALL_SVG}
              </div>
              <div class="pokeball-mini pokeball-mini-3" style="width:36px;height:36px">
                ${POKEBALL_SVG}
              </div>
              <div class="pokeball-mini pokeball-mini-4" style="width:50px;height:50px">
                ${POKEBALL_SVG}
              </div>
              <div class="pokeball-mini pokeball-mini-5" style="width:28px;height:28px">
                ${POKEBALL_SVG}
              </div>
            </div>

          </div>
        </div>
      </section>

      <div class="divider-glow"></div>

      <!-- ═══════════════════ FEATURES ═══════════════════ -->
      <section class="section bg-dot-grid" id="features" aria-labelledby="features-heading">
        <div class="container container-wide">
          <div class="section-header reveal">
            <div class="section-tag">Features</div>
            <h2 class="section-title" id="features-heading">Everything you need, in one place</h2>
            <p class="section-desc">PGTools gathers the most efficient tools to automate and improve your Pokémon GO experience.</p>
          </div>

          <div class="features-grid features-grid-tools">

            <!-- PAC -->
            <div class="feature-card feature-card-tool reveal">
              <div class="feature-card-visual">
                <div style="display:flex;gap:12px;align-items:center">
                  ${[1,4,7,25,39].map(id => `<div style="width:48px;height:48px">${pokemonImg(id, 'pokemon', 48)}</div>`).join('')}
                </div>
              </div>
              <div class="feature-card-meta">
                <div>
                  <div class="feature-card-name">PAC</div>
                  <div class="feature-card-fullname">Pok&eacute;mon Auto Catcher</div>
                </div>
                <span class="badge badge-red">Main</span>
              </div>
              <p class="feature-card-tagline">Dare to Dream</p>
              <ul class="feature-list feature-list-full">
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Spin Mode</span><span class="fi-desc">Option to only spin PokéStops and Gyms for fast item farming.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Catch Mode</span><span class="fi-desc">Normal, Fast and Ultimate Catch modes for background scanning.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Catch Filters</span><span class="fi-desc">Select exactly which Pokémon to catch or skip.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Touch N&#x2019; Go</span><span class="fi-desc">Returns to the overworld after a successful catch or spin.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Feed Berry</span><span class="fi-desc">Choose a berry to feed before catching.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Enhanced Catching</span><span class="fi-desc">Excellent Throw, Curveball and Expert Handler for best capture odds.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">PokéBall Priority</span><span class="fi-desc">Set the order in which your PokéBalls are used.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">PokéBall Settings</span><span class="fi-desc">Set minimum and maximum PokéBall quantities to always keep reserves.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Evolve Before Transfer</span><span class="fi-desc">Automatically evolve Pokémon before transferring.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Keep Filters</span><span class="fi-desc">Customize which Pokémon to keep, including XXS, XS, XL and XXL.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Transfer Filters</span><span class="fi-desc">Auto-transfer by IV, shiny, hundo, shundo, 0% IV, egg hatches and quest rewards.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Mass Transfer</span><span class="fi-desc">Select and transfer any kind of Pokémon in bulk.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Show IV Instead of Name</span><span class="fi-desc">Replace inventory names with IVs for easier management.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Pokémon Storage Tweaks</span><span class="fi-desc">Mass evolve or purify Pokémon with ease.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Item Management</span><span class="fi-desc">Maintain preferred item quantities; auto-use Incense, Lucky Egg, Lure Modules and more.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Auto Hatch Eggs</span><span class="fi-desc">Incubates and hatches eggs automatically based on your incubator settings.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Buddy Feature</span><span class="fi-desc">Auto-feed and pet buddy; supports Roar of Time and mega evolve.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Quest Feature</span><span class="fi-desc">Automatically complete and claim quest rewards, including Special Research.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Notifications</span><span class="fi-desc">Shows catches and PokéStop spins in real time.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Visual Disguiser</span><span class="fi-desc">Removes nonessential map graphics to reduce lag and device heat.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Incognito Name</span><span class="fi-desc">Customize your in-game name to anything you like.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Screen Feature</span><span class="fi-desc">Turn off the display while the app keeps running in the background.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Friend Tweaks</span><span class="fi-desc">Send and receive gifts with one tap; pin postcards, add stickers.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Limit Settings</span><span class="fi-desc">Set limits for encounters, catches and spins.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Import/Export Config</span><span class="fi-desc">Share your settings with friends or import theirs.</span></li>
              </ul>
            </div>

            <!-- PAS -->
            <div class="feature-card feature-card-tool reveal reveal-delay-1">
              <div class="feature-card-visual">
                <div style="display:flex;gap:12px;align-items:center">
                  ${[150,384,249,250,491].map(id => `<div style="width:48px;height:48px">${pokemonImg(id, 'shiny', 48)}</div>`).join('')}
                </div>
              </div>
              <div class="feature-card-meta">
                <div>
                  <div class="feature-card-name">PAS</div>
                  <div class="feature-card-fullname">Pok&eacute;mon Auto Shiny</div>
                </div>
                <span class="badge badge-gold">Shiny</span>
              </div>
              <p class="feature-card-tagline">Bright as the star</p>
              <ul class="feature-list feature-list-full">
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Set Starting Cooldown</span><span class="fi-desc">Set the date, time and location of your last action to respect cooldowns.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Feed Berry</span><span class="fi-desc">Choose a berry to feed before catching.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Pokémon Filters</span><span class="fi-desc">Filter by species, level, IV (hundo or PVP), gender, form, costume and size.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Exclusion List</span><span class="fi-desc">Exclude Pokémon you do not want to catch.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Enhanced Catching</span><span class="fi-desc">Excellent Throw, Curveball and Expert Handler for best capture odds.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Unset Buddy</span><span class="fi-desc">Returns buddy to inventory; helps with catching shiny or shundo Zorua.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Preferred PokéBall</span><span class="fi-desc">Choose which PokéBall to use for catching.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Notifications</span><span class="fi-desc">Shows Pokémon checked, caught and remaining cooldown time.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Visual Disguiser</span><span class="fi-desc">Removes nonessential map graphics to reduce lag and device heat.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Screen Feature</span><span class="fi-desc">Turn off the display while the app keeps running in the background.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Built-in Location</span><span class="fi-desc">Utilizes in-app teleportation; can run without a joystick.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Friend Tweaks</span><span class="fi-desc">Send and receive gifts with one tap; pin postcards, add stickers.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Limit Settings</span><span class="fi-desc">Set limits for encounters and catches.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Import/Export Config</span><span class="fi-desc">Share your settings with friends or import theirs.</span></li>
              </ul>
            </div>

            <!-- PaH -->
            <div class="feature-card feature-card-tool reveal reveal-delay-2">
              <div class="feature-card-visual">
                <div style="display:flex;gap:12px;align-items:center;justify-content:center">
                  ${[175,440,175,440,175].map((id,i) => `<div style="width:48px;height:48px">${pokemonImg(id, 'egg', 48)}</div>`).join('')}
                </div>
              </div>
              <div class="feature-card-meta">
                <div>
                  <div class="feature-card-name">PaH</div>
                  <div class="feature-card-fullname">Pok&eacute;mon Auto Hatcher</div>
                </div>
                <span class="badge badge-purple">Eggs</span>
              </div>
              <p class="feature-card-tagline">Hatching has never been this easy</p>
              <ul class="feature-list feature-list-full">
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Transfer Filters</span><span class="fi-desc">Auto-transfer by IV, shiny, hundo, shundo, 0% IV and egg hatches.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Keep Filters</span><span class="fi-desc">Customize which Pokémon to keep, including XXS, XS, XL and XXL.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Mass Transfer</span><span class="fi-desc">Select and transfer any kind of Pokémon in bulk.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Show IV Instead of Name</span><span class="fi-desc">Replace inventory names with IVs for easier management.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Item Management</span><span class="fi-desc">Maintain preferred item quantities and delete excess items automatically.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Auto Hatch Eggs</span><span class="fi-desc">Incubates and hatches eggs automatically based on your incubator settings.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Auto Spin</span><span class="fi-desc">Automatically spins a PokéStop when egg space is available.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Auto Open Gift</span><span class="fi-desc">Automatically opens friend gifts to receive 7&thinsp;km eggs.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Buddy Feature</span><span class="fi-desc">Auto-feed and pet buddy; supports Roar of Time and mega evolve.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Visual Disguiser</span><span class="fi-desc">Removes nonessential map graphics to reduce lag and device heat.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Incognito Name</span><span class="fi-desc">Customize your in-game name to anything you like.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Screen Feature</span><span class="fi-desc">Turn off the display while the app keeps running in the background.</span></li>
                <li class="feature-item"><span class="fi-dot"></span><span class="fi-name">Friend Tweaks</span><span class="fi-desc">Send and receive gifts with one tap; pin postcards, add stickers.</span></li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      <!-- ═══════════════════ STEPS ═══════════════════ -->
      <section class="section-sm" id="how-to" aria-labelledby="steps-heading">
        <div class="container">
          <div class="section-header reveal">
            <div class="section-tag">How to start</div>
            <h2 class="section-title" id="steps-heading">Three steps to play better</h2>
          </div>

          <div class="steps-grid">
            <div class="step-item reveal">
              <div class="step-number">01</div>
              <div class="step-title">Download the APK</div>
              <p class="step-desc">Download the latest version of PGTools directly via the button below.</p>
              <div class="step-action">
                <a href="#download" class="btn btn-primary" style="width:100%">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download
                </a>
              </div>
            </div>

            <div class="step-item reveal reveal-delay-1">
              <div class="step-number">02</div>
              <div class="step-title">Activate license</div>
              <p class="step-desc">Contact our team via Discord or Facebook to obtain and activate your license.</p>
              <div class="step-action" style="display:flex;gap:8px;flex-wrap:wrap">
                <a href="https://discord.gg/pgtools" class="btn btn-outline" target="_blank" rel="noopener noreferrer" style="flex:1; padding: 0.625rem 0.5rem; justify-content: center;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink: 0;"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.114 18.1.134 18.11a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                  Discord
                </a>
                <a href="https://www.facebook.com/groups/pogo.auto.catch" class="btn btn-outline" target="_blank" rel="noopener noreferrer" style="flex:1; padding: 0.625rem 0.5rem; justify-content: center;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink: 0;"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Facebook
                </a>
              </div>
            </div>

            <div class="step-item reveal reveal-delay-2">
              <div class="step-number">03</div>
              <div class="step-title">Good game</div>
              <p class="step-desc">Configure your preferences and enjoy PGTools to maximize your results in Pokémon GO.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════ DOWNLOAD ═══════════════════ -->
      <section class="section bg-dot-grid" id="download" aria-labelledby="download-heading">
        <div class="container">
          <div class="section-header reveal">
            <div class="section-tag">Download</div>
            <h2 class="section-title" id="download-heading">Choose your version</h2>
            <p class="section-desc">Available versions for different device types and user profiles.</p>
          </div>

          <div class="download-grid">
            <div class="download-card download-card-stable reveal">
              <div class="download-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <div class="download-name">PGTools</div>
                <div class="download-meta">v5.6.15 &mdash; Final APK</div>
              </div>
              <p class="download-desc">Support Game versions: 0.411.1, 0.411.0.</p>
              <div class="download-versions">
                <span class="download-version-tag">Android 9+</span>
                <span class="download-version-tag">Root required</span>
              </div>
              <a href="#" class="download-btn" download>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/></svg>
                Download APK
              </a>
            </div>

            <div class="download-card download-card-beta reveal reveal-delay-1">
              <div class="download-icon" style="color:var(--gold)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </div>
              <div>
                <div class="download-name">PGTools Beta</div>
                <div class="download-meta">v5.6.15 &mdash; Beta Test</div>
              </div>
              <p class="download-desc">Latest features in testing phase. May contain instabilities. Support Game versions: 0.411.1, 0.411.0.</p>
              <div class="download-versions">
                <span class="download-version-tag">Android 9+</span>
                <span class="download-version-tag">Root required</span>
              </div>
              <a href="#" class="download-btn" download>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/></svg>
                Download Beta
              </a>
            </div>

            <div class="download-card download-card-hub reveal reveal-delay-2">
              <div class="download-icon" style="color:var(--blue)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              </div>
              <div>
                <div class="download-name">PGTools Hub</div>
                <div class="download-meta">v2.4.0 &mdash; Manager</div>
              </div>
              <p class="download-desc">Data Hub is an application that provides coordinates for Rockets and allows you to customize which grunt appears, including their gender and type.</p>
              <div class="download-versions">
                <span class="download-version-tag">Android 8+</span>
                <span class="download-version-tag">No root</span>
              </div>
              <a href="#" class="download-btn" download>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/></svg>
                Download Hub
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════ FOOTER ═══════════════════ -->
      <footer class="footer" aria-label="Footer">
        <div class="container">
          <div class="footer-inner">
            <div>
              <div class="footer-brand-logo">
                <img src="/favicon.ico" alt="PGTools" width="28" height="28" style="border-radius:6px" />
                <span><em>PG</em>&thinsp;Tools</span>
              </div>
              <p class="footer-brand-desc">The ultimate tool for dedicated Pokémon GO players.</p>
            </div>
            <div>
              <div class="footer-col-title">Navigation</div>
              <nav class="footer-links">
                <a href="/#features">Features</a>
                <a href="/#how-to">How to start</a>
                <a href="/#download">Download</a>
              </nav>
            </div>
            <div>
              <div class="footer-col-title">Community</div>
              <nav class="footer-links">
                <a href="https://discord.gg/pgtools" target="_blank" rel="noopener noreferrer">Discord</a>
                <a href="/rocket-grunt" data-route="/rocket-grunt">Rocket Grunts</a>
                <a href="/raids" data-route="/raids">Raids</a>
              </nav>
            </div>
          </div>
          <div class="footer-bottom">
            <span>&copy; 2026 PGTools. All rights reserved.</span>
            <span>Pokémon GO is a registered trademark of Niantic, Inc.</span>
          </div>
        </div>
      </footer>

    </div>
  `;
}

export function initHome() {
  // Scroll reveal
  requestAnimationFrame(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach(el => {
      // Elements already in viewport trigger immediately
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible');
      } else {
        observer.observe(el);
      }
    });
  });
}
