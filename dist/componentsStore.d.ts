import Button from './fallback/button.svelte';
import Input from './fallback/input.svelte';
import Option from './fallback/option.svelte';
import Select from './fallback/select.svelte';
import Label from './fallback/label.svelte';
import type { ComponentType } from 'svelte';
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
