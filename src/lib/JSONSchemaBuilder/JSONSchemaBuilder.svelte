<script lang="ts">
	import { Effect, pipe } from 'effect';

	import {
		JSONObjectSchemaToPropertyList,
		propertyListToJSONObjectSchema
	} from '$lib/logic/conversion.js';
	import type { Property } from '$lib/logic/types.js';
	import {
		BaseError,
		convertEmptyStringToObjectSchema,
		createJSONObjectSchema,
		createStringProperty,
		stringify
	} from '$lib/logic/utils.js';
	import {
		parseJSONObjectSchema,
		parseJSONObjectSchemaFromString,
		parseJSONSchema
	} from '$lib/logic/parsing.js';
	import { validatePropertyListKeys } from '$lib/logic/validation.js';

	import PropertyListEditor from '$lib/JSONSchemaBuilder/partials/propertyListEditor.svelte';
	import ErrorBanner from '$lib/ui/errorBanner.svelte';

	//

	export let schema: string = stringify(createJSONObjectSchema());

	//

	let error: BaseError | undefined = undefined;

	function clearError() {
		error = undefined;
	}

	//

	let propertyList = schemaToPropertyList(schema);
	$: if (propertyList) updateSchema(propertyList);

	// TODO - Make it more "effecty"
	function schemaToPropertyList(schema: string): Property[] | undefined {
		return Effect.runSync(
			Effect.match(
				pipe(
					schema,
					convertEmptyStringToObjectSchema,
					parseJSONObjectSchemaFromString,
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
					onSuccess: (newSchema) => (schema = stringify(newSchema)),
					onFailure: (cause) => (error = cause)
				}
			)
		);
	}

	function resetSchema() {
		schema = stringify(createJSONObjectSchema());
		propertyList = schemaToPropertyList(schema);
		propertyList = [...propertyList!, createStringProperty()];
	}
</script>

{#if propertyList}
	<PropertyListEditor bind:propertyList />
{/if}
<ErrorBanner {error} />
{#if error}
	<div class="x-banner x-banner-warning flex justify-between">
		<p>The schema seems to be invalid. Would you like to reset it?</p>
		<button class="x-button" type="button" on:click={resetSchema}>Reset schema</button>
	</div>
{/if}
