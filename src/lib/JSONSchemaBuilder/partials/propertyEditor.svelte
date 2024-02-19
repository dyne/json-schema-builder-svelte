<script lang="ts">
	import type { Property } from '$lib/logic/types.js';
	import ListEditor from './listEditor.svelte';
	import PropertyTypeSelect from './propertyTypeSelect.svelte';

	import { nanoid } from 'nanoid';

	//

	export let property: Property;
	export let id = nanoid(5);

	//

	const nameId = `property-name-${id}`;
	const requiredId = `property-required-${id}`;
	const selectId = `property-data-${id}`;
	const enumID = `property-enum-${id}`;
</script>

<input
	class="x-input grow"
	name={nameId}
	id={nameId}
	type="text"
	bind:value={property.name}
	placeholder="Property name"
	required
/>

<PropertyTypeSelect id={selectId} bind:property />

{#if property.definition.enum}
	<ListEditor id={enumID} bind:list={property.definition.enum} />
{/if}

<label for={requiredId}>
	<input
		class="x-checkbox"
		id={requiredId}
		name={requiredId}
		type="checkbox"
		bind:checked={property.required}
	/>
	<span class="x-label text-sm">Required</span>
</label>
