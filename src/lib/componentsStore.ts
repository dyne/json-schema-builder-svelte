import { writable } from 'svelte/store';

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
