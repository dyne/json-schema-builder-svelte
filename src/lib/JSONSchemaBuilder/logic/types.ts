import type { JsonSchema7 } from '@effect/schema/JSONSchema';

export type Property = {
	name: string;
	definition: JsonSchema7;
	required: boolean;
};
