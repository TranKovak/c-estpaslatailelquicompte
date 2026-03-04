<script>
  import { createEventDispatcher } from 'svelte';

  /** @type {string} */
  export let step = '';
  export let index = 0;

  const dispatch = createEventDispatcher();

  let value = step;

  function handleUpdate() {
    dispatch('update', { value });
  }

  function handleRemove() {
    dispatch('remove');
  }
</script>

<div class="step-row">
  <span class="drag-handle" title="Réordonner">⠿</span>
  <span class="step-num">{index + 1}.</span>
  <textarea
    bind:value
    on:input={handleUpdate}
    placeholder="Décris cette étape…"
    rows="2"
    aria-label={`Étape ${index + 1}`}
  ></textarea>
  <button
    type="button"
    class="remove-btn"
    on:click={handleRemove}
    aria-label="Supprimer l'étape"
  >✕</button>
</div>

<style>
  .step-row {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.4rem 0;
  }

  .drag-handle {
    cursor: grab;
    color: var(--text-muted);
    font-size: 1.2rem;
    padding-top: 0.4rem;
    flex-shrink: 0;
    user-select: none;
  }

  .step-num {
    color: var(--text-muted);
    font-size: 0.85rem;
    padding-top: 0.6rem;
    flex-shrink: 0;
    min-width: 1.5rem;
  }

  textarea {
    flex: 1;
    min-height: 60px;
  }

  .remove-btn {
    background: none;
    border: none;
    color: var(--danger);
    font-size: 1rem;
    padding: 0.25rem 0.4rem;
    border-radius: var(--radius);
    flex-shrink: 0;
    margin-top: 0.25rem;
  }

  .remove-btn:hover {
    background: rgba(192, 57, 43, 0.1);
  }
</style>
