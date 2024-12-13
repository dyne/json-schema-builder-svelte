import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        list?: unknown[] | undefined;
        id?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ListEditorProps = typeof __propDef.props;
export type ListEditorEvents = typeof __propDef.events;
export type ListEditorSlots = typeof __propDef.slots;
export default class ListEditor extends SvelteComponent<ListEditorProps, ListEditorEvents, ListEditorSlots> {
}
export {};
