<script>
  import '../app.css';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { setupI18n, _, locale } from '$lib/i18n/index.js';
  import { isLoading } from 'svelte-i18n';

  setupI18n();

  let deferredPrompt = null;
  let showInstall = false;
  let isIos = false;
  let iosHint = false;

  onMount(() => {
    isIos = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;

    if (isIos && !isStandalone) {
      showInstall = true;
    }

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
    if (isIos) {
      iosHint = !iosHint;
      return;
    }
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') showInstall = false;
    deferredPrompt = null;
  }
</script>

{#if !$isLoading}
<div class="app-shell">
  <nav class="navbar">
    <div class="container">
      <a href="/" class="nav-brand">🍞 CPLQ <span class="nav-version">v{__APP_VERSION__}</span></a>
      <div class="nav-links">
        <a href="/" class:active={$page.url.pathname === '/'}>{$_('nav.recipes')}</a>
        <a href="/history" class:active={$page.url.pathname === '/history'}>{$_('nav.history')}</a>
        <a href="/settings" class:active={$page.url.pathname === '/settings'}>{$_('nav.settings')}</a>
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

  .navbar {
    background: var(--bg-surface);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .navbar .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
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

  .nav-links {
    display: flex;
    gap: 1.25rem;
  }

  .nav-links a {
    font-size: 0.9rem;
    color: var(--text-muted);
    text-decoration: none;
    padding: 0.25rem 0;
    border-bottom: 2px solid transparent;
    transition: color 0.15s, border-color 0.15s;
  }

  .nav-links a:hover,
  .nav-links a.active {
    color: var(--accent);
    border-bottom-color: var(--accent);
  }

  .btn-install {
    background: var(--accent);
    color: #fff;
    border: none;
    border-radius: var(--radius);
    padding: 0.25rem 0.65rem;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
  }

  .ios-hint {
    font-size: 0.8rem;
    color: var(--text-muted);
    padding: 0.4rem 0;
    text-align: center;
    border-top: 1px solid var(--border);
  }

  .main-content {
    flex: 1;
    padding: 1.5rem 0 3rem;
  }
</style>
