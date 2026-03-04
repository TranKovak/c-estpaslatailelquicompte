<script>
  import { createEventDispatcher } from 'svelte';

  /** @type {string[]} */
  export let tags = [];

  const dispatch = createEventDispatcher();

  let inputValue = '';

  function addTag() {
    const raw = inputValue.trim().toLowerCase();
    if (raw && !tags.includes(raw)) {
      const newTags = [...tags, raw];
      dispatch('change', newTags);
    }
    inputValue = '';
  }

  function removeTag(tag) {
    const newTags = tags.filter((t) => t !== tag);
    dispatch('change', newTags);
  }

  function handleKeydown(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  }
</script>

<div class="tag-input-wrapper">
  <div class="tags-list">
    {#each tags as tag}
      <span class="tag-chip">
        {tag}
        <button type="button" on:click={() => removeTag(tag)} aria-label={`Supprimer le tag ${tag}`}>✕</button>
      </span>
    {/each}
  </div>
  <input
    type="text"
    bind:value={inputValue}
    on:keydown={handleKeydown}
    placeholder="Ajouter un tag (Entrée ou virgule)"
    class="tag-field"
  />
  {#if inputValue.trim()}
    <button type="button" class="add-btn btn btn-secondary" on:click={addTag}>+</button>
  {/if}
</div>

<style>
  .tag-input-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.4rem;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0.4rem 0.6rem;
    cursor: text;
  }

  .tags-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .tag-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
    background: var(--accent);
    color: #fff;
    border-radius: 999px;
    padding: 0.15rem 0.5rem;
    font-size: 0.8rem;
  }

  .tag-chip button {
    background: none;
    border: none;
    color: rgba(255,255,255,0.8);
    font-size: 0.75rem;
    padding: 0;
    line-height: 1;
    cursor: pointer;
  }

  .tag-chip button:hover {
    color: #fff;
  }

  .tag-field {
    flex: 1;
    min-width: 140px;
    border: none;
    outline: none;
    background: transparent;
    padding: 0;
    font-size: 0.9rem;
  }

  .add-btn {
    padding: 0.2rem 0.6rem;
    font-size: 1rem;
  }
</style>
