<script lang="ts">
	import { Effect, pipe } from 'effect';

	import type { BaseError } from '$lib/logic/errors.js';
	import { stringify, createJSONObjectSchema, returnSchema } from '$lib/logic/utils.js';
	import type { SchemaProp, ReturnType } from '$lib/logic/types.js';
	import { parseJSONObjectSchemaFromString } from '$lib/logic/parsing.js';

	import { nanoid } from 'nanoid';
	import { schemaPropToString } from '$lib/logic/conversion.js';

	//

	export let schema: SchemaProp = createJSONObjectSchema();
	export let error: BaseError | undefined = undefined;
	export let returnType: ReturnType = 'object';

	export let id = `json-schema-${nanoid(5)}`;

	//

	$: tempSchema = schemaPropToString(schema);
	$: updateSchema(tempSchema);

	function updateSchema(schemaString: string) {
		error = undefined;

		Effect.runSync(
			Effect.match(pipe(schemaString, parseJSONObjectSchemaFromString), {
				onSuccess: (newSchema) => (schema = returnSchema(newSchema, returnType)),
				onFailure: (cause) => (error = cause)
			})
		);
	}
</script>

<textarea class="x-textarea font-mono" rows="20" {id} name={id} bind:value={tempSchema} />
