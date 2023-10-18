import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value?: any;
        name?: string | undefined;
        id?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type SelectProps = typeof __propDef.props;
export type SelectEvents = typeof __propDef.events;
export type SelectSlots = typeof __propDef.slots;
export default class Select extends SvelteComponent<SelectProps, SelectEvents, SelectSlots> {
}
export {};
