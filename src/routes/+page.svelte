<script lang="ts">
	import JSONSchemaEditor from '$lib/JSONSchemaEditor/JSONSchemaEditor.svelte';
	import { debugSchema } from '$lib/logic/utils.js';
	// import { setStrings } from '$lib/ui/strings.js';

	let schema = '{"type": "object", "properties": {"ok":{"type":"string"}}}';
	let schema2 = {};

	// setStrings({ view_in_plain_text: 'Ciao' });
</script>

<div class="space-y-4 p-4">
	<JSONSchemaEditor bind:schema mode="builder" />
	<pre>{debugSchema(schema)}</pre>
</div>

<div class="space-y-4 p-4">
	<JSONSchemaEditor bind:schema={schema2} mode="field" />
	<pre>{debugSchema(schema)}</pre>
</div>
