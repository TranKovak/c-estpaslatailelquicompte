<script>
  import { createEventDispatcher } from 'svelte';

  /** @type {string|null} Photo base64 existante */
  export let value = null;

  const dispatch = createEventDispatcher();

  let inputEl;

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      // Redimensionner à max 800px pour limiter la taille
      resizeImage(reader.result).then((resized) => {
        dispatch('change', resized);
      });
    };
    reader.readAsDataURL(file);
  }

  /**
   * Redimensionne l'image à max 800px (côté le plus long) en base64.
   * @param {string} dataUrl
   * @returns {Promise<string>}
   */
  function resizeImage(dataUrl) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const MAX = 800;
        let { width, height } = img;
        if (width > MAX || height > MAX) {
          if (width > height) {
            height = Math.round((height * MAX) / width);
            width = MAX;
          } else {
            width = Math.round((width * MAX) / height);
            height = MAX;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.src = dataUrl;
    });
  }

  function removePhoto() {
    dispatch('change', null);
    if (inputEl) inputEl.value = '';
  }
</script>

<div class="photo-picker">
  {#if value}
    <div class="preview-wrapper">
      <img src={value} alt="Aperçu de la photo" class="preview-img" />
      <button type="button" class="remove-photo btn btn-secondary" on:click={removePhoto}>
        Retirer la photo
      </button>
    </div>
  {:else}
    <label class="upload-label">
      <span class="upload-icon">📷</span>
      <span>Ajouter une photo (optionnel)</span>
      <input
        bind:this={inputEl}
        type="file"
        accept="image/*"
        on:change={handleFileChange}
        class="hidden-input"
      />
    </label>
  {/if}
</div>

<style>
  .photo-picker {
    width: 100%;
  }

  .upload-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: var(--bg-surface-2);
    border: 2px dashed var(--border);
    border-radius: var(--radius);
    cursor: pointer;
    color: var(--text-muted);
    font-size: 0.9rem;
    transition: border-color 0.15s;
  }

  .upload-label:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  .hidden-input {
    display: none;
  }

  .upload-icon {
    font-size: 1.2rem;
  }

  .preview-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .preview-img {
    width: 100%;
    max-height: 240px;
    object-fit: cover;
    border-radius: var(--radius);
    border: 1px solid var(--border);
  }

  .remove-photo {
    align-self: flex-start;
  }
</style>
