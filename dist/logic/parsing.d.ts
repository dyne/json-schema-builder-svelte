import { Effect } from 'effect';
import { ErrorCode, BaseError } from './errors.js';
import { type JSONObjectSchema, type JSONSchema } from './types.js';
export declare const parseJSON: (string: string) => Effect.Effect<any, InvalidJSONError, never>;
export declare class InvalidJSONError extends BaseError<string> {
    readonly _tag = ErrorCode.InvalidJSONError;
}
export declare const parseObject: (data: unknown) => Effect.Effect<object, NotObjectError, never>;
export declare class NotObjectError extends BaseError {
    readonly _tag = ErrorCode.NotObjectError;
}
export declare const parseJSONSchema: (object: object) => Effect.Effect<import("json-schema").JSONSchema7, InvalidJSONSchemaError, never>;
export declare class InvalidJSONSchemaError extends BaseError {
    readonly _tag = ErrorCode.InvalidJSONSchemaError;
}
export declare const parseJSONObjectSchema: (schema: JSONSchema) => Effect.Effect<JSONObjectSchema, InvalidJSONObjectSchemaError, never>;
export declare class InvalidJSONObjectSchemaError extends BaseError {
    readonly _tag = ErrorCode.InvalidJSONObjectSchemaError;
}
export declare const parseJSONObjectSchemaFromString: (string: string) => Effect.Effect<JSONObjectSchema, InvalidJSONError | NotObjectError | InvalidJSONSchemaError | InvalidJSONObjectSchemaError, never>;
