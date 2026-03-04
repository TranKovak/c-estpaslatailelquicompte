<script>
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { getRecipe } from '$lib/db.js';
  import { calculateFromBreadWeight } from '$lib/calculator.js';

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
      // Wake Lock non disponible (hors HTTPS, Firefox Android, etc.)
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
      error = 'Recette introuvable.';
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
  <title>{recipe ? `Pas-à-pas — ${recipe.name}` : 'Pas-à-pas'} — CPLQ</title>
</svelte:head>

{#if loading}
  <p class="text-muted">Chargement…</p>
{:else if error}
  <p class="error">{error}</p>
{:else if !recipe.steps || recipe.steps.length === 0}
  <div class="empty-steps">
    <p>Cette recette n'a pas d'étapes.</p>
    <button type="button" class="btn btn-secondary mt-2" on:click={() => goto(`/recipe/${recipe.id}`)}>
      ← Retour
    </button>
  </div>
{:else}
  <div class="steps-page">

    <!-- Récapitulatif des quantités (toujours visible) -->
    <div class="summary-bar card">
      <div class="summary-title">Quantités ({calcResult?.breadWeight ?? '?'} g de pain)</div>
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
    <div class="progress-bar-wrapper" aria-label={`Étape ${currentStep + 1} sur ${totalSteps}`}>
      <div class="progress-bar" style="width: {progress}%"></div>
    </div>
    <p class="step-counter text-muted text-sm text-center">Étape {currentStep + 1} / {totalSteps}</p>

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
        aria-label="Étape précédente"
      >← Préc.</button>

      {#if currentStep === totalSteps - 1}
        <button
          type="button"
          class="btn btn-primary nav-btn finish-btn"
          on:click={() => goto(`/recipe/${recipe.id}`)}
        >✓ Terminé !</button>
      {:else}
        <button
          type="button"
          class="btn btn-primary nav-btn"
          on:click={nextStep}
          aria-label="Étape suivante"
        >Suiv. →</button>
      {/if}
    </div>

    <div class="text-center mt-2">
      <a href={`/recipe/${recipe.id}`} class="text-muted text-sm">Quitter le mode pas-à-pas</a>
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
