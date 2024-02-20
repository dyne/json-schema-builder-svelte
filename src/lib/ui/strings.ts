import { ErrorCode } from '$lib/logic/errors.js';
import { UIPropertyTypeOption } from '$lib/JSONSchemaBuilder/partials/propertyTypeSelect.svelte';
import { writable } from 'svelte/store';

//

export const strings = {
	property_name: 'Property name',
	required: 'Required',
	list_values: 'List values',
	add_property: 'Add property',
	select_a_type: 'Select a type',

	// Editor modes
	field: 'Plain text editor',
	builder: 'UI editor',

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
	[ErrorCode.DuplicateKeysError]: 'Your schema contains duplicate property names',

	the_schema_seems_to_be_invalid: 'The schema seems to be invalid.',
	reset_schema: 'Reset schema',
	restore_last_valid_state: 'Restore last valid state',
	view_in_plain_text: 'View it in the plain text editor',

	separate_values_by_comma: 'Separate values by comma'
};

export type StringResources = typeof strings;

export const stringsStore = writable<StringResources>(strings);

export function setStrings(newStrings: Partial<StringResources>) {
	stringsStore.update((strings) => ({ ...strings, ...newStrings }));
}
