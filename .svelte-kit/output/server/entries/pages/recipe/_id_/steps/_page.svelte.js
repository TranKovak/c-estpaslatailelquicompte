import { f as ssr_context, h as head, e as escape_html, s as store_get, u as unsubscribe_stores } from "../../../../../chunks/index2.js";
import "clsx";
import "@sveltejs/kit/internal";
import "../../../../../chunks/exports.js";
import "../../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../../chunks/root.js";
import "../../../../../chunks/state.svelte.js";
import "idb";
import { a as $format } from "../../../../../chunks/index3.js";
function onDestroy(fn) {
  /** @type {SSRContext} */
  ssr_context.r.on_destroy(fn);
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let wakeLock = null;
    async function requestWakeLock() {
      if (!("wakeLock" in navigator)) return;
      try {
        wakeLock = await navigator.wakeLock.request("screen");
      } catch (e) {
        console.warn("Wake Lock non disponible :", e.message);
      }
    }
    async function releaseWakeLock() {
      if (wakeLock) {
        try {
          await wakeLock.release();
        } catch {
        }
        wakeLock = null;
      }
    }
    async function handleVisibilityChange() {
      if (document.visibilityState === "visible" && !wakeLock) {
        await requestWakeLock();
      }
    }
    onDestroy(async () => {
      await releaseWakeLock();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    });
    head("1igslfr", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("steps.title_generic"))} — CPLQ</title>`);
      });
    });
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-muted">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("steps.loading"))}</p>`);
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
