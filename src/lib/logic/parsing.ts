import { Effect, pipe, Context } from 'effect';
import { ErrorCode, BaseError } from './errors.js';

import { Type as T } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

import { JSONSchemaType, type JSONObjectSchema, type JSONSchema } from '$lib/logic/types.js';
import { createAjv, type CreateAjvOptions } from './utils.js';

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
		try: () => {
			const errors = Value.Errors(T.Object({}), data);
			if (errors) return data as object;
			else throw new Error();
		},
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
		try: () => {
			const isJSONObjectSchema = Value.Check(JSONObjectSchemaSchema, schema);
			if (isJSONObjectSchema) return schema as JSONObjectSchema;
			else throw new Error();
		},
		catch: (e) => new InvalidJSONObjectSchemaError(e)
	});

export class InvalidJSONObjectSchemaError extends BaseError {
	readonly _tag = ErrorCode.InvalidJSONObjectSchemaError;
}

const JSONObjectSchemaSchema = T.Object({
	properties: T.Record(T.String(), T.Unknown()),
	type: T.Literal(JSONSchemaType.object),
	required: T.Optional(T.Array(T.String()))
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
