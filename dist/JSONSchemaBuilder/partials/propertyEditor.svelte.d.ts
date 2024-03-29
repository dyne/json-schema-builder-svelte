import { SvelteComponent } from "svelte";
import type { Property } from '../../logic/types.js';
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
export type PropertyEditorProps = typeof __propDef.props;
export type PropertyEditorEvents = typeof __propDef.events;
export type PropertyEditorSlots = typeof __propDef.slots;
export default class PropertyEditor extends SvelteComponent<PropertyEditorProps, PropertyEditorEvents, PropertyEditorSlots> {
}
export {};
