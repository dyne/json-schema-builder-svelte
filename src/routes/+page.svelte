<script lang="ts">
	import JSONSchemaEditor from '$lib/JSONSchemaEditor/JSONSchemaEditor.svelte';
	import JsonSchemaBuilder from '$lib/JSONSchemaBuilder/JSONSchemaBuilder.svelte';
	import JsonSchemaField from '$lib/JSONSchemaField/JSONSchemaField.svelte';
	import type { JsonSchema7Object } from '@effect/schema/JSONSchema';
	import { debugSchema } from '$lib/logic/utils.js';
	// import type { JSONObjectSchema } from '$lib/logic/types.js';
	// import { createJSONObjectSchema, debugSchema } from '$lib/logic/utils.js';
	// import { setStrings } from '$lib/ui/strings.js';

	let schema_1: JsonSchema7Object = {
		type: 'object',
		properties: { ok: { type: 'string' }, no: { type: 'integer' } },
		required: []
	};

	// function setSchema() {
	// 	schema = schema_1;
	// }

	const schema_2 = {
		type: 'object',
		properties: {
			children: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						loc: {
							type: 'string'
						},
						toll: {
							type: 'string'
						},
						message: {
							type: 'string'
						}
					},
					required: ['loc']
				}
			}
		},
		required: ['children']
	};

	// // let schema = createJSONObjectSchema();
	let schema = schema_2;
	// setStrings({ view_in_plain_text: 'Ciao' });
</script>

<!-- <button class="x-button" on:click={setSchema}>set</button> -->

<div class="space-y-4 p-4">
	<JSONSchemaEditor bind:schema mode="builder" requiredDefault hideRequired />
	<pre>{debugSchema(schema)}</pre>
</div>

<!-- <div class="space-y-4 p-4">
	<JSONSchemaEditor bind:schema mode="field" />
	<pre>{debugSchema(schema)}</pre>
</div> -->
<!-- 

<!-- <div class="p-4">
	<JsonSchemaBuilder bind:schema returnType="string" />
</div>

<hr class="my-20" />

<div class="p-4">
	<JsonSchemaBuilder bind:schema={schema_1} returnType="object" />
</div>

<div class="p-4">
	<JsonSchemaField bind:schema={schema_1} />
</div>

<pre>{JSON.stringify(schema_1, null, 2)}</pre> -->
