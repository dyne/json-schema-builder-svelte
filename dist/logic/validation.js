import { Effect } from 'effect';
import { BaseError } from './utils.js';
//
export const validatePropertyListKeys = (propertyList) => Effect.try({
    try: () => {
        const uniquePropertyNameList = new Set(propertyList.map((p) => p.name));
        const areKeysUnique = uniquePropertyNameList.size == propertyList.length;
        if (areKeysUnique)
            return propertyList;
        else
            throw new Error();
    },
    catch: () => new DuplicateKeysError()
});
class DuplicateKeysError extends BaseError {
    _tag = 'DuplicateKeysError';
}
