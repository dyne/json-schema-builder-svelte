import type { ComponentType } from 'svelte';
import Button from './button.svelte';
import Input from './input.svelte';
import Option from './option.svelte';
import Select from './select.svelte';
import Label from './label.svelte';
type ComponentsStore = {
    input: ComponentType<Input>;
    button: ComponentType<Button>;
    select: ComponentType<Select>;
    option: ComponentType<Option>;
    label: ComponentType<Label>;
};
export declare const componentsStore: import("svelte/store").Writable<ComponentsStore>;
export declare const componentsSettings: import("svelte/store").Writable<{
    iconSize: string;
}>;
export {};
