<script>
	import JsonSchemaBuilder from './JSONSchemaBuilder.svelte';

	let schema = {
		type: 'object',
		properties: {
			name: {
				type: 'string'
			}
		}
	};
</script>

<JsonSchemaBuilder bind:schema />

<pre>{JSON.stringify(schema, null, 2)}</pre>
