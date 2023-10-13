<script>import { createEmptyPropertyInput } from "./inputDefinitions.js";
import { nanoid } from "nanoid";
import PropertyInputEditor from "./propertyInputEditor.svelte";
export let properties = [createEmptyPropertyInput()];
function addProperty() {
  properties = [...properties, createEmptyPropertyInput()];
}
function removeProperty(p) {
  properties.splice(properties.indexOf(p), 1);
  properties = properties;
}
</script>

<div class="space-y-3 flex flex-col">
	{#each properties as p (p)}
		{@const id = nanoid()}
		<div class="flex space-x-4">
			<PropertyInputEditor bind:property={p} {id} />
			<button
				id={`property-remove-${id}`}
				on:click={() => {
					removeProperty(p);
				}}>x</button
			>
		</div>
	{/each}
	<button id="property-add" on:click={addProperty}>+ Add property</button>
</div>
