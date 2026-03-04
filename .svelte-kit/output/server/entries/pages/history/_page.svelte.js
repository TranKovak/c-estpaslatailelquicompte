import { h as head } from "../../../chunks/index2.js";
import "idb";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head("1xl2tfr", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Historique des fournées — CPLQ</title>`);
      });
    });
    $$renderer2.push(`<h1 class="page-title svelte-1xl2tfr">Historique des fournées</h1> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-muted">Chargement…</p>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
