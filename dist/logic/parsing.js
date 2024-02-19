import { Effect } from 'effect';
import { pipe } from 'effect/Function';
import { Type as T } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { JSONSchemaType } from './types.js';
import { BaseError, createAjv } from './utils.js';
//
export const parseJSON = (string) => Effect.try({
    try: () => JSON.parse(string),
    catch: (e) => new InvalidJSONError(e.message)
});
class InvalidJSONError extends BaseError {
    _tag = 'InvalidJSONError';
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
class NotObjectError extends BaseError {
    _tag = 'NotObjectError';
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
class InvalidJSONSchemaError extends BaseError {
    _tag = 'InvalidJSONSchemaError';
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
class InvalidJSONObjectSchemaError extends BaseError {
    _tag = 'InvalidJSONObjectSchemaError';
}
const JSONObjectSchemaSchema = T.Object({
    properties: T.Record(T.String(), T.Unknown()),
    type: T.Literal(JSONSchemaType.object),
    required: T.Optional(T.Array(T.String()))
});
//
export const parseJSONObjectSchemaFromString = (string) => pipe(parseJSON(string), Effect.flatMap(parseObject), Effect.flatMap(parseJSONSchema), Effect.flatMap(parseJSONObjectSchema));
