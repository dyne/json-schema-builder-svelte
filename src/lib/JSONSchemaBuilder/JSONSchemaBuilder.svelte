<script lang="ts">
	import { Effect, Option, pipe } from 'effect';
	import type { BaseError } from '$lib/logic/errors.js';
	import {
		JSONObjectSchemaToPropertyList,
		propertyListToJSONObjectSchema,
		schemaPropToString
	} from '$lib/logic/conversion.js';
	import { validatePropertyList, validatePropertyListKeys } from '$lib/logic/validation.js';
	import type { Property, ReturnType } from '$lib/logic/types.js';
	import {
		AjvOptions,
		parseJSONObjectSchema,
		parseJSONObjectSchemaFromString,
		parseJSONSchema
	} from '$lib/logic/parsing.js';
	import { createJSONObjectSchema, returnSchema } from '$lib/logic/utils.js';
	import PropertyListEditor from '$lib/JSONSchemaBuilder/partials/propertyListEditor.svelte';
	import type { SchemaProp } from '$lib/logic/types.js';

	//

	type Props = {
		schema: object;
		error: BaseError | undefined;
		requiredDefault: boolean;
		hideRequired: boolean;
	};

	let {
		schema = $bindable(createJSONObjectSchema()),
		error = $bindable(),
		requiredDefault = false,
		hideRequired = false
	}: Partial<Props> = $props();

	//

	let propertyList: Property[] = $state([]);
	updatePropertyList(schema);

	$effect(() => updateSchema(propertyList));

	//

	function updatePropertyList(schemaProp: SchemaProp) {
		pipe(
			schemaProp,
			schemaPropToString,
			parseJSONObjectSchemaFromString,
			Effect.map(JSONObjectSchemaToPropertyList),
			Effect.flatMap(validatePropertyList),
			Effect.match({
				onFailure: (e) => (error = e),
				onSuccess: (v) => (propertyList = v)
			}),
			Effect.provideService(AjvOptions, {}),
			Effect.runSync
		);
	}

	function updateSchema(propertyList: Property[]) {
		if (error && propertyList.length == 0) return;
		error = undefined;
		pipe(
			propertyList,
			validatePropertyListKeys,
			Effect.map(propertyListToJSONObjectSchema),
			Effect.flatMap(parseJSONSchema),
			Effect.flatMap(parseJSONObjectSchema),
			Effect.match({
				onFailure: (e) => (error = e),
				onSuccess: (v) => (schema = v)
			}),
			Effect.provideService(AjvOptions, {}),
			Effect.runSync
		);
	}
</script>

<PropertyListEditor bind:propertyList {requiredDefault} {hideRequired} />
