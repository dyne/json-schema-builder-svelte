export enum ErrorCode {
	InvalidJSONError = 'InvalidJSONError',
	NotObjectError = 'NotObjectError',
	InvalidJSONSchemaError = 'InvalidJSONSchemaError',
	InvalidJSONObjectSchemaError = 'InvalidJSONObjectSchemaError',
	DuplicateKeysError = 'DuplicateKeysError',
	InvalidSchemaTypeError = 'InvalidSchemaError'
}

export abstract class BaseError<T = unknown> {
	abstract readonly _tag: ErrorCode;
	constructor(public readonly detail?: T) {}
}
