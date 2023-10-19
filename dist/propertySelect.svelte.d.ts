import { SvelteComponent } from "svelte";
import type { Property } from './JSONSchemaDefinitions.js';
declare const __propDef: {
    props: {
        property: Property;
        id?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type PropertySelectProps = typeof __propDef.props;
export type PropertySelectEvents = typeof __propDef.events;
export type PropertySelectSlots = typeof __propDef.slots;
export default class PropertySelect extends SvelteComponent<PropertySelectProps, PropertySelectEvents, PropertySelectSlots> {
}
export {};
