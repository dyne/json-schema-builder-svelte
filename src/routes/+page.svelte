<script lang="ts">
	import JSONSchemaBuilder from '$lib/JSONSchemaBuilder/JSONSchemaBuilder.svelte';
	import JSONSchemaField from '$lib/JSONSchemaField/JSONSchemaField.svelte';

	let schema = '';
	let editorMode = true;
</script>

<div class="space-y-4 p-4">
	<button
		type="button"
		class="x-button"
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
</div>
