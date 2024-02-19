import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        schema?: object | undefined;
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
