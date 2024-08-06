import type { JsonSchema7Object } from '@effect/schema/JSONSchema';
import type { ReturnType } from '$lib/types/components.js';
import type { JsonSchema } from '$lib/types/json-schema.js';

/* Types */

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type WithChanged<T, K extends Partial<T>> = T & K;

/* Functions */

export function createJSONObjectSchema(): JsonSchema7Object {
	return {
		type: 'object',
		properties: {
			'': {
				type: 'string'
			}
		},
		required: []
	};
}

export function stringify(data: unknown): string {
	return JSON.stringify(data, null, 2);
}

export function returnSchema(schema: JsonSchema, returnType: ReturnType = 'object') {
	return returnType == 'object' ? schema : stringify(schema);
}

export function debugSchema(schema: string | object): string {
	return typeof schema === 'object' ? stringify(schema) : schema;
}
