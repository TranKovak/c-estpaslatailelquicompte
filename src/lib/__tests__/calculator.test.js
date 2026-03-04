import { describe, it, expect } from 'vitest';
import { calculateFromBreadWeight, calculateFromFlourWeight } from '../calculator.js';

// Recette de référence : farine 100%, eau 65%, sel 2%, évaporation 12%
const baseRecipe = {
  evaporationRate: 12,
  ingredients: [
    { name: 'Farine', percentage: 100 },
    { name: 'Eau', percentage: 65 },
    { name: 'Sel', percentage: 2 }
  ]
};

// sumRatios = 1 + 0.65 + 0.02 = 1.67
// flourWeight = 800 / (1.67 × 0.88) ≈ 544.2 / 0.88... en réalité :
// flourWeight = 800 / (1.67 × (1 - 0.12)) = 800 / (1.67 × 0.88) = 800 / 1.4696 ≈ 544.4
// Arrondis à 1 décimale selon l'implémentation

describe('calculateFromBreadWeight', () => {
  it('AC 1 — calcule correctement farine, eau, sel pour 800g de pain', () => {
    const result = calculateFromBreadWeight(baseRecipe, 800);

    // flourWeight = 800 / (1.67 × 0.88)
    const expectedFlour = Math.round((800 / (1.67 * 0.88)) * 10) / 10;
    expect(result.flourWeight).toBe(expectedFlour);

    // Eau = flourWeight × 0.65
    const expectedWater = Math.round(expectedFlour * 0.65 * 10) / 10;
    expect(result.ingredients.find(i => i.name === 'Eau').weight).toBe(expectedWater);

    // Sel = flourWeight × 0.02
    const expectedSalt = Math.round(expectedFlour * 0.02 * 10) / 10;
    expect(result.ingredients.find(i => i.name === 'Sel').weight).toBe(expectedSalt);

    // Vérification des valeurs approchées de l'AC
    expect(result.flourWeight).toBeCloseTo(544.2, 0);
    expect(result.ingredients.find(i => i.name === 'Eau').weight).toBeCloseTo(353.7, 0);
    expect(result.ingredients.find(i => i.name === 'Sel').weight).toBeCloseTo(10.9, 0);
  });

  it('retourne le bon poids de pain (breadWeight ≈ targetBreadWeight)', () => {
    const result = calculateFromBreadWeight(baseRecipe, 800);
    // Le pain résultant doit être proche de 800g (les arrondis peuvent créer un petit écart)
    expect(result.breadWeight).toBeCloseTo(800, 0);
  });

  it('cas limite — évaporation 0%', () => {
    const recipe = { ...baseRecipe, evaporationRate: 0 };
    const result = calculateFromBreadWeight(recipe, 500);
    // Pas d'évaporation → breadWeight = doughWeight
    expect(result.breadWeight).toBe(result.doughWeight);
  });

  it('cas limite — un seul ingrédient (farine seule)', () => {
    const recipe = {
      evaporationRate: 10,
      ingredients: [{ name: 'Farine', percentage: 100 }]
    };
    const result = calculateFromBreadWeight(recipe, 450);
    // sumRatios = 1, breadWeight = flourWeight × 1 × 0.9 = flourWeight × 0.9
    // flourWeight = 450 / 0.9 = 500
    expect(result.flourWeight).toBeCloseTo(500, 0);
    expect(result.ingredients).toHaveLength(1);
    expect(result.ingredients[0].name).toBe('Farine');
  });

  it('cas limite — pourcentages élevés (pain enrichi)', () => {
    const recipe = {
      evaporationRate: 15,
      ingredients: [
        { name: 'Farine', percentage: 100 },
        { name: 'Beurre', percentage: 50 },
        { name: 'Sucre', percentage: 20 },
        { name: 'Oeufs', percentage: 40 }
      ]
    };
    const result = calculateFromBreadWeight(recipe, 1000);
    expect(result.flourWeight).toBeGreaterThan(0);
    expect(result.breadWeight).toBeCloseTo(1000, 0);
  });

  it('retourne des arrondis à 1 décimale', () => {
    const result = calculateFromBreadWeight(baseRecipe, 750);
    // Vérifie que tous les poids sont des multiples de 0.1
    const checkDecimal = (n) => Math.round(n * 10) / 10 === n;
    expect(checkDecimal(result.flourWeight)).toBe(true);
    expect(checkDecimal(result.doughWeight)).toBe(true);
    expect(checkDecimal(result.breadWeight)).toBe(true);
    result.ingredients.forEach((ing) => {
      expect(checkDecimal(ing.weight)).toBe(true);
    });
  });
});

describe('calculateFromFlourWeight', () => {
  it('AC 2 — calcule le poids de pain pour 300g de farine (≈ 484g)', () => {
    // Le taux d'évaporation de l'exemple AC2 est 3.4% (et non 12%)
    // 300 × 1.67 × (1 - 0.034) = 300 × 1.67 × 0.966 ≈ 484g
    const recipeAC2 = { ...baseRecipe, evaporationRate: 3.4 };
    const result = calculateFromFlourWeight(recipeAC2, 300);
    expect(result.breadWeight).toBeCloseTo(484, 0);
    expect(result.doughWeight).toBeCloseTo(501, 0);
  });

  it('calcule correctement les poids ingrédients', () => {
    const result = calculateFromFlourWeight(baseRecipe, 500);
    const water = result.ingredients.find(i => i.name === 'Eau');
    const salt = result.ingredients.find(i => i.name === 'Sel');
    expect(water.weight).toBeCloseTo(325, 0);  // 500 × 0.65
    expect(salt.weight).toBeCloseTo(10, 0);     // 500 × 0.02
  });

  it('préserve le poids de farine saisi', () => {
    const result = calculateFromFlourWeight(baseRecipe, 400);
    expect(result.flourWeight).toBe(400);
  });

  it('cas limite — évaporation 0%', () => {
    const recipe = { ...baseRecipe, evaporationRate: 0 };
    const result = calculateFromFlourWeight(recipe, 300);
    expect(result.breadWeight).toBe(result.doughWeight);
  });

  it('retourne des arrondis à 1 décimale', () => {
    const result = calculateFromFlourWeight(baseRecipe, 333);
    const checkDecimal = (n) => Math.round(n * 10) / 10 === n;
    expect(checkDecimal(result.flourWeight)).toBe(true);
    expect(checkDecimal(result.doughWeight)).toBe(true);
    expect(checkDecimal(result.breadWeight)).toBe(true);
  });
});
