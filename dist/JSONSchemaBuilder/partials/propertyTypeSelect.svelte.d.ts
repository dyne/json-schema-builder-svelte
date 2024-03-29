import { SvelteComponent } from "svelte";
export declare enum UIPropertyTypeOption {
    string = "string",
    integer = "integer",
    float = "float",
    boolean = "boolean",
    list = "list",
    datetime = "datetime",
    date = "date"
}
import { type Property } from '../../logic/types.js';
declare const __propDef: {
    props: {
        id?: string | undefined;
        property: Property;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type PropertyTypeSelectProps = typeof __propDef.props;
export type PropertyTypeSelectEvents = typeof __propDef.events;
export type PropertyTypeSelectSlots = typeof __propDef.slots;
export default class PropertyTypeSelect extends SvelteComponent<PropertyTypeSelectProps, PropertyTypeSelectEvents, PropertyTypeSelectSlots> {
}
export {};
