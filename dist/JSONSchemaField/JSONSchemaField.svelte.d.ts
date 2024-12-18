import { SvelteComponent } from "svelte";
import type { BaseError } from '../logic/errors.js';
import { type CreateAjvOptions } from '../logic/utils.js';
import type { SchemaProp, ReturnType } from '../logic/types.js';
declare const __propDef: {
    props: {
        schema?: SchemaProp;
        error?: BaseError | undefined;
        returnType?: ReturnType | undefined;
        id?: string | undefined;
        ajvOptions?: CreateAjvOptions | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type JsonSchemaFieldProps = typeof __propDef.props;
export type JsonSchemaFieldEvents = typeof __propDef.events;
export type JsonSchemaFieldSlots = typeof __propDef.slots;
export default class JsonSchemaField extends SvelteComponent<JsonSchemaFieldProps, JsonSchemaFieldEvents, JsonSchemaFieldSlots> {
}
export {};
