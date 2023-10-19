import { PropertyType, type Property, type JSONSchema } from './JSONSchemaDefinitions.js';

//

export const propertyOptions: Record<string, Property> = {
	string: {
		type: PropertyType.STRING
	},
	integer: {
		type: PropertyType.INTEGER
	},
	float: {
		type: PropertyType.NUMBER
	},
	date: {
		type: PropertyType.STRING,
		format: 'date'
	},
	datetime: {
		type: PropertyType.STRING,
		format: 'date-time'
	}
};

export type PropertyInput = {
	name: string;
	data: Property;
	required: boolean;
};

export function createPropertyInput(data: Partial<PropertyInput> = {}): PropertyInput {
	return {
		name: '',
		data: propertyOptions['string'],
		required: false,
		...data
	};
}

//

export type JSONSchemaInput = Pick<JSONSchema, '$id' | 'description' | 'title'> & {
	properties: PropertyInput[];
};

export function createJSONSchemaInput(data: Partial<JSONSchemaInput> = {}): JSONSchemaInput {
	return {
		$id: '',
		title: '',
		description: '',
		properties: [createPropertyInput()],
		...data
	};
}

//

export function createJSONSchema(input: JSONSchemaInput): JSONSchema {
	const { $id, title, description } = input;

	const properties: Record<string, Property> = {};
	for (const p of input.properties) {
		properties[p.name] = p.data;
	}

	const schema: JSONSchema = {
		$schema: 'https://json-schema.org/draft/2020-12/schema',
		$id,
		type: PropertyType.OBJECT,
		properties
	};

	if (title) schema['title'] = title;
	if (description) schema['description'] = description;

	const required = input.properties.filter((p) => p.required).map((p) => p.name);
	if (required.length) schema['required'] = required;

	return schema;
}
