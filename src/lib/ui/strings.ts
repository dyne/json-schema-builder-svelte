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
	[ErrorCode.InvalidSchemaError]: 'Invalid schema or properties',

	the_schema_cannot_be_opened_in_the_gui: 'The schema cannot be opened in the visual editor.',
	if_you_use_gui_all_the_data_will_be_lost: 'If you continue, all your data will be lost!',
	view_in_plain_text: 'View it in the plain text editor',
	separate_values_by_comma: 'Separate values by comma',
	warning: 'Warning',
	use_the_editor_and_delete_the_data: 'Use the visual editor and delete the data',

	property_title: 'Label',
	full_property_name: 'Display name',
	add_property_label: 'Add property label',
	property_id: 'property_id',
	id: 'ID',
	property_type: 'Type',
	locale: 'Locale'
};

export type StringResources = typeof strings;

export const stringsStore = writable<StringResources>(strings);

export function setStrings(newStrings: Partial<StringResources>) {
	stringsStore.update((strings) => ({ ...strings, ...newStrings }));
}
