<script>import { nanoid } from "nanoid";
import { propertyOptions } from "./inputDefinitions.js";
import { componentsStore } from "./componentsStore.js";
export let value;
export let id = `property-data-${nanoid()}`;
const name = id;
</script>

<svelte:component
	this={$componentsStore.select}
	placeholder="Select a type"
	class="grow"
	{name}
	{id}
	bind:value
	required
>
	{#each Object.entries(propertyOptions) as [label, property]}
		<svelte:component this={$componentsStore.option} value={property}>{label}</svelte:component>
	{/each}
</svelte:component>
