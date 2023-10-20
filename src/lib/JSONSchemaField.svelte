<script lang="ts">
	import { nanoid } from 'nanoid';
	import { componentsSettings } from './componentsStore.js';
	import { validateJSONSchema } from './validateJSONSchema.js';
	import XMark from 'svelte-heros-v2/XMark.svelte';

	export let schema = '';
	export let name = `json-schema-${nanoid(5)}`;

	let tempSchema = schema;
	$: updateSchema(tempSchema);

	function updateSchema(tempSchema: string) {
		const validation = validateJSONSchema(tempSchema);
		if (validation.result === false) error = validation.message!;
		else schema = tempSchema;
	}

	let error = '';
	function clearError() {
		error = '';
	}
</script>

<div class="flex flex-col space-y-2">
	<textarea class="x-textarea" rows="20" {name} id={name} bind:value={tempSchema} />
	{#if error}
		<div class="flex justify-between x-banner x-banner-error">
			<p>{error}</p>
			<button class="x-button x-button-square" on:click={clearError}>
				<XMark size={$componentsSettings.iconSize} />
			</button>
		</div>
	{/if}
</div>
