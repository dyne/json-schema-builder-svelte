import { Effect, pipe, Array as A } from 'effect';
import type { JsonSchema7Object } from '@effect/schema/JSONSchema';

import { schemaPropToString } from '$lib/logic/conversion.js';
import { parseJSONSchemaFromString } from '$lib/logic/parsing.js';
import { parseJSONObjectSchema } from '$lib/JSONSchemaBuilder/logic/parsing.js';
import { validateSupportedProperty } from './validation-supported-schema.js';
import { validatePropertyListKeys } from './validation-other.js';

import type { Property } from './types.js';
import type { SchemaProp } from '$lib/types/components.js';

// SchemaProp -> JsonSchema7Object -> Property[]

export function schemaPropToPropertyList(schemaProp: SchemaProp) {
	return pipe(
		schemaProp,
		schemaPropToString,
		parseJSONSchemaFromString,
		Effect.flatMap(parseJSONObjectSchema),
		Effect.map(JSONSchema7ObjectToPropertyList),
		Effect.flatMap((properties) => pipe(properties, A.map(validateSupportedProperty), Effect.all)),
		Effect.flatMap(validatePropertyListKeys)
	);
}

export function JSONSchema7ObjectToPropertyList(schema: JsonSchema7Object): Array<Property> {
	const { properties, required } = schema;
	return pipe(
		Object.entries(properties),
		A.map(([propertyName, propertySchema]) => ({
			name: propertyName,
			definition: propertySchema,
			required: required.includes(propertyName)
		}))
	);
}

// Property[] -> JsonSchema7Object

export function propertyListToJSONSchema7Object(propertyList: Array<Property>): JsonSchema7Object {
	const schema: JsonSchema7Object = {
		type: 'object',
		properties: {},
		required: []
	};
	for (const { name, definition, required } of propertyList) {
		schema.properties[name] = definition;
		if (required) schema.required.push(name);
	}
	return schema;
}
