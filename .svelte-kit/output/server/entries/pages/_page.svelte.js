import { s as store_get, h as head, c as ensure_array_like, a as attr_class, e as escape_html, d as attr, u as unsubscribe_stores } from "../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/root.js";
import "../../chunks/state.svelte.js";
import { r as recipes, a as activeTagFilter, f as filteredRecipes } from "../../chunks/stores2.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let allTags;
    function formatDate(ts) {
      return new Date(ts).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
    }
    allTags = [
      ...new Set(store_get($$store_subs ??= {}, "$recipes", recipes).flatMap((r) => r.tags))
    ].sort();
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>C'est pas la taille qui compte</title>`);
      });
    });
    $$renderer2.push(`<div class="home-page"><header class="page-header svelte-1uha8ag"><h1 class="page-title svelte-1uha8ag">Mes recettes</h1> <a href="/recipe/new" class="btn btn-primary new-btn svelte-1uha8ag">+ Nouvelle recette</a></header> `);
    if (allTags.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="tag-filters svelte-1uha8ag"><!--[-->`);
      const each_array = ensure_array_like(allTags);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let tag = each_array[$$index];
        $$renderer2.push(`<button type="button"${attr_class("tag", void 0, {
          "active": store_get($$store_subs ??= {}, "$activeTagFilter", activeTagFilter) === tag
        })}>${escape_html(tag)}</button>`);
      }
      $$renderer2.push(`<!--]--> `);
      if (store_get($$store_subs ??= {}, "$activeTagFilter", activeTagFilter)) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<button type="button" class="tag clear-filter svelte-1uha8ag">✕ Tout afficher</button>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (store_get($$store_subs ??= {}, "$filteredRecipes", filteredRecipes).length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="empty-state card svelte-1uha8ag">`);
      if (store_get($$store_subs ??= {}, "$recipes", recipes).length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="empty-icon svelte-1uha8ag">🍞</p> <p class="empty-title svelte-1uha8ag">Aucune recette pour l'instant</p> <p class="text-muted text-sm">Créez votre première recette en cliquant sur "+ Nouvelle recette".</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<p class="empty-icon svelte-1uha8ag">🔍</p> <p class="empty-title svelte-1uha8ag">Aucune recette avec ce tag</p> <button type="button" class="btn btn-secondary mt-2">Effacer le filtre</button>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="recipes-grid svelte-1uha8ag"><!--[-->`);
      const each_array_1 = ensure_array_like(store_get($$store_subs ??= {}, "$filteredRecipes", filteredRecipes));
      for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
        let recipe = each_array_1[$$index_2];
        $$renderer2.push(`<a${attr("href", `/recipe/${recipe.id}`)} class="recipe-card card svelte-1uha8ag">`);
        if (recipe.photo) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<img${attr("src", recipe.photo)}${attr("alt", recipe.name)} class="recipe-photo svelte-1uha8ag"/>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<div class="recipe-photo-placeholder svelte-1uha8ag">🍞</div>`);
        }
        $$renderer2.push(`<!--]--> <div class="recipe-info svelte-1uha8ag"><h2 class="recipe-name svelte-1uha8ag">${escape_html(recipe.name)}</h2> `);
        if (recipe.tags.length > 0) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="recipe-tags svelte-1uha8ag"><!--[-->`);
          const each_array_2 = ensure_array_like(recipe.tags);
          for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
            let tag = each_array_2[$$index_1];
            $$renderer2.push(`<span class="tag-small svelte-1uha8ag">${escape_html(tag)}</span>`);
          }
          $$renderer2.push(`<!--]--></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (recipe.notes) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<p class="recipe-notes text-muted text-sm svelte-1uha8ag">${escape_html(recipe.notes.slice(0, 80))}${escape_html(recipe.notes.length > 80 ? "…" : "")}</p>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> <p class="recipe-date text-muted text-sm svelte-1uha8ag">${escape_html(formatDate(recipe.updatedAt ?? recipe.createdAt))}</p></div></a>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
