<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { recipes, filteredRecipes, activeTagFilter, loadRecipes } from '$lib/stores.js';
  import { _, dateLocale } from '$lib/i18n/index.js';

  onMount(() => {
    loadRecipes();
  });

  /** @type {string[]} Tous les tags uniques de toutes les recettes */
  $: allTags = [...new Set($recipes.flatMap((r) => r.tags))].sort();

  function toggleTag(tag) {
    activeTagFilter.update((current) => (current === tag ? null : tag));
  }

  function formatDate(ts) {
    return new Date(ts).toLocaleDateString($dateLocale, { day: 'numeric', month: 'short', year: 'numeric' });
  }
</script>

<svelte:head>
  <title>{$_('home.title')}</title>
</svelte:head>

<div class="home-page">
  <header class="page-header">
    <h1 class="page-title">{$_('home.my_recipes')}</h1>
    <a href="/recipe/new" class="btn btn-primary new-btn">{$_('home.new_recipe')}</a>
  </header>

  <!-- Filtres par tags -->
  {#if allTags.length > 0}
    <div class="tag-filters">
      {#each allTags as tag}
        <button
          type="button"
          class="tag"
          class:active={$activeTagFilter === tag}
          on:click={() => toggleTag(tag)}
        >{tag}</button>
      {/each}
      {#if $activeTagFilter}
        <button type="button" class="tag clear-filter" on:click={() => activeTagFilter.set(null)}>{$_('home.show_all')}</button>
      {/if}
    </div>
  {/if}

  <!-- Liste des recettes -->
  {#if $filteredRecipes.length === 0}
    <div class="empty-state card">
      {#if $recipes.length === 0}
        <p class="empty-icon">🍞</p>
        <p class="empty-title">{$_('home.empty_no_recipes')}</p>
        <p class="text-muted text-sm">{$_('home.empty_no_recipes_hint')}</p>
      {:else}
        <p class="empty-icon">🔍</p>
        <p class="empty-title">{$_('home.empty_no_tag')}</p>
        <button type="button" class="btn btn-secondary mt-2" on:click={() => activeTagFilter.set(null)}>
          {$_('home.clear_filter')}
        </button>
      {/if}
    </div>
  {:else}
    <div class="recipes-grid">
      {#each $filteredRecipes as recipe (recipe.id)}
        <a href={`/recipe/${recipe.id}`} class="recipe-card card">
          {#if recipe.photo}
            <img src={recipe.photo} alt={recipe.name} class="recipe-photo" />
          {:else}
            <div class="recipe-photo-placeholder">🍞</div>
          {/if}
          <div class="recipe-info">
            <h2 class="recipe-name">{recipe.name}</h2>
            {#if recipe.tags.length > 0}
              <div class="recipe-tags">
                {#each recipe.tags as tag}
                  <span class="tag-small">{tag}</span>
                {/each}
              </div>
            {/if}
            {#if recipe.notes}
              <p class="recipe-notes text-muted text-sm">{recipe.notes.slice(0, 80)}{recipe.notes.length > 80 ? '…' : ''}</p>
            {/if}
            <p class="recipe-date text-muted text-sm">{formatDate(recipe.updatedAt ?? recipe.createdAt)}</p>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</div>

<style>
  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;
  }

  .page-title {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--text);
  }

  .new-btn {
    white-space: nowrap;
    flex-shrink: 0;
  }

  .tag-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 1.25rem;
  }

  .clear-filter {
    background: var(--bg-surface-2);
    color: var(--text-muted);
  }

  .empty-state {
    text-align: center;
    padding: 2.5rem 1rem;
  }

  .empty-icon {
    font-size: 3rem;
    margin-bottom: 0.5rem;
  }

  .empty-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.4rem;
  }

  .recipes-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .recipe-card {
    display: flex;
    gap: 1rem;
    text-decoration: none;
    color: inherit;
    transition: box-shadow 0.15s;
    overflow: hidden;
  }

  .recipe-card:hover {
    box-shadow: var(--shadow-md);
    text-decoration: none;
  }

  .recipe-photo {
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: calc(var(--radius-lg) - 4px);
    flex-shrink: 0;
  }

  .recipe-photo-placeholder {
    width: 90px;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    background: var(--bg-surface-2);
    border-radius: calc(var(--radius-lg) - 4px);
    flex-shrink: 0;
  }

  .recipe-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-width: 0;
  }

  .recipe-name {
    font-size: 1.05rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .recipe-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  .tag-small {
    font-size: 0.75rem;
    background: var(--bg-surface-2);
    color: var(--text-muted);
    border-radius: 999px;
    padding: 0.1rem 0.5rem;
    border: 1px solid var(--border);
  }

  .recipe-notes {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .recipe-date {
    margin-top: auto;
    font-size: 0.75rem;
  }
</style>
