import { ErrorCode } from '$lib/logic/errors.js';
import { UIPropertyTypeOption } from '$lib/JSONSchemaBuilder/partials/propertyTypeSelect.svelte';

export const strings = {
	property_name: 'Property name',
	required: 'Required',
	list_values: 'List values',
	add_property: 'Add property',
	select_a_type: 'Select a type',

	// Data types
	[UIPropertyTypeOption.string]: 'Text',
	[UIPropertyTypeOption.integer]: 'Integer number',
	[UIPropertyTypeOption.float]: 'Decimal number',
	[UIPropertyTypeOption.boolean]: 'Boolean',
	[UIPropertyTypeOption.list]: 'List',
	[UIPropertyTypeOption.date]: 'Date',
	[UIPropertyTypeOption.datetime]: 'Date and time',

	// Errors
	[ErrorCode.InvalidJSONError]: 'Invalid JSON',
	[ErrorCode.InvalidJSONObjectSchemaError]: 'Invalid JSON Object Schema',
	[ErrorCode.NotObjectError]: 'Data is not an Object',
	[ErrorCode.InvalidJSONSchemaError]: 'Invalid JSON Schema',
	[ErrorCode.DuplicateKeysError]: 'Your schema contains duplicate keys',

	the_schema_seems_to_be_invalid__would_you_like_to_reset_it:
		'The schema seems to be invalid. Would you like to reset it?',
	reset_schema: 'Reset schema',

	separate_values_by_comma: 'Separate values by comma'
};

export type StringResources = typeof strings;