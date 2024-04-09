<script lang="ts">
	import type { Property } from '$lib/logic/types.js';
	import { stringsStore as s } from '$lib/ui/strings.js';
	import ListEditor from './listEditor.svelte';
	import PropertyTypeSelect from './propertyTypeSelect.svelte';

	import { nanoid } from 'nanoid';

	import slugify from 'slugify';

	//

	export let property: Property;
	export let id = nanoid(5);
	export let requiredDefault = false;

	$: if (requiredDefault) property.required = true;

	//

	const nameId = `property-name-${id}`;
	const requiredId = `property-required-${id}`;
	const selectId = `property-data-${id}`;
	const enumID = `property-enum-${id}`;
	const titleID = `property-title-${id}`;

	//

	$: slugifyName(property.name);

	function slugifyName(newName: string) {
		property.name = slugify
			.default(newName, {
				replacement: '_',
				strict: true,
				trim: false,
				lower: true
			})
			.trim();
	}
</script>

<div class="flex gap-4 items-end">
	<div class="grow space-y-1">
		<label class="x-label opacity-60" for={nameId}>{$s.id}</label>

		<input
			class="x-input font-mono"
			name={nameId}
			id={nameId}
			type="text"
			bind:value={property.name}
			placeholder={$s.property_id}
			required
		/>
	</div>

	<div class="grow space-y-1">
		<div class="flex justify-between items-center">
			<label class="x-label opacity-60" for={titleID}>{$s.full_property_name}</label>
			<p class="x-label opacity-30">{$s.locale}: en-US</p>
		</div>

		<input
			class="x-input"
			name={titleID}
			id={titleID}
			type="text"
			bind:value={property.definition.title}
			placeholder={$s.full_property_name}
			required
		/>
	</div>

	<div class="space-y-1">
		<label class="x-label opacity-60" for={selectId}>{$s.property_type}</label>

		<PropertyTypeSelect id={selectId} bind:property />
	</div>

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
