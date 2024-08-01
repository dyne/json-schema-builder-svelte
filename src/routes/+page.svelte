<script lang="ts">
	// import JSONSchemaEditor from '$lib/JSONSchemaEditor/JSONSchemaEditor.svelte';
	import JsonSchemaBuilder from '$lib/JSONSchemaBuilder/JSONSchemaBuilder.svelte';
	// import type { JSONObjectSchema } from '$lib/logic/types.js';
	// import { createJSONObjectSchema, debugSchema } from '$lib/logic/utils.js';
	// import { setStrings } from '$lib/ui/strings.js';

	// const schema_1: JSONObjectSchema = {
	// 	type: 'object',
	// 	properties: { ok: { type: 'string' }, no: { type: 'integer' } }
	// };

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

<!-- <div class="space-y-4 p-4">
	<JSONSchemaEditor bind:schema mode="builder" requiredDefault hideRequired />
	<pre>{debugSchema(schema)}</pre>
</div> -->

<!-- <div class="space-y-4 p-4">
	<JSONSchemaEditor bind:schema mode="field" />
	<pre>{debugSchema(schema)}</pre>
</div> -->

<JsonSchemaBuilder bind:schema returnType="string" />
