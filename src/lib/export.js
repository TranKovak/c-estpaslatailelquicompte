import { getRecipes, saveRecipe } from './db.js';

/**
 * Exporte toutes les recettes en fichier JSON téléchargeable.
 */
export async function exportLibrary() {
  const recipes = await getRecipes();
  const json = JSON.stringify(recipes, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const date = new Date().toISOString().slice(0, 10);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cplq-recettes-${date}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Libère l'URL après un court délai
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Importe des recettes depuis un fichier JSON.
 * Les recettes existantes NE SONT PAS écrasées — les IDs sont régénérés.
 *
 * @param {File} file
 * @returns {Promise<number>} Nombre de recettes importées
 */
export function importLibrary(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (!Array.isArray(parsed)) {
          throw new Error('Le fichier doit contenir un tableau de recettes JSON.');
        }
        let count = 0;
        for (const recipe of parsed) {
          if (
            typeof recipe.name !== 'string' ||
            !Array.isArray(recipe.ingredients)
          ) {
            continue; // Ignore les entrées malformées
          }
          // Régénère l'ID pour éviter les conflits
          await saveRecipe({
            ...recipe,
            id: undefined,
            createdAt: undefined,
            updatedAt: undefined
          });
          count++;
        }
        resolve(count);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Impossible de lire le fichier.'));
    reader.readAsText(file);
  });
}
