<script lang="ts">
	import JSONSchemaEditor from '$lib/JSONSchemaEditor/JSONSchemaEditor.svelte';

	let schema = '{"type": "object", "properties": {"ok":{"type":"array"}}}';
</script>

<div class="space-y-4 p-4">
	<JSONSchemaEditor bind:schema />
	<pre>{schema}</pre>
</div>
