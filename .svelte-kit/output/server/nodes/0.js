

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "prerender": false,
  "ssr": false
};
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.CBQtdQ7n.js","_app/immutable/chunks/D-HlUVkh.js","_app/immutable/chunks/DS3VfZpB.js","_app/immutable/chunks/CL1V2O4Y.js","_app/immutable/chunks/B7SqAZhL.js","_app/immutable/chunks/CAeC_Sel.js","_app/immutable/chunks/C3yyGCOe.js","_app/immutable/chunks/CkLfrO85.js","_app/immutable/chunks/DxFd2GQF.js","_app/immutable/chunks/DAYOHXkD.js","_app/immutable/chunks/BB-rZXi-.js","_app/immutable/chunks/CER2dCMD.js"];
export const stylesheets = ["_app/immutable/assets/0.Dglv1LNi.css"];
export const fonts = [];
