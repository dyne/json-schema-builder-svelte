import { SvelteComponent } from "svelte";
import type { JSONObjectSchema } from './logic/types.js';
declare const __propDef: {
    props: {
        schema?: JSONObjectSchema | undefined;
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
