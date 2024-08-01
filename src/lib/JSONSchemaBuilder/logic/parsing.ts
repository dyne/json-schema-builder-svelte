import type { JsonSchema7, JsonSchema7Object } from '@effect/schema/JSONSchema';
import { Effect } from 'effect';
import type { JsonSchema7Type } from '$lib/types/json-schema.js';

import { Type as T } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

//

export const parseJSONObjectSchema = (schema: JsonSchema7) =>
	Effect.try({
		try: () => Value.Decode(JSONSchemaObjectSchema, schema) as JsonSchema7Object,
		catch: () => new InvalidJSONSchemaObjectError()
	});

export class InvalidJSONSchemaObjectError {
	readonly _tag = 'InvalidJSONSchemaObjectError';
}

const JSONSchemaObjectSchema = T.Object({
	properties: T.Record(T.String(), T.Unknown()),
	type: T.Literal('object' as JsonSchema7Type),
	required: T.Array(T.String())
});
