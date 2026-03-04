<script>
  import { createEventDispatcher } from 'svelte';

  /**
   * @type {any[]} items — tableau d'éléments à réordonner
   */
  export let items = [];

  const dispatch = createEventDispatcher();

  let dragIndex = null;
  let list;

  // ─── Touch drag & drop ───────────────────────────────────────────────────

  function getItemIndexFromY(y) {
    if (!list) return null;
    const children = [...list.querySelectorAll('.drag-item')];
    for (let i = 0; i < children.length; i++) {
      const rect = children[i].getBoundingClientRect();
      if (y >= rect.top && y <= rect.bottom) return i;
    }
    if (children.length > 0) {
      const lastRect = children[children.length - 1].getBoundingClientRect();
      if (y > lastRect.bottom) return children.length - 1;
    }
    return null;
  }

  function onTouchStart(e, index) {
    dragIndex = index;
    e.currentTarget.closest('.drag-item').classList.add('dragging');
  }

  function onTouchMove(e) {
    e.preventDefault();
    if (dragIndex === null) return;
    // Ghost déjà géré visuellement via CSS
  }

  function onTouchEnd(e) {
    if (dragIndex === null) return;
    const touch = e.changedTouches[0];
    const targetIndex = getItemIndexFromY(touch.clientY);

    if (targetIndex !== null && targetIndex !== dragIndex) {
      const newItems = [...items];
      const [moved] = newItems.splice(dragIndex, 1);
      newItems.splice(targetIndex, 0, moved);
      dispatch('reorder', newItems);
    }

    if (list) {
      list.querySelectorAll('.drag-item').forEach((el) => el.classList.remove('dragging'));
    }
    dragIndex = null;
  }

  // ─── Fallback : boutons haut/bas ─────────────────────────────────────────

  function moveUp(index) {
    if (index === 0) return;
    const newItems = [...items];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    dispatch('reorder', newItems);
  }

  function moveDown(index) {
    if (index === items.length - 1) return;
    const newItems = [...items];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    dispatch('reorder', newItems);
  }
</script>

<div
  bind:this={list}
  class="drag-list"
  on:touchmove|passive={onTouchMove}
>
  {#each items as item, i (i)}
    <div
      class="drag-item"
      on:touchend={onTouchEnd}
    >
      <div
        class="drag-handle-zone"
        on:touchstart={(e) => onTouchStart(e, i)}
      >
        <slot {item} index={i} />
      </div>
      <div class="move-btns">
        <button
          type="button"
          class="move-btn"
          on:click={() => moveUp(i)}
          disabled={i === 0}
          aria-label="Monter"
        >▲</button>
        <button
          type="button"
          class="move-btn"
          on:click={() => moveDown(i)}
          disabled={i === items.length - 1}
          aria-label="Descendre"
        >▼</button>
      </div>
    </div>
  {/each}
</div>

<style>
  .drag-list {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .drag-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    transition: opacity 0.15s;
  }

  .drag-item.dragging {
    opacity: 0.4;
  }

  .drag-handle-zone {
    flex: 1;
    overflow: hidden;
  }

  .move-btns {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    flex-shrink: 0;
  }

  .move-btn {
    background: none;
    border: 1px solid var(--border);
    border-radius: 4px;
    color: var(--text-muted);
    font-size: 0.65rem;
    padding: 0.1rem 0.3rem;
    line-height: 1;
    cursor: pointer;
  }

  .move-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .move-btn:hover:not(:disabled) {
    background: var(--bg-surface-2);
    color: var(--text);
  }
</style>
