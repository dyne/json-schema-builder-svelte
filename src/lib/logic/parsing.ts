import { Effect, pipe } from 'effect';
import { ErrorCode, BaseError } from './errors.js';
import { Schema as S } from '@effect/schema';

import { JSONSchemaType, type JSONObjectSchema, type JSONSchema } from '$lib/logic/types.js';
import { createAjv } from '$lib/logic/utils.js';

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

export const parseJSONSchema = (object: object) =>
	Effect.try({
		try: () => {
			const ajv = createAjv();
			ajv.compile(object);
			return object as JSONSchema;
		},
		catch: (e) => new InvalidJSONSchemaError((e as Error).message)
	});

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
