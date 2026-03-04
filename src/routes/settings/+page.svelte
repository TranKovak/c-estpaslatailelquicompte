<script>
  import { exportLibrary, importLibrary } from '$lib/export.js';
  import { loadRecipes } from '$lib/stores.js';
  import ImportModal from '$lib/components/ImportModal.svelte';

  let exporting = false;
  let importing = false;
  let importStatus = '';
  let importError = '';
  let fileInput;
  let showImportModal = false;

  async function handleExport() {
    exporting = true;
    try {
      await exportLibrary();
    } catch (e) {
      alert('Erreur lors de l\'export : ' + e.message);
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
      importStatus = `${count} recette${count > 1 ? 's' : ''} importée${count > 1 ? 's' : ''} avec succès !`;
    } catch (err) {
      importError = 'Erreur : ' + err.message;
    } finally {
      importing = false;
      if (fileInput) fileInput.value = '';
    }
  }
</script>

<svelte:head>
  <title>Paramètres — CPLQ</title>
</svelte:head>

<h1 class="page-title">Paramètres</h1>

<div class="settings-section card">
  <h2 class="section-heading">Bibliothèque de recettes</h2>
  <p class="text-muted text-sm mb-2">Exportez ou importez toutes vos recettes au format JSON. L'import ne supprime pas les recettes existantes.</p>

  <div class="settings-actions">
    <button
      type="button"
      class="btn btn-primary"
      on:click={handleExport}
      disabled={exporting}
    >
      {exporting ? 'Export en cours…' : '⬇ Exporter toutes les recettes'}
    </button>

    <label class="btn btn-secondary import-label" for="import-file">
      {importing ? 'Import en cours…' : '⬆ Importer des recettes'}
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

<div class="settings-section card mt-2">
  <h2 class="section-heading">Partage QR code</h2>
  <p class="text-muted text-sm mb-2">Importez une recette depuis un QR code partagé par un autre utilisateur.</p>
  <button type="button" class="btn btn-ghost" on:click={() => (showImportModal = true)}>
    📷 Importer depuis QR code ou JSON
  </button>
</div>

<div class="settings-section card mt-2">
  <h2 class="section-heading">À propos</h2>
  <p class="text-muted text-sm">
    <strong>C'est pas la taille qui compte</strong> — Calculateur de recettes en pourcentages boulangers.<br />
    PWA 100% offline. Vos données restent sur votre appareil.
  </p>
</div>

{#if showImportModal}
  <ImportModal
    on:close={() => (showImportModal = false)}
    on:imported={async (e) => {
      showImportModal = false;
      await loadRecipes();
      importStatus = `Recette "${e.detail}" importée !`;
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
