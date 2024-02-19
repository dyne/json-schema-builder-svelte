<script lang="ts">
	import JSONSchemaBuilder from '$lib/JSONSchemaBuilder/JSONSchemaBuilder.svelte';
	import JSONSchemaField from '$lib/JSONSchemaField/JSONSchemaField.svelte';
	import type { JSONObjectSchema } from '$lib/logic/types.js';

	let schema: JSONObjectSchema;
	let editorMode = true;
</script>

<button
	on:click={() => {
		editorMode = !editorMode;
	}}
>
	toggle
</button>

{#if editorMode}
	<JSONSchemaBuilder bind:schema />
{:else}
	<JSONSchemaField bind:schema />
{/if}

<pre>{JSON.stringify(schema, null, 2)}</pre>
