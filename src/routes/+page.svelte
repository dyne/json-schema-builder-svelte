<script lang="ts">
	import JSONSchemaEditor from '$lib/JSONSchemaEditor/JSONSchemaEditor.svelte';
	import { debugSchema } from '$lib/logic/utils.js';
	// import { setStrings } from '$lib/ui/strings.js';

	let schema = '{"type": "object", "properties": {"ok":{"type":"string"}}}';

	// setStrings({ view_in_plain_text: 'Ciao' });
</script>

<div class="space-y-4 p-4">
	<JSONSchemaEditor bind:schema mode="builder" requiredDefault hideRequired />
	<pre>{debugSchema(schema)}</pre>
</div>

<div class="space-y-4 p-4">
	<JSONSchemaEditor bind:schema mode="field" />
	<pre>{debugSchema(schema)}</pre>
</div>
