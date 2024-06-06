<script>import { createStringProperty } from "../../logic/utils.js";
import PropertyEditor from "./propertyEditor.svelte";
import { nanoid } from "nanoid";
import Plus from "svelte-heros-v2/Plus.svelte";
import XMark from "svelte-heros-v2/XMark.svelte";
import { iconSize } from "../../ui/settings.js";
import { stringsStore as s } from "../../ui/strings.js";
export let propertyList = [];
export let requiredDefault = false;
export let hideRequired = false;
function addProperty() {
  propertyList = [...propertyList, createStringProperty()];
}
function removeProperty(p) {
  propertyList.splice(propertyList.indexOf(p), 1);
  propertyList = [...propertyList];
}
</script>

<table class="w-full">
	<tr>
		<td><span class="x-label">{$s.id}</span></td>
		<td class="flex">
			<span class="x-label">{$s.full_property_name}</span>
			<span class="x-label ml-2 opacity-30">(en-US)</span>
		</td>
		<td>
			<span class="x-label">{$s.property_type}</span>
		</td>
		{#if !hideRequired}
			<td colspan="2"><span class="x-label">{$s.required}</span></td>
		{/if}
	</tr>

	{#each propertyList as p (p)}
		{@const id = nanoid(5)}
		<PropertyEditor bind:property={p} {id} {requiredDefault} {hideRequired}>
			<div class="pl-3">
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
		</PropertyEditor>
	{/each}
</table>

<button
	type="button"
	class="x-button flex items-center justify-center w-full"
	id="property-add"
	on:click={addProperty}
>
	<Plus size={iconSize} /><span class="ml-1">{$s.add_property}</span>
</button>

<style>
	td {
    padding-right: 0.5rem
}
</style>
