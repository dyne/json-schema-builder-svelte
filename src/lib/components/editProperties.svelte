<script lang="ts">
	import { createEmptyProperty, type Property } from '$lib/types.js';
	import { nanoid } from 'nanoid';
	import EditProperty from './editProperty.svelte';

	export let properties: Property[] = [createEmptyProperty()];

	function addProperty() {
		properties = [...properties, createEmptyProperty()];
	}

	function removeProperty(p: Property) {
		properties.splice(properties.indexOf(p));
		properties = properties;
	}
</script>

<div>
	<button id="property-add" on:click={addProperty}>+ Add property</button>
</div>
{#each properties as p (p)}
	{@const id = nanoid()}
	<div class="flex space-x-3">
		<EditProperty bind:property={p} {id} />
		<button
			id={`property-remove-${id}`}
			on:click={() => {
				removeProperty(p);
			}}>-</button
		>
	</div>
{/each}

<pre>{JSON.stringify(properties, null, 2)}</pre>
