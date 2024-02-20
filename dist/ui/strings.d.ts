/// <reference types="svelte" />
export declare const strings: {
    property_name: string;
    required: string;
    list_values: string;
    add_property: string;
    select_a_type: string;
    field: string;
    builder: string;
    string: string;
    integer: string;
    float: string;
    boolean: string;
    list: string;
    date: string;
    datetime: string;
    InvalidJSONError: string;
    InvalidJSONObjectSchemaError: string;
    NotObjectError: string;
    InvalidJSONSchemaError: string;
    DuplicateKeysError: string;
    InvalidSchemaError: string;
    the_schema_cannot_be_opened_in_the_gui: string;
    view_in_plain_text: string;
    separate_values_by_comma: string;
};
export type StringResources = typeof strings;
export declare const stringsStore: import("svelte/store").Writable<{
    property_name: string;
    required: string;
    list_values: string;
    add_property: string;
    select_a_type: string;
    field: string;
    builder: string;
    string: string;
    integer: string;
    float: string;
    boolean: string;
    list: string;
    date: string;
    datetime: string;
    InvalidJSONError: string;
    InvalidJSONObjectSchemaError: string;
    NotObjectError: string;
    InvalidJSONSchemaError: string;
    DuplicateKeysError: string;
    InvalidSchemaError: string;
    the_schema_cannot_be_opened_in_the_gui: string;
    view_in_plain_text: string;
    separate_values_by_comma: string;
}>;
export declare function setStrings(newStrings: Partial<StringResources>): void;
