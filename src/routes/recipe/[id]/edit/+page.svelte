<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import RecipeForm from '$lib/components/RecipeForm.svelte';
  import { getRecipe, saveRecipe } from '$lib/db.js';
  import { loadRecipes } from '$lib/stores.js';

  let recipe = null;
  let loading = true;
  let saving = false;
  let error = '';

  onMount(async () => {
    const id = $page.params.id;
    recipe = await getRecipe(id);
    if (!recipe) {
      error = 'Recette introuvable.';
    }
    loading = false;
  });

  async function handleSave(e) {
    saving = true;
    try {
      const id = await saveRecipe(e.detail);
      await loadRecipes();
      goto(`/recipe/${id}`);
    } catch (err) {
      console.error('Erreur lors de la sauvegarde', err);
      saving = false;
    }
  }
</script>

<svelte:head>
  <title>{recipe ? `Modifier — ${recipe.name}` : 'Modifier la recette'} — CPLQ</title>
</svelte:head>

<div class="page-header">
  <a href={`/recipe/${$page.params.id}`} class="back-link">← Retour à la recette</a>
  <h1 class="page-title">Modifier la recette</h1>
</div>

{#if loading}
  <p class="text-muted">Chargement…</p>
{:else if error}
  <p class="error">{error}</p>
{:else}
  <RecipeForm {recipe} on:save={handleSave} {saving} />
{/if}

<style>
  .page-header {
    margin-bottom: 1.5rem;
  }

  .back-link {
    font-size: 0.9rem;
    color: var(--text-muted);
    display: block;
    margin-bottom: 0.5rem;
  }

  .page-title {
    font-size: 1.5rem;
    font-weight: 700;
  }

  .error {
    color: var(--danger);
  }
</style>
