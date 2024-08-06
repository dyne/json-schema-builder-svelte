<script lang="ts">
	import { stringsStore } from '$lib/ui/strings.js';
	import { nanoid } from 'nanoid';
	import { pipe, String as S, Array as A, Effect } from 'effect';

	//

	export let list: unknown[] = [];
	export let id = nanoid(5);

	//

	const SEPARATOR = ',';

	let stringValue = list.join(`${SEPARATOR} `);
	$: list = pipe(
		stringValue,
		S.split(SEPARATOR),
		A.map(S.trim),
		A.filter(Boolean),
		A.dedupe,
		(items) => {
			if (items.length == 0) return [''];
			else return items;
		}
	);
</script>

<input
	class="x-input"
	name={id}
	{id}
	type="text"
	bind:value={stringValue}
	placeholder={$stringsStore.separate_values_by_comma}
	required
/>
