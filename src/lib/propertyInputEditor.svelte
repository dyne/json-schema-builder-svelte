<script lang="ts">
	import PropertySelect from './propertySelect.svelte';
	import type { PropertyInput } from './inputDefinitions.js';
	import { nanoid } from 'nanoid';
	import { componentsStore } from './componentsStore.js';
	import ListEditor from './listEditor.svelte';

	export let property: PropertyInput;

	export let id = nanoid(5);

	const nameId = `property-name-${id}`;
	const requiredId = `property-required-${id}`;
	const selectId = `property-data-${id}`;
	const enumID = `property-enum-${id}`;
</script>

<svelte:component
	this={$componentsStore.input}
	class="grow basis-2/3"
	name={nameId}
	id={nameId}
	type="text"
	bind:value={property.name}
	placeholder="Property name"
	required
/>
<div class="flex flex-col grow basis-1/3">
	<PropertySelect id={selectId} bind:property={property.data} />
</div>
{#if property.data.enum}
	<ListEditor id={enumID} bind:list={property.data.enum} />
{/if}
<svelte:component
	this={$componentsStore.label}
	for={requiredId}
	class="flex items-center space-x-0.5 flex-nowrap"
>
	<input
		class="x-checkbox"
		id={requiredId}
		name={requiredId}
		type="checkbox"
		bind:checked={property.required}
	/>
	<span class="x-label text-sm">Required</span>
</svelte:component>
