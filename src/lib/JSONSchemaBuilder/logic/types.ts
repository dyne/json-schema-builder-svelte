import type { JsonSchema } from '$lib/types/json-schema.js';

export type Property = {
	name: string;
	schema: JsonSchema;
	required: boolean;
};
