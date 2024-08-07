<script lang="ts">
	import { Effect, pipe } from 'effect';
	import { createJSONObjectSchema, returnSchema } from '$lib/logic/utils.js';
	import type { SchemaProp, ReturnType } from '$lib/types/components.js';
	import PropertyListEditor from '$lib/JSONSchemaBuilder/partials/propertyListEditor.svelte';

	import {
		propertyListToJSONSchema7Object,
		schemaPropToPropertyList,
		type SchemaPropToPropertyListError
	} from './logic/conversion.js';
	import type { Property } from './logic/types.js';
	import { stringsStore } from '$lib/ui/strings.js';
	import { createStringProperty } from './utils/index.js';

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
		parseError = undefined;
		propertyList = [];
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

	$: updateSchema(propertyList, returnType);

	function updateSchema(propertyList: Property[], returnType: ReturnType) {
		if (parseError) return;
		pipe(
			propertyList,
			propertyListToJSONSchema7Object,
			(schema) => returnSchema(schema, returnType),
			(s) => (schema = s)
		);
	}

	//

	function forceEdit() {
		parseError = undefined;
		propertyList = [createStringProperty()];
	}
</script>

{#if !parseError}
	<PropertyListEditor bind:propertyList {requiredDefault} {hideRequired} />
{:else}
	<div class="p-6 border rounded-lg">
		<div class="x-banner x-banner-warning justify-between">
			<div>
				<p class="font-bold">{parseError._tag}</p>
				<p>{$stringsStore.the_schema_cannot_be_opened_in_the_gui}</p>
				<p>{$stringsStore.use_the_editor_and_delete_the_data}</p>
			</div>
			<button class="underline hover:no-underline" on:click={forceEdit}>
				{$stringsStore.continue_and_delete}
			</button>
		</div>
	</div>
{/if}
