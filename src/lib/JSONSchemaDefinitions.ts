// reference: https://github.com/json-schema-org/json-schema-spec/blob/0d88b62092d9e394eb47e752f9203c64e64fdf40/meta/validation.json#L75C15-L75C15
export enum PropertyType {
	ARRAY = 'array',
	BOOLEAN = 'boolean',
	INTEGER = 'integer',
	NUMBER = 'number',
	OBJECT = 'object',
	STRING = 'string'
}

export type Property = {
	type: PropertyType;
	format?: string; // reference: https://json-schema.org/understanding-json-schema/reference/string#format
};

// reference: https://json-schema.org/learn/getting-started-step-by-step#create-a-schema-definition
export type JSONSchema = {
	$id: string;
	title?: string;
	description?: string;
	type: PropertyType.OBJECT;
	properties: Record<string, Property>;
	required?: Array<string>;
};
