<script lang="ts">
	import type { Action } from 'svelte/action';

	export let value: any = undefined;
	export let type: HTMLInputElement['type'] = 'text';
	export let id = '';
	export let name = '';
	export let placeholder = '';
	export let required = false;

	let className = '';
	export { className as class };

	const typeAction: Action<HTMLInputElement, { type: string }> = (node, { type }) => {
		node.type = type;
		return {
			update: ({ type }) => {
				node.type = type;
			}
		};
	};
</script>

<input
	class={className}
	{id}
	{name}
	{placeholder}
	{required}
	use:typeAction={{ type }}
	bind:value
/>
