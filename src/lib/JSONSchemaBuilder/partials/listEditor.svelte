<script lang="ts">
	import { nanoid } from 'nanoid';
	import { componentsStore } from '$lib/ui/componentsStore.js';

	//

	export let list: unknown[] = [];
	export let id = nanoid(5);

	//

	const SEPARATOR = ',';

	let stringValue = list.join(`${SEPARATOR} `);
	$: list = stringValue
		.split(SEPARATOR)
		.map((s) => s.trim())
		.filter((s) => s);
</script>

<svelte:component
	this={$componentsStore.input}
	class="grow basis-2/3"
	name={id}
	{id}
	type="text"
	bind:value={stringValue}
	placeholder="Separate values by comma"
	required
/>
