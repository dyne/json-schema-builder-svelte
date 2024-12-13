import type { JSONObjectSchema, Property, SchemaProp } from './types.js';
export declare function JSONObjectSchemaToPropertyList(schema: JSONObjectSchema): Array<Property>;
export declare function propertyListToJSONObjectSchema(propertyList: Array<Property>): JSONObjectSchema;
export declare function schemaPropToString(schemaProp: SchemaProp): string;
