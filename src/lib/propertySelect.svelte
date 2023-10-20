<script lang="ts">
	import { nanoid } from 'nanoid';
	import type { Property } from './JSONSchemaDefinitions.js';
	import { propertyOptions } from './inputDefinitions.js';

	const propertyValues = Object.values(propertyOptions);
	const propertyLabels = Object.keys(propertyOptions);

	export let property: Property;

	export let id = `property-data-${nanoid(5)}`;
	const name = id;
</script>

<select class="x-select" placeholder="Select a type" {name} {id} bind:value={property} required>
	<option value={undefined} disabled>Select a type</option>
	{#each propertyValues as property, i (property)}
		<option class="x-option" value={property}>{propertyLabels[i]}</option>
	{/each}
</select>
