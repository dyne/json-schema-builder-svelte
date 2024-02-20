<script lang="ts">
	import { strings } from '$lib/ui/strings.js';
	import { nanoid } from 'nanoid';

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

<input
	class="x-input"
	name={id}
	{id}
	type="text"
	bind:value={stringValue}
	placeholder={strings.separate_values_by_comma}
	required
/>
