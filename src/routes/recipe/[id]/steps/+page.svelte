<script>
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { getRecipe } from '$lib/db.js';
  import { calculateFromBreadWeight } from '$lib/calculator.js';
  import { _ } from '$lib/i18n/index.js';

  let recipe = null;
  let loading = true;
  let error = '';
  let currentStep = 0;
  let calcResult = null;

  // Wake Lock
  let wakeLock = null;

  async function requestWakeLock() {
    if (!('wakeLock' in navigator)) return;
    try {
      wakeLock = await navigator.wakeLock.request('screen');
    } catch (e) {
      console.warn('Wake Lock non disponible :', e.message);
    }
  }

  async function releaseWakeLock() {
    if (wakeLock) {
      try {
        await wakeLock.release();
      } catch {}
      wakeLock = null;
    }
  }

  async function handleVisibilityChange() {
    if (document.visibilityState === 'visible' && !wakeLock) {
      await requestWakeLock();
    }
  }

  onMount(async () => {
    const id = $page.params.id;
    const breadWeightParam = $page.url.searchParams.get('breadWeight');
    const breadWeight = breadWeightParam ? Number(breadWeightParam) : 800;

    recipe = await getRecipe(id);
    if (!recipe) {
      error = 'recipe.not_found';
      loading = false;
      return;
    }

    calcResult = calculateFromBreadWeight(recipe, breadWeight);
    loading = false;

    await requestWakeLock();
    document.addEventListener('visibilitychange', handleVisibilityChange);
  });

  onDestroy(async () => {
    await releaseWakeLock();
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  });

  function prevStep() {
    if (currentStep > 0) currentStep--;
  }

  function nextStep() {
    if (currentStep < (recipe?.steps?.length ?? 1) - 1) currentStep++;
  }

  $: totalSteps = recipe?.steps?.length ?? 0;
  $: progress = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;
</script>

<svelte:head>
  <title>{recipe ? $_('steps.title', { values: { name: recipe.name } }) : $_('steps.title_generic')} — CPLQ</title>
</svelte:head>

{#if loading}
  <p class="text-muted">{$_('steps.loading')}</p>
{:else if error}
  <p class="error">{$_(error)}</p>
{:else if !recipe.steps || recipe.steps.length === 0}
  <div class="empty-steps">
    <p>{$_('steps.no_steps')}</p>
    <button type="button" class="btn btn-secondary mt-2" on:click={() => goto(`/recipe/${recipe.id}`)}>
      {$_('steps.back')}
    </button>
  </div>
{:else}
  <div class="steps-page">

    <!-- Récapitulatif des quantités (toujours visible) -->
    <div class="summary-bar card">
      <div class="summary-title">{$_('steps.quantities', { values: { weight: calcResult?.breadWeight ?? '?' } })}</div>
      <div class="summary-ingredients">
        {#each (calcResult?.ingredients ?? []) as ing}
          <div class="summary-ing">
            <span class="summary-ing-name">{ing.name}</span>
            <strong>{ing.weight} g</strong>
          </div>
        {/each}
      </div>
    </div>

    <!-- Barre de progression -->
    <div class="progress-bar-wrapper" aria-label={$_('steps.step_label', { values: { current: currentStep + 1, total: totalSteps } })}>
      <div class="progress-bar" style="width: {progress}%"></div>
    </div>
    <p class="step-counter text-muted text-sm text-center">{$_('steps.step_counter', { values: { current: currentStep + 1, total: totalSteps } })}</p>

    <!-- Étape courante -->
    <div class="step-display card">
      <p class="step-text">{recipe.steps[currentStep]}</p>
    </div>

    <!-- Navigation -->
    <div class="step-nav">
      <button
        type="button"
        class="btn btn-secondary nav-btn"
        on:click={prevStep}
        disabled={currentStep === 0}
        aria-label={$_('steps.prev')}
      >{$_('steps.prev')}</button>

      {#if currentStep === totalSteps - 1}
        <button
          type="button"
          class="btn btn-primary nav-btn finish-btn"
          on:click={() => goto(`/recipe/${recipe.id}`)}
        >{$_('steps.finish')}</button>
      {:else}
        <button
          type="button"
          class="btn btn-primary nav-btn"
          on:click={nextStep}
          aria-label={$_('steps.next')}
        >{$_('steps.next')}</button>
      {/if}
    </div>

    <div class="text-center mt-2">
      <a href={`/recipe/${recipe.id}`} class="text-muted text-sm">{$_('steps.quit')}</a>
    </div>

  </div>
{/if}

<style>
  .steps-page {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .summary-bar {
    padding: 0.75rem 1rem;
  }

  .summary-title {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 0.5rem;
  }

  .summary-ingredients {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
  }

  .summary-ing {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.9rem;
  }

  .summary-ing-name {
    color: var(--text-muted);
  }

  .progress-bar-wrapper {
    height: 6px;
    background: var(--bg-surface-2);
    border-radius: 999px;
    overflow: hidden;
  }

  .progress-bar {
    height: 100%;
    background: var(--accent);
    border-radius: 999px;
    transition: width 0.3s ease;
  }

  .step-counter {
    margin-top: 0.25rem;
  }

  .step-display {
    padding: 2rem 1.5rem;
    min-height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .step-text {
    font-size: 1.5rem;
    line-height: 1.7;
    text-align: center;
  }

  .step-nav {
    display: flex;
    gap: 0.75rem;
  }

  .nav-btn {
    flex: 1;
    padding: 1rem;
    font-size: 1.1rem;
  }

  .finish-btn {
    background: var(--success);
  }

  .empty-steps {
    text-align: center;
    padding: 2rem;
  }

  .error {
    color: var(--danger);
  }
</style>
