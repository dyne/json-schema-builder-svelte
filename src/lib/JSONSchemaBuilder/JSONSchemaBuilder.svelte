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
		parseJSONObjectSchema,
		parseJSONObjectSchemaFromString,
		parseJSONSchema
	} from '$lib/logic/parsing.js';
	import { createJSONObjectSchema, returnSchema, stringify } from '$lib/logic/utils.js';

	import PropertyListEditor from '$lib/JSONSchemaBuilder/partials/propertyListEditor.svelte';
	import type { SchemaProp } from '$lib/logic/types.js';

	//

	export let schema: SchemaProp = createJSONObjectSchema();
	export let error: BaseError | undefined = undefined;
	export let returnType: ReturnType = 'object';

	//

	let propertyList = schemaPropToPropertyList(schema);
	$: if (propertyList) updateSchema(propertyList);

	function schemaPropToPropertyList(schemaProp: SchemaProp): Property[] | undefined {
		return pipe(
			schemaProp,
			schemaPropToString,
			parseJSONObjectSchemaFromString,
			Effect.map(JSONObjectSchemaToPropertyList),
			Effect.flatMap(validatePropertyList),
			Effect.match({
				onSuccess: (propertyList) => propertyList,
				onFailure: (cause) => {
					error = cause;
					return undefined;
				}
			}),
			Effect.runSync
		);
	}

	function updateSchema(propertyList: Property[]) {
		clearError();

		pipe(
			propertyList,
			validatePropertyListKeys,
			Effect.map(propertyListToJSONObjectSchema),
			Effect.flatMap(parseJSONSchema),
			Effect.flatMap(parseJSONObjectSchema),
			Effect.match({
				onSuccess: (newSchema) => (schema = returnSchema(newSchema, returnType)),
				onFailure: (cause) => (error = cause)
			}),
			Effect.runSync
		);
	}

	function clearError() {
		error = undefined;
	}
</script>

{#if propertyList}
	<PropertyListEditor bind:propertyList />
{/if}
