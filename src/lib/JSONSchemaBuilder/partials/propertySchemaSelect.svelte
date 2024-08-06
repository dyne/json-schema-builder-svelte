<script lang="ts" context="module">
	import { type JsonSchema, JsonSchemaFormat } from '$lib/types/json-schema.js';

	export enum UIPropertyTypeOption {
		string = 'string',
		integer = 'integer',
		float = 'float',
		boolean = 'boolean',
		list = 'list',
		datetime = 'datetime',
		date = 'date'
	}

	const uiPropertyTypeToJsonSchema: Record<UIPropertyTypeOption, JsonSchema> = {
		string: { type: 'string' },
		integer: { type: 'integer' },
		float: { type: 'number' },
		boolean: { type: 'boolean' },
		list: { type: 'string', enum: [''] },
		datetime: { type: 'string', format: JsonSchemaFormat.datetime },
		date: { type: 'string', format: JsonSchemaFormat.date }
	};

	function schemaToUIPropertyType(schema: JsonSchema): UIPropertyTypeOption | undefined {
		if (!('type' in schema)) return undefined;

		switch (schema.type) {
			case 'boolean':
				return UIPropertyTypeOption.boolean;
			case 'number':
				return UIPropertyTypeOption.float;
			case 'integer':
				return UIPropertyTypeOption.integer;
			case 'string':
				if ('enum' in schema && schema.enum) return UIPropertyTypeOption.list;
				else if ('format' in schema) {
					if (schema.format == JsonSchemaFormat.date) return UIPropertyTypeOption.date;
					else if (schema.format == JsonSchemaFormat.datetime) return UIPropertyTypeOption.datetime;
				} else return UIPropertyTypeOption.string;
			default:
				return undefined;
		}
	}
</script>

<script lang="ts">
	import { nanoid } from 'nanoid';
	import { stringsStore } from '$lib/ui/strings.js';
	import type { Property } from '$lib/JSONSchemaBuilder/logic/types.js';

	//

	export let id = `property-data-${nanoid(5)}`;
	export let schema: Property['schema'];

	//

	let UIPropertyType = schemaToUIPropertyType(schema);
	$: updatePropertyType(UIPropertyType);

	function updatePropertyType(type: UIPropertyTypeOption | undefined) {
		if (!type) return;

		let newSchema = uiPropertyTypeToJsonSchema[type];
		schema = { ...schema, ...newSchema };

		// @ts-expect-error operand of delete must be optional
		if (!('enum' in newSchema) && 'enum' in schema) delete schema.enum;
		// @ts-expect-error operand of delete must be optional
		if (!('format' in newSchema) && 'format' in schema) delete schema.format;
	}

	//

	const typeValues = Object.values(UIPropertyTypeOption);

	const name = id;
	const placeholder = $stringsStore.select_a_type;
</script>

<select class="x-select grow w-full" {placeholder} {name} {id} bind:value={UIPropertyType} required>
	<option value={undefined} disabled>{placeholder}</option>
	{#each typeValues as property}
		<option value={property}>{$stringsStore[property]}</option>
	{/each}
</select>
