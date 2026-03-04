<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { getRecipe, deleteRecipe, saveHistoryEntry, saveRecipe } from '$lib/db.js';
  import { calculateFromBreadWeight, calculateFromFlourWeight } from '$lib/calculator.js';
  import { loadRecipes } from '$lib/stores.js';
  import { _, dateLocale } from '$lib/i18n/index.js';
  import { get } from 'svelte/store';
  import QRModal from '$lib/components/QRModal.svelte';
  import ImportModal from '$lib/components/ImportModal.svelte';

  let recipe = null;
  let loading = true;
  let error = '';

  // Calculateur
  let calcMode = 'bread'; // 'bread' | 'flour'
  let inputValue = 800;
  $: calcResult = recipe
    ? calcMode === 'bread'
      ? calculateFromBreadWeight(recipe, Number(inputValue) || 0)
      : calculateFromFlourWeight(recipe, Number(inputValue) || 0)
    : null;

  // Mode essai
  let trialMode = false;
  let trialIngredients = [];
  $: trialRecipe = trialMode
    ? { ...recipe, ingredients: trialIngredients }
    : recipe;
  $: trialResult = trialRecipe && trialMode
    ? calcMode === 'bread'
      ? calculateFromBreadWeight(trialRecipe, Number(inputValue) || 0)
      : calculateFromFlourWeight(trialRecipe, Number(inputValue) || 0)
    : calcResult;

  function startTrial() {
    trialIngredients = recipe.ingredients.map((i) => ({ ...i }));
    trialMode = true;
  }

  function cancelTrial() {
    trialMode = false;
    trialIngredients = [];
  }

  async function saveTrialAsNew() {
    const newRecipe = {
      ...recipe,
      id: undefined,
      name: recipe.name + get(_)('recipe.trial_suffix'),
      ingredients: trialIngredients,
      createdAt: undefined,
      updatedAt: undefined
    };
    const id = await saveRecipe(newRecipe);
    await loadRecipes();
    goto(`/recipe/${id}`);
  }

  // Historique
  let showHistoryModal = false;
  let historyNote = '';
  let historyPhoto = null;
  let savingHistory = false;

  async function saveToHistory() {
    savingHistory = true;
    const result = trialResult;
    await saveHistoryEntry({
      recipeName: recipe.name,
      targetBreadWeight: calcMode === 'bread' ? Number(inputValue) : result.breadWeight,
      flourWeight: result.flourWeight,
      ingredientsCalculated: result.ingredients,
      note: historyNote,
      photo: historyPhoto
    });
    showHistoryModal = false;
    historyNote = '';
    historyPhoto = null;
    savingHistory = false;
    alert(get(_)('recipe.batch_saved'));
  }

  // QR / Import
  let showQRModal = false;
  let showImportModal = false;

  // Suppression
  async function handleDelete() {
    if (!confirm(get(_)('recipe.confirm_delete', { values: { name: recipe.name } }))) return;
    await deleteRecipe(recipe.id);
    await loadRecipes();
    goto('/');
  }

  onMount(async () => {
    const id = $page.params.id;
    recipe = await getRecipe(id);
    if (!recipe) error = 'recipe.not_found';
    loading = false;
  });

  function formatDate(ts) {
    if (!ts) return '';
    return new Date(ts).toLocaleDateString($dateLocale, { day: 'numeric', month: 'long', year: 'numeric' });
  }

  // Lien vers mode pas-à-pas
  $: stepsHref = recipe
    ? `/recipe/${recipe.id}/steps?breadWeight=${calcMode === 'bread' ? inputValue : (trialResult?.breadWeight ?? 0)}`
    : '#';
</script>

<svelte:head>
  <title>{recipe ? recipe.name : $_('recipe.loading')} — CPLQ</title>
</svelte:head>

{#if loading}
  <p class="text-muted">{$_('recipe.loading')}</p>
{:else if error}
  <div class="error-state">
    <p>{$_(error)}</p>
    <a href="/" class="btn btn-secondary mt-2">{$_('recipe.back_home')}</a>
  </div>
{:else}
  <div class="recipe-page">

    <!-- Header -->
    <div class="page-header">
      <a href="/" class="back-link">{$_('recipe.back')}</a>
      <div class="header-actions">
        <a href={`/recipe/${recipe.id}/edit`} class="btn btn-secondary btn-sm">{$_('recipe.edit')}</a>
        <button type="button" class="btn btn-danger btn-sm" on:click={handleDelete}>{$_('recipe.delete')}</button>
      </div>
    </div>

    <!-- Photo + infos -->
    {#if recipe.photo}
      <img src={recipe.photo} alt={recipe.name} class="recipe-hero" />
    {/if}

    <h1 class="recipe-title">{recipe.name}</h1>

    {#if recipe.tags.length > 0}
      <div class="recipe-tags">
        {#each recipe.tags as tag}
          <span class="tag">{tag}</span>
        {/each}
      </div>
    {/if}

    <!-- Infos rapides -->
    <div class="recipe-meta">
      {#if recipe.proofingTime}
        <div class="meta-item"><span class="meta-label">{$_('recipe.proofing')}</span><span>{recipe.proofingTime}</span></div>
      {/if}
      {#if recipe.bakingTime}
        <div class="meta-item"><span class="meta-label">{$_('recipe.baking')}</span><span>{recipe.bakingTime}</span></div>
      {/if}
      <div class="meta-item"><span class="meta-label">{$_('recipe.evaporation')}</span><span>{recipe.evaporationRate}%</span></div>
    </div>

    {#if recipe.notes}
      <p class="recipe-notes">{recipe.notes}</p>
    {/if}

    <hr />

    <!-- Ingrédients (lecture seule) -->
    <div class="section-title">{$_('recipe.ingredients_title')}</div>
    <ul class="ingredient-list">
      {#each (trialMode ? trialIngredients : recipe.ingredients) as ing, i}
        <li class="ingredient-item">
          <span class="ing-name">{ing.name}</span>
          {#if trialMode && i > 0}
            <input
              type="number"
              value={trialIngredients[i].percentage}
              on:input={(e) => {
                trialIngredients[i] = { ...trialIngredients[i], percentage: Number(e.target.value) };
                trialIngredients = [...trialIngredients];
              }}
              min="0"
              max="500"
              step="0.1"
              class="trial-pct-input"
            />
            <span class="ing-pct-label">%</span>
          {:else}
            <span class="ing-pct">{ing.percentage}%</span>
          {/if}
        </li>
      {/each}
    </ul>

    <!-- Bouton mode essai -->
    {#if !trialMode}
      <button type="button" class="btn btn-ghost btn-sm trial-btn" on:click={startTrial}>
        {$_('recipe.trial_btn')}
      </button>
    {:else}
      <div class="trial-actions">
        <button type="button" class="btn btn-secondary btn-sm" on:click={cancelTrial}>{$_('recipe.cancel_trial')}</button>
        <button type="button" class="btn btn-primary btn-sm" on:click={saveTrialAsNew}>{$_('recipe.save_trial')}</button>
      </div>
    {/if}

    <hr />

    <!-- Calculateur -->
    <div class="section-title">{$_('recipe.calculator')}</div>

    <div class="calc-mode-switch">
      <button
        type="button"
        class="mode-btn"
        class:active={calcMode === 'bread'}
        on:click={() => { calcMode = 'bread'; inputValue = 800; }}
      >{$_('recipe.mode_bread')}</button>
      <button
        type="button"
        class="mode-btn"
        class:active={calcMode === 'flour'}
        on:click={() => { calcMode = 'flour'; inputValue = 300; }}
      >{$_('recipe.mode_flour')}</button>
    </div>

    <div class="calc-input-row">
      <input
        type="number"
        bind:value={inputValue}
        min="1"
        step="1"
        class="calc-input"
        aria-label={calcMode === 'bread' ? $_('recipe.mode_bread') : $_('recipe.mode_flour')}
      />
      <span class="calc-unit">g</span>
    </div>

    {#if trialResult}
      <div class="calc-results card">
        {#if calcMode === 'flour'}
          <div class="result-total">
            <span>{$_('recipe.bread_result')}</span>
            <strong>{trialResult.breadWeight} g</strong>
          </div>
          <hr />
        {/if}
        <ul class="result-list">
          {#each trialResult.ingredients as ing}
            <li class="result-item">
              <span>{ing.name}</span>
              <strong>{ing.weight} g</strong>
            </li>
          {/each}
        </ul>
        {#if calcMode === 'bread'}
          <hr />
          <div class="result-total">
            <span>{$_('recipe.dough_total')}</span>
            <strong>{trialResult.doughWeight} g</strong>
          </div>
        {/if}
      </div>
    {/if}

    <!-- Actions calculateur -->
    <div class="calc-actions">
      <a href={stepsHref} class="btn btn-primary">{$_('recipe.steps_btn')}</a>
      <button type="button" class="btn btn-secondary" on:click={() => (showHistoryModal = true)}>
        {$_('recipe.save_batch')}
      </button>
      <button type="button" class="btn btn-ghost" on:click={() => (showQRModal = true)}>
        {$_('recipe.share')}
      </button>
    </div>

  </div>
{/if}

<!-- Modal historique -->
{#if showHistoryModal}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="modal-overlay" on:click|self={() => (showHistoryModal = false)}>
    <div class="modal-box">
      <div class="modal-header">
        <span class="modal-title">{$_('batch_modal.title')}</span>
        <button type="button" class="btn btn-ghost" on:click={() => (showHistoryModal = false)}>✕</button>
      </div>
      <div class="form-group">
        <label for="hist-note">{$_('batch_modal.note_label')}</label>
        <textarea id="hist-note" bind:value={historyNote} placeholder={$_('batch_modal.note_placeholder')} rows="3"></textarea>
      </div>
      <div class="form-group">
        <label>{$_('batch_modal.photo_label')}</label>
        <input type="file" accept="image/*" on:change={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => { historyPhoto = reader.result; };
          reader.readAsDataURL(file);
        }} />
      </div>
      <div class="modal-actions">
        <button type="button" class="btn btn-secondary" on:click={() => (showHistoryModal = false)}>{$_('batch_modal.cancel')}</button>
        <button type="button" class="btn btn-primary" on:click={saveToHistory} disabled={savingHistory}>
          {savingHistory ? $_('batch_modal.saving') : $_('batch_modal.save')}
        </button>
      </div>
    </div>
  </div>
{/if}

<!-- Modal QR code -->
{#if showQRModal && recipe}
  <QRModal {recipe} on:close={() => (showQRModal = false)} />
{/if}

<!-- Modal import -->
{#if showImportModal}
  <ImportModal
    on:close={() => (showImportModal = false)}
    on:imported={(e) => { showImportModal = false; alert(get(_)('recipe.imported', { values: { name: e.detail } })); }}
  />
{/if}

<style>
  .recipe-page {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .back-link {
    font-size: 0.9rem;
    color: var(--text-muted);
  }

  .header-actions {
    display: flex;
    gap: 0.5rem;
  }

  .btn-sm {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  }

  .recipe-hero {
    width: 100%;
    max-height: 280px;
    object-fit: cover;
    border-radius: var(--radius-lg);
    margin-bottom: 1rem;
  }

  .recipe-title {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .recipe-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-bottom: 0.75rem;
  }

  .recipe-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 0.75rem;
  }

  .meta-item {
    display: flex;
    flex-direction: column;
    font-size: 0.9rem;
  }

  .meta-label {
    font-size: 0.75rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .recipe-notes {
    color: var(--text-muted);
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 0.5rem;
  }

  .ingredient-list {
    list-style: none;
    margin-bottom: 0.75rem;
  }

  .ingredient-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.35rem 0;
    border-bottom: 1px solid var(--border);
  }

  .ingredient-item:last-child {
    border-bottom: none;
  }

  .ing-name {
    flex: 1;
  }

  .ing-pct {
    font-weight: 600;
    color: var(--accent);
    min-width: 3.5rem;
    text-align: right;
  }

  .trial-pct-input {
    width: 70px;
    text-align: right;
    padding: 0.25rem 0.4rem;
  }

  .ing-pct-label {
    color: var(--text-muted);
    font-size: 0.85rem;
  }

  .trial-btn {
    margin-bottom: 0.5rem;
  }

  .trial-actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 0.5rem;
  }

  .calc-mode-switch {
    display: flex;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    margin-bottom: 1rem;
  }

  .mode-btn {
    flex: 1;
    background: none;
    border: none;
    padding: 0.6rem 0.5rem;
    font-size: 0.9rem;
    color: var(--text-muted);
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }

  .mode-btn.active {
    background: var(--accent);
    color: #fff;
    font-weight: 600;
  }

  .calc-input-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .calc-input {
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
    padding: 0.5rem;
    flex: 1;
  }

  .calc-unit {
    font-size: 1.2rem;
    color: var(--text-muted);
    flex-shrink: 0;
  }

  .calc-results {
    margin-bottom: 1rem;
  }

  .result-list {
    list-style: none;
  }

  .result-item {
    display: flex;
    justify-content: space-between;
    padding: 0.4rem 0;
    border-bottom: 1px solid var(--border);
    font-size: 0.95rem;
  }

  .result-item:last-child {
    border-bottom: none;
  }

  .result-total {
    display: flex;
    justify-content: space-between;
    padding: 0.4rem 0;
    font-size: 1rem;
    font-weight: 600;
    color: var(--accent);
  }

  .calc-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .modal-actions {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
    margin-top: 1rem;
  }

  .error-state {
    text-align: center;
    padding: 2rem;
  }
</style>
