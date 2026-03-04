<script>
  import { goto } from '$app/navigation';
  import RecipeForm from '$lib/components/RecipeForm.svelte';
  import { saveRecipe } from '$lib/db.js';
  import { loadRecipes } from '$lib/stores.js';
  import { _ } from '$lib/i18n/index.js';

  let saving = false;

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
  <title>{$_('new.title')} — CPLQ</title>
</svelte:head>

<div class="page-header">
  <a href="/" class="back-link">{$_('new.back')}</a>
  <h1 class="page-title">{$_('new.heading')}</h1>
</div>

<RecipeForm on:save={handleSave} {saving} />

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
</style>
