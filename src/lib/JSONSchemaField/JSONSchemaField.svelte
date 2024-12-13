<script lang="ts">
	import { Effect, pipe } from 'effect';
	import type { BaseError } from '$lib/logic/errors.js';
	import { createJSONObjectSchema, returnSchema, type CreateAjvOptions } from '$lib/logic/utils.js';
	import type { SchemaProp, ReturnType } from '$lib/logic/types.js';
	import { AjvOptions, parseJSONObjectSchemaFromString } from '$lib/logic/parsing.js';
	import { nanoid } from 'nanoid';
	import { schemaPropToString } from '$lib/logic/conversion.js';

	//

	export let schema: SchemaProp = createJSONObjectSchema();
	export let error: BaseError | undefined = undefined;
	export let returnType: ReturnType = 'object';
	export let ajvOptions: CreateAjvOptions = {};

	export let id = `json-schema-${nanoid(5)}`;

	//

	function updateSchema(schemaString: string, returnType: ReturnType) {
		error = undefined;
		pipe(
			stringToSchemaProp(schemaString, returnType),
			Effect.match({
				onFailure: (e) => (error = e),
				onSuccess: (v) => (schema = v)
			}),
			Effect.provideService(AjvOptions, ajvOptions),
			Effect.runSync
		);
	}

	function stringToSchemaProp(schemaString: string, returnType: ReturnType) {
		return pipe(
			schemaString,
			parseJSONObjectSchemaFromString,
			Effect.map((schema) => returnSchema(schema, returnType))
		);
	}
</script>

<textarea
	class="x-textarea font-mono"
	rows="20"
	{id}
	name={id}
	value={schemaPropToString(schema)}
	oninput={(e) => updateSchema(e.currentTarget.value, returnType)}
></textarea>
