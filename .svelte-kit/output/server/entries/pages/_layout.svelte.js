import { s as store_get, e as escape_html, a as attr_class, b as slot, u as unsubscribe_stores } from "../../chunks/index2.js";
import { p as page } from "../../chunks/stores.js";
import { s as setupI18n, $ as $isLoading, a as $format } from "../../chunks/index3.js";
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    setupI18n();
    if (!store_get($$store_subs ??= {}, "$isLoading", $isLoading)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="app-shell svelte-12qhfyh"><nav class="navbar svelte-12qhfyh"><div class="container svelte-12qhfyh"><a href="/" class="nav-brand svelte-12qhfyh">🍞 CPLQ <span class="nav-version svelte-12qhfyh">v${escape_html("1.1.0")}</span></a> <div class="nav-links svelte-12qhfyh"><a href="/"${attr_class("svelte-12qhfyh", void 0, {
        "active": store_get($$store_subs ??= {}, "$page", page).url.pathname === "/"
      })}>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("nav.recipes"))}</a> <a href="/history"${attr_class("svelte-12qhfyh", void 0, {
        "active": store_get($$store_subs ??= {}, "$page", page).url.pathname === "/history"
      })}>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("nav.history"))}</a> <a href="/settings"${attr_class("svelte-12qhfyh", void 0, {
        "active": store_get($$store_subs ??= {}, "$page", page).url.pathname === "/settings"
      })}>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("nav.settings"))}</a> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></nav> <main class="main-content svelte-12qhfyh"><div class="container"><!--[-->`);
      slot($$renderer2, $$props, "default", {});
      $$renderer2.push(`<!--]--></div></main></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};
