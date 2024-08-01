import { JsonSchema7 } from '@effect/schema/JSONSchema';

// -- Main

export type JsonSchema7Type = HasTypeAttribute<JsonSchema7>['type'];

// -- Utils

type HasTypeAttribute<T> = T extends { type: string } ? T : never;
