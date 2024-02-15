import type { JSONSchema7Definition, JSONSchema7 } from 'json-schema';
import type { WithChanged, WithRequired } from './utils.js';
export declare enum JSONSchemaType {
    string = "string",
    number = "number",
    integer = "integer",
    boolean = "boolean",
    object = "object",
    array = "array",
    null = "null"
}
export type Property = {
    name: string;
    definition: Exclude<JSONSchema7Definition, boolean>;
    required: boolean;
};
export type JSONSchema = JSONSchema7;
export type JSONObjectSchema = WithChanged<WithRequired<JSONSchema, 'properties'>, {
    type: 'object';
}>;
