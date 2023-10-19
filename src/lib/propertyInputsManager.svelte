<script lang="ts">
	import { createPropertyInput, type PropertyInput } from './inputDefinitions.js';
	import { nanoid } from 'nanoid';
	import PropertyInputEditor from './propertyInputEditor.svelte';
	import { componentsSettings } from './componentsStore.js';
	import XMark from 'svelte-heros-v2/XMark.svelte';
	import Plus from 'svelte-heros-v2/Plus.svelte';
	import Button from './fallback/button.svelte';

	export let properties: PropertyInput[];

	function addProperty() {
		properties = [...properties, createPropertyInput()];
	}

	function removeProperty(p: PropertyInput) {
		properties.splice(properties.indexOf(p), 1);
		properties = properties;
	}
</script>

<div class="space-y-3 flex flex-col">
	{#each properties as p (p)}
		{@const id = nanoid(5)}
		<div class="flex space-x-4 items-center">
			<PropertyInputEditor bind:property={p} {id} />
			<Button
				id={`property-remove-${id}`}
				on:click={() => {
					removeProperty(p);
				}}
				class="x-button-square"
			>
				<XMark size={$componentsSettings.iconSize} />
			</Button>
		</div>
	{/each}
	<Button
		type="button"
		id="property-add"
		on:click={addProperty}
		class="flex items-center justify-center p-1"
	>
		<Plus size={$componentsSettings.iconSize} /><span class="ml-1">Add property</span>
	</Button>
</div>
