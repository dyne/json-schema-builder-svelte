import type { JSONSchema7Definition, JSONSchema7, JSONSchema7TypeName } from 'json-schema';
import type { WithChanged, WithRequired } from './utils.js';
import type { JsonSchema7 } from '@effect/schema/JSONSchema';

//

export enum JSONSchemaFormat {
	date = 'date',
	datetime = 'date-time'
}

export type JSONSchema = JSONSchema7;
export type JSONSchemaTypeName = JSONSchema7TypeName;

export type JSONObjectSchema = WithChanged<
	WithRequired<JSONSchema, 'properties'>,
	{ type: 'object' }
>;

export type SchemaOption = keyof Partial<JSONSchema>;
