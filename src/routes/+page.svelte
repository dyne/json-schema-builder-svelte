<script lang="ts">
	import JSONSchemaEditor from '$lib/JSONSchemaEditor.svelte';
	import JSONSchemaField from '$lib/JSONSchemaField.svelte';

	export let schema = ``;

	let editorMode = true;
</script>

<button
	on:click={() => {
		editorMode = !editorMode;
	}}>toggle</button
>
{#if editorMode}
	<JSONSchemaEditor bind:schema initialSchemaInput={{ $id: 'ciao' }} />
{:else}
	<JSONSchemaField bind:schema />
{/if}
