<script lang="ts">
	import { nanoid } from 'nanoid';
	import { propertyDataOptions, type PropertyData } from '../types.js';

	export let value: PropertyData = propertyDataOptions['string'];

	export let id = `property-data-${nanoid()}`;
	const name = id;
</script>

<select {name} {id} bind:value required>
	{#each Object.entries(propertyDataOptions) as [label, property]}
		<option value={property}>{label}</option>
	{/each}
</select>
