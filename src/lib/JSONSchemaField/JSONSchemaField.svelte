<script lang="ts">
	import { Effect, pipe } from 'effect';

	import { parseJSONObjectSchemaFromString } from '$lib/logic/parsing.js';
	import type { BaseError } from '$lib/logic/errors.js';
	import {
		stringify,
		createJSONObjectSchema,
		convertEmptyStringToObjectSchema
	} from '$lib/logic/utils.js';

	import { nanoid } from 'nanoid';
	import ErrorBanner from '$lib/ui/errorBanner.svelte';

	//

	export let schema: string = stringify(createJSONObjectSchema());
	export let id = `json-schema-${nanoid(5)}`;

	//

	let error: BaseError | undefined = undefined;

	let tempSchema = convertEmptyStringToObjectSchema(schema);
	$: updateSchema(tempSchema);

	function updateSchema(schemaString: string) {
		error = undefined;

		Effect.runSync(
			Effect.match(pipe(schemaString, parseJSONObjectSchemaFromString), {
				onSuccess: (newSchema) => (schema = stringify(newSchema)),
				onFailure: (cause) => (error = cause)
			})
		);
	}
</script>

<textarea class="x-textarea font-mono" rows="20" {id} name={id} bind:value={tempSchema} />
<ErrorBanner bind:error />
