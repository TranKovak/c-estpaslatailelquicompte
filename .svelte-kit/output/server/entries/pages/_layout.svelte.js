import { s as store_get, e as escape_html, a as ensure_array_like, b as attr_class, c as attr, d as slot, u as unsubscribe_stores } from "../../chunks/index2.js";
import { p as page } from "../../chunks/stores.js";
import { s as setupI18n, $ as $isLoading, a as $locale, b as $format } from "../../chunks/index3.js";
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const langs = [
      { code: "fr", flag: "🇫🇷" },
      { code: "en", flag: "🇬🇧" },
      { code: "es", flag: "🇪🇸" },
      { code: "qya", flag: "🧝" }
    ];
    setupI18n();
    if (!store_get($$store_subs ??= {}, "$isLoading", $isLoading)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="app-shell svelte-12qhfyh"><nav class="navbar svelte-12qhfyh"><div class="container svelte-12qhfyh"><a href="/" class="nav-brand svelte-12qhfyh">🍞 CPLQ <span class="nav-version svelte-12qhfyh">v${escape_html("1.2.0")}</span></a> <div class="lang-flags svelte-12qhfyh"><!--[-->`);
      const each_array = ensure_array_like(langs);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let lang = each_array[$$index];
        $$renderer2.push(`<button type="button"${attr_class("lang-flag svelte-12qhfyh", void 0, {
          "active": store_get($$store_subs ??= {}, "$locale", $locale) === lang.code
        })}${attr("aria-label", lang.code)}>${escape_html(lang.flag)}</button>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="nav-links svelte-12qhfyh"><a href="/"${attr_class("svelte-12qhfyh", void 0, {
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
