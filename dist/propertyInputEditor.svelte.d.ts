import { SvelteComponent } from "svelte";
import type { PropertyInput } from './inputDefinitions.js';
declare const __propDef: {
    props: {
        property: PropertyInput;
        id?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type PropertyInputEditorProps = typeof __propDef.props;
export type PropertyInputEditorEvents = typeof __propDef.events;
export type PropertyInputEditorSlots = typeof __propDef.slots;
export default class PropertyInputEditor extends SvelteComponent<PropertyInputEditorProps, PropertyInputEditorEvents, PropertyInputEditorSlots> {
}
export {};
