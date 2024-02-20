import { Effect, pipe } from 'effect';
import { JSONSchemaFormat } from './types.js';
import { ErrorCode, BaseError } from './errors.js';
//
export const validatePropertyListKeys = (propertyList) => Effect.try({
    try: () => {
        const uniquePropertyNameList = new Set(propertyList.map((p) => p.name));
        const areKeysUnique = uniquePropertyNameList.size == propertyList.length;
        if (areKeysUnique)
            return propertyList;
        else
            throw new Error();
    },
    catch: () => new DuplicateKeysError()
});
class DuplicateKeysError extends BaseError {
    _tag = ErrorCode.DuplicateKeysError;
}
/* Property validation */
const NOT_SUPPORTED_SCHEMA_TYPES = ['object', 'array', 'null'];
const SUPPORTED_SCHEMA_FORMATS = [JSONSchemaFormat.date, JSONSchemaFormat.datetime];
const SUPPORTED_SCHEMA_OPTIONS = [
    'type',
    'properties',
    'required',
    'format',
    'enum'
];
class InvalidSchemaError extends BaseError {
    _tag = ErrorCode.InvalidSchemaError;
}
export function validateSchemaType(schema) {
    const { type } = schema;
    if (!type) {
        return Effect.fail(new InvalidSchemaError('Unexpected: Schema type is undefined'));
    }
    else if (Array.isArray(type)) {
        return Effect.fail(new InvalidSchemaError('Unexpected: Schema type is an Array'));
    }
    else if (NOT_SUPPORTED_SCHEMA_TYPES.includes(type)) {
        return Effect.fail(new InvalidSchemaError(`Schema type "${type}" is not supported`));
    }
    else {
        return Effect.succeed(schema);
    }
}
export function validateSchemaFormat(schema) {
    const { format } = schema;
    const isInvalidFormat = format && !SUPPORTED_SCHEMA_FORMATS.includes(format);
    if (isInvalidFormat) {
        return Effect.fail(new InvalidSchemaError(`Format "${format}" is not supported`));
    }
    else {
        return Effect.succeed(schema);
    }
}
export function validateSchemaOptions(schema) {
    const schemaOptions = Object.keys(schema);
    const invalidOptions = schemaOptions.filter((option) => !SUPPORTED_SCHEMA_OPTIONS.includes(option));
    if (invalidOptions.length >= 1) {
        return Effect.fail(new InvalidSchemaError(`Some options are not supported: ${invalidOptions}`));
    }
    else {
        return Effect.succeed(schema);
    }
}
//
export const validateSchema = (schema) => pipe(schema, validateSchemaType, Effect.flatMap(validateSchemaFormat), Effect.flatMap(validateSchemaOptions));
export const validatePropertyList = (propertyList) => pipe(Effect.all(propertyList.map((p) => validateSchema(p.definition))), Effect.matchEffect({
    onFailure: (cause) => Effect.fail(cause),
    onSuccess: () => Effect.succeed(propertyList)
}));
