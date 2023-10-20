export declare const SCHEMA_VERSION = "https://json-schema.org/draft/2020-12/schema";
export declare function validateJSONSchema(schema: string): {
    result: boolean;
    message?: string;
};
