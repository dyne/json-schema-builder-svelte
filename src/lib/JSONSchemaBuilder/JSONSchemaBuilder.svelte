<script lang="ts">
	import { Effect, pipe } from 'effect';

	import {
		JSONObjectSchemaToPropertyList,
		propertyListToJSONObjectSchema
	} from '../logic/conversion.js';
	import type { Property } from '$lib/logic/types.js';
	import PropertyListEditor from '$lib/JSONSchemaBuilder/partials/propertyListEditor.svelte';
	import { BaseError, createJSONObjectSchema } from '../logic/utils.js';
	import {
		parseJSONObjectSchema,
		parseJSONSchema,
		validatePropertyListKeys
	} from '$lib/logic/operations.js';
	import ErrorBanner from '$lib/ui/errorBanner.svelte';

	//

	export let schema: object = createJSONObjectSchema();

	//

	let error: BaseError | undefined = undefined;

	function clearError() {
		error = undefined;
	}

	//

	let propertyList = schemaToPropertyList(schema);
	$: if (propertyList) updateSchema(propertyList);

	// TODO - Make it more "effecty"
	function schemaToPropertyList(schema: object): Property[] | undefined {
		return Effect.runSync(
			Effect.match(
				pipe(
					schema,
					parseJSONSchema,
					Effect.flatMap(parseJSONObjectSchema),
					Effect.map(JSONObjectSchemaToPropertyList)
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
					onSuccess: (newSchema) => (schema = newSchema),
					onFailure: (cause) => (error = cause)
				}
			)
		);
	}
</script>

{#if propertyList}
	<PropertyListEditor bind:propertyList />
{/if}
<ErrorBanner {error} />
