import { s as store_get, e as escape_html, a as attr, b as attr_class, c as ensure_array_like, d as slot, u as unsubscribe_stores } from "../../chunks/index2.js";
import { p as page } from "../../chunks/stores.js";
import { s as setupI18n, $ as $locale, a as $isLoading, b as $format } from "../../chunks/index3.js";
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let currentLang;
    const langs = [
      { code: "fr", flag: "🇫🇷", label: "Français" },
      { code: "en", flag: "🇬🇧", label: "English" },
      { code: "es", flag: "🇪🇸", label: "Español" },
      { code: "qya", flag: "🧝", label: "Quenya" }
    ];
    setupI18n();
    let menuOpen = false;
    function closeMenu() {
      menuOpen = false;
    }
    store_get($$store_subs ??= {}, "$page", page).url.pathname, closeMenu();
    currentLang = langs.find((l) => l.code === store_get($$store_subs ??= {}, "$locale", $locale)) ?? langs[0];
    if (!store_get($$store_subs ??= {}, "$isLoading", $isLoading)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="app-shell svelte-12qhfyh"><nav class="navbar svelte-12qhfyh"><div class="nav-bar svelte-12qhfyh"><a href="/" class="nav-brand svelte-12qhfyh">🍞 CPLQ <span class="nav-version svelte-12qhfyh">v${escape_html("1.2.1")}</span></a> <button type="button" class="burger svelte-12qhfyh" aria-label="Menu"${attr("aria-expanded", menuOpen)}>`);
      if (menuOpen) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`✕`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`☰`);
      }
      $$renderer2.push(`<!--]--></button></div> `);
      if (menuOpen) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="nav-drawer svelte-12qhfyh"><div class="drawer-links svelte-12qhfyh"><a href="/"${attr_class("svelte-12qhfyh", void 0, {
          "active": store_get($$store_subs ??= {}, "$page", page).url.pathname === "/"
        })}>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("nav.recipes"))}</a> <a href="/history"${attr_class("svelte-12qhfyh", void 0, {
          "active": store_get($$store_subs ??= {}, "$page", page).url.pathname === "/history"
        })}>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("nav.history"))}</a> <a href="/settings"${attr_class("svelte-12qhfyh", void 0, {
          "active": store_get($$store_subs ??= {}, "$page", page).url.pathname === "/settings"
        })}>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("nav.settings"))}</a></div> <div class="drawer-bottom svelte-12qhfyh"><div class="lang-select-wrapper svelte-12qhfyh"><span class="lang-current-flag svelte-12qhfyh">${escape_html(currentLang.flag)}</span> `);
        $$renderer2.select(
          {
            class: "lang-select",
            value: store_get($$store_subs ??= {}, "$locale", $locale)
          },
          ($$renderer3) => {
            $$renderer3.push(`<!--[-->`);
            const each_array = ensure_array_like(langs);
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let lang = each_array[$$index];
              $$renderer3.option({ value: lang.code }, ($$renderer4) => {
                $$renderer4.push(`${escape_html(lang.flag)} ${escape_html(lang.label)}`);
              });
            }
            $$renderer3.push(`<!--]-->`);
          },
          "svelte-12qhfyh"
        );
        $$renderer2.push(` <span class="lang-chevron svelte-12qhfyh">▾</span></div> `);
        {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div> `);
        {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></nav> <main class="main-content svelte-12qhfyh"><div class="container"><!--[-->`);
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
