// ref: https://github.com/json-schema-org/json-schema-spec/blob/0d88b62092d9e394eb47e752f9203c64e64fdf40/meta/validation.json#L75C15-L75C15
export const PropertyTypes = ['array', 'boolean', 'integer', 'number', 'object', 'string'] as const;
export type PropertyType = typeof PropertyTypes[number];

export type PropertyData = {
	type: PropertyType;
	format?: string;
};

export const propertyDataOptions: Record<string, PropertyData> = {
	string: {
		type: 'string'
	},
	integer: {
		type: 'integer'
	},
	float: {
		type: 'number'
	},
	date: {
		type: 'string',
		format: 'date'
	},
	datetime: {
		type: 'string',
		format: 'date-time'
	}
};

export type Property = {
	name: string;
	data: PropertyData;
	required: boolean;
};

export function createEmptyProperty(): Property {
	return {
		name: '',
		data: propertyDataOptions['string'],
		required: false
	};
}
