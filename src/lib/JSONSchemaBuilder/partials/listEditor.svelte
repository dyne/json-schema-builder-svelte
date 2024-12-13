<script lang="ts">
	import { stringsStore } from '$lib/ui/strings.js';
	import { nanoid } from 'nanoid';

	//

	export let list: unknown[] = [];
	export let id = nanoid(5);

	//

	const SEPARATOR = ',';

	function getValue(list: unknown[]) {
		return list.join(`${SEPARATOR} `);
	}

	function updateList(stringValue: string) {
		list = stringValue
			.split(SEPARATOR)
			.map((s) => s.trim())
			.filter((s) => s);
	}
</script>

<input
	class="x-input"
	name={id}
	{id}
	type="text"
	value={getValue(list)}
	oninput={(e) => updateList(e.currentTarget.value)}
	placeholder={$stringsStore.separate_values_by_comma}
	required
/>
