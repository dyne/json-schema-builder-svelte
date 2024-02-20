<script lang="ts">
	import { Effect, pipe } from 'effect';

	import {
		JSONObjectSchemaToPropertyList,
		propertyListToJSONObjectSchema
	} from '$lib/logic/conversion.js';
	import { validatePropertyListKeys } from '$lib/logic/validation.js';
	import {
		parseJSONObjectSchema,
		parseJSONObjectSchemaFromString,
		parseJSONSchema
	} from '$lib/logic/parsing.js';
	import type { Property } from '$lib/logic/types.js';
	import {
		convertEmptyStringToObjectSchema,
		createJSONObjectSchema,
		createStringProperty,
		stringify
	} from '$lib/logic/utils.js';
	import type { BaseError } from '$lib/logic/errors.js';

	import PropertyListEditor from '$lib/JSONSchemaBuilder/partials/propertyListEditor.svelte';
	import ErrorBanner from '$lib/ui/errorBanner.svelte';
	import { strings } from '$lib/ui/strings.js';

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
	}
</script>

{#if propertyList}
	<PropertyListEditor bind:propertyList />
{/if}

<div class="space-y-2">
	<ErrorBanner {error} />
	{#if error}
		<div class="x-banner x-banner-warning flex justify-between">
			<p>{strings.the_schema_seems_to_be_invalid__would_you_like_to_reset_it}</p>
			<button class="x-button" type="button" on:click={resetSchema}>{strings.reset_schema}</button>
		</div>
	{/if}
</div>
