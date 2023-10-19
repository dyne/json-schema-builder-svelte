<script lang="ts">
	import { nanoid } from 'nanoid';
	import type { Property } from './JSONSchemaDefinitions.js';
	import { propertyOptions } from './inputDefinitions.js';

	export let property: Property;

	export let id = `property-data-${nanoid(5)}`;
	const name = id;
</script>

<select class="x-select" placeholder="Select a type" {name} {id} bind:value={property} required>
	{#each Object.entries(propertyOptions) as [label, property]}
		<option class="x-option" value={property}>{label}</option>
	{/each}
	<option value={undefined} disabled />
</select>
