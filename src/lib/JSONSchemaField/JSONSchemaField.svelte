<script lang="ts">
	import { Effect, pipe } from 'effect';

	import { parseJSONObjectSchemaFromString } from '$lib/logic/parsing.js';
	import { stringify, type BaseError, createJSONObjectSchema } from '$lib/logic/utils.js';

	import { nanoid } from 'nanoid';
	import ErrorBanner from '$lib/ui/errorBanner.svelte';

	//

	export let schema: object = createJSONObjectSchema();
	export let id = `json-schema-${nanoid(5)}`;

	//

	let error: BaseError | undefined = undefined;

	let schemaString = stringify(schema);
	$: updateSchema(schemaString);

	function updateSchema(schemaString: string) {
		error = undefined;

		Effect.runSync(
			Effect.match(pipe(schemaString, parseJSONObjectSchemaFromString), {
				onSuccess: (newSchema) => (schema = newSchema),
				onFailure: (cause) => (error = cause)
			})
		);
	}

	//

	function resetSchemaString() {
		schemaString = stringify(schema);
	}
</script>

<div class="flex flex-col gap-2">
	<textarea class="x-textarea" rows="20" {id} name={id} bind:value={schemaString} />
	<ErrorBanner bind:error>
		<button class="x-button" slot="right" on:click={resetSchemaString}>
			Restore previous state
		</button>
	</ErrorBanner>
</div>
