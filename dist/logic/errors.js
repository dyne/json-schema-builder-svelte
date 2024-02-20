export var ErrorCode;
(function (ErrorCode) {
    ErrorCode["InvalidJSONError"] = "InvalidJSONError";
    ErrorCode["NotObjectError"] = "NotObjectError";
    ErrorCode["InvalidJSONSchemaError"] = "InvalidJSONSchemaError";
    ErrorCode["InvalidJSONObjectSchemaError"] = "InvalidJSONObjectSchemaError";
    ErrorCode["DuplicateKeysError"] = "DuplicateKeysError";
    ErrorCode["InvalidSchemaError"] = "InvalidSchemaError";
})(ErrorCode || (ErrorCode = {}));
export class BaseError {
    detail;
    constructor(detail) {
        this.detail = detail;
    }
}
