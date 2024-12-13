export declare enum ErrorCode {
    InvalidJSONError = "InvalidJSONError",
    NotObjectError = "NotObjectError",
    InvalidJSONSchemaError = "InvalidJSONSchemaError",
    InvalidJSONObjectSchemaError = "InvalidJSONObjectSchemaError",
    DuplicateKeysError = "DuplicateKeysError",
    InvalidSchemaError = "InvalidSchemaError"
}
export declare abstract class BaseError<T = unknown> {
    readonly detail?: T | undefined;
    abstract readonly _tag: ErrorCode;
    constructor(detail?: T | undefined);
}
