<script>
  import { exportLibrary, importLibrary } from '$lib/export.js';
  import { loadRecipes } from '$lib/stores.js';
  import { _, locale } from '$lib/i18n/index.js';
  import { get } from 'svelte/store';
  import ImportModal from '$lib/components/ImportModal.svelte';

  let exporting = false;
  let importing = false;
  let importStatus = '';
  let importError = '';
  let fileInput;
  let showImportModal = false;

  const languages = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'qya', label: 'Quenya' }
  ];

  async function handleExport() {
    exporting = true;
    try {
      await exportLibrary();
    } catch (e) {
      alert(get(_)('settings.export_error', { values: { message: e.message } }));
    } finally {
      exporting = false;
    }
  }

  async function handleImportFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    importing = true;
    importStatus = '';
    importError = '';
    try {
      const count = await importLibrary(file);
      await loadRecipes();
      importStatus = get(_)('settings.import_success', { values: { count } });
    } catch (err) {
      importError = get(_)('settings.import_error', { values: { message: err.message } });
    } finally {
      importing = false;
      if (fileInput) fileInput.value = '';
    }
  }
</script>

<svelte:head>
  <title>{$_('settings.title')} — CPLQ</title>
</svelte:head>

<h1 class="page-title">{$_('settings.title')}</h1>

<!-- Langue -->
<div class="settings-section card">
  <h2 class="section-heading">{$_('settings.language_heading')}</h2>
  <div class="lang-btns">
    {#each languages as lang}
      <button
        type="button"
        class="lang-btn"
        class:active={$locale === lang.code}
        on:click={() => locale.set(lang.code)}
      >{lang.label}</button>
    {/each}
  </div>
</div>

<!-- Bibliothèque -->
<div class="settings-section card mt-2">
  <h2 class="section-heading">{$_('settings.library_heading')}</h2>
  <p class="text-muted text-sm mb-2">{$_('settings.library_hint')}</p>

  <div class="settings-actions">
    <button
      type="button"
      class="btn btn-primary"
      on:click={handleExport}
      disabled={exporting}
    >
      {exporting ? $_('settings.exporting') : $_('settings.export_btn')}
    </button>

    <label class="btn btn-secondary import-label" for="import-file">
      {importing ? $_('settings.importing') : $_('settings.import_btn')}
      <input
        bind:this={fileInput}
        id="import-file"
        type="file"
        accept=".json"
        on:change={handleImportFile}
        class="hidden-file-input"
        disabled={importing}
      />
    </label>
  </div>

  {#if importStatus}
    <p class="import-success">{importStatus}</p>
  {/if}

  {#if importError}
    <p class="import-error">{importError}</p>
  {/if}
</div>

<!-- QR -->
<div class="settings-section card mt-2">
  <h2 class="section-heading">{$_('settings.qr_heading')}</h2>
  <p class="text-muted text-sm mb-2">{$_('settings.qr_hint')}</p>
  <button type="button" class="btn btn-ghost" on:click={() => (showImportModal = true)}>
    {$_('settings.qr_btn')}
  </button>
</div>

<!-- À propos -->
<div class="settings-section card mt-2">
  <h2 class="section-heading">{$_('settings.about_heading')}</h2>
  <p class="text-muted text-sm">
    <strong>C'est pas la taille qui compte</strong> — {$_('settings.about_text')}
  </p>
</div>

{#if showImportModal}
  <ImportModal
    on:close={() => (showImportModal = false)}
    on:imported={async (e) => {
      showImportModal = false;
      await loadRecipes();
      importStatus = get(_)('settings.imported', { values: { name: e.detail } });
    }}
  />
{/if}

<style>
  .page-title {
    font-size: 1.6rem;
    font-weight: 700;
    margin-bottom: 1.25rem;
  }

  .settings-section {
    padding: 1.25rem;
  }

  .section-heading {
    font-size: 1.05rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .lang-btns {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .lang-btn {
    background: var(--bg-surface-2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0.4rem 0.9rem;
    font-size: 0.9rem;
    cursor: pointer;
    color: var(--text-muted);
    transition: background 0.15s, color 0.15s, border-color 0.15s;
  }

  .lang-btn.active {
    background: var(--accent);
    color: #fff;
    border-color: var(--accent);
    font-weight: 600;
  }

  .settings-actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .import-label {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .hidden-file-input {
    display: none;
  }

  .import-success {
    color: var(--success);
    font-size: 0.9rem;
    margin-top: 0.75rem;
  }

  .import-error {
    color: var(--danger);
    font-size: 0.9rem;
    margin-top: 0.75rem;
  }
</style>
