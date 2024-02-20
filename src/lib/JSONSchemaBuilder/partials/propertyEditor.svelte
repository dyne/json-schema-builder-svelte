<script lang="ts">
	import type { Property } from '$lib/logic/types.js';
	import { stringsStore } from '$lib/ui/strings.js';
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

<div class="flex gap-3">
	<input
		class="x-input grow"
		name={nameId}
		id={nameId}
		type="text"
		bind:value={property.name}
		placeholder={$stringsStore.property_name}
		required
	/>

	<PropertyTypeSelect id={selectId} bind:property />

	<label for={requiredId} class="x-input !flex !items-center !gap-2 !w-fit">
		<input
			type="checkbox"
			class="x-checkbox"
			id={requiredId}
			name={requiredId}
			bind:checked={property.required}
		/>
		<span class="x-label">{$stringsStore.required}</span>
	</label>
</div>

{#if property.definition.enum}
	<div class="flex items-center gap-3">
		<label for={enumID} class="x-label whitespace-nowrap">{$stringsStore.list_values}</label>
		<ListEditor id={enumID} bind:list={property.definition.enum} />
	</div>
{/if}
