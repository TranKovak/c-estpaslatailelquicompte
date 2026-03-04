import { a as attr_class, s as store_get, b as slot, u as unsubscribe_stores } from "../../chunks/index2.js";
import { p as page } from "../../chunks/stores.js";
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    $$renderer2.push(`<div class="app-shell svelte-12qhfyh"><nav class="navbar svelte-12qhfyh"><div class="container svelte-12qhfyh"><a href="/" class="nav-brand svelte-12qhfyh">🍞 CPLQ</a> <div class="nav-links svelte-12qhfyh"><a href="/"${attr_class("svelte-12qhfyh", void 0, {
      "active": store_get($$store_subs ??= {}, "$page", page).url.pathname === "/"
    })}>Recettes</a> <a href="/history"${attr_class("svelte-12qhfyh", void 0, {
      "active": store_get($$store_subs ??= {}, "$page", page).url.pathname === "/history"
    })}>Historique</a> <a href="/settings"${attr_class("svelte-12qhfyh", void 0, {
      "active": store_get($$store_subs ??= {}, "$page", page).url.pathname === "/settings"
    })}>Paramètres</a></div></div></nav> <main class="main-content svelte-12qhfyh"><div class="container"><!--[-->`);
    slot($$renderer2, $$props, "default", {});
    $$renderer2.push(`<!--]--></div></main></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};
