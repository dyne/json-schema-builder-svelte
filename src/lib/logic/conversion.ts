import type { SchemaProp } from '$lib/types/components.js';
import { createJSONObjectSchema, stringify } from './utils.js';

//

export function schemaPropToString(schemaProp: SchemaProp): string {
	if (!schemaProp) return stringify(createJSONObjectSchema());
	else if (typeof schemaProp === 'object') return stringify(schemaProp);
	else if (schemaProp.trim() === '') return stringify(createJSONObjectSchema());
	else return schemaProp;
}
