export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["CNAME","favicon.ico","favicon.png","icons/PLACEHOLDER.md","icons/favicon-16.png","icons/favicon-32.png","icons/icon-192.png","icons/icon-512.png","icons/icon.svg","manifest.json"]),
	mimeTypes: {".png":"image/png",".md":"text/markdown",".svg":"image/svg+xml",".json":"application/json"},
	_: {
		client: {start:"_app/immutable/entry/start.CGAVYiF3.js",app:"_app/immutable/entry/app.BRfus-hP.js",imports:["_app/immutable/entry/start.CGAVYiF3.js","_app/immutable/chunks/Bsvnz8OS.js","_app/immutable/chunks/CQQgM9U0.js","_app/immutable/chunks/sfQSrnM6.js","_app/immutable/entry/app.BRfus-hP.js","_app/immutable/chunks/CfeNmGB_.js","_app/immutable/chunks/CQQgM9U0.js","_app/immutable/chunks/buYs1ta6.js","_app/immutable/chunks/BM-FqgCg.js","_app/immutable/chunks/DXs6CZWY.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
