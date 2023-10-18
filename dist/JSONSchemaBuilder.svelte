<script>import { createEventDispatcher } from "svelte";
import {
  createEmptyJSONSchemaInput,
  createJSONSchema
} from "./inputDefinitions.js";
import PropertyInputsManager from "./propertyInputsManager.svelte";
import { componentsStore } from "./componentsStore.js";
export let schemaInput = createEmptyJSONSchemaInput();
const dispatch = createEventDispatcher();
function handleCreateSchema() {
  dispatch("create", { schema: createJSONSchema(schemaInput) });
}
</script>

<form class="space-y-6" on:submit|preventDefault={handleCreateSchema}>
	<div class="flex flex-col space-y-1 x-field-container">
		<svelte:component this={$componentsStore.label} for="$id">ID</svelte:component>
		<svelte:component
			this={$componentsStore.input}
			name="$id"
			bind:value={schemaInput.$id}
			placeholder="A URI that will be used to refer to the schema"
			required
		/>
	</div>
	<div class="flex flex-col space-y-1 x-field-container">
		<svelte:component this={$componentsStore.label} for="title">Title</svelte:component>
		<svelte:component
			this={$componentsStore.input}
			name="title"
			type="text"
			bind:value={schemaInput.title}
			placeholder="My schema"
			class="x-input"
		/>
	</div>
	<div class="flex flex-col space-y-1 x-field-container">
		<svelte:component this={$componentsStore.label} for="description">Description</svelte:component>
		<!-- TODO – Make proxy component -->
		<textarea
			class="x-textarea font-sans"
			rows="3"
			name="description"
			bind:value={schemaInput.description}
			placeholder="Short description"
		/>
	</div>
	<div class="flex flex-col space-y-1 x-field-container">
		<p class="m-0">Properties</p>
		<PropertyInputsManager bind:properties={schemaInput.properties} />
	</div>
	<div class="flex justify-end">
		<svelte:component this={$componentsStore.button} type="submit" class="x-button-submit">
			Create schema
		</svelte:component>
	</div>
</form>
