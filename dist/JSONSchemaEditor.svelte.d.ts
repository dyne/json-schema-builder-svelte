import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        schema?: string | undefined;
        hide?: ("description" | "title" | "id")[] | undefined;
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
