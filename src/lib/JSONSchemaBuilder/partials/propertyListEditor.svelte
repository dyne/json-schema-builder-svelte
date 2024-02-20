<script lang="ts">
	import type { Property } from '$lib/logic/types.js';
	import { createStringProperty } from '$lib/logic/utils.js';

	import PropertyEditor from '$lib/JSONSchemaBuilder/partials/propertyEditor.svelte';

	import { nanoid } from 'nanoid';
	import Plus from 'svelte-heros-v2/Plus.svelte';
	import XMark from 'svelte-heros-v2/XMark.svelte';
	import { iconSize } from '$lib/ui/settings.js';
	import { strings } from '$lib/ui/strings.js';

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

{#each propertyList as p (p)}
	{@const id = nanoid(5)}
	<div class="flex gap-6 items-start">
		<div class="grow flex flex-col items-stretch gap-3">
			<PropertyEditor bind:property={p} {id} />
		</div>

		<button
			type="button"
			class="x-button x-button-square"
			id={`property-remove-${id}`}
			on:click={() => {
				removeProperty(p);
			}}
		>
			<XMark size={iconSize} />
		</button>
	</div>
{/each}

<button
	type="button"
	class="x-button flex items-center justify-center w-full"
	id="property-add"
	on:click={addProperty}
>
	<Plus size={iconSize} /><span class="ml-1">{strings.add_property}</span>
</button>
