import { openDB } from 'idb';

const DB_NAME = 'cplq-db';
const DB_VERSION = 1;

/** UUID v4 compatible HTTP et HTTPS */
function uuid() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return uuid();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

/** @returns {Promise<import('idb').IDBPDatabase>} */
function getDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('recipes')) {
        db.createObjectStore('recipes', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('history')) {
        db.createObjectStore('history', { keyPath: 'id' });
      }
    }
  });
}

// ─── Recettes ───────────────────────────────────────────────────────────────

/** @returns {Promise<Recipe[]>} */
export async function getRecipes() {
  const db = await getDB();
  return db.getAll('recipes');
}

/** @param {string} id @returns {Promise<Recipe|undefined>} */
export async function getRecipe(id) {
  const db = await getDB();
  return db.get('recipes', id);
}

/** @param {Recipe} recipe @returns {Promise<string>} */
export async function saveRecipe(recipe) {
  const db = await getDB();
  const now = Date.now();
  const toSave = {
    ...recipe,
    id: recipe.id ?? uuid(),
    createdAt: recipe.createdAt ?? now,
    updatedAt: now
  };
  await db.put('recipes', toSave);
  return toSave.id;
}

/** @param {string} id */
export async function deleteRecipe(id) {
  const db = await getDB();
  await db.delete('recipes', id);
}

// ─── Historique ──────────────────────────────────────────────────────────────

/** @returns {Promise<FourneeHistorique[]>} */
export async function getHistory() {
  const db = await getDB();
  return db.getAll('history');
}

/** @param {FourneeHistorique} entry @returns {Promise<string>} */
export async function saveHistoryEntry(entry) {
  const db = await getDB();
  const toSave = {
    ...entry,
    id: entry.id ?? uuid(),
    date: entry.date ?? Date.now()
  };
  await db.put('history', toSave);
  return toSave.id;
}

/** @param {string} id */
export async function deleteHistoryEntry(id) {
  const db = await getDB();
  await db.delete('history', id);
}

/**
 * @typedef {Object} Ingredient
 * @property {string} name
 * @property {number} percentage
 */

/**
 * @typedef {Object} Recipe
 * @property {string} [id]
 * @property {string} name
 * @property {string[]} tags
 * @property {number} evaporationRate
 * @property {string} proofingTime
 * @property {string} bakingTime
 * @property {string} notes
 * @property {string|null} photo
 * @property {Ingredient[]} ingredients
 * @property {string[]} steps
 * @property {number} [createdAt]
 * @property {number} [updatedAt]
 */

/**
 * @typedef {Object} FourneeHistorique
 * @property {string} [id]
 * @property {number} [date]
 * @property {string} recipeName
 * @property {number} targetBreadWeight
 * @property {number} flourWeight
 * @property {{name: string, weight: number}[]} ingredientsCalculated
 * @property {string} note
 * @property {string|null} photo
 */
