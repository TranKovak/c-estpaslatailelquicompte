<script>
  import { createEventDispatcher } from 'svelte';

  /** @type {{ name: string, percentage: number }} */
  export let ingredient;
  /** @type {number} index 0 = farine (non modifiable) */
  export let index = 0;
  /** Affichage lecture seule (mode essai désactivé) */
  export let readonly = false;

  const dispatch = createEventDispatcher();

  let name = ingredient.name;
  let percentage = ingredient.percentage;

  $: isFlour = index === 0;

  function handleUpdate() {
    dispatch('update', { name, percentage: Number(percentage) });
  }

  function handleRemove() {
    dispatch('remove');
  }
</script>

<div class="ingredient-row">
  <input
    type="text"
    bind:value={name}
    on:input={handleUpdate}
    placeholder="Ingrédient"
    disabled={isFlour || readonly}
    class="name-input"
    aria-label="Nom de l'ingrédient"
  />
  <div class="pct-wrapper">
    <input
      type="number"
      bind:value={percentage}
      on:input={handleUpdate}
      min="0"
      max="500"
      step="0.1"
      disabled={isFlour || readonly}
      class="pct-input"
      aria-label="Pourcentage"
    />
    <span class="pct-symbol">%</span>
  </div>
  {#if !isFlour && !readonly}
    <button
      type="button"
      class="remove-btn"
      on:click={handleRemove}
      aria-label="Supprimer l'ingrédient"
    >✕</button>
  {/if}
</div>

<style>
  .ingredient-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 0;
  }

  .name-input {
    flex: 1;
  }

  .pct-wrapper {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    width: 90px;
    flex-shrink: 0;
  }

  .pct-input {
    width: 100%;
    text-align: right;
  }

  .pct-symbol {
    color: var(--text-muted);
    font-size: 0.9rem;
    flex-shrink: 0;
  }

  .remove-btn {
    background: none;
    border: none;
    color: var(--danger);
    font-size: 1rem;
    padding: 0.25rem 0.4rem;
    border-radius: var(--radius);
    flex-shrink: 0;
  }

  .remove-btn:hover {
    background: rgba(192, 57, 43, 0.1);
  }

  input:disabled {
    background: var(--bg-surface-2);
    cursor: default;
  }
</style>
