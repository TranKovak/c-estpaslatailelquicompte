
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/history" | "/recipe" | "/recipe/new" | "/recipe/[id]" | "/recipe/[id]/edit" | "/recipe/[id]/steps" | "/settings";
		RouteParams(): {
			"/recipe/[id]": { id: string };
			"/recipe/[id]/edit": { id: string };
			"/recipe/[id]/steps": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string };
			"/history": Record<string, never>;
			"/recipe": { id?: string };
			"/recipe/new": Record<string, never>;
			"/recipe/[id]": { id: string };
			"/recipe/[id]/edit": { id: string };
			"/recipe/[id]/steps": { id: string };
			"/settings": Record<string, never>
		};
		Pathname(): "/" | "/history" | "/recipe/new" | `/recipe/${string}` & {} | `/recipe/${string}/edit` & {} | `/recipe/${string}/steps` & {} | "/settings";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.png" | "/icons/PLACEHOLDER.md" | "/manifest.json" | string & {};
	}
}