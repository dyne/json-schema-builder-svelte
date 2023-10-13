import { SvelteComponent } from "svelte";
import { type JSONSchemaInput } from './inputDefinitions.js';
import type { JSONSchema } from './JSONSchemaDefinitions.js';
declare const __propDef: {
    props: {
        schemaInput?: JSONSchemaInput | undefined;
    };
    events: {
        create: CustomEvent<{
            schema: JSONSchema;
        }>;
    } & {
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
