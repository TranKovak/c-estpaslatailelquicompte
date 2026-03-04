<script>
  import { createEventDispatcher, onDestroy } from 'svelte';
  import { importFromCamera, importFromText } from '$lib/qrcode.js';
  import { saveRecipe } from '$lib/db.js';
  import { loadRecipes } from '$lib/stores.js';
  import { _ } from '$lib/i18n/index.js';

  const dispatch = createEventDispatcher();

  let activeTab = 'scan'; // 'scan' | 'paste'
  let videoEl;
  let pasteJson = '';
  let scanning = false;
  let scanError = '';
  let pasteError = '';
  let importing = false;
  let scanStarted = false;
  let destroyed = false;

  function stopActiveStream() {
    if (videoEl && videoEl.srcObject) {
      videoEl.srcObject.getTracks().forEach((t) => t.stop());
      videoEl.srcObject = null;
    }
  }

  async function startScan() {
    scanError = '';
    scanning = true;
    scanStarted = true;
    try {
      const recipe = await importFromCamera(videoEl);
      if (destroyed) return;
      stopActiveStream();
      await importRecipe(recipe);
    } catch (e) {
      stopActiveStream();
      if (!destroyed) {
        scanError = e.message;
        scanning = false;
      }
    }
  }

  async function handlePaste() {
    pasteError = '';
    try {
      const recipe = importFromText(pasteJson);
      await importRecipe(recipe);
    } catch (e) {
      pasteError = e.message;
    }
  }

  async function importRecipe(recipe) {
    importing = true;
    try {
      const toImport = { ...recipe, id: undefined, createdAt: undefined, updatedAt: undefined };
      await saveRecipe(toImport);
      await loadRecipes();
      dispatch('imported', recipe.name);
    } catch (e) {
      pasteError = $_('import_modal.import_error', { values: { message: e.message } });
    } finally {
      importing = false;
    }
  }

  function close() {
    dispatch('close');
  }

  onDestroy(() => {
    destroyed = true;
    stopActiveStream();
  });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="modal-overlay" on:click|self={close}>
  <div class="modal-box">
    <div class="modal-header">
      <span class="modal-title">{$_('import_modal.title')}</span>
      <button type="button" class="btn btn-ghost close-btn" on:click={close}>✕</button>
    </div>

    <div class="tabs">
      <button
        type="button"
        class="tab"
        class:active={activeTab === 'scan'}
        on:click={() => (activeTab = 'scan')}
      >{$_('import_modal.tab_scan')}</button>
      <button
        type="button"
        class="tab"
        class:active={activeTab === 'paste'}
        on:click={() => (activeTab = 'paste')}
      >{$_('import_modal.tab_paste')}</button>
    </div>

    {#if activeTab === 'scan'}
      <div class="scan-panel">
        <video bind:this={videoEl} class="video-feed" muted playsinline></video>
        {#if !scanStarted}
          <button type="button" class="btn btn-primary mt-2 w-full" on:click={startScan} disabled={scanning}>
            {$_('import_modal.start_camera')}
          </button>
        {/if}
        {#if scanning && !scanError}
          <p class="text-muted text-sm text-center mt-1">{$_('import_modal.scanning_hint')}</p>
        {/if}
        {#if scanError}
          <p class="error mt-1">{scanError}</p>
          <button type="button" class="btn btn-secondary mt-1 w-full" on:click={startScan}>{$_('import_modal.retry')}</button>
        {/if}
      </div>
    {/if}

    {#if activeTab === 'paste'}
      <div class="paste-panel">
        <label for="paste-json">{$_('import_modal.paste_label')}</label>
        <textarea
          id="paste-json"
          bind:value={pasteJson}
          placeholder={$_('import_modal.paste_placeholder')}
          rows="8"
        ></textarea>
        {#if pasteError}
          <p class="error mt-1">{pasteError}</p>
        {/if}
        <button
          type="button"
          class="btn btn-primary mt-2 w-full"
          on:click={handlePaste}
          disabled={importing || !pasteJson.trim()}
        >
          {importing ? $_('import_modal.importing') : $_('import_modal.import_btn')}
        </button>
      </div>
    {/if}

  </div>
</div>

<style>
  .tabs {
    display: flex;
    border-bottom: 1px solid var(--border);
    margin-bottom: 1rem;
  }

  .tab {
    flex: 1;
    background: none;
    border: none;
    padding: 0.6rem;
    font-size: 0.9rem;
    color: var(--text-muted);
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: color 0.15s, border-color 0.15s;
  }

  .tab.active {
    color: var(--accent);
    border-bottom-color: var(--accent);
  }

  .scan-panel, .paste-panel {
    display: flex;
    flex-direction: column;
  }

  .video-feed {
    width: 100%;
    max-height: 300px;
    background: #000;
    border-radius: var(--radius);
    object-fit: cover;
  }

  .error {
    color: var(--danger);
    font-size: 0.85rem;
  }

  .close-btn {
    padding: 0.3rem 0.6rem;
    font-size: 0.9rem;
  }
</style>
