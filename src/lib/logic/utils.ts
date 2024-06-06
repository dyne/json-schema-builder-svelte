import Ajv from 'ajv';
import addFormats from 'ajv-formats';

import type { JSONObjectSchema, Property, ReturnType } from './types.js';

/* Types */

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type WithChanged<T, K extends Partial<T>> = T & K;

/* Functions */

export function createStringProperty(): Property {
	return {
		name: '',
		definition: {
			type: 'string'
		},
		required: false
	};
}

export function createJSONObjectSchema(): JSONObjectSchema {
	return {
		type: 'object',
		properties: {
			'': {
				type: 'string'
			}
		}
	};
}

export function createAjv(): Ajv {
	const ajv = new Ajv({
		validateSchema: false
	});
	addFormats.default(ajv);
	return ajv;
}

export function stringify(data: unknown): string {
	return JSON.stringify(data, null, 2);
}

export function returnSchema(schema: JSONObjectSchema, returnType: ReturnType = 'object') {
	return returnType == 'object' ? schema : stringify(schema);
}

export function debugSchema(schema: string | object): string {
	return typeof schema === 'object' ? stringify(schema) : schema;
}
