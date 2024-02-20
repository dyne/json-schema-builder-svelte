import type { JSONSchema7Definition, JSONSchema7 } from 'json-schema';
import type { WithChanged, WithRequired } from './utils.js';

//

/* Copied from 'json-schema/index.d.ts' L560 */
export enum JSONSchemaType {
	string = 'string',
	number = 'number',
	integer = 'integer',
	boolean = 'boolean',
	object = 'object',
	array = 'array',
	null = 'null'
}

export enum JSONSchemaFormat {
	date = 'date',
	datetime = 'date-time'
}

export type Property = {
	name: string;
	definition: Exclude<JSONSchema7Definition, boolean>;
	required: boolean;
};

export type JSONSchema = JSONSchema7;

export type JSONObjectSchema = WithChanged<
	WithRequired<JSONSchema, 'properties'>,
	{ type: 'object' }
>;
