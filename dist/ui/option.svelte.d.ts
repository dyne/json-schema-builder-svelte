import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value: any;
        disabled?: boolean | undefined;
        placeholder?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type OptionProps = typeof __propDef.props;
export type OptionEvents = typeof __propDef.events;
export type OptionSlots = typeof __propDef.slots;
export default class Option extends SvelteComponent<OptionProps, OptionEvents, OptionSlots> {
}
export {};
