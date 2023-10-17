<script lang="ts">
	import { createEmptyPropertyInput, type PropertyInput } from './inputDefinitions.js';
	import { nanoid } from 'nanoid';
	import PropertyInputEditor from './propertyInputEditor.svelte';
	import { componentsStore } from './componentsStore.js';

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
		<div class="flex space-x-4">
			<PropertyInputEditor bind:property={p} {id} />
			<svelte:component
				this={$componentsStore.button}
				id={`property-remove-${id}`}
				on:click={() => {
					removeProperty(p);
				}}
			>
				x
			</svelte:component>
		</div>
	{/each}
	<svelte:component
		this={$componentsStore.button}
		type="button"
		id="property-add"
		on:click={addProperty}
	>
		+ Add property
	</svelte:component>
</div>
