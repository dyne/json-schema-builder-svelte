<script lang="ts">
	import type { Property } from '$lib/logic/types.js';
	import { stringsStore as s } from '$lib/ui/strings.js';
	import { Minus } from 'svelte-heros-v2';
	import ListEditor from './listEditor.svelte';
	import PropertyTypeSelect from './propertyTypeSelect.svelte';

	import { nanoid } from 'nanoid';
	import { iconSize } from '$lib/ui/settings.js';

	//

	export let property: Property;
	export let id = nanoid(5);

	//

	const nameId = `property-name-${id}`;
	const requiredId = `property-required-${id}`;
	const selectId = `property-data-${id}`;
	const enumID = `property-enum-${id}`;
	const titleID = `property-title-${id}`;

	//

	function addTitle() {
		property.definition.title = '';
	}

	function removeTitle() {
		delete property.definition.title;
		property = property;
	}
</script>

<div class="flex gap-3 items-center">
	<label for={nameId} class="x-label whitespace-nowrap">{$s.id}</label>
	<input
		class="x-input grow font-mono"
		name={nameId}
		id={nameId}
		type="text"
		bind:value={property.name}
		placeholder={$s.property_id}
		required
	/>

	<PropertyTypeSelect id={selectId} bind:property />

	<label for={requiredId} class="x-input !flex !items-center !gap-2 !w-fit">
		<input
			type="checkbox"
			class="x-checkbox"
			id={requiredId}
			name={requiredId}
			bind:checked={property.required}
		/>
		<span class="x-label">{$s.required}</span>
	</label>
</div>

{#if property.definition.enum}
	<div class="flex items-center gap-3">
		<label for={enumID} class="x-label whitespace-nowrap">{$s.list_values}</label>
		<ListEditor id={enumID} bind:list={property.definition.enum} />
	</div>
{/if}

{#if typeof property.definition.title == 'string'}
	<div class="flex items-center gap-3">
		<label for={titleID} class="x-label whitespace-nowrap">{$s.property_title}</label>
		<input
			class="x-input grow"
			name={titleID}
			id={titleID}
			type="text"
			bind:value={property.definition.title}
			placeholder={$s.full_property_name}
			required
		/>
		<button type="button" class="x-button x-button-square" on:click={removeTitle}>
			<Minus size={iconSize} />
		</button>
	</div>
{:else}
	<button class="text-sm hover:underline self-start text-gray-500" on:click={addTitle}>
		+ {$s.add_property_label}
	</button>
{/if}
