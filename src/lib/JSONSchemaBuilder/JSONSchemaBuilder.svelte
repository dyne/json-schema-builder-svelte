<script lang="ts">
	import { Effect, pipe } from 'effect';
	// import type { BaseError } from '$lib/logic/errors.js';

	// import {
	// 	validatePropertyList,
	// 	validatePropertyListKeys
	// } from '$lib/JSONSchemaBuilder/logic/validation-supported-schema.js';
	// import type { ReturnType } from '$lib/types/components.js';
	// import {
	// 	parseJSONObjectSchema,
	// 	parseJSONObjectSchemaFromString,
	// 	parseJSONSchema
	// } from '$lib/logic/parsing.js';
	import { createJSONObjectSchema, returnSchema } from '$lib/logic/utils.js';
	import type { SchemaProp, ReturnType } from '$lib/types/components.js';
	// import PropertyListEditor from '$lib/JSONSchemaBuilder/partials/propertyListEditor.svelte';
	// import type { Property } from '$lib/logic/types.js';
	// import WarningBanner from '$lib/ui/warningBanner.svelte';
	// import { stringsStore as s } from '$lib/ui/strings.js';

	import {
		schemaPropToPropertyList,
		type SchemaPropToPropertyListError
	} from './logic/conversion.js';
	import type { Property } from './logic/types.js';

	//

	export let schema: SchemaProp = createJSONObjectSchema();
	export let returnType: ReturnType = 'object';
	export let requiredDefault = false;
	export let hideRequired = false;

	//

	let propertyList: Property[] = [];
	let parseError: SchemaPropToPropertyListError | undefined = undefined;
	$: updatePropertyList(schema);

	function updatePropertyList(schemaProp: SchemaProp) {
		pipe(
			schemaPropToPropertyList(schemaProp),
			Effect.match({
				onFailure: (e) => (parseError = e),
				onSuccess: (v) => (propertyList = v)
			}),
			Effect.runSync
		);
	}

	//

	// $: updateSchema(propertyList, returnType);

	// function updateSchema(propertyList: Property[], returnType: ReturnType) {
	// 	if (error) return;
	// 	clearError();
	// 	pipe(
	// 		propertyListToSchema(propertyList, returnType),
	// 		Effect.match({
	// 			onFailure: (e) => (error = e),
	// 			onSuccess: (v) => (schema = v)
	// 		}),
	// 		Effect.runSync
	// 	);
	// }

	// function propertyListToSchema(propertyList: Property[], returnType: ReturnType) {
	// 	return pipe(
	// 		propertyList,
	// 		validatePropertyListKeys,
	// 		Effect.map(propertyListToJSONObjectSchema),
	// 		Effect.flatMap(parseJSONSchema),
	// 		Effect.flatMap(parseJSONObjectSchema),
	// 		Effect.map((schema) => returnSchema(schema, returnType))
	// 	);
	// }

	// //

	// function clearError() {
	// 	error = undefined;
	// }

	// function forceEdit() {
	// 	error = undefined;
	// 	propertyList = [];
	// }
</script>

<pre>{JSON.stringify(propertyList, null, 2)}</pre>
<pre>{JSON.stringify(parseError, null, 2)}</pre>

<!-- {#if propertyList && !Boolean(error)}
	<PropertyListEditor bind:propertyList {requiredDefault} {hideRequired} />
{:else}
	<WarningBanner {error}>
		<div>
			<p class="font-bold">{$s.warning}</p>
			<p>{$s.the_schema_cannot_be_opened_in_the_gui}</p>
			<p>{$s.if_you_use_gui_all_the_data_will_be_lost}</p>
		</div>
		<svelte:fragment slot="right">
			<button type="button" class="underline" on:click={forceEdit}>
				{$s.use_the_editor_and_delete_the_data}
			</button>
		</svelte:fragment>
	</WarningBanner>
{/if} -->
