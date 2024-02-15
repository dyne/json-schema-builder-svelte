import Button from './components/fallback/button.svelte';
import Input from './components/fallback/input.svelte';
import Option from './components/fallback/option.svelte';
import Select from './components/fallback/select.svelte';
import Label from './components/fallback/label.svelte';
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
