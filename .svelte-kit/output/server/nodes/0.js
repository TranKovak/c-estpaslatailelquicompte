

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "prerender": false,
  "ssr": false
};
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.DAPNGJNl.js","_app/immutable/chunks/buYs1ta6.js","_app/immutable/chunks/CQQgM9U0.js","_app/immutable/chunks/B2mLhpo-.js","_app/immutable/chunks/CfeNmGB_.js","_app/immutable/chunks/DU3o5oDd.js","_app/immutable/chunks/T9ry76vT.js","_app/immutable/chunks/TqIZVmbe.js","_app/immutable/chunks/CkLfrO85.js","_app/immutable/chunks/CKPgqgF5.js","_app/immutable/chunks/Bxu1RBTk.js","_app/immutable/chunks/DSz-tdKk.js","_app/immutable/chunks/tQi3hicc.js"];
export const stylesheets = ["_app/immutable/assets/0.BzZBvtCl.css"];
export const fonts = [];
