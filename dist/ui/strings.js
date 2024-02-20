import { ErrorCode } from '../logic/errors.js';
import { UIPropertyTypeOption } from '../JSONSchemaBuilder/partials/propertyTypeSelect.svelte';
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
    view_in_plain_text: 'View it in the plain text editor',
    separate_values_by_comma: 'Separate values by comma'
};
export const stringsStore = writable(strings);
export function setStrings(newStrings) {
    stringsStore.update((strings) => ({ ...strings, ...newStrings }));
}
