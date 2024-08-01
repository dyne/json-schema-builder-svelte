import { Array, Effect, pipe } from 'effect';
import type { JsonSchema7 } from '@effect/schema/JSONSchema';
import type { JSONSchema7TypeName } from 'json-schema';
import type { Property } from './types.js';

/* Main */

export function validateSupportedProperty(property: Property) {
	return pipe(
		validateSupportedSchema(property.definition),
		Effect.map((supportedSchema) => ({ ...property, definition: supportedSchema } as Property))
	);
}

export function validateSupportedSchema<T extends JsonSchema7>(schema: T) {
	return pipe(
		schema,
		validateSchemaType,
		Effect.flatMap(validateSchemaFormat),
		Effect.flatMap(validateSchemaAttributes)
	);
}

/* Type validation */

const NOT_SUPPORTED_SCHEMA_TYPES: JSONSchema7TypeName[] = ['object', 'array', 'null'];

export function validateSchemaType<T extends JsonSchema7>(
	schema: T
): Effect.Effect<T, InvalidSchemaTypeError> {
	if (!('type' in schema)) {
		return Effect.fail(new InvalidSchemaTypeError(undefined));
	} else if (NOT_SUPPORTED_SCHEMA_TYPES.includes(schema.type)) {
		return Effect.fail(new InvalidSchemaTypeError(schema.type));
	} else {
		return Effect.succeed(schema);
	}
}

export class InvalidSchemaTypeError {
	readonly _tag = 'InvalidSchemaTypeError';
	constructor(public readonly type: string | undefined) {}
}

/* Format validation */

export const SUPPORTED_SCHEMA_FORMATS = ['date', 'date-time'] as const;
export type SupportedSchemaFormat = (typeof SUPPORTED_SCHEMA_FORMATS)[number];

export function validateSchemaFormat<T extends JsonSchema7>(
	schema: T
): Effect.Effect<T, InvalidSchemaFormatError> {
	const succeed = Effect.succeed(schema);
	if (!('format' in schema)) return succeed;
	const format = schema.format;
	const fail = Effect.fail(new InvalidSchemaFormatError(format));
	if (typeof format != 'string') return fail;
	else if (!(SUPPORTED_SCHEMA_FORMATS as ReadonlyArray<string>).includes(format)) return fail;
	else return succeed;
}

export class InvalidSchemaFormatError {
	readonly _tag = 'InvalidSchemaFormatError';
	constructor(public readonly format: unknown) {}
}

/* Options validation */

const SUPPORTED_SCHEMA_ATTRIBUTES = ['type', 'title', 'properties', 'required', 'format', 'enum'];

export function validateSchemaAttributes<T extends JsonSchema7>(schema: T) {
	const invalidOptions = pipe(
		Object.keys(schema),
		Array.filter((option) => !SUPPORTED_SCHEMA_ATTRIBUTES.includes(option))
	);
	return Effect.if(invalidOptions.length >= 1, {
		onFalse: () => Effect.succeed(schema),
		onTrue: () => Effect.fail(new InvalidSchemaAttributesError(invalidOptions))
	});
}

export class InvalidSchemaAttributesError {
	public readonly _tag = 'InvalidSchemaAttributesError';
	constructor(public readonly attributes: string[] = []) {}
}
