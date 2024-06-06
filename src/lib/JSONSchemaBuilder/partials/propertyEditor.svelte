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
	export let hideRequired = false;

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
		property.name = slugify(newName, {
			replacement: '_',
			strict: true,
			trim: false,
			lower: true
		}).trim();
	}
</script>

<tr>
	<td class="td">
		<input
			class="x-input font-mono"
			name={nameId}
			id={nameId}
			type="text"
			bind:value={property.name}
			placeholder={$s.property_id}
			required
		/>
	</td>

	<td class="td">
		<input
			class="x-input"
			name={titleID}
			id={titleID}
			type="text"
			bind:value={property.definition.title}
			placeholder={$s.full_property_name}
			required
		/>
	</td>

	<td class="td w-[150px]">
		<PropertyTypeSelect id={selectId} bind:property />
	</td>

	{#if !hideRequired}
		<td class="td w-[40px]">
			<label class="x-input h-[40px]">
				<input
					type="checkbox"
					class="x-checkbox"
					id={requiredId}
					name={requiredId}
					bind:checked={property.required}
				/>
			</label>
		</td>
	{/if}

	<td class="td w-[40px] !pr-0">
		<slot />
	</td>
</tr>

{#if property.definition.enum}
	<tr>
		<td colspan="4">
			<div class="flex items-center gap-2 pt-2">
				<label for={enumID} class="x-label whitespace-nowrap">{$s.list_values}</label>
				<ListEditor id={enumID} bind:list={property.definition.enum} />
			</div>
		</td>
	</tr>
{/if}

<style lang="postcss">
	.td {
		@apply pt-6 pr-2;
	}
</style>
