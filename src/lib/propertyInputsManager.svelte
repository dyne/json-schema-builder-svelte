<script lang="ts">
	import { createEmptyPropertyInput, type PropertyInput } from './inputDefinitions.js';
	import { nanoid } from 'nanoid';
	import PropertyInputEditor from './propertyInputEditor.svelte';
	import { componentsSettings, componentsStore } from './componentsStore.js';
	import XMark from 'svelte-heros-v2/XMark.svelte';
	import Plus from 'svelte-heros-v2/Plus.svelte';

	export let properties: PropertyInput[] = [createEmptyPropertyInput()];

	function addProperty() {
		properties = [...properties, createEmptyPropertyInput()];
	}

	function removeProperty(p: PropertyInput) {
		properties.splice(properties.indexOf(p), 1);
		properties = properties;
	}
</script>

<div class="space-y-3 flex flex-col">
	{#each properties as p (p)}
		{@const id = nanoid()}
		<div class="flex space-x-4 items-center">
			<PropertyInputEditor bind:property={p} {id} />
			<svelte:component
				this={$componentsStore.button}
				id={`property-remove-${id}`}
				on:click={() => {
					removeProperty(p);
				}}
				class="x-button-square"
			>
				<XMark size={$componentsSettings.iconSize} />
			</svelte:component>
		</div>
	{/each}
	<svelte:component
		this={$componentsStore.button}
		type="button"
		id="property-add"
		on:click={addProperty}
		class="flex items-center justify-center p-1"
	>
		<Plus size={$componentsSettings.iconSize} /><span class="ml-1">Add property</span>
	</svelte:component>
</div>
