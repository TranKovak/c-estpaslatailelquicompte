<script>
  import '../app.css';
  import { page } from '$app/stores';
</script>

<div class="app-shell">
  <nav class="navbar">
    <div class="container">
      <a href="/" class="nav-brand">🍞 CPLQ</a>
      <div class="nav-links">
        <a href="/" class:active={$page.url.pathname === '/'}>Recettes</a>
        <a href="/history" class:active={$page.url.pathname === '/history'}>Historique</a>
        <a href="/settings" class:active={$page.url.pathname === '/settings'}>Paramètres</a>
      </div>
    </div>
  </nav>

  <main class="main-content">
    <div class="container">
      <slot />
    </div>
  </main>
</div>

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

  .main-content {
    flex: 1;
    padding: 1.5rem 0 3rem;
  }
</style>
