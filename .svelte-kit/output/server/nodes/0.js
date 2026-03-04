

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "prerender": false,
  "ssr": false
};
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.8b4qzp3p.js","_app/immutable/chunks/IAEtSK99.js","_app/immutable/chunks/CCMXy1_l.js","_app/immutable/chunks/QpR15Ky-.js","_app/immutable/chunks/DNNYY-Ji.js","_app/immutable/chunks/BcQwTdYs.js","_app/immutable/chunks/BNmPR3Sr.js","_app/immutable/chunks/9_Aw4Mmh.js","_app/immutable/chunks/CkLfrO85.js","_app/immutable/chunks/DqDpMKTm.js","_app/immutable/chunks/CRG9Z4sW.js","_app/immutable/chunks/DUmEXK5E.js"];
export const stylesheets = ["_app/immutable/assets/0.t8FSSohq.css"];
export const fonts = [];
