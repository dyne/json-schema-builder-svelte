import { Effect } from 'effect';
import { type JSONObjectSchema, type JSONSchema } from './types.js';
import { BaseError } from './utils.js';
export declare const parseJSON: (string: string) => Effect.Effect<any, InvalidJSONError, never>;
declare class InvalidJSONError extends BaseError<string> {
    readonly _tag = "InvalidJSONError";
}
export declare const parseObject: (data: unknown) => Effect.Effect<object, NotObjectError, never>;
declare class NotObjectError extends BaseError {
    readonly _tag = "NotObjectError";
}
export declare const parseJSONSchema: (object: object) => Effect.Effect<import("json-schema").JSONSchema7, InvalidJSONSchemaError, never>;
declare class InvalidJSONSchemaError extends BaseError {
    readonly _tag = "InvalidJSONSchemaError";
}
export declare const parseJSONObjectSchema: (schema: JSONSchema) => Effect.Effect<JSONObjectSchema, InvalidJSONObjectSchemaError, never>;
declare class InvalidJSONObjectSchemaError extends BaseError {
    readonly _tag = "InvalidJSONObjectSchemaError";
}
export declare const parseJSONObjectSchemaFromString: (string: string) => Effect.Effect<JSONObjectSchema, InvalidJSONError | NotObjectError | InvalidJSONSchemaError | InvalidJSONObjectSchemaError, never>;
export {};
