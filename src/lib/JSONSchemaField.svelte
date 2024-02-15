<script lang="ts">
	import { Effect } from 'effect';

	import type { JSONObjectSchema } from '$lib/logic/types.js';
	import { createJSONObjectSchema } from '$lib/logic/utils.js';
	import { validateJSONSchema } from '$lib/logic/validation.js';
	import { parseJSONObjectSchemaFromString } from '$lib/logic/ops.js';

	import { nanoid } from 'nanoid';
	import { componentsSettings } from '$lib/ui/componentsStore.js';
	import XMark from 'svelte-heros-v2/XMark.svelte';

	//

	export let schema = createJSONObjectSchema();
	export let id = `json-schema-${nanoid(5)}`;

	//

	let error = '';

	function clearError() {
		error = '';
	}

	//

	let schemaString = JSON.stringify(schema, null, 2);
	$: updateSchema(schemaString);

	function updateSchema(schemaString: string) {
		clearError();

		Effect.runSync(
			Effect.match(parseJSONObjectSchemaFromString(schemaString), {
				onSuccess: (a) => {
					schema = a;
				},
				onFailure: (cause) => {
					error = cause._tag;
				}
			})
		);
	}
</script>

<div class="flex flex-col space-y-2">
	<textarea class="x-textarea" rows="20" {id} name={id} bind:value={schemaString} />
	{#if error}
		<div class="flex justify-between x-banner x-banner-error">
			<p>{error}</p>
			<button class="x-button x-button-square" on:click={clearError}>
				<XMark size={$componentsSettings.iconSize} />
			</button>
		</div>
	{/if}
</div>
