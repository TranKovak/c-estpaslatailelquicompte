<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { generateRecipeQR } from '$lib/qrcode.js';
  import { _ } from '$lib/i18n/index.js';

  /** @type {import('../db.js').Recipe} */
  export let recipe;

  const dispatch = createEventDispatcher();

  let canvasEl;
  let error = '';

  onMount(async () => {
    if (canvasEl && recipe) {
      try {
        await generateRecipeQR(recipe, canvasEl);
      } catch (e) {
        error = $_('qr_modal.error', { values: { message: e.message } });
      }
    }
  });

  function close() {
    dispatch('close');
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="modal-overlay" on:click|self={close}>
  <div class="modal-box">
    <div class="modal-header">
      <span class="modal-title">{$_('qr_modal.title')}</span>
      <button type="button" class="btn btn-ghost close-btn" on:click={close}>✕</button>
    </div>

    <p class="text-muted text-sm mb-2">{$_('qr_modal.hint')}</p>

    {#if error}
      <p class="error">{error}</p>
    {:else}
      <div class="canvas-wrapper">
        <canvas bind:this={canvasEl}></canvas>
      </div>
    {/if}

    <p class="recipe-name-label">{recipe.name}</p>
  </div>
</div>

<style>
  .canvas-wrapper {
    display: flex;
    justify-content: center;
    margin: 1rem 0;
  }

  canvas {
    max-width: 100%;
    border-radius: var(--radius);
    border: 1px solid var(--border);
  }

  .recipe-name-label {
    text-align: center;
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--text-muted);
  }

  .close-btn {
    padding: 0.3rem 0.6rem;
    font-size: 0.9rem;
  }

  .error {
    color: var(--danger);
    font-size: 0.9rem;
  }
</style>
