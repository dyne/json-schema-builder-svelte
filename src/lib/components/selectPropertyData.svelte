<script lang="ts">
	import { nanoid } from 'nanoid';
	import { propertyDataOptions, type Property } from '../types.js';

	export let value: Property = propertyDataOptions['string'];

	export let id = nanoid();
	export let name = `propertyData-${id}`;
</script>

<select {name} {id} bind:value required>
	{#each Object.entries(propertyDataOptions) as [label, property]}
		<option value={property}>{label}</option>
	{/each}
</select>
