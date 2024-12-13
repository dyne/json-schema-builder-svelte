import { Schema as S } from '@effect/schema';
import { JSONSchemaType, type JSONObjectSchema, type JSONSchema } from '$lib/logic/types.js';
import { createAjv, type CreateAjvOptions } from '$lib/logic/utils.js';
import { Context, Effect, pipe } from 'effect';

import { ErrorCode, BaseError } from './errors.js';

//

export const parseJSON = (string: string) =>
	Effect.try({
		try: () => JSON.parse(string),
		catch: (e) => new InvalidJSONError((e as Error).message)
	});

export class InvalidJSONError extends BaseError<string> {
	readonly _tag = ErrorCode.InvalidJSONError;
}

//

export const parseObject = (data: unknown) =>
	Effect.try({
		try: () => S.decodeUnknownSync(S.Object)(data),
		catch: () => new NotObjectError()
	});

export class NotObjectError extends BaseError {
	readonly _tag = ErrorCode.NotObjectError;
}

//

export class AjvOptions extends Context.Tag('AjvContext')<AjvOptions, CreateAjvOptions>() {}

export const parseJSONSchema = (object: object) =>
	AjvOptions.pipe(
		Effect.andThen((options) =>
			Effect.try({
				try: () => {
					const ajv = createAjv(options);
					ajv.compile(object);
					return object as JSONSchema;
				},
				catch: (e) => new InvalidJSONSchemaError((e as Error).message)
			})
		)
	);

export class InvalidJSONSchemaError extends BaseError {
	readonly _tag = ErrorCode.InvalidJSONSchemaError;
}

//

export const parseJSONObjectSchema = (schema: JSONSchema) =>
	Effect.try({
		try: () => S.decodeUnknownSync(JSONObjectSchemaSchema)(schema) as JSONObjectSchema,
		catch: (e) => new InvalidJSONObjectSchemaError(e)
	});

export class InvalidJSONObjectSchemaError extends BaseError {
	readonly _tag = ErrorCode.InvalidJSONObjectSchemaError;
}

const JSONObjectSchemaSchema = S.Struct({
	properties: S.Record({ key: S.String, value: S.Unknown }),
	type: S.Literal(JSONSchemaType.object),
	required: S.optional(S.Array(S.String))
});

//

export const parseJSONObjectSchemaFromString = (schemaString: string) =>
	pipe(
		schemaString,
		parseJSON,
		Effect.flatMap(parseObject),
		Effect.flatMap(parseJSONSchema),
		Effect.flatMap(parseJSONObjectSchema)
	);
