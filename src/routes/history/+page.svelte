<script>
  import { onMount } from 'svelte';
  import { getHistory, deleteHistoryEntry } from '$lib/db.js';
  import { _, dateLocale } from '$lib/i18n/index.js';
  import { get } from 'svelte/store';

  let entries = [];
  let loading = true;

  onMount(async () => {
    const all = await getHistory();
    entries = all.sort((a, b) => b.date - a.date);
    loading = false;
  });

  async function handleDelete(id) {
    if (!confirm(get(_)('history.confirm_delete'))) return;
    await deleteHistoryEntry(id);
    entries = entries.filter((e) => e.id !== id);
  }

  function formatDate(ts) {
    return new Date(ts).toLocaleDateString($dateLocale, {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }
</script>

<svelte:head>
  <title>{$_('history.title')} — CPLQ</title>
</svelte:head>

<h1 class="page-title">{$_('history.title')}</h1>

{#if loading}
  <p class="text-muted">{$_('history.loading')}</p>
{:else if entries.length === 0}
  <div class="empty-state card">
    <p class="empty-icon">📓</p>
    <p class="empty-title">{$_('history.empty_title')}</p>
    <p class="text-muted text-sm">{$_('history.empty_hint')}</p>
  </div>
{:else}
  <div class="history-list">
    {#each entries as entry (entry.id)}
      <div class="history-card card">
        <div class="history-header">
          <div>
            <div class="history-recipe-name">{entry.recipeName}</div>
            <div class="history-date text-muted text-sm">{formatDate(entry.date)}</div>
          </div>
          <button
            type="button"
            class="btn btn-danger btn-sm"
            on:click={() => handleDelete(entry.id)}
            aria-label={$_('history.delete_btn')}
          >{$_('history.delete_btn')}</button>
        </div>

        <div class="history-stats">
          <div class="stat">
            <span class="stat-label">{$_('history.bread')}</span>
            <strong>{entry.targetBreadWeight} g</strong>
          </div>
          <div class="stat">
            <span class="stat-label">{$_('history.flour')}</span>
            <strong>{entry.flourWeight} g</strong>
          </div>
        </div>

        <div class="history-ingredients">
          {#each entry.ingredientsCalculated as ing}
            <div class="hist-ing">
              <span>{ing.name}</span>
              <span class="text-muted">{ing.weight} g</span>
            </div>
          {/each}
        </div>

        {#if entry.note}
          <p class="history-note">{entry.note}</p>
        {/if}

        {#if entry.photo}
          <img src={entry.photo} alt="Photo de la fournée" class="history-photo" />
        {/if}
      </div>
    {/each}
  </div>
{/if}

<style>
  .page-title {
    font-size: 1.6rem;
    font-weight: 700;
    margin-bottom: 1.25rem;
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

  .history-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .history-card {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .history-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .history-recipe-name {
    font-size: 1.05rem;
    font-weight: 600;
  }

  .history-date {
    margin-top: 0.15rem;
  }

  .btn-sm {
    padding: 0.35rem 0.7rem;
    font-size: 0.8rem;
    white-space: nowrap;
  }

  .history-stats {
    display: flex;
    gap: 1.5rem;
  }

  .stat {
    display: flex;
    flex-direction: column;
    font-size: 0.9rem;
  }

  .stat-label {
    font-size: 0.75rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .history-ingredients {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    background: var(--bg-surface-2);
    border-radius: var(--radius);
    padding: 0.5rem 0.75rem;
  }

  .hist-ing {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
  }

  .history-note {
    font-size: 0.9rem;
    color: var(--text-muted);
    font-style: italic;
    padding: 0.5rem;
    border-left: 3px solid var(--accent-light);
  }

  .history-photo {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
  }
</style>
