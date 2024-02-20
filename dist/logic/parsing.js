import { Effect, pipe } from 'effect';
import { ErrorCode, BaseError } from './errors.js';
import { Type as T } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { JSONSchemaType } from './types.js';
import { createAjv } from './utils.js';
//
export const parseJSON = (string) => Effect.try({
    try: () => JSON.parse(string),
    catch: (e) => new InvalidJSONError(e.message)
});
export class InvalidJSONError extends BaseError {
    _tag = ErrorCode.InvalidJSONError;
}
//
export const parseObject = (data) => Effect.try({
    try: () => {
        const errors = Value.Errors(T.Object({}), data);
        if (errors)
            return data;
        else
            throw new Error();
    },
    catch: () => new NotObjectError()
});
export class NotObjectError extends BaseError {
    _tag = ErrorCode.NotObjectError;
}
//
export const parseJSONSchema = (object) => Effect.try({
    try: () => {
        const ajv = createAjv();
        ajv.compile(object);
        return object;
    },
    catch: (e) => new InvalidJSONSchemaError(e.message)
});
export class InvalidJSONSchemaError extends BaseError {
    _tag = ErrorCode.InvalidJSONSchemaError;
}
//
export const parseJSONObjectSchema = (schema) => Effect.try({
    try: () => {
        const isJSONObjectSchema = Value.Check(JSONObjectSchemaSchema, schema);
        if (isJSONObjectSchema)
            return schema;
        else
            throw new Error();
    },
    catch: (e) => new InvalidJSONObjectSchemaError(e)
});
export class InvalidJSONObjectSchemaError extends BaseError {
    _tag = ErrorCode.InvalidJSONObjectSchemaError;
}
const JSONObjectSchemaSchema = T.Object({
    properties: T.Record(T.String(), T.Unknown()),
    type: T.Literal(JSONSchemaType.object),
    required: T.Optional(T.Array(T.String()))
});
//
export const parseJSONObjectSchemaFromString = (schemaString) => pipe(schemaString, parseJSON, Effect.flatMap(parseObject), Effect.flatMap(parseJSONSchema), Effect.flatMap(parseJSONObjectSchema));
