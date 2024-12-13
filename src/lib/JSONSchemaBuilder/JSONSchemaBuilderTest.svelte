<script lang="ts">
	import { BaseError } from '$lib/logic/errors.js';
	import JsonSchemaBuilder from './JSONSchemaBuilder.svelte';

	let error = $state<BaseError>();

	let schema = $state({
		type: 'object',
		properties: {
			name: {
				type: 'string'
			}
		}
	});
</script>

<JsonSchemaBuilder bind:schema bind:error />

<pre>{JSON.stringify(error, null, 2)}</pre>
<pre>{JSON.stringify(schema, null, 2)}</pre>
