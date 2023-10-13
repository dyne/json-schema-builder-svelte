<script>import { createEventDispatcher } from "svelte";
import {
  createEmptyJSONSchemaInput,
  createJSONSchema
} from "./inputDefinitions.js";
import PropertyInputsManager from "./propertyInputsManager.svelte";
export let schemaInput = createEmptyJSONSchemaInput();
const dispatch = createEventDispatcher();
function handleCreateSchema() {
  dispatch("create", { schema: createJSONSchema(schemaInput) });
}
</script>

<form class="space-y-6" on:submit|preventDefault={handleCreateSchema}>
	<div class="flex flex-col space-y-1">
		<label for="$id">ID</label>
		<input
			name="$id"
			bind:value={schemaInput.$id}
			placeholder="A URI that will be used to refer to the schema"
			required
		/>
	</div>
	<div class="flex flex-col space-y-1">
		<label for="title">Title</label>
		<input name="title" type="text" bind:value={schemaInput.title} placeholder="My schema" />
	</div>
	<div class="flex flex-col space-y-1">
		<label for="description">Description</label>
		<textarea
			class="font-sans"
			rows="3"
			name="description"
			bind:value={schemaInput.description}
			placeholder="Short description"
		/>
	</div>
	<div class="flex flex-col space-y-1">
		<p class="m-0">Properties</p>
		<PropertyInputsManager bind:properties={schemaInput.properties} />
	</div>
	<div class="flex justify-end">
		<button type="submit">Create schema</button>
	</div>
</form>
