<script lang="ts">
	import { Effect, pipe } from 'effect';
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

	function schemaToPropertyList(obj: object) {
		return pipe(
			obj,
			parseJSONSchema,
			Effect.flatMap(parseJSONObjectSchema),
			Effect.map(JSONObjectSchemaToPropertyList),
			Effect.flatMap(validatePropertyList),
			Effect.match({
				onFailure: (e) => {
					throw e;
				},
				onSuccess: (v) => v
			}),
			Effect.provideService(AjvOptions, {}),
			Effect.runSync
		);
	}

	function propertyListToSchema(propertyList: Property[]) {
		return pipe(
			propertyList,
			validatePropertyListKeys,
			Effect.map(propertyListToJSONObjectSchema),
			Effect.flatMap(parseJSONSchema),
			Effect.flatMap(parseJSONObjectSchema),
			Effect.match({
				onFailure: (e) => {
					throw e;
				},
				onSuccess: (v) => v
			}),
			Effect.provideService(AjvOptions, {}),
			Effect.runSync
		);
	}

	// //

	// function getPropertyList(schemaProp: SchemaProp) {
	// 	return pipe(
	// 		schemaPropToPropertyList(schemaProp),
	// 		Effect.provideService(AjvOptions, {}),
	// 		Effect.runSync
	// 	);
	// }

	// function updateSchema(propertyList: Property[], returnType: ReturnType) {
	// 	if (error) return;
	// 	return pipe(
	// 		propertyListToSchema(propertyList, returnType),
	// 		Effect.match({
	// 			onFailure: (e) => (error = e),
	// 			onSuccess: (v) => (schema = v)
	// 		}),
	// 		Effect.provideService(AjvOptions, {}),
	// 		Effect.runSync
	// 	);
	// }
</script>

<PropertyListEditor
	bind:propertyList={() => schemaToPropertyList(schema), (v) => (schema = propertyListToSchema(v))}
	{requiredDefault}
	{hideRequired}
/>
