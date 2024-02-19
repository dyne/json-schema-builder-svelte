import { writable } from 'svelte/store';
import Button from './button.svelte';
import Input from './input.svelte';
import Option from './option.svelte';
import Select from './select.svelte';
import Label from './label.svelte';
export const componentsStore = writable({
    input: Input,
    button: Button,
    option: Option,
    select: Select,
    label: Label
});
export const componentsSettings = writable({
    iconSize: '20'
});
