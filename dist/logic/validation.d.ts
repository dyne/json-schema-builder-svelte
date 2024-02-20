import { Effect } from 'effect';
import { type JSONSchema, type Property } from './types.js';
import { ErrorCode, BaseError } from './errors.js';
export declare const validatePropertyListKeys: (propertyList: Property[]) => Effect.Effect<Property[], DuplicateKeysError, never>;
declare class DuplicateKeysError extends BaseError {
    readonly _tag = ErrorCode.DuplicateKeysError;
}
type SchemaValidationEffect<T extends JSONSchema = JSONSchema> = Effect.Effect<T, InvalidSchemaError, never>;
declare class InvalidSchemaError extends BaseError<string> {
    readonly _tag = ErrorCode.InvalidSchemaError;
}
export declare function validateSchemaType<T extends JSONSchema>(schema: T): SchemaValidationEffect;
export declare function validateSchemaFormat<T extends JSONSchema>(schema: T): SchemaValidationEffect;
export declare function validateSchemaOptions<T extends JSONSchema>(schema: T): SchemaValidationEffect;
export declare const validateSchema: <T extends import("json-schema").JSONSchema7>(schema: T) => Effect.Effect<import("json-schema").JSONSchema7, InvalidSchemaError, never>;
export declare const validatePropertyList: (propertyList: Property[]) => Effect.Effect<Property[], InvalidSchemaError, never>;
export {};
