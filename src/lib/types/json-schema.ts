import type { JsonSchema7, JsonSchema7String } from '@effect/schema/JSONSchema';

// -- Main

export type JsonSchema = JsonSchema7 | JsonSchemaDate | JsonSchemaDateTime | JsonSchemaStringEnum;
export type JsonSchemaType = HasTypeAttribute<JsonSchema>['type'];

export enum JsonSchemaFormat {
	date = 'date',
	datetime = 'date-time'
}

export type JsonSchemaDate = JsonSchema7String & {
	format: JsonSchemaFormat.date;
};

export type JsonSchemaDateTime = JsonSchema7String & {
	format: JsonSchemaFormat.datetime;
};

export type JsonSchemaStringEnum = JsonSchema7String & {
	enum: string[];
};

// -- Utils

type HasTypeAttribute<T> = T extends { type: string } ? T : never;
