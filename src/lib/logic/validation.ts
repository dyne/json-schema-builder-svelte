import { Effect, pipe } from 'effect';
import {
	JSONSchemaFormat,
	type JSONSchemaTypeName,
	type Property,
	type PropertyOption
} from './types.js';
import { ErrorCode, BaseError } from './errors.js';

//

export const validatePropertyListKeys = (propertyList: Property[]) =>
	Effect.try({
		try: () => {
			const uniquePropertyNameList = new Set(propertyList.map((p) => p.name));
			const areKeysUnique = uniquePropertyNameList.size == propertyList.length;
			if (areKeysUnique) return propertyList;
			else throw new Error();
		},
		catch: () => new DuplicateKeysError()
	});

class DuplicateKeysError extends BaseError {
	readonly _tag = ErrorCode.DuplicateKeysError;
}

//

const NOT_SUPPORTED_PROPERTY_TYPES: JSONSchemaTypeName[] = ['object', 'array', 'null'];
const SUPPORTED_PROPERTY_FORMATS: string[] = [JSONSchemaFormat.date, JSONSchemaFormat.datetime];
const SUPPORTED_PROPERTY_OPTIONS: PropertyOption[] = [
	'type',
	'properties',
	'required',
	'format',
	'enum'
];

type PropertyValidationEffect = Effect.Effect<Property, InvalidPropertyError, never>;

class InvalidPropertyError extends BaseError<string> {
	readonly _tag = ErrorCode.InvalidPropertyError;
}

export function validatePropertyType(property: Property): PropertyValidationEffect {
	const { type } = property.definition;
	if (!type) {
		return Effect.fail(new InvalidPropertyError('Unexpected: Property type is undefined'));
	} else if (Array.isArray(type)) {
		return Effect.fail(new InvalidPropertyError('Unexpected: Property type is an Array'));
	} else if (NOT_SUPPORTED_PROPERTY_TYPES.includes(type)) {
		return Effect.fail(new InvalidPropertyError(`Property type "${type}" is not supported`));
	} else {
		return Effect.succeed(property);
	}
}

export function validatePropertyFormat(property: Property): PropertyValidationEffect {
	const { format } = property.definition;
	const isInvalidFormat = format && !SUPPORTED_PROPERTY_FORMATS.includes(format);
	if (isInvalidFormat) {
		return Effect.fail(new InvalidPropertyError(`Format "${format}" is not supported`));
	} else {
		return Effect.succeed(property);
	}
}

export function validatePropertyOptions(property: Property): PropertyValidationEffect {
	const propertyOptions = Object.keys(property.definition) as PropertyOption[];
	const invalidOptions = propertyOptions.filter(
		(option) => !SUPPORTED_PROPERTY_OPTIONS.includes(option)
	);
	if (invalidOptions.length >= 1) {
		return Effect.fail(
			new InvalidPropertyError(`Some options are not supported: ${invalidOptions}`)
		);
	} else {
		return Effect.succeed(property);
	}
}

export function validateProperty(property: Property): PropertyValidationEffect {
	return pipe(
		property,
		validatePropertyType,
		Effect.flatMap(validatePropertyFormat),
		Effect.flatMap(validatePropertyOptions)
	);
}
