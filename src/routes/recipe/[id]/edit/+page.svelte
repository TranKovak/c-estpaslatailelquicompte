<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import RecipeForm from '$lib/components/RecipeForm.svelte';
  import { getRecipe, saveRecipe } from '$lib/db.js';
  import { loadRecipes } from '$lib/stores.js';
  import { _ } from '$lib/i18n/index.js';

  let recipe = null;
  let loading = true;
  let saving = false;
  let error = '';

  onMount(async () => {
    const id = $page.params.id;
    recipe = await getRecipe(id);
    if (!recipe) {
      error = 'edit.not_found';
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
  <title>{recipe ? $_('edit.title', { values: { name: recipe.name } }) : $_('edit.title_generic')} — CPLQ</title>
</svelte:head>

<div class="page-header">
  <a href={`/recipe/${$page.params.id}`} class="back-link">{$_('edit.back')}</a>
  <h1 class="page-title">{$_('edit.heading')}</h1>
</div>

{#if loading}
  <p class="text-muted">{$_('edit.loading')}</p>
{:else if error}
  <p class="error">{$_(error)}</p>
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
