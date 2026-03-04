import { d as derived, w as writable } from "./index.js";
import "idb";
const recipes = writable([]);
const activeTagFilter = writable(null);
const filteredRecipes = derived(
  [recipes, activeTagFilter],
  ([$recipes, $activeTagFilter]) => {
    if ($activeTagFilter === null) return $recipes;
    return $recipes.filter((r) => r.tags.includes($activeTagFilter));
  }
);
export {
  activeTagFilter as a,
  filteredRecipes as f,
  recipes as r
};
