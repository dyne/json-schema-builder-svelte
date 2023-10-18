import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        value?: any;
        type?: string | undefined;
        id?: string | undefined;
        name?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type InputProps = typeof __propDef.props;
export type InputEvents = typeof __propDef.events;
export type InputSlots = typeof __propDef.slots;
export default class Input extends SvelteComponent<InputProps, InputEvents, InputSlots> {
}
export {};
