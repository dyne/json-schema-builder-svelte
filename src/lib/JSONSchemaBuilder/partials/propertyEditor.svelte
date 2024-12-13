<script lang="ts">
	import type { Property } from '$lib/logic/types.js';
	import { stringsStore as s } from '$lib/ui/strings.js';
	import ListEditor from './listEditor.svelte';
	// import PropertyTypeSelect from './propertyTypeSelect.svelte';

	import { nanoid } from 'nanoid';

	import slugify from 'slugify';
	import PropertyDefinitionEditor from './propertyDefinitionEditor.svelte';
	import type { Snippet } from 'svelte';

	//

	type Props = {
		property: Property;
		id?: string;
		requiredDefault?: boolean;
		hideRequired?: boolean;
		children?: Snippet;
	};

	let {
		property = $bindable(),
		id = nanoid(5),
		requiredDefault = false,
		hideRequired = false,
		children
	}: Props = $props();

	$effect(() => {
		if (requiredDefault) property.required = true;
	});

	//

	const ids = $derived({
		name: `property-name-${id}`,
		required: `property-required-${id}`,
		select: `property-data-${id}`,
		enum: `property-enum-${id}`,
		title: `property-title-${id}`
	});

	//

	$effect(() => {
		property.name = makeSlug(property.name);
	});

	function makeSlug(text: string) {
		return slugify
			.default(text, {
				replacement: '_',
				strict: true,
				trim: false,
				lower: true
			})
			.trim();
	}

	//

	let row = $state<HTMLTableRowElement>();
	const colspan = $derived(row?.cells.length ?? 4);
</script>

<tr bind:this={row}>
	<td class="td">
		<input
			class="x-input font-mono"
			name={ids.name}
			id={ids.name}
			type="text"
			bind:value={property.name}
			placeholder={$s.property_id}
			required
		/>
	</td>

	<td class="td">
		<input
			class="x-input"
			name={ids.title}
			id={ids.title}
			type="text"
			bind:value={property.title}
			placeholder={$s.full_property_name}
			required
		/>
	</td>

	<td class="td flex">
		<PropertyDefinitionEditor id={ids.select} bind:definition={property.definition} />
	</td>

	{#if !hideRequired}
		<td class="td">
			<label class="x-input flex h-[40px] w-[40px] items-center justify-center">
				<input
					type="checkbox"
					class="x-checkbox"
					id={ids.required}
					name={ids.required}
					bind:checked={property.required}
				/>
			</label>
		</td>
	{/if}

	<td class="td !pr-0">
		{@render children?.()}
	</td>
</tr>

{#if property.definition.enum}
	<tr>
		<td colspan={colspan - 1} class="!pr-2">
			<div class="flex items-center gap-2 pt-2">
				<label for={ids.enum} class="x-label whitespace-nowrap">{$s.list_values}</label>
				<ListEditor id={ids.enum} bind:list={property.definition.enum} />
			</div>
		</td>
	</tr>
{/if}

<style lang="postcss">
	.td {
		@apply pr-2 pt-6;
	}
</style>
