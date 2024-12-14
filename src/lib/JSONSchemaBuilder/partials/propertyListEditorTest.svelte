<script lang="ts">
	import type { Property } from '$lib/logic/types.js';
	import PropertyListEditor from './propertyListEditor.svelte';

	import { SchemaModel, SchemaModel2 } from '../test.svelte.js';
	import { createJSONObjectSchema } from '$lib/logic/utils.js';

	import { createStringProperty } from '$lib/logic/utils.js';
	import PropertyEditor from '$lib/JSONSchemaBuilder/partials/propertyEditor.svelte';
	import { nanoid } from 'nanoid';
	import Plus from 'svelte-heros-v2/Plus.svelte';
	import XMark from 'svelte-heros-v2/XMark.svelte';
	import { iconSize } from '$lib/ui/settings.js';
	// import { stringsStore as s } from '$lib/ui/strings.js';
	import { entries } from 'effect/HashMap';
	import {
		JSONObjectSchemaToPropertyList,
		propertyListToJSONObjectSchema
	} from '$lib/logic/conversion.js';

	// const schema = $state(createJSONObjectSchema());

	let s = $state(createJSONObjectSchema());

	let schema = $state(createJSONObjectSchema());

	let internalVal = $state<Property[]>([]);

	let proxy = {
		get value() {
			return JSONObjectSchemaToPropertyList(s);
		},
		set value(v: typeof internalVal) {
			output(propertyListToJSONObjectSchema(v));
		}
	};

	function output(newVal: typeof schema) {
		schema = newVal;
	}

	// const hideRequired = false;

	// let checked = {
	// 	get value() {
	// 		return flag == 'YES';
	// 	},
	// 	set value(isChecked) {
	// 		flag = isChecked ? 'YES' : 'NO';
	// 	}
	// };

	// let list = $state<Property[]>([]);
</script>

<PropertyListEditor bind:propertyList={proxy.value} />

<!-- <pre>{JSON.stringify(list, null, 2)}</pre> -->

<!-- 
function addProperty() {
	propertyList.push(createStringProperty());
}

function removeProperty(index: number) {
	propertyList.splice(index, 1);
}
</script> -->
<!-- 
<table class="w-full">
<tbody>
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

	{#each Object.entries(schema.properties) as property (p)}
		{@const id = nanoid(5)}
		<PropertyEditor bind:property={propertyList[i]} {id} {requiredDefault} {hideRequired}>
			<div class="pl-3">
				<button
					type="button"
					class="x-button x-button-square"
					id={`property-remove-${id}`}
					onclick={() => {
						removeProperty(i);
					}}
				>
					<XMark size={iconSize} />
				</button>
			</div>
		</PropertyEditor>
	{/each}
</tbody>
</table>

<button
type="button"
class="x-button flex w-full items-center justify-center"
id="property-add"
onclick={addProperty}
>
<Plus size={iconSize} /><span class="ml-1">{$s.add_property}</span>
</button>

<style lang="postcss">
td {
	@apply pr-2;
}
</style> -->
