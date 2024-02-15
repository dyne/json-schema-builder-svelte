import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { Type as T } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { JSONSchemaType } from './types.js';
// import * as E from 'effect/Either';
import { pipe } from 'effect/Function';
//
export function createAjv() {
    const ajv = new Ajv.default();
    addFormats.default(ajv);
    return ajv;
}
//
export function isValidJSONSchema(schema) {
    const ajv = createAjv(); // Ajv is initialized every time to avoid conflicts between stored schemas
    try {
        ajv.compile(schema);
        return true;
    }
    catch (e) {
        return false;
    }
}
//
export function isValidJSONObjectSchema(schema) {
    return Value.Check(JSONObjectSchemaSchema, schema);
}
const JSONObjectSchemaSchema = T.Object({
    properties: T.Record(T.String(), T.Unknown()),
    type: T.Literal(JSONSchemaType.object),
    required: T.Optional(T.Array(T.String()))
});
//
export function isValidPropertyList(propertyList) {
    return pipe(propertyList, detectNameConflictsInProperyList);
}
function detectNameConflictsInProperyList(propertyList) {
    const uniquePropertyNameList = new Set(propertyList.map((p) => p.name));
    return uniquePropertyNameList.size == propertyList.length;
}
// export function validateJSONSchema(schema: string): { result: boolean; message?: string } {
// 	const ajv = createAjv(); // Ajv is initialized every time to avoid conflicts between stored schemas
// 	try {
// 		ajv.compile(JSON.parse(schema));
// 		return {
// 			result: true
// 		};
// 	} catch (e) {
// 		let message = '';
// 		if (e instanceof Error) message = e.message;
// 		else message = JSON.stringify(e, null, 2);
// 		return {
// 			result: false,
// 			message
// 		};
// 	}
// }
