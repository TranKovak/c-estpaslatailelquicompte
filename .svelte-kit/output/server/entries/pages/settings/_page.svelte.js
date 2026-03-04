import { h as head, e as escape_html, s as store_get, c as ensure_array_like, b as attr_class, a as attr, u as unsubscribe_stores } from "../../../chunks/index2.js";
import "idb";
import "../../../chunks/stores2.js";
import { b as $format, $ as $locale } from "../../../chunks/index3.js";
import "qrcode";
import "jsqr";
import "../../../chunks/ImportModal.svelte_svelte_type_style_lang.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let exporting = false;
    let importing = false;
    const languages = [
      { code: "fr", label: "Français" },
      { code: "en", label: "English" },
      { code: "es", label: "Español" },
      { code: "qya", label: "Quenya" }
    ];
    head("1i19ct2", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.title"))} — CPLQ</title>`);
      });
    });
    $$renderer2.push(`<h1 class="page-title svelte-1i19ct2">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.title"))}</h1> <div class="settings-section card svelte-1i19ct2"><h2 class="section-heading svelte-1i19ct2">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.language_heading"))}</h2> <div class="lang-btns svelte-1i19ct2"><!--[-->`);
    const each_array = ensure_array_like(languages);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let lang = each_array[$$index];
      $$renderer2.push(`<button type="button"${attr_class("lang-btn svelte-1i19ct2", void 0, {
        "active": store_get($$store_subs ??= {}, "$locale", $locale) === lang.code
      })}>${escape_html(lang.label)}</button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="settings-section card mt-2 svelte-1i19ct2"><h2 class="section-heading svelte-1i19ct2">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.library_heading"))}</h2> <p class="text-muted text-sm mb-2">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.library_hint"))}</p> <div class="settings-actions svelte-1i19ct2"><button type="button" class="btn btn-primary"${attr("disabled", exporting, true)}>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.export_btn"))}</button> <label class="btn btn-secondary import-label svelte-1i19ct2" for="import-file">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.import_btn"))} <input id="import-file" type="file" accept=".json" class="hidden-file-input svelte-1i19ct2"${attr("disabled", importing, true)}/></label></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="settings-section card mt-2 svelte-1i19ct2"><h2 class="section-heading svelte-1i19ct2">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.qr_heading"))}</h2> <p class="text-muted text-sm mb-2">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.qr_hint"))}</p> <button type="button" class="btn btn-ghost">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.qr_btn"))}</button></div> <div class="settings-section card mt-2 svelte-1i19ct2"><h2 class="section-heading svelte-1i19ct2">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.about_heading"))}</h2> <p class="text-muted text-sm"><strong>C'est pas la taille qui compte</strong> — ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("settings.about_text"))}</p></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
