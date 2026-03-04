/**
 * Calcule sumRatios = 1 + Σ(ingredient.percentage / 100) pour tous les ingrédients hors farine.
 * La farine (index 0) est toujours à 100% et représente le référentiel.
 *
 * @param {import('./db.js').Ingredient[]} ingredients
 * @returns {number}
 */
function sumRatios(ingredients) {
  // L'index 0 est la farine (100%), on inclut tous les autres
  return ingredients.reduce((acc, ing) => acc + ing.percentage / 100, 0);
}

/**
 * Arrondit à 1 décimale.
 * @param {number} value
 * @returns {number}
 */
function round1(value) {
  return Math.round(value * 10) / 10;
}

/**
 * Mode 1 : depuis le poids de pain cible → calcule toutes les quantités.
 *
 * @param {import('./db.js').Recipe} recipe
 * @param {number} targetBreadWeightG
 * @returns {{ flourWeight: number, doughWeight: number, breadWeight: number, ingredients: {name: string, weight: number}[] }}
 */
export function calculateFromBreadWeight(recipe, targetBreadWeightG) {
  const evap = Math.min(Math.max(recipe.evaporationRate / 100, 0), 0.9999);
  const ratios = Math.max(sumRatios(recipe.ingredients), 0.0001);

  const flourWeight = round1(targetBreadWeightG / (ratios * (1 - evap)));
  const doughWeight = round1(flourWeight * ratios);
  const breadWeight = round1(doughWeight * (1 - evap));

  const ingredients = recipe.ingredients.map((ing) => ({
    name: ing.name,
    weight: round1(flourWeight * (ing.percentage / 100))
  }));

  return { flourWeight, doughWeight, breadWeight, ingredients };
}

/**
 * Mode 2 : depuis la farine disponible → calcule toutes les quantités.
 *
 * @param {import('./db.js').Recipe} recipe
 * @param {number} flourWeightG
 * @returns {{ flourWeight: number, doughWeight: number, breadWeight: number, ingredients: {name: string, weight: number}[] }}
 */
export function calculateFromFlourWeight(recipe, flourWeightG) {
  const evap = Math.min(Math.max(recipe.evaporationRate / 100, 0), 0.9999);
  const ratios = Math.max(sumRatios(recipe.ingredients), 0.0001);

  const flourWeight = round1(flourWeightG);
  const doughWeight = round1(flourWeight * ratios);
  const breadWeight = round1(doughWeight * (1 - evap));

  const ingredients = recipe.ingredients.map((ing) => ({
    name: ing.name,
    weight: round1(flourWeight * (ing.percentage / 100))
  }));

  return { flourWeight, doughWeight, breadWeight, ingredients };
}
