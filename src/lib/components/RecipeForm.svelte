<script>
  import { createEventDispatcher } from 'svelte';
  import IngredientRow from './IngredientRow.svelte';
  import StepRow from './StepRow.svelte';
  import TagInput from './TagInput.svelte';
  import PhotoPicker from './PhotoPicker.svelte';
  import DragList from './DragList.svelte';
  import { _ } from '$lib/i18n/index.js';

  /** @type {import('../db.js').Recipe} */
  export let recipe = {
    name: '',
    tags: [],
    evaporationRate: 12,
    proofingTime: '',
    bakingTime: '',
    notes: '',
    photo: null,
    ingredients: [{ name: 'Farine', percentage: 100 }],
    steps: []
  };

  export let saving = false;

  const dispatch = createEventDispatcher();

  function handleIngredientUpdate(i, e) {
    recipe.ingredients[i] = { ...recipe.ingredients[i], ...e.detail };
    recipe = { ...recipe };
  }

  function handleIngredientRemove(i) {
    recipe.ingredients = recipe.ingredients.filter((_, idx) => idx !== i);
  }

  function addIngredient() {
    recipe.ingredients = [...recipe.ingredients, { name: '', percentage: 0 }];
  }

  function handleIngredientsReorder(e) {
    recipe.ingredients = e.detail;
  }

  function handleStepUpdate(i, e) {
    recipe.steps[i] = e.detail.value;
    recipe = { ...recipe };
  }

  function handleStepRemove(i) {
    recipe.steps = recipe.steps.filter((_, idx) => idx !== i);
  }

  function addStep() {
    recipe.steps = [...recipe.steps, ''];
  }

  function handleStepsReorder(e) {
    recipe.steps = e.detail;
  }

  function handleTagChange(e) {
    recipe.tags = e.detail;
  }

  function handlePhotoChange(e) {
    recipe.photo = e.detail;
  }

  function handleSubmit() {
    dispatch('save', recipe);
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="recipe-form">

  <div class="form-group">
    <label for="recipe-name">{$_('form.name_label')}</label>
    <input
      id="recipe-name"
      type="text"
      bind:value={recipe.name}
      placeholder={$_('form.name_placeholder')}
      required
    />
  </div>

  <div class="form-group">
    <label>{$_('form.tags_label')}</label>
    <TagInput tags={recipe.tags} on:change={handleTagChange} />
  </div>

  <div class="form-row">
    <div class="form-group">
      <label for="evap-rate">{$_('form.evap_label')}</label>
      <input
        id="evap-rate"
        type="number"
        bind:value={recipe.evaporationRate}
        min="0"
        max="50"
        step="0.5"
      />
    </div>
    <div class="form-group">
      <label for="proofing-time">{$_('form.proofing_label')}</label>
      <input
        id="proofing-time"
        type="text"
        bind:value={recipe.proofingTime}
        placeholder={$_('form.proofing_placeholder')}
      />
    </div>
    <div class="form-group">
      <label for="baking-time">{$_('form.baking_label')}</label>
      <input
        id="baking-time"
        type="text"
        bind:value={recipe.bakingTime}
        placeholder={$_('form.baking_placeholder')}
      />
    </div>
  </div>

  <div class="form-group">
    <label for="notes">{$_('form.notes_label')}</label>
    <textarea id="notes" bind:value={recipe.notes} placeholder={$_('form.notes_placeholder')} rows="3"></textarea>
  </div>

  <div class="form-group">
    <label>{$_('form.photo_label')}</label>
    <PhotoPicker value={recipe.photo} on:change={handlePhotoChange} />
  </div>

  <hr />

  <div class="section-title">{$_('form.ingredients_title')}</div>

  <DragList items={recipe.ingredients} on:reorder={handleIngredientsReorder}>
    <svelte:fragment let:item let:index>
      <IngredientRow
        ingredient={item}
        {index}
        on:update={(e) => handleIngredientUpdate(index, e)}
        on:remove={() => handleIngredientRemove(index)}
      />
    </svelte:fragment>
  </DragList>

  <button type="button" class="btn btn-secondary add-btn" on:click={addIngredient}>
    {$_('form.add_ingredient')}
  </button>

  <hr />

  <div class="section-title">{$_('form.steps_title')}</div>

  {#if recipe.steps.length === 0}
    <p class="text-muted text-sm mb-1">{$_('form.no_steps')}</p>
  {:else}
    <DragList items={recipe.steps} on:reorder={handleStepsReorder}>
      <svelte:fragment let:item let:index>
        <StepRow
          step={item}
          {index}
          on:update={(e) => handleStepUpdate(index, e)}
          on:remove={() => handleStepRemove(index)}
        />
      </svelte:fragment>
    </DragList>
  {/if}

  <button type="button" class="btn btn-secondary add-btn" on:click={addStep}>
    {$_('form.add_step')}
  </button>

  <hr />

  <div class="form-actions">
    <a href="/" class="btn btn-ghost">{$_('form.cancel')}</a>
    <button type="submit" class="btn btn-primary" disabled={saving || !recipe.name.trim()}>
      {saving ? $_('form.saving') : $_('form.save')}
    </button>
  </div>

</form>

<style>
  .recipe-form {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .form-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 0.75rem;
  }

  .add-btn {
    margin-top: 0.75rem;
    width: 100%;
  }

  .form-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
    margin-top: 0.5rem;
  }
</style>
