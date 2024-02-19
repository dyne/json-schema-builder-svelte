<script lang="ts">
	import type { Property } from '$lib/logic/types.js';
	import { createStringProperty } from '$lib/logic/utils.js';

	import PropertyEditor from '$lib/JSONSchemaBuilder/partials/propertyEditor.svelte';

	import { nanoid } from 'nanoid';
	import Plus from 'svelte-heros-v2/Plus.svelte';
	import XMark from 'svelte-heros-v2/XMark.svelte';
	import { iconSize } from '$lib/ui/settings.js';

	//

	export let propertyList: Property[];

	//

	function addProperty() {
		propertyList = [...propertyList, createStringProperty()];
	}

	function removeProperty(p: Property) {
		propertyList.splice(propertyList.indexOf(p), 1);
		propertyList = propertyList;
	}
</script>

<div class="flex flex-col gap-7">
	{#each propertyList as p (p)}
		{@const id = nanoid(5)}
		<div class="flex gap-4 items-start">
			<div class="grow flex flex-col items-stretch gap-3">
				<PropertyEditor bind:property={p} {id} />
			</div>

			<button
				type="button"
				id={`property-remove-${id}`}
				on:click={() => {
					removeProperty(p);
				}}
				class="x-button x-button-square"
			>
				<XMark size={iconSize} />
			</button>
		</div>

		<hr />
	{/each}

	<button
		type="button"
		id="property-add"
		on:click={addProperty}
		class="x-button flex items-center justify-center"
	>
		<Plus size={iconSize} /><span class="ml-1">Add property</span>
	</button>
</div>
