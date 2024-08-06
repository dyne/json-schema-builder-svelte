<script lang="ts">
	import { Effect, pipe } from 'effect';

	import type { BaseError } from '$lib/utils/types.js';
	import { createJSONObjectSchema, returnSchema } from '$lib/logic/utils.js';
	import type { SchemaProp, ReturnType } from '$lib/types/components.js';

	import { nanoid } from 'nanoid';
	import { schemaPropToString } from '$lib/logic/conversion.js';
	import { parseJSONSchemaFromString } from '$lib/logic/parsing.js';
	import { stringsStore } from '$lib/ui/strings.js';

	//

	export let schema: SchemaProp = createJSONObjectSchema();
	export let returnType: ReturnType = 'object';

	export let id = `json-schema-${nanoid(5)}`;

	//

	let tempSchema = '';
	let error: BaseError | undefined = undefined;

	$: updateTempSchema(schema);
	$: updateSchema(tempSchema, returnType);

	function updateTempSchema(schema: SchemaProp) {
		tempSchema = schemaPropToString(schema);
	}

	function updateSchema(schemaString: string, returnType: ReturnType) {
		error = undefined;
		pipe(
			stringToSchemaProp(schemaString, returnType),
			Effect.match({
				onFailure: (e) => (error = e),
				onSuccess: (v) => (schema = v)
			}),
			Effect.runSync
		);
	}

	function stringToSchemaProp(schemaString: string, returnType: ReturnType) {
		return pipe(
			schemaString,
			parseJSONSchemaFromString,
			Effect.map((schema) => returnSchema(schema, returnType))
		);
	}
</script>

<div>
	<textarea class="x-textarea font-mono" rows="20" {id} name={id} bind:value={tempSchema} />

	{#if error}
		<div class="x-banner x-banner-warning justify-between mt-4">
			<div>
				<p class="font-bold">{error._tag}</p>
			</div>
		</div>
	{/if}
</div>
