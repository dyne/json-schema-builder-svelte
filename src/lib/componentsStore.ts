import { writable } from 'svelte/store';

import type Button from './fallback/button.svelte';
import type Input from './fallback/input.svelte';
import Option from './fallback/option.svelte';
import type Select from './fallback/select.svelte';
import Label from './fallback/label.svelte';

import { Input as I, Button as B, Select as S } from 'flowbite-svelte';
import type {
	ComponentEvents,
	ComponentProps,
	ComponentType,
	SvelteComponent,
	SvelteComponent_1
} from 'svelte';
// import type { ComponentProps, ComponentType, SvelteComponent, ComponentEvents } from 'svelte';

type C<T extends SvelteComponent_1> = ComponentType<
	SvelteComponent<ComponentProps<T>, ComponentEvents<T>>
>;

type ComponentsStore = {
	input: C<Input>;
	button: C<Button>;
	select: C<Select>;
	option: C<Option>;
	label: C<Label>;
};

export const componentsStore = writable<ComponentsStore>({
	input: I,
	button: B,
	option: Option,
	select: S,
	label: Label
});
