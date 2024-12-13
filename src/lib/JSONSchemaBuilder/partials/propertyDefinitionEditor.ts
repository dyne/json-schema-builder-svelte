import type { JSONSchema } from '$lib/logic/types.js';

import { JSONSchemaFormat as Format } from '$lib/logic/types.js';

export enum UIPropertyTypeOption {
	string = 'string',
	integer = 'integer',
	float = 'float',
	boolean = 'boolean',
	list = 'list',
	datetime = 'datetime',
	date = 'date'
}

export const TypeToDefinitionMap: Record<UIPropertyTypeOption, JSONSchema> = {
	string: { type: 'string' },
	integer: { type: 'integer' },
	float: { type: 'number' },
	boolean: { type: 'boolean' },
	list: { type: 'string', enum: [] },
	datetime: { type: 'string', format: Format.datetime },
	date: { type: 'string', format: Format.date }
};

export function typeToDefinition(type: UIPropertyTypeOption): JSONSchema {
	return TypeToDefinitionMap[type];
}

export function definitionToType(definition: JSONSchema): UIPropertyTypeOption {
	switch (definition.type) {
		case 'boolean':
			return UIPropertyTypeOption.boolean;
		case 'number':
			return UIPropertyTypeOption.float;
		case 'integer':
			return UIPropertyTypeOption.integer;
		case 'string':
			if (definition.enum) return UIPropertyTypeOption.list;
			else if (definition.format == Format.date) return UIPropertyTypeOption.date;
			else if (definition.format == Format.datetime) return UIPropertyTypeOption.datetime;
			else return UIPropertyTypeOption.string;
		default:
			throw new Error('unhandled');
	}
}
