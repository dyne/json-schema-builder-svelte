export declare enum PropertyType {
    ARRAY = "array",
    BOOLEAN = "boolean",
    INTEGER = "integer",
    NUMBER = "number",
    OBJECT = "object",
    STRING = "string"
}
export type Property = {
    type: PropertyType;
    format?: string;
};
export type JSONSchema = {
    $schema: 'https://json-schema.org/draft/2020-12/schema';
    $id: string;
    title?: string;
    description?: string;
    type: PropertyType.OBJECT;
    properties: Record<string, Property>;
    required?: Array<string>;
};
