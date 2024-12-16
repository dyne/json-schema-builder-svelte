import { Effect, Context } from 'effect';
import { ErrorCode, BaseError } from './errors.js';
import { type JSONObjectSchema, type JSONSchema } from './types.js';
import { type CreateAjvOptions } from './utils.js';
export declare const parseJSON: (string: string) => Effect.Effect<any, InvalidJSONError, never>;
export declare class InvalidJSONError extends BaseError<string> {
    readonly _tag = ErrorCode.InvalidJSONError;
}
export declare const parseObject: (data: unknown) => Effect.Effect<object, NotObjectError, never>;
export declare class NotObjectError extends BaseError {
    readonly _tag = ErrorCode.NotObjectError;
}
declare const AjvOptions_base: Context.TagClass<AjvOptions, "AjvContext", CreateAjvOptions>;
export declare class AjvOptions extends AjvOptions_base {
}
export declare const parseJSONSchema: (object: object) => Effect.Effect<import("json-schema").JSONSchema7, InvalidJSONSchemaError, AjvOptions>;
export declare class InvalidJSONSchemaError extends BaseError {
    readonly _tag = ErrorCode.InvalidJSONSchemaError;
}
export declare const parseJSONObjectSchema: (schema: JSONSchema) => Effect.Effect<JSONObjectSchema, InvalidJSONObjectSchemaError, never>;
export declare class InvalidJSONObjectSchemaError extends BaseError {
    readonly _tag = ErrorCode.InvalidJSONObjectSchemaError;
}
export declare const parseJSONObjectSchemaFromString: (schemaString: string) => Effect.Effect<JSONObjectSchema, InvalidJSONError | NotObjectError | InvalidJSONSchemaError | InvalidJSONObjectSchemaError, AjvOptions>;
export {};
