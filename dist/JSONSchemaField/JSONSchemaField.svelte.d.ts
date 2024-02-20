import { SvelteComponent } from "svelte";
import type { BaseError } from '../logic/errors.js';
declare const __propDef: {
    props: {
        schema?: string | undefined | null;
        error?: BaseError | undefined;
        id?: string | undefined;
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
