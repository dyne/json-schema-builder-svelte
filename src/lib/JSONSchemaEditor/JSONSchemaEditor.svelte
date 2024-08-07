<script lang="ts">
	import type { BaseError } from '$lib/utils/types.js';
	import type { SchemaProp, ReturnType } from '$lib/types/components.js';

	import JSONSchemaBuilder from '$lib/JSONSchemaBuilder/JSONSchemaBuilder.svelte';
	import JSONSchemaField from '$lib/JSONSchemaField/JSONSchemaField.svelte';

	import { stringsStore } from '$lib/ui/strings.js';
	import { iconSize } from '$lib/ui/settings.js';

	import ErrorBanner from '$lib/ui/errorBanner.svelte';
	import WarningBanner from '$lib/ui/warningBanner.svelte';
	import ArrowRight from 'svelte-heros-v2/ArrowRight.svelte';
	import { createJSONObjectSchema } from '$lib/logic/utils.js';
	import { Effect, pipe } from 'effect';
	import { schemaPropToPropertyList } from '$lib/JSONSchemaBuilder/logic/conversion.js';
	import { onMount } from 'svelte';
	import { schemaPropToString } from '$lib/logic/conversion.js';
	import { parseJSON, parseJSONSchema, parseJSONSchemaFromString } from '$lib/logic/parsing.js';
	import { parseJSONObjectSchema } from '$lib/JSONSchemaBuilder/logic/parsing.js';

	//

	export let schema: SchemaProp = createJSONObjectSchema();
	export let returnType: ReturnType = 'object';
	export let requiredDefault = false;
	export let hideRequired = false;

	export let mode: EditorMode = 'builder';
	export let label: string | undefined = undefined;

	//

	type EditorMode = 'builder' | 'field';

	function changeMode() {
		mode = getOtherMode(mode);
	}

	function getOtherMode(mode: EditorMode) {
		return mode == 'field' ? 'builder' : 'field';
	}

	//

	onMount(() =>
		pipe(
			isSchemaSupportedByBuilder(schema),
			Effect.tap((isSupported) => {
				if (!isSupported) mode = 'field';
			}),
			Effect.runSync
		)
	);

	function isSchemaSupportedByBuilder(schemaProp: SchemaProp) {
		return pipe(
			schemaPropToPropertyList(schemaProp),
			Effect.match({
				onFailure: () => false,
				onSuccess: () => true
			})
		);
	}

	//

	// let error: BaseError | undefined = undefined;
	// $: validateSchema(schema);

	// function validateSchema(schema: SchemaProp) {
	// 	pipe(
	// 		schema,
	// 		schemaPropToString,
	// 		parseJSONSchemaFromString,
	// 		Effect.flatMap(parseJSONObjectSchema),
	// 		Effect.match({
	// 			onFailure: (e) => (error = e),
	// 			onSuccess: () => {}
	// 		}),
	// 		Effect.runSync
	// 	);
	// }
</script>

<div>
	{#if mode == 'builder'}
		<JSONSchemaBuilder bind:schema {returnType} {requiredDefault} {hideRequired} />
	{:else}
		<JSONSchemaField bind:schema {returnType} />
	{/if}

	<!-- {#if error}
		<ErrorBanner {error} />
	{/if} -->

	<div class="flex justify-between items-center mt-4">
		<p class="x-label">
			{#if label}
				{label}
			{/if}
		</p>
		<button class="x-link" type="button" on:click={changeMode}>
			<span class="ml-1 flex items-center gap-2">
				<ArrowRight size={iconSize} />
				{$stringsStore[getOtherMode(mode)]}
			</span>
		</button>
	</div>
</div>
