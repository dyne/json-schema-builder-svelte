import { Effect } from 'effect';
import type { Property } from './types.js';
import { BaseError } from './utils.js';
export declare const validatePropertyListKeys: (propertyList: Property[]) => Effect.Effect<Property[], DuplicateKeysError, never>;
declare class DuplicateKeysError extends BaseError {
    readonly _tag = "DuplicateKeysError";
}
export {};
