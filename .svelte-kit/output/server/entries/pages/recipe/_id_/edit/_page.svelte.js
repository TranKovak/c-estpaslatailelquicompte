import { h as head, d as attr, s as store_get, e as escape_html, u as unsubscribe_stores } from "../../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../../chunks/exports.js";
import "../../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../../chunks/root.js";
import "../../../../../chunks/state.svelte.js";
import { p as page } from "../../../../../chunks/stores.js";
/* empty css                                                             */
import { a as $format } from "../../../../../chunks/index3.js";
import "idb";
import "../../../../../chunks/stores2.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    head("m8brny", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("edit.title_generic"))} — CPLQ</title>`);
      });
    });
    $$renderer2.push(`<div class="page-header svelte-m8brny"><a${attr("href", `/recipe/${store_get($$store_subs ??= {}, "$page", page).params.id}`)} class="back-link svelte-m8brny">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("edit.back"))}</a> <h1 class="page-title svelte-m8brny">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("edit.heading"))}</h1></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-muted">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("edit.loading"))}</p>`);
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
