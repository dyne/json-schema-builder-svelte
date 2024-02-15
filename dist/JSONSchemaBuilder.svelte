<script>import { isValidPropertyList } from "./logic/validate.js";
import {
  JSONObjectSchemaToPropertyList,
  propertyListToJSONObjectSchema
} from "./logic/conversion.js";
import PropertyListEditor from "./propertyListEditor.svelte";
export let schema;
let propertyList = JSONObjectSchemaToPropertyList(schema);
$:
  updateJSONObjectSchema(propertyList);
function updateJSONObjectSchema(propertyList2) {
  console.log(propertyList2);
  console.log(isValidPropertyList(propertyList2));
  if (isValidPropertyList(propertyList2)) {
    schema = propertyListToJSONObjectSchema(propertyList2);
  }
}
</script>

<PropertyListEditor bind:propertyList />

<!-- {#if !showWarning && schemaInput}
	{#if !hide.includes('id')}
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
	{/if}
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
{/if} -->
