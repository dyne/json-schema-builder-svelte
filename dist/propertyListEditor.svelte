<script>import { createStringProperty } from "./logic/utils.js";
import PropertyEditor from "./propertyEditor.svelte";
import { nanoid } from "nanoid";
import { componentsSettings } from "./componentsStore.js";
import Button from "./components/fallback/button.svelte";
import Plus from "svelte-heros-v2/Plus.svelte";
import XMark from "svelte-heros-v2/XMark.svelte";
export let propertyList;
function addProperty() {
  propertyList = [...propertyList, createStringProperty()];
}
function removeProperty(p) {
  propertyList.splice(propertyList.indexOf(p), 1);
  propertyList = propertyList;
}
</script>

<div class="space-y-3 flex flex-col">
	{#each propertyList as p (p)}
		{@const id = nanoid(5)}
		<div class="flex space-x-4 items-center">
			<PropertyEditor bind:property={p} {id} />

			<Button
				id={`property-remove-${id}`}
				on:click={() => {
					removeProperty(p);
				}}
				class="x-button-square"
			>
				<XMark size={$componentsSettings.iconSize} />
			</Button>
		</div>
	{/each}

	<Button
		type="button"
		id="property-add"
		on:click={addProperty}
		class="flex items-center justify-center p-1"
	>
		<Plus size={$componentsSettings.iconSize} /><span class="ml-1">Add property</span>
	</Button>
</div>
