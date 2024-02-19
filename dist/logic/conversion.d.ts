import type { JSONObjectSchema, Property } from './types.js';
export declare function JSONObjectSchemaToPropertyList(schema: JSONObjectSchema): Array<Property>;
export declare function propertyListToJSONObjectSchema(propertyList: Array<Property>): JSONObjectSchema;
