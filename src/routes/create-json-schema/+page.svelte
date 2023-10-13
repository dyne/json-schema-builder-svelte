<!-- <script lang="ts">
	import { Input, Label, Checkbox, Select, type SelectOptionType } from 'flowbite-svelte';
	import { z } from 'zod';

	// ref: https://github.com/json-schema-org/json-schema-spec/blob/0d88b62092d9e394eb47e752f9203c64e64fdf40/meta/validation.json#L75C15-L75C15
	const Types = ['array', 'boolean', 'integer', 'number', 'object', 'string'] as const;
	type Type = (typeof Types)[number];

	type PropertyInput = {
		name: string;
		type: Type;
		required: boolean;
	};

	type NestedProperty = {
		name: string;
		type: 'object';
		required?: string[];
	};

	// type Property = SimpleProperty | NestedProperty;

	// type ObjectProperty =

	// type JSONSchema = {
	// 	$schema: 'https://json-schema.org/draft/2020-12/schema';
	// 	$id: string;
	// 	title: string;
	// 	description: string;
	// 	type: 'object';
	// 	properties: Array<Property>;
	// };

	// function createEmptySchema(): Schema {
	// 	return {
	// 		$schema: 'https://json-schema.org/draft/2020-12/schema',
	// 		$id: '',
	// 		title: '',
	// 		description: '',
	// 		type: 'object',
	// 		properties: []
	// 	};
	// }

	// const propertySchema = z.object({

	// })

	// const jsonSchema = z.object({
	// 	$schema: z.literal('https://json-schema.org/draft/2020-12/schema'),
	// 	$id:z.string(),
	// 	title: z.string(),
	// 	description: z.string(),
	// 	type: z.literal('object'),
	// 	properties: z.array(),
	// 	required: z.array(z.string())
	// }).refine(v => {
	// 	v.required.includes
	// })

	let properties: Array<PropertyInput> = [];

	let currentProperty = createEmptyProperty();

	function createEmptyProperty(): PropertyInput {
		return {
			name: '',
			type: 'string',
			required: false
		};
	}

	const typeOptions: Array<SelectOptionType<Type>> = Types.map((t) => {
		return {
			name: t,
			value: t
		};
	});
	console.log(typeOptions);
	// const superform = createForm();
</script>

<div class="flex space-x-4">
	<div class="space-y-2 grow">
		<Label for="name">Property name</Label>
		<Input name="name" type="text" bind:value={currentProperty.name} />
	</div>
	<div class="space-y-2 grow">
		<Label for="type">Property type</Label>
		<Select items={typeOptions} bind:value={currentProperty.type} />
	</div>
	<div class="space-y-2">
		<Label for="required">Required</Label>
		<div class="h-8 flex items-center">
			<Checkbox name="required" bind:checked={currentProperty.required} />
		</div>
	</div>
</div>

<pre>{JSON.stringify(currentProperty, null, 2)}</pre>

<!-- <Form>
	<Input />
</Form> -->
-->
