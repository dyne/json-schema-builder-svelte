<script>import PropertySelect from "./propertySelect.svelte";
import { createEmptyPropertyInput } from "./inputDefinitions.js";
import { nanoid } from "nanoid";
import { componentsStore } from "./componentsStore.js";
export let property = createEmptyPropertyInput();
export let id = nanoid(5);
const nameId = `property-name-${id}`;
const requiredId = `property-required-${id}`;
const selectId = `property-data-${id}`;
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
<div class="flex grow basis-1/3">
	<PropertySelect id={selectId} bind:value={property.data} />
</div>
<svelte:component
	this={$componentsStore.label}
	for={requiredId}
	class="flex items-center space-x-0.5"
>
	<input
		class="x-checkbox"
		id={requiredId}
		name={requiredId}
		type="checkbox"
		bind:checked={property.required}
	/>
	<span class="text-sm">Required</span>
</svelte:component>
