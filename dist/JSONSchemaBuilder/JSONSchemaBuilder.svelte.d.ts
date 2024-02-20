import { SvelteComponent } from "svelte";
import type { BaseError } from '../logic/errors.js';
declare const __propDef: {
    props: {
        schema?: string | undefined | null;
        error?: BaseError | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type JsonSchemaBuilderProps = typeof __propDef.props;
export type JsonSchemaBuilderEvents = typeof __propDef.events;
export type JsonSchemaBuilderSlots = typeof __propDef.slots;
export default class JsonSchemaBuilder extends SvelteComponent<JsonSchemaBuilderProps, JsonSchemaBuilderEvents, JsonSchemaBuilderSlots> {
}
export {};
