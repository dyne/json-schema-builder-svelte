import { writable } from 'svelte/store';
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

export const componentsStore = writable<ComponentsStore>({
	input: Input,
	button: Button,
	option: Option,
	select: Select,
	label: Label
});

export const componentsSettings = writable({
	iconSize: '20'
});
