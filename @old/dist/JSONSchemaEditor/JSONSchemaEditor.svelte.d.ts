import { SvelteComponent } from "svelte";
import type { SchemaProp, ReturnType } from '../logic/types.js';
declare const __propDef: {
    props: {
        schema?: SchemaProp;
        returnType?: ReturnType | undefined;
        requiredDefault?: boolean | undefined;
        hideRequired?: boolean | undefined;
        mode?: ("field" | "builder") | undefined;
        label?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type JsonSchemaEditorProps = typeof __propDef.props;
export type JsonSchemaEditorEvents = typeof __propDef.events;
export type JsonSchemaEditorSlots = typeof __propDef.slots;
export default class JsonSchemaEditor extends SvelteComponent<JsonSchemaEditorProps, JsonSchemaEditorEvents, JsonSchemaEditorSlots> {
}
export {};
