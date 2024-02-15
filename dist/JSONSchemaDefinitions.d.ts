export declare enum PropertyType {
    ARRAY = "array",
    BOOLEAN = "boolean",
    INTEGER = "integer",
    NUMBER = "number",
    OBJECT = "object",
    STRING = "string"
}
export type Property<T = unknown> = {
    type: PropertyType;
    format?: string;
    enum?: T[];
};
export type JSONSchema = {
    $id?: string;
    title?: string;
    description?: string;
    type: PropertyType.OBJECT;
    properties: Record<string, Property>;
    required?: Array<string>;
};
