import { Effect, pipe } from 'effect';
import type { BaseError } from '$lib/utils/types.js';

import { Type as T } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

import { createAjv } from '$lib/utils/index.js';
import type { JsonSchema7 } from '@effect/schema/JSONSchema';

/* Main */

export const parseJSONSchemaFromString = (schemaString: string) =>
	pipe(schemaString, parseJSON, Effect.flatMap(parseRecord), Effect.flatMap(parseJSONSchema));

/* Parts */

export const parseJSON = (string: string) =>
	Effect.try({
		try: () => JSON.parse(string),
		catch: (e) => new InvalidJSONError((e as Error).message)
	});

export class InvalidJSONError implements BaseError {
	readonly _tag = 'InvalidJSONError';
	constructor(readonly message: string) {}
}

//

export const parseRecord = (data: unknown) =>
	Effect.try({
		try: () => Value.Decode(T.Record(T.String(), T.Unknown()), data),
		catch: () => new NotRecordError()
	});

export class NotRecordError {
	readonly _tag = 'NotRecordError';
}

//

export const parseJSONSchema = (object: object) =>
	Effect.try({
		try: () => {
			const ajv = createAjv();
			ajv.compile(object);
			return object as JsonSchema7;
		},
		catch: (e) => new InvalidJSONSchemaError((e as Error).message)
	});

export class InvalidJSONSchemaError extends Error {
	readonly _tag = 'InvalidJSONSchemaError';
}
