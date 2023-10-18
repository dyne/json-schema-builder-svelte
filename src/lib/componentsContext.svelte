<script lang="ts" context="module">
	import { SvelteComponent, getContext, setContext } from 'svelte';

	export type ComponentsStore = Record<string, SvelteComponent>;
	export interface ComponentsContext {
		components: ComponentsStore;
	}

	export const ComponentsContextKey = Symbol('CCK');
	export function getComponentsContext() {
		return getContext<ComponentsContext>(ComponentsContextKey);
	}
</script>

<script lang="ts">
	export let components: ComponentsStore;

	$: setContext(ComponentsContextKey, { components });
</script>

<slot />
