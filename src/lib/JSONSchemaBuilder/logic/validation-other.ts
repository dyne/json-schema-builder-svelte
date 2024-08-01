import { pipe, Array as A, Effect } from 'effect';
import type { Property } from './types.js';

/* Duplicate keys */

export function validatePropertyListKeys(propertyList: Property[]) {
	const areKeysUnique = pipe(
		propertyList,
		A.map((property) => property.name),
		A.dedupe,
		(uniqueProperties) => uniqueProperties.length == propertyList.length
	);
	return Effect.if(areKeysUnique, {
		onTrue: () => Effect.succeed(propertyList),
		onFalse: () => Effect.fail(new DuplicateKeysError())
	});
}

class DuplicateKeysError {
	readonly _tag = 'DuplicateKeysError';
}
