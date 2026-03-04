import { h as head, d as attr, e as escape_html } from "../../../chunks/index2.js";
import "idb";
import "../../../chunks/stores2.js";
import "qrcode";
import "jsqr";
import "../../../chunks/ImportModal.svelte_svelte_type_style_lang.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let exporting = false;
    let importing = false;
    head("1i19ct2", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Paramètres — CPLQ</title>`);
      });
    });
    $$renderer2.push(`<h1 class="page-title svelte-1i19ct2">Paramètres</h1> <div class="settings-section card svelte-1i19ct2"><h2 class="section-heading svelte-1i19ct2">Bibliothèque de recettes</h2> <p class="text-muted text-sm mb-2">Exportez ou importez toutes vos recettes au format JSON. L'import ne supprime pas les recettes existantes.</p> <div class="settings-actions svelte-1i19ct2"><button type="button" class="btn btn-primary"${attr("disabled", exporting, true)}>${escape_html("⬇ Exporter toutes les recettes")}</button> <label class="btn btn-secondary import-label svelte-1i19ct2" for="import-file">${escape_html("⬆ Importer des recettes")} <input id="import-file" type="file" accept=".json" class="hidden-file-input svelte-1i19ct2"${attr("disabled", importing, true)}/></label></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="settings-section card mt-2 svelte-1i19ct2"><h2 class="section-heading svelte-1i19ct2">Partage QR code</h2> <p class="text-muted text-sm mb-2">Importez une recette depuis un QR code partagé par un autre utilisateur.</p> <button type="button" class="btn btn-ghost">📷 Importer depuis QR code ou JSON</button></div> <div class="settings-section card mt-2 svelte-1i19ct2"><h2 class="section-heading svelte-1i19ct2">À propos</h2> <p class="text-muted text-sm"><strong>C'est pas la taille qui compte</strong> — Calculateur de recettes en pourcentages boulangers.<br/> PWA 100% offline. Vos données restent sur votre appareil.</p></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
