<script lang="ts">
	import JSONSchemaBuilder from '$lib/JSONSchemaBuilder/JSONSchemaBuilder.svelte';
	import JSONSchemaField from '$lib/JSONSchemaField/JSONSchemaField.svelte';

	let schema = 'dslkfslòajk';
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

<pre>{schema}</pre>
