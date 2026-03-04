import { i as fallback, c as attr, j as bind_props, e as escape_html, a as ensure_array_like, d as slot, s as store_get, u as unsubscribe_stores, k as invalid_default_snippet, h as head } from "../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/root.js";
import "../../../../chunks/state.svelte.js";
/* empty css                                                          */
import { b as $format } from "../../../../chunks/index3.js";
import "idb";
import "../../../../chunks/stores2.js";
function IngredientRow($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let isFlour;
    let ingredient = $$props["ingredient"];
    let index = fallback($$props["index"], 0);
    let readonly = fallback($$props["readonly"], false);
    let name = ingredient.name;
    let percentage = ingredient.percentage;
    isFlour = index === 0;
    $$renderer2.push(`<div class="ingredient-row svelte-1mlj9kt"><input type="text"${attr("value", name)} placeholder="Ingrédient"${attr("disabled", isFlour || readonly, true)} class="name-input svelte-1mlj9kt" aria-label="Nom de l'ingrédient"/> <div class="pct-wrapper svelte-1mlj9kt"><input type="number"${attr("value", percentage)} min="0" max="500" step="0.1"${attr("disabled", isFlour || readonly, true)} class="pct-input svelte-1mlj9kt" aria-label="Pourcentage"/> <span class="pct-symbol svelte-1mlj9kt">%</span></div> `);
    if (!isFlour && !readonly) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button type="button" class="remove-btn svelte-1mlj9kt" aria-label="Supprimer l'ingrédient">✕</button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { ingredient, index, readonly });
  });
}
function StepRow($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let step = fallback($$props["step"], "");
    let index = fallback($$props["index"], 0);
    let value = step;
    $$renderer2.push(`<div class="step-row svelte-1mvgmca"><span class="drag-handle svelte-1mvgmca" title="Réordonner">⠿</span> <span class="step-num svelte-1mvgmca">${escape_html(index + 1)}.</span> <textarea placeholder="Décris cette étape…" rows="2"${attr("aria-label", `Étape ${index + 1}`)} class="svelte-1mvgmca">`);
    const $$body = escape_html(value);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea> <button type="button" class="remove-btn svelte-1mvgmca" aria-label="Supprimer l'étape">✕</button></div>`);
    bind_props($$props, { step, index });
  });
}
function TagInput($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let tags = fallback($$props["tags"], () => [], true);
    let inputValue = "";
    $$renderer2.push(`<div class="tag-input-wrapper svelte-ba3yhw"><div class="tags-list svelte-ba3yhw"><!--[-->`);
    const each_array = ensure_array_like(tags);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tag = each_array[$$index];
      $$renderer2.push(`<span class="tag-chip svelte-ba3yhw">${escape_html(tag)} <button type="button"${attr("aria-label", `Supprimer le tag ${tag}`)} class="svelte-ba3yhw">✕</button></span>`);
    }
    $$renderer2.push(`<!--]--></div> <input type="text"${attr("value", inputValue)} placeholder="Ajouter un tag (Entrée ou virgule)" class="tag-field svelte-ba3yhw"/> `);
    if (inputValue.trim()) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button type="button" class="add-btn btn btn-secondary svelte-ba3yhw">+</button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { tags });
  });
}
function PhotoPicker($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let value = fallback($$props["value"], null);
    $$renderer2.push(`<div class="photo-picker svelte-1vbisbu">`);
    if (value) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="preview-wrapper svelte-1vbisbu"><img${attr("src", value)} alt="Aperçu de la photo" class="preview-img svelte-1vbisbu"/> <button type="button" class="remove-photo btn btn-secondary svelte-1vbisbu">Retirer la photo</button></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<label class="upload-label svelte-1vbisbu"><span class="upload-icon svelte-1vbisbu">📷</span> <span>Ajouter une photo (optionnel)</span> <input type="file" accept="image/*" class="hidden-input svelte-1vbisbu"/></label>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { value });
  });
}
function DragList($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let items = fallback($$props["items"], () => [], true);
    $$renderer2.push(`<div class="drag-list svelte-81zivq"><!--[-->`);
    const each_array = ensure_array_like(items);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let item = each_array[i];
      $$renderer2.push(`<div class="drag-item svelte-81zivq"><div class="drag-handle-zone svelte-81zivq"><!--[-->`);
      slot($$renderer2, $$props, "default", { item, index: i });
      $$renderer2.push(`<!--]--></div> <div class="move-btns svelte-81zivq"><button type="button" class="move-btn svelte-81zivq"${attr("disabled", i === 0, true)} aria-label="Monter">▲</button> <button type="button" class="move-btn svelte-81zivq"${attr("disabled", i === items.length - 1, true)} aria-label="Descendre">▼</button></div></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { items });
  });
}
function RecipeForm($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let recipe = fallback(
      $$props["recipe"],
      () => ({
        name: "",
        tags: [],
        evaporationRate: 12,
        proofingTime: "",
        bakingTime: "",
        notes: "",
        photo: null,
        ingredients: [{ name: "Farine", percentage: 100 }],
        steps: []
      }),
      true
    );
    let saving = fallback($$props["saving"], false);
    $$renderer2.push(`<form class="recipe-form svelte-1umens4"><div class="form-group"><label for="recipe-name">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("form.name_label"))}</label> <input id="recipe-name" type="text"${attr("value", recipe.name)}${attr("placeholder", store_get($$store_subs ??= {}, "$_", $format)("form.name_placeholder"))} required=""/></div> <div class="form-group"><label>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("form.tags_label"))}</label> `);
    TagInput($$renderer2, { tags: recipe.tags });
    $$renderer2.push(`<!----></div> <div class="form-row svelte-1umens4"><div class="form-group"><label for="evap-rate">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("form.evap_label"))}</label> <input id="evap-rate" type="number"${attr("value", recipe.evaporationRate)} min="0" max="50" step="0.5"/></div> <div class="form-group"><label for="proofing-time">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("form.proofing_label"))}</label> <input id="proofing-time" type="text"${attr("value", recipe.proofingTime)}${attr("placeholder", store_get($$store_subs ??= {}, "$_", $format)("form.proofing_placeholder"))}/></div> <div class="form-group"><label for="baking-time">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("form.baking_label"))}</label> <input id="baking-time" type="text"${attr("value", recipe.bakingTime)}${attr("placeholder", store_get($$store_subs ??= {}, "$_", $format)("form.baking_placeholder"))}/></div></div> <div class="form-group"><label for="notes">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("form.notes_label"))}</label> <textarea id="notes"${attr("placeholder", store_get($$store_subs ??= {}, "$_", $format)("form.notes_placeholder"))} rows="3">`);
    const $$body = escape_html(recipe.notes);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></div> <div class="form-group"><label>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("form.photo_label"))}</label> `);
    PhotoPicker($$renderer2, { value: recipe.photo });
    $$renderer2.push(`<!----></div> <hr/> <div class="section-title">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("form.ingredients_title"))}</div> `);
    DragList($$renderer2, {
      items: recipe.ingredients,
      children: invalid_default_snippet,
      $$slots: {
        default: ($$renderer3, { item, index }) => {
          {
            IngredientRow($$renderer3, { ingredient: item, index });
          }
        }
      }
    });
    $$renderer2.push(`<!----> <button type="button" class="btn btn-secondary add-btn svelte-1umens4">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("form.add_ingredient"))}</button> <hr/> <div class="section-title">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("form.steps_title"))}</div> `);
    if (recipe.steps.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-muted text-sm mb-1">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("form.no_steps"))}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
      DragList($$renderer2, {
        items: recipe.steps,
        children: invalid_default_snippet,
        $$slots: {
          default: ($$renderer3, { item, index }) => {
            {
              StepRow($$renderer3, { step: item, index });
            }
          }
        }
      });
    }
    $$renderer2.push(`<!--]--> <button type="button" class="btn btn-secondary add-btn svelte-1umens4">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("form.add_step"))}</button> <hr/> <div class="form-actions svelte-1umens4"><a href="/" class="btn btn-ghost">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("form.cancel"))}</a> <button type="submit" class="btn btn-primary"${attr("disabled", saving || !recipe.name.trim(), true)}>${escape_html(saving ? store_get($$store_subs ??= {}, "$_", $format)("form.saving") : store_get($$store_subs ??= {}, "$_", $format)("form.save"))}</button></div></form>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { recipe, saving });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let saving = false;
    head("n4r614", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("new.title"))} — CPLQ</title>`);
      });
    });
    $$renderer2.push(`<div class="page-header svelte-n4r614"><a href="/" class="back-link svelte-n4r614">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("new.back"))}</a> <h1 class="page-title svelte-n4r614">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("new.heading"))}</h1></div> `);
    RecipeForm($$renderer2, { saving });
    $$renderer2.push(`<!---->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
