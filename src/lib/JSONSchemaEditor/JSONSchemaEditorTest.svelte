<script lang="ts">
	import JSONSchemaEditor from '$lib/JSONSchemaEditor/JSONSchemaEditor.svelte';
	import type { JSONObjectSchema } from '$lib/logic/types.js';
	import { debugSchema } from '$lib/logic/utils.js';

	const schema_1: JSONObjectSchema = {
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

	let schema = $state(schema_1);

	function setSchema() {
		schema = schema_1;
	}
	//

	// setStrings({ view_in_plain_text: 'Ciao' });
</script>

<button class="x-button" onclick={setSchema}>set</button>

<div class="space-y-4 p-4">
	<JSONSchemaEditor bind:schema mode="builder" />

	<pre>{debugSchema(schema)}</pre>
</div>
