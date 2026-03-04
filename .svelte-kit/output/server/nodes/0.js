

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "prerender": false,
  "ssr": false
};
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.0_oP2sl8.js","_app/immutable/chunks/Bu1b_yeV.js","_app/immutable/chunks/DsGKwER5.js","_app/immutable/chunks/B0yAzmyW.js","_app/immutable/chunks/BZjMusNu.js","_app/immutable/chunks/Dl0tH8OG.js","_app/immutable/chunks/CkLfrO85.js","_app/immutable/chunks/6jtMmQrC.js","_app/immutable/chunks/D1aYaWYQ.js","_app/immutable/chunks/DugHJqXD.js","_app/immutable/chunks/BPLQY1VX.js","_app/immutable/chunks/DbvWgIpv.js"];
export const stylesheets = ["_app/immutable/assets/0.DAyCb1cm.css"];
export const fonts = [];
