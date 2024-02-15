import { type Property, type JSONSchema } from './JSONSchemaDefinitions.js';
export declare enum PropertyName {
    STRING = "string",
    INTEGER = "integer",
    FLOAT = "float",
    DATE = "date",
    DATETIME = "datetime",
    BOOLEAN = "boolean",
    LIST = "list"
}
export declare const propertyOptions: Record<PropertyName, Property>;
export type PropertyInput = {
    name: string;
    data: Property;
    required: boolean;
};
export declare function createPropertyInput(data?: Partial<PropertyInput>): PropertyInput;
export type JSONSchemaInput = Pick<JSONSchema, '$id' | 'description' | 'title'> & {
    properties: PropertyInput[];
};
export declare function createJSONSchemaInput(data?: Partial<JSONSchemaInput>): JSONSchemaInput;
export declare function createJSONSchema(input: JSONSchemaInput): JSONSchema;
export declare function JSONSchemaToInput(schema: JSONSchema): JSONSchemaInput;
