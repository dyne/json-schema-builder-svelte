import { SvelteComponent } from "svelte";
import { type PropertyInput } from './inputDefinitions.js';
declare const __propDef: {
    props: {
        properties?: PropertyInput[] | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type PropertyInputsManagerProps = typeof __propDef.props;
export type PropertyInputsManagerEvents = typeof __propDef.events;
export type PropertyInputsManagerSlots = typeof __propDef.slots;
export default class PropertyInputsManager extends SvelteComponent<PropertyInputsManagerProps, PropertyInputsManagerEvents, PropertyInputsManagerSlots> {
}
export {};
