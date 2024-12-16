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
	import { type CreateAjvOptions, createJSONObjectSchema, returnSchema } from '$lib/logic/utils.js';
	import PropertyListEditor from '$lib/JSONSchemaBuilder/partials/propertyListEditor.svelte';
	import type { SchemaProp } from '$lib/logic/types.js';

	//

	export let schema: SchemaProp = createJSONObjectSchema();
	export let error: BaseError | undefined = undefined;
	export let returnType: ReturnType = 'object';
	export let requiredDefault = false;
	export let hideRequired = false;
	export let ajvOptions: CreateAjvOptions = {};

	//

	let propertyList: Property[] = [];

	$: updatePropertyList(schema);
	$: updateSchema(propertyList, returnType);

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
			Effect.provideService(AjvOptions, ajvOptions),
			Effect.runSync
		);
	}

	function updateSchema(propertyList: Property[], returnType: ReturnType) {
		if (error && propertyList.length == 0) return;
		error = undefined;
		pipe(
			propertyList,
			validatePropertyListKeys,
			Effect.map(propertyListToJSONObjectSchema),
			Effect.flatMap(parseJSONSchema),
			Effect.flatMap(parseJSONObjectSchema),
			Effect.map((schema) => returnSchema(schema, returnType)),
			Effect.match({
				onFailure: (e) => (error = e),
				onSuccess: (v) => (schema = v)
			}),
			Effect.provideService(AjvOptions, ajvOptions),
			Effect.runSync
		);
	}
</script>

<PropertyListEditor bind:propertyList {requiredDefault} {hideRequired} />
