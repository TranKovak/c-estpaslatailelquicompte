import { writable, derived } from 'svelte/store';
import { getRecipes } from './db.js';

/** @type {import('svelte/store').Writable<import('./db.js').Recipe[]>} */
export const recipes = writable([]);

/** @type {import('svelte/store').Writable<string|null>} */
export const activeTagFilter = writable(null);

/** @type {import('svelte/store').Readable<import('./db.js').Recipe[]>} */
export const filteredRecipes = derived(
  [recipes, activeTagFilter],
  ([$recipes, $activeTagFilter]) => {
    if ($activeTagFilter === null) return $recipes;
    return $recipes.filter((r) => r.tags.includes($activeTagFilter));
  }
);

/** Charge toutes les recettes depuis IndexedDB dans le store. */
export async function loadRecipes() {
  const all = await getRecipes();
  recipes.set(all);
}
