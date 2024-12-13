import type { JSONObjectSchema, Property, SchemaProp } from './types.js';

import { createJSONObjectSchema, stringify } from './utils.js';

//

export function JSONObjectSchemaToPropertyList(schema: JSONObjectSchema): Array<Property> {
	const { properties, required: requiredProperties = [] } = schema;
	if (!properties) return [];

	const propertyList = Object.entries(properties).map(([name, definition]) => {
		if (typeof definition == 'boolean') throw new Error(`Unexpected property: ${name}`);
		return {
			name,
			definition,
			required: requiredProperties.includes(name)
		};
	});

	return propertyList;
}

export function propertyListToJSONObjectSchema(propertyList: Array<Property>): JSONObjectSchema {
	const schema: JSONObjectSchema = {
		type: 'object',
		properties: {},
		required: []
	};

	for (const { name, definition, required } of propertyList) {
		schema.properties[name] = definition;
		if (required) schema.required!.push(name); // "!" is needed
	}

	return schema;
}

//

export function schemaPropToString(schemaProp: SchemaProp): string {
	if (!schemaProp) return stringify(createJSONObjectSchema());
	else if (typeof schemaProp === 'object') return stringify(schemaProp);
	else if (schemaProp.trim() === '') return stringify(createJSONObjectSchema());
	else return schemaProp;
}
