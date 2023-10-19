<script lang="ts">
	import JSONSchemaBuilder from '$lib/JSONSchemaBuilder.svelte';
	import { createJSONSchemaInput, createPropertyInput } from '$lib/inputDefinitions.js';
</script>

<JSONSchemaBuilder
	schemaInput={createJSONSchemaInput({
		properties: [createPropertyInput({ name: 'gigi', required: true })]
	})}
	on:create={(e) => {
		console.log(e.detail.schema);
	}}
/>
