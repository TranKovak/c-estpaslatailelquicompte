import { h as head, e as escape_html, s as store_get, u as unsubscribe_stores } from "../../../chunks/index2.js";
import "idb";
import { a as $format } from "../../../chunks/index3.js";
import "clsx";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    head("1xl2tfr", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("history.title"))} — CPLQ</title>`);
      });
    });
    $$renderer2.push(`<h1 class="page-title svelte-1xl2tfr">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("history.title"))}</h1> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-muted">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("history.loading"))}</p>`);
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
