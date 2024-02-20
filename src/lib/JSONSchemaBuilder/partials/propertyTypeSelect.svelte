<script lang="ts" context="module">
	export enum UIPropertyTypeOption {
		string = 'string',
		integer = 'integer',
		float = 'float',
		boolean = 'boolean',
		list = 'list',
		datetime = 'datetime',
		date = 'date'
	}

	function getUIPropertyType(property: Property): UIPropertyTypeOption | undefined {
		switch (property.definition.type) {
			case 'boolean':
				return UIPropertyTypeOption.boolean;
			case 'number':
				return UIPropertyTypeOption.float;
			case 'integer':
				return UIPropertyTypeOption.integer;
			case 'string':
				if (property.definition.enum) return UIPropertyTypeOption.list;
				else if (property.definition.format == Format.date) return UIPropertyTypeOption.date;
				else if (property.definition.format == Format.datetime)
					return UIPropertyTypeOption.datetime;
				else return UIPropertyTypeOption.string;
			default:
				return undefined;
		}
	}
</script>

<script lang="ts">
	import { nanoid } from 'nanoid';
	import {
		type Property,
		JSONSchemaType as Type,
		JSONSchemaFormat as Format
	} from '$lib/logic/types.js';
	import { strings } from '$lib/ui/strings.js';

	//

	export let id = `property-data-${nanoid(5)}`;
	export let property: Property;

	//

	let UIPropertyType = getUIPropertyType(property);
	$: updatePropertyType(UIPropertyType);

	function updatePropertyType(type: UIPropertyTypeOption | undefined) {
		if (!type) return;

		const previousEnum = property.definition.enum;
		delete property.definition.enum;
		const previousFormat = property.definition.format;
		delete property.definition.format;

		switch (type) {
			case UIPropertyTypeOption.list:
				property.definition.enum = previousEnum ?? [];
				property.definition.type = Type.string;
				break;
			case UIPropertyTypeOption.string:
				property.definition.type = Type.string;
				break;
			case UIPropertyTypeOption.integer:
				property.definition.type = Type.integer;
				break;
			case UIPropertyTypeOption.float:
				property.definition.type = Type.number;
				break;
			case UIPropertyTypeOption.boolean:
				property.definition.type = Type.boolean;
				break;
			case UIPropertyTypeOption.date:
				property.definition.type = Type.string;
				property.definition.format = Format.date;
				break;
			case UIPropertyTypeOption.datetime:
				property.definition.type = Type.string;
				property.definition.format = Format.datetime;
				break;
		}
	}

	//

	const typeValues = Object.values(UIPropertyTypeOption);

	const name = id;
	const placeholder = strings.select_a_type;
</script>

<select class="x-select" {placeholder} {name} {id} bind:value={UIPropertyType} required>
	<option value={undefined} disabled>{placeholder}</option>
	{#each typeValues as property}
		<option value={property}>{strings[property]}</option>
	{/each}
</select>
