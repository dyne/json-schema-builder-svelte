<script lang="ts">
	import SelectPropertyData from './selectPropertyData.svelte';
	import { createEmptyProperty, type Property } from '../types.js';
	import { nanoid } from 'nanoid';

	export let property: Property = createEmptyProperty();

	export let id = nanoid();

	const nameId = `property-name-${id}`;
	const requiredId = `property-required-${id}`;
	const selectId = `property-data-${id}`;
</script>

<div class="flex items-center space-x-2">
	<input
		name={nameId}
		id={nameId}
		type="text"
		bind:value={property.name}
		placeholder="Property name"
		required
	/>
	<SelectPropertyData id={selectId} bind:value={property.data} />
	<label for={requiredId} class="flex items-center space-x-0.5">
		<input id={requiredId} name={requiredId} type="checkbox" bind:checked={property.required} />
		<span class="text-sm">Required</span>
	</label>
</div>
