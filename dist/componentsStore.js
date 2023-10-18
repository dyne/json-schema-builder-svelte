import { writable } from 'svelte/store';
import Button from './fallback/button.svelte';
import Input from './fallback/input.svelte';
import Option from './fallback/option.svelte';
import Select from './fallback/select.svelte';
import Label from './fallback/label.svelte';
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
