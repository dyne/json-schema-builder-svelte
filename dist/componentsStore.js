import { writable } from 'svelte/store';
import Button from './components/fallback/button.svelte';
import Input from './components/fallback/input.svelte';
import Option from './components/fallback/option.svelte';
import Select from './components/fallback/select.svelte';
import Label from './components/fallback/label.svelte';
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
