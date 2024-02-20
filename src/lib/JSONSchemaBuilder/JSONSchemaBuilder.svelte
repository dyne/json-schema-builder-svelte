<script lang="ts">
	import { Effect, pipe } from 'effect';

	import type { BaseError } from '$lib/logic/errors.js';
	import {
		JSONObjectSchemaToPropertyList,
		propertyListToJSONObjectSchema
	} from '$lib/logic/conversion.js';
	import { validatePropertyList, validatePropertyListKeys } from '$lib/logic/validation.js';
	import type { Property } from '$lib/logic/types.js';
	import {
		parseJSONObjectSchema,
		parseJSONObjectSchemaFromString,
		parseJSONSchema
	} from '$lib/logic/parsing.js';
	import {
		convertEmptyStringToObjectSchema,
		createJSONObjectSchema,
		stringify
	} from '$lib/logic/utils.js';

	import PropertyListEditor from '$lib/JSONSchemaBuilder/partials/propertyListEditor.svelte';

	//

	export let schema: string = stringify(createJSONObjectSchema());
	export let error: BaseError | undefined = undefined;

	//

	let propertyList = schemaToPropertyList(schema);
	$: if (propertyList) updateSchema(propertyList);

	function schemaToPropertyList(schema: string): Property[] | undefined {
		return Effect.runSync(
			Effect.match(
				pipe(
					schema,
					convertEmptyStringToObjectSchema,
					parseJSONObjectSchemaFromString,
					Effect.map(JSONObjectSchemaToPropertyList),
					Effect.flatMap(validatePropertyList)
				),
				{
					onSuccess: (propertyList) => propertyList,
					onFailure: (cause) => {
						error = cause;
						return undefined;
					}
				}
			)
		);
	}

	function updateSchema(propertyList: Property[]) {
		clearError();

		Effect.runSync(
			Effect.match(
				pipe(
					propertyList,
					validatePropertyListKeys,
					Effect.map(propertyListToJSONObjectSchema),
					Effect.flatMap(parseJSONSchema),
					Effect.flatMap(parseJSONObjectSchema)
				),
				{
					onSuccess: (newSchema) => (schema = stringify(newSchema)),
					onFailure: (cause) => (error = cause)
				}
			)
		);
	}

	function clearError() {
		error = undefined;
	}
</script>

{#if propertyList}
	<PropertyListEditor bind:propertyList />
{/if}
