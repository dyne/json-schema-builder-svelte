<script lang="ts">
	import { createEmptyProperty, type Property } from '$lib/types.js';
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
	<button on:click={addProperty}>+ Add property</button>
</div>
{#each properties as p (p)}
	<div class="flex space-x-3">
		<EditProperty bind:property={p} />
		<button
			on:click={() => {
				removeProperty(p);
			}}>-</button
		>
	</div>
{/each}

<pre>{JSON.stringify(properties, null, 2)}</pre>
