import type { JsonSchema7, JsonSchema7Object } from '@effect/schema/JSONSchema';
import { Effect } from 'effect';
import type { JsonSchemaType } from '$lib/types/json-schema.js';

import { Type as T } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import type { BaseError } from '$lib/utils/types.js';

//

export const parseJSONObjectSchema = (schema: JsonSchema7) =>
	Effect.try({
		try: () => Value.Decode(JSONSchemaObjectSchema, schema) as JsonSchema7Object,
		catch: () => new InvalidJSONSchemaObjectError()
	});

export class InvalidJSONSchemaObjectError implements BaseError {
	readonly _tag = 'InvalidJSONSchemaObjectError';
}

const JSONSchemaObjectSchema = T.Object({
	properties: T.Record(T.String(), T.Unknown()),
	type: T.Literal('object' as JsonSchemaType),
	required: T.Array(T.String())
});
