export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","icons/PLACEHOLDER.md","manifest.json"]),
	mimeTypes: {".png":"image/png",".md":"text/markdown",".json":"application/json"},
	_: {
		client: {start:"_app/immutable/entry/start.CCRMRdvK.js",app:"_app/immutable/entry/app.By3xxB9P.js",imports:["_app/immutable/entry/start.CCRMRdvK.js","_app/immutable/chunks/BPLQY1VX.js","_app/immutable/chunks/DsGKwER5.js","_app/immutable/chunks/D1aYaWYQ.js","_app/immutable/chunks/DbvWgIpv.js","_app/immutable/entry/app.By3xxB9P.js","_app/immutable/chunks/DsGKwER5.js","_app/immutable/chunks/BXMHFz2o.js","_app/immutable/chunks/Bu1b_yeV.js","_app/immutable/chunks/DJT4wuyh.js","_app/immutable/chunks/DH9l0kYU.js","_app/immutable/chunks/B0EcOX30.js","_app/immutable/chunks/6jtMmQrC.js","_app/immutable/chunks/D1aYaWYQ.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/history",
				pattern: /^\/history\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/recipe/new",
				pattern: /^\/recipe\/new\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/recipe/[id]",
				pattern: /^\/recipe\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/recipe/[id]/edit",
				pattern: /^\/recipe\/([^/]+?)\/edit\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/recipe/[id]/steps",
				pattern: /^\/recipe\/([^/]+?)\/steps\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/settings",
				pattern: /^\/settings\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
