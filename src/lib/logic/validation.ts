import { Effect } from 'effect';
import type { Property } from './types.js';
import { ErrorCode, BaseError } from './errors.js';

//

export const validatePropertyListKeys = (propertyList: Property[]) =>
	Effect.try({
		try: () => {
			const uniquePropertyNameList = new Set(propertyList.map((p) => p.name));
			const areKeysUnique = uniquePropertyNameList.size == propertyList.length;
			if (areKeysUnique) return propertyList;
			else throw new Error();
		},
		catch: () => new DuplicateKeysError()
	});

class DuplicateKeysError extends BaseError {
	readonly _tag = ErrorCode.DuplicateKeysError;
}
