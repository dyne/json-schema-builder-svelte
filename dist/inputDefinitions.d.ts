import { type Property, type JSONSchema } from './JSONSchemaDefinitions.js';
export declare const propertyOptions: Record<string, Property>;
export type PropertyInput = {
    name: string;
    data: Property;
    required: boolean;
};
export declare function createEmptyPropertyInput(): PropertyInput;
export type JSONSchemaInput = Pick<JSONSchema, '$id' | 'description' | 'title'> & {
    properties: PropertyInput[];
};
export declare function createEmptyJSONSchemaInput(): JSONSchemaInput;
export declare function createJSONSchema(input: JSONSchemaInput): JSONSchema;
