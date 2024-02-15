import { Effect } from 'effect';

import { Type as T } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { JSONSchemaType, type JSONObjectSchema, type JSONSchema } from './types.js';
import { createAjv } from './utils.js';

import { pipe } from 'effect/Function';

//

export const parseJSON = (string: string) =>
	Effect.try({
		try: () => JSON.parse(string),
		catch: (e) => new InvalidJSONError(e)
	});

class InvalidJSONError {
	readonly _tag = 'InvalidJSONError';
	constructor(public detail?: unknown) {}
}

//

export const parseObject = (data: unknown) =>
	Effect.try({
		try: () => {
			const isObject = Value.Check(T.Object({}), data);
			if (isObject) return data as object;
			else throw new Error();
		},
		catch: () => new NotObjectError()
	});

class NotObjectError {
	readonly _tag = 'NotObjectError';
	constructor(public detail?: unknown) {}
}

//

export const parseJSONSchema = (object: object) =>
	Effect.try({
		try: () => {
			const ajv = createAjv();
			ajv.compile(object);
			return object as JSONSchema;
		},
		catch: (e) => new InvalidJSONSchemaError(e)
	});

class InvalidJSONSchemaError {
	readonly _tag = 'InvalidJSONSchemaError';
	constructor(public detail?: unknown) {}
}

//

export const parseJSONObjectSchema = (schema: JSONSchema) =>
	Effect.try({
		try: () => {
			const isJSONObjectSchema = Value.Check(JSONObjectSchemaSchema, schema);
			if (isJSONObjectSchema) return schema as JSONObjectSchema;
			else throw new Error();
		},
		catch: () => new InvalidJSONObjectSchemaError()
	});

class InvalidJSONObjectSchemaError {
	readonly _tag = 'InvalidJSONObjectSchemaError';
	constructor(public detail?: unknown) {}
}

const JSONObjectSchemaSchema = T.Object({
	properties: T.Record(T.String(), T.Unknown()),
	type: T.Literal(JSONSchemaType.object),
	required: T.Optional(T.Array(T.String()))
});

//

export const parseJSONObjectSchemaFromString = (string: string) =>
	pipe(
		parseJSON(string),
		Effect.flatMap(parseObject),
		Effect.flatMap(parseJSONSchema),
		Effect.flatMap(parseJSONObjectSchema)
	);
