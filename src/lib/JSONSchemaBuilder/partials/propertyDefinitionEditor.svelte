<script lang="ts">
	import { nanoid } from 'nanoid';
	import { type JSONSchema } from '$lib/logic/types.js';
	import { stringsStore } from '$lib/ui/strings.js';
	import {
		typeToDefinition,
		definitionToType,
		UIPropertyTypeOption
	} from './propertyDefinitionEditor.js';

	//

	type Props = {
		definition: JSONSchema;
		id?: string;
	};

	let { definition = $bindable(), id = nanoid(5) }: Props = $props();

	//

	const typeOptions = Object.values(UIPropertyTypeOption);
	const placeholder = $stringsStore.select_a_type;
</script>

<select
	class="x-select w-full grow"
	{placeholder}
	name={id}
	{id}
	value={definitionToType(definition)}
	oninput={(e) => {
		definition = typeToDefinition(e.currentTarget.value as UIPropertyTypeOption);
	}}
	required
>
	<option value={undefined} disabled>{placeholder}</option>
	{#each typeOptions as property}
		<option value={property}>{$stringsStore[property]}</option>
	{/each}
</select>
