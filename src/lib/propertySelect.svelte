<script lang="ts">
	import { nanoid } from 'nanoid';
	import type { Property } from './JSONSchemaDefinitions.js';
	import { propertyOptions } from './inputDefinitions.js';
	import { componentsStore } from './componentsStore.js';

	export let value: Property;

	export let id = `property-data-${nanoid()}`;
	const name = id;
</script>

<svelte:component
	this={$componentsStore.select}
	placeholder="Select a type"
	{name}
	{id}
	bind:value
	required
>
	{#each Object.entries(propertyOptions) as [label, property]}
		<svelte:component this={$componentsStore.option} value={property}>{label}</svelte:component>
	{/each}
</svelte:component>
