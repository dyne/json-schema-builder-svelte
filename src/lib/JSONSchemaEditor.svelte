<script lang="ts">
	import {
		type JSONSchemaInput,
		createJSONSchema,
		createJSONSchemaInput,
		JSONSchemaToInput
	} from './inputDefinitions.js';
	import PropertyInputsManager from './propertyInputsManager.svelte';
	import { validateJSONSchema } from './validateJSONSchema.js';

	export let schema = '';
	export let hide: Array<'title' | 'description'> = [];

	let schemaInput: JSONSchemaInput | undefined = undefined;
	let validation = validateJSONSchema(schema);
	let showWarning = false;

	if (!Boolean(schema)) {
		schemaInput = createJSONSchemaInput();
	} else if (validation.result === true) {
		schemaInput = JSONSchemaToInput(JSON.parse(schema));
	} else {
		showWarning = true;
	}

	function resetSchemaInput() {
		schemaInput = createJSONSchemaInput();
		showWarning = false;
	}

	//

	$: if (schemaInput) schema = formatSchema(schemaInput);

	function formatSchema(input: JSONSchemaInput) {
		return JSON.stringify(createJSONSchema(input), null, 2);
	}
</script>

{#if !showWarning && schemaInput}
	<div class="flex flex-col space-y-1 x-field-container">
		<label class="x-label" for="$id">ID</label>
		<input
			class="x-input"
			id="$id"
			name="$id"
			bind:value={schemaInput.$id}
			placeholder="A URI that will be used to refer to the schema"
			required
		/>
	</div>
	{#if !hide.includes('title')}
		<div class="flex flex-col space-y-1 x-field-container">
			<label class="x-label" for="title">Title</label>
			<input
				class="x-input"
				id="title"
				name="title"
				type="text"
				bind:value={schemaInput.title}
				placeholder="My schema"
			/>
		</div>
	{/if}
	{#if !hide.includes('description')}
		<div class="flex flex-col space-y-1 x-field-container">
			<label class="x-label" for="description">Description</label>
			<textarea
				class="x-textarea font-sans"
				rows="3"
				id="description"
				name="description"
				bind:value={schemaInput.description}
				placeholder="Short description"
			/>
		</div>
	{/if}
	<div class="flex flex-col space-y-1 x-field-container">
		<p class="x-label m-0">Properties</p>
		<PropertyInputsManager bind:properties={schemaInput.properties} />
	</div>
{:else}
	<div class="x-banner x-warning">
		<p>
			The provided JSON schema is malformed.<br />
			<span class="font-mono">{validation.message}</span><br /><br />
			If you wish to continue using this editor, the schema will be erased.
		</p>
		<div class="flex justify-end">
			<button class="x-button" on:click={resetSchemaInput}>Continue</button>
		</div>
	</div>
{/if}
