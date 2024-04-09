<script>import { createStringProperty } from "../../logic/utils.js";
import PropertyEditor from "./propertyEditor.svelte";
import { nanoid } from "nanoid";
import Plus from "svelte-heros-v2/Plus.svelte";
import XMark from "svelte-heros-v2/XMark.svelte";
import { iconSize } from "../../ui/settings.js";
import { stringsStore } from "../../ui/strings.js";
export let propertyList;
export let requiredDefault = false;
function addProperty() {
  propertyList = [...propertyList, createStringProperty()];
}
function removeProperty(p) {
  propertyList.splice(propertyList.indexOf(p), 1);
  propertyList = propertyList;
}
</script>

{#each propertyList as p, i (p)}
	{@const id = nanoid(5)}
	<div class="flex gap-6 items-start">
		<div class="grow flex flex-col items-stretch gap-3">
			<PropertyEditor bind:property={p} {id} {requiredDefault} />
		</div>

		<div class="pt-[24px]">
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
	</div>
{/each}

<button
	type="button"
	class="x-button flex items-center justify-center w-full"
	id="property-add"
	on:click={addProperty}
>
	<Plus size={iconSize} /><span class="ml-1">{$stringsStore.add_property}</span>
</button>
