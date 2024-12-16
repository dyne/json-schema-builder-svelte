import Ajv from 'ajv';
import type { JSONObjectSchema, Property, ReturnType } from './types.js';
export type WithRequired<T, K extends keyof T> = T & {
    [P in K]-?: T[P];
};
export type WithChanged<T, K extends Partial<T>> = T & K;
export declare function createStringProperty(): Property;
export declare function createJSONObjectSchema(): JSONObjectSchema;
export type CreateAjvOptions = {
    allowedKeywords?: string[];
    allowedFormats?: string[];
};
export declare function createAjv(options?: CreateAjvOptions): Ajv;
export declare function stringify(data: unknown): string;
export declare function returnSchema(schema: JSONObjectSchema, returnType?: ReturnType): string | JSONObjectSchema;
export declare function debugSchema(schema: string | object): string;
