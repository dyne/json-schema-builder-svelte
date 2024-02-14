import { PropertyType, type Property, type JSONSchema } from './JSONSchemaDefinitions.js';

//
export enum PropertyName {
	STRING = 'string',
	INTEGER = 'integer',
	FLOAT = 'float',
	DATE = 'date',
	DATETIME = 'datetime'
}
export const propertyOptions: Record<PropertyName, Property> = {
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
		// $id: '',
		// title: '',
		// description: '',
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

//

export function JSONSchemaToInput(schema: JSONSchema): JSONSchemaInput {
	const { $id, title, description, properties, required } = schema;

	const propertyInputs: PropertyInput[] = Object.entries(properties).map(([key, property]) => {
		const normalizedPropertyInput = Object.values(propertyOptions).find(
			(p) => p.format == property.format && p.type == property.type
		);
		return {
			name: key,
			data: normalizedPropertyInput ?? propertyOptions.string,
			required: required?.includes(key) ?? false
		};
	});

	return {
		$id,
		title,
		description,
		properties: propertyInputs
	};
}
