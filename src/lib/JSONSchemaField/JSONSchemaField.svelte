<script lang="ts">
	import { Effect, pipe } from 'effect';
	import type { BaseError } from '$lib/logic/errors.js';
	import { createJSONObjectSchema, returnSchema, type CreateAjvOptions } from '$lib/logic/utils.js';
	import type { SchemaProp, ReturnType } from '$lib/logic/types.js';
	import { AjvOptions, parseJSONObjectSchemaFromString } from '$lib/logic/parsing.js';
	import { nanoid } from 'nanoid';
	import { schemaPropToString } from '$lib/logic/conversion.js';

	//

	type Props = {
		schema: object;
		error: BaseError | undefined;
		returnType: ReturnType;
		ajvOptions: CreateAjvOptions;
		id: string;
	};

	let {
		schema = $bindable(createJSONObjectSchema()),
		error = $bindable(),
		ajvOptions = {},
		id = `json-schema-${nanoid(5)}`
	}: Partial<Props> = $props();

	//

	function updateSchema(schemaString: string) {
		error = undefined;
		pipe(
			schemaString,
			parseJSONObjectSchemaFromString,
			Effect.match({
				onFailure: (e) => (error = e),
				onSuccess: (v) => (schema = v)
			}),
			Effect.provideService(AjvOptions, ajvOptions),
			Effect.runSync
		);
	}
</script>

<textarea
	class="x-textarea font-mono"
	rows="20"
	{id}
	name={id}
	value={schemaPropToString(schema)}
	oninput={(e) => updateSchema(e.currentTarget.value)}
></textarea>
