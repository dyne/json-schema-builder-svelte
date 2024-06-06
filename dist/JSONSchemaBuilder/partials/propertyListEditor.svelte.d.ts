import { SvelteComponent } from "svelte";
import type { Property } from '../../logic/types.js';
declare const __propDef: {
    props: {
        propertyList: Property[];
        requiredDefault?: boolean | undefined;
        hideRequired?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type PropertyListEditorProps = typeof __propDef.props;
export type PropertyListEditorEvents = typeof __propDef.events;
export type PropertyListEditorSlots = typeof __propDef.slots;
export default class PropertyListEditor extends SvelteComponent<PropertyListEditorProps, PropertyListEditorEvents, PropertyListEditorSlots> {
}
export {};
