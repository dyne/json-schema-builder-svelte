import { SvelteComponent } from "svelte";
import { type JSONSchemaInput } from './inputDefinitions.js';
declare const __propDef: {
    props: {
        schema?: string | undefined;
        hide?: ("description" | "title" | "id")[] | undefined;
        initialSchemaInput?: Partial<JSONSchemaInput> | undefined;
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
