<script>
  import '../app.css';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { setupI18n, _, locale } from '$lib/i18n/index.js';
  import { isLoading } from 'svelte-i18n';
  import { browser } from '$app/environment';

  const langs = [
    { code: 'fr', flag: '🇫🇷', label: 'Français' },
    { code: 'en', flag: '🇬🇧', label: 'English' },
    { code: 'es', flag: '🇪🇸', label: 'Español' },
    { code: 'qya', flag: '🧝', label: 'Quenya' }
  ];

  setupI18n();

  // Font elfique sur le body quand Quenya est actif
  $: if (browser) {
    document.body.classList.toggle('lang-qya', $locale === 'qya');
  }

  let menuOpen = false;
  function toggleMenu() { menuOpen = !menuOpen; }
  function closeMenu() { menuOpen = false; }

  // Ferme le menu si on navigue
  $: $page.url.pathname, closeMenu();

  let deferredPrompt = null;
  let showInstall = false;
  let isIos = false;
  let iosHint = false;

  onMount(() => {
    isIos = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
    if (isIos && !isStandalone) showInstall = true;

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      showInstall = true;
    });
    window.addEventListener('appinstalled', () => {
      showInstall = false;
      deferredPrompt = null;
    });
  });

  async function handleInstall() {
    if (isIos) { iosHint = !iosHint; return; }
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') showInstall = false;
    deferredPrompt = null;
  }

  $: currentLang = langs.find(l => l.code === $locale) ?? langs[0];
</script>

{#if !$isLoading}
<div class="app-shell">
  <nav class="navbar">
    <div class="nav-bar">
      <a href="/" class="nav-brand">🍞 CPLQ <span class="nav-version">v{__APP_VERSION__}</span></a>

      <button
        type="button"
        class="burger"
        on:click={toggleMenu}
        aria-label="Menu"
        aria-expanded={menuOpen}
      >
        {#if menuOpen}✕{:else}☰{/if}
      </button>
    </div>

    {#if menuOpen}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="nav-drawer" on:click|self={closeMenu}>
      <div class="drawer-links">
        <a href="/" class:active={$page.url.pathname === '/'} on:click={closeMenu}>{$_('nav.recipes')}</a>
        <a href="/history" class:active={$page.url.pathname === '/history'} on:click={closeMenu}>{$_('nav.history')}</a>
        <a href="/settings" class:active={$page.url.pathname === '/settings'} on:click={closeMenu}>{$_('nav.settings')}</a>
      </div>

      <div class="drawer-bottom">
        <!-- Sélecteur de langue -->
        <div class="lang-select-wrapper">
          <span class="lang-current-flag">{currentLang.flag}</span>
          <select
            class="lang-select"
            value={$locale}
            on:change={(e) => locale.set(e.target.value)}
          >
            {#each langs as lang}
              <option value={lang.code}>{lang.flag} {lang.label}</option>
            {/each}
          </select>
          <span class="lang-chevron">▾</span>
        </div>

        {#if showInstall}
          <button type="button" class="btn-install" on:click={handleInstall}>
            {$_('nav.install')}
          </button>
        {/if}
      </div>

      {#if iosHint}
        <div class="ios-hint">{$_('ios_hint')}</div>
      {/if}
    </div>
    {/if}
  </nav>

  <main class="main-content">
    <div class="container">
      <slot />
    </div>
  </main>
</div>
{/if}

<style>
  .app-shell {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  /* ── Navbar ── */
  .navbar {
    background: var(--bg-surface);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .nav-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    max-width: 680px;
    margin: 0 auto;
    width: 100%;
  }

  .nav-brand {
    font-weight: 700;
    font-size: 1.1rem;
    color: var(--accent);
    text-decoration: none;
  }

  .nav-version {
    font-size: 0.65rem;
    font-weight: 400;
    opacity: 0.6;
    vertical-align: middle;
  }

  /* ── Burger ── */
  .burger {
    background: none;
    border: none;
    font-size: 1.3rem;
    cursor: pointer;
    color: var(--text);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
    line-height: 1;
    transition: background 0.15s;
  }

  .burger:hover {
    background: var(--bg-surface-2);
  }

  /* ── Drawer ── */
  .nav-drawer {
    border-top: 1px solid var(--border);
    background: var(--bg-surface);
    padding: 0.75rem 1rem 1rem;
    max-width: 680px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    animation: slideDown 0.15s ease;
  }

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .drawer-links {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  .drawer-links a {
    font-size: 1rem;
    color: var(--text-muted);
    text-decoration: none;
    padding: 0.6rem 0.5rem;
    border-radius: var(--radius);
    border-left: 3px solid transparent;
    transition: color 0.15s, background 0.15s, border-color 0.15s;
  }

  .drawer-links a:hover {
    background: var(--bg-surface-2);
    color: var(--text);
  }

  .drawer-links a.active {
    color: var(--accent);
    border-left-color: var(--accent);
    background: var(--bg-surface-2);
    font-weight: 600;
  }

  .drawer-bottom {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--border);
    flex-wrap: wrap;
  }

  /* ── Language select ── */
  .lang-select-wrapper {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background: var(--bg-surface-2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0.3rem 0.6rem;
    position: relative;
  }

  .lang-current-flag {
    font-size: 1.1rem;
    line-height: 1;
    pointer-events: none;
  }

  .lang-select {
    background: none;
    border: none;
    font-size: 0.9rem;
    color: var(--text);
    cursor: pointer;
    appearance: none;
    padding-right: 0.75rem;
    outline: none;
  }

  .lang-chevron {
    font-size: 0.7rem;
    color: var(--text-muted);
    pointer-events: none;
    margin-left: -0.5rem;
  }

  /* ── Install ── */
  .btn-install {
    background: var(--accent);
    color: #fff;
    border: none;
    border-radius: var(--radius);
    padding: 0.35rem 0.75rem;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
  }

  .ios-hint {
    font-size: 0.8rem;
    color: var(--text-muted);
    padding: 0.4rem 0.5rem;
    text-align: center;
    border-top: 1px solid var(--border);
  }

  .main-content {
    flex: 1;
    padding: 1.5rem 0 3rem;
  }
</style>
