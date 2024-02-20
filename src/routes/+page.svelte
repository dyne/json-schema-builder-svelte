<script lang="ts">
	import JSONSchemaEditor from '$lib/JSONSchemaEditor/JSONSchemaEditor.svelte';
	import { setStrings } from '$lib/ui/strings.js';

	let schema = '{"type": "object", "properties": {"ok":{"type":"array"}}}';

	// setStrings({ view_in_plain_text: 'Ciao' });
</script>

<div class="space-y-4 p-4">
	<JSONSchemaEditor bind:schema />
	<pre>{schema}</pre>
</div>
