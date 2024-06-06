<script lang="ts">
	import JSONSchemaEditor from '$lib/JSONSchemaEditor/JSONSchemaEditor.svelte';
	import type { JSONObjectSchema } from '$lib/logic/types.js';
	import { createJSONObjectSchema, debugSchema } from '$lib/logic/utils.js';
	// import { setStrings } from '$lib/ui/strings.js';

	let schema = createJSONObjectSchema();

	const schema_1: JSONObjectSchema = {
		type: 'object',
		properties: { ok: { type: 'string' }, no: { type: 'integer' } }
	};

	function setSchema() {
		schema = schema_1;
	}
	// setStrings({ view_in_plain_text: 'Ciao' });
</script>

<button class="x-button" on:click={setSchema}>set</button>

<div class="space-y-4 p-4">
	<JSONSchemaEditor bind:schema mode="builder" requiredDefault hideRequired />
	<pre>{debugSchema(schema)}</pre>
</div>

<div class="space-y-4 p-4">
	<JSONSchemaEditor bind:schema mode="field" />
	<pre>{debugSchema(schema)}</pre>
</div>
