import Ajv from 'ajv';
import addFormats from 'ajv-formats';

import type { JSONObjectSchema, Property } from './types.js';

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

export function createAjv(): Ajv.default {
	const ajv = new Ajv.default();
	addFormats.default(ajv);
	return ajv;
}

export function stringify(data: unknown): string {
	return JSON.stringify(data, null, 2);
}

export function convertEmptyStringToObjectSchema(string: string): string {
	if (string.trim() === '') return stringify(createJSONObjectSchema());
	else return string;
}
