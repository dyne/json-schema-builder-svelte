<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import {
		type JSONSchemaInput,
		createJSONSchema,
		createJSONSchemaInput
	} from './inputDefinitions.js';
	import PropertyInputsManager from './propertyInputsManager.svelte';
	import type { JSONSchema } from './JSONSchemaDefinitions.js';

	export let schemaInput: JSONSchemaInput;
	// export let schemaInput: JSONSchemaInput = createJSONSchemaInput();

	const dispatch = createEventDispatcher<{ create: { schema: JSONSchema } }>();
	function handleCreateSchema() {
		console.log(schemaInput);
		dispatch('create', { schema: createJSONSchema(schemaInput) });
	}
</script>

<form class="space-y-8" on:submit|preventDefault={handleCreateSchema}>
	<div class="flex flex-col space-y-1 x-field-container">
		<label class="x-label" for="$id">ID</label>
		<input
			class="x-input"
			name="$id"
			bind:value={schemaInput.$id}
			placeholder="A URI that will be used to refer to the schema"
			required
		/>
	</div>
	<div class="flex flex-col space-y-1 x-field-container">
		<label class="x-label" for="title">Title</label>
		<input
			class="x-input"
			name="title"
			type="text"
			bind:value={schemaInput.title}
			placeholder="My schema"
		/>
	</div>
	<div class="flex flex-col space-y-1 x-field-container">
		<label class="x-label" for="description">Description</label>
		<textarea
			class="x-textarea font-sans"
			rows="3"
			name="description"
			bind:value={schemaInput.description}
			placeholder="Short description"
		/>
	</div>
	<div class="flex flex-col space-y-1 x-field-container">
		<p class="x-label m-0">Properties</p>
		<PropertyInputsManager bind:properties={schemaInput.properties} />
	</div>
	<div class="flex justify-end">
		<button class="x-button-submit" type="submit"> Create schema </button>
	</div>
</form>
