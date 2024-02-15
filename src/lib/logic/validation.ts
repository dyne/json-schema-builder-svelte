import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { Type as T } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { JSONSchemaType, type JSONObjectSchema, type JSONSchema, type Property } from './types.js';
import { pipe } from 'effect/Function';

//

export function createAjv(): Ajv.default {
	const ajv = new Ajv.default();
	addFormats.default(ajv);
	return ajv;
}

//

export function isValidJSONSchema(schema: object): schema is JSONSchema {
	const ajv = createAjv();
	try {
		ajv.compile(schema);
		return true;
	} catch (e) {
		return false;
	}
}

export function validateJSONSchema(schema: object): { result: boolean; message?: string } {
	const ajv = createAjv();
	try {
		ajv.compile(schema);
		return {
			result: true
		};
	} catch (e) {
		let message = '';
		console.log('Error validating JSON schema');
		console.log(e);
		if (e instanceof Error) message = e.message;
		else message = JSON.stringify(e, null, 2);
		return {
			result: false,
			message
		};
	}
}

//

export function isValidJSONObjectSchema(schema: JSONSchema): schema is JSONObjectSchema {
	return Value.Check(JSONObjectSchemaSchema, schema);
}

const JSONObjectSchemaSchema = T.Object({
	properties: T.Record(T.String(), T.Unknown()),
	type: T.Literal(JSONSchemaType.object),
	required: T.Optional(T.Array(T.String()))
});

//

export function isValidPropertyList(propertyList: Property[]): boolean {
	return pipe(propertyList, detectNameConflictsInProperyList);
}

function detectNameConflictsInProperyList(propertyList: Property[]): boolean {
	const uniquePropertyNameList = new Set(propertyList.map((p) => p.name));
	return uniquePropertyNameList.size == propertyList.length;
}
