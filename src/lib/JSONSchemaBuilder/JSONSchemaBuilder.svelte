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

	export let schema: object = createJSONObjectSchema();
	export let error: BaseError | undefined = undefined;
	export let requiredDefault = false;
	export let hideRequired = false;

	//

	let propertyList: Property[] = [];

	$: updatePropertyList(schema);
	$: updateSchema(propertyList);

	//

	function schemaPropToPropertyList(schemaProp: SchemaProp) {
		return pipe(
			schemaProp,
			schemaPropToString,
			parseJSONObjectSchemaFromString,
			Effect.map(JSONObjectSchemaToPropertyList),
			Effect.flatMap(validatePropertyList)
		);
	}

	function propertyListToSchema(propertyList: Property[]) {
		return pipe(
			propertyList,
			validatePropertyListKeys,
			Effect.map(propertyListToJSONObjectSchema),
			Effect.flatMap(parseJSONSchema),
			Effect.flatMap(parseJSONObjectSchema)
		);
	}

	//

	function updatePropertyList(schemaProp: SchemaProp) {
		pipe(
			schemaPropToPropertyList(schemaProp),
			Effect.match({
				onFailure: (e) => (error = e),
				onSuccess: (v) => (propertyList = v)
			}),
			Effect.provideService(AjvOptions, {}),
			Effect.runSync
		);
	}

	function updateSchema(propertyList: Property[]) {
		if (error) return;
		pipe(
			propertyListToSchema(propertyList),
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
