<script lang="ts">
	import type { Property } from '$lib/JSONSchemaBuilder/logic/types.js';
	import { stringsStore as s } from '$lib/ui/strings.js';
	import ListEditor from './listEditor.svelte';
	import PropertySchemaSelect from './propertySchemaSelect.svelte';

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

	//

	let row: HTMLTableRowElement | undefined;
	$: colspan = row?.cells.length ?? 4;
</script>

<tr bind:this={row}>
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
			bind:value={property.schema.title}
			placeholder={$s.full_property_name}
			required
		/>
	</td>

	<td class="td flex">
		<PropertySchemaSelect id={selectId} bind:schema={property.schema} />
	</td>

	{#if !hideRequired}
		<td class="td">
			<label class="x-input h-[40px] w-[40px]">
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

	<td class="td !pr-0">
		<slot />
	</td>
</tr>

{#if 'enum' in property.schema}
	<tr>
		<td colspan={colspan - 1} class="!pr-2">
			<div class="flex items-center gap-2 pt-2">
				<label for={enumID} class="x-label whitespace-nowrap">{$s.list_values}</label>
				<ListEditor id={enumID} bind:list={property.schema.enum} />
			</div>
		</td>
	</tr>
{/if}

<style lang="postcss">
	.td {
		@apply pt-6 pr-2;
	}
</style>
