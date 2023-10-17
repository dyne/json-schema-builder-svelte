import { writable } from 'svelte/store';

import Button from './fallback/button.svelte';
import Input from './fallback/input.svelte';
import Option from './fallback/option.svelte';
import Select from './fallback/select.svelte';
import Label from './fallback/label.svelte';
// import type { ComponentProps, ComponentType, SvelteComponent, ComponentEvents } from 'svelte';

type ComponentsStore = {
	input: typeof Input;
	button: typeof Button;
	select: typeof Select;
	option: typeof Option;
	label: typeof Label;
};

export const componentsStore = writable<ComponentsStore>({
	input: Input,
	button: Button,
	option: Option,
	select: Select,
	label: Label
});
