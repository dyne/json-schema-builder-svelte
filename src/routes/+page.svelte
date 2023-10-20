<script lang="ts">
	import JSONSchemaEditor from '$lib/JSONSchemaEditor.svelte';
	import JSONSchemaField from '$lib/JSONSchemaField.svelte';
	import { createJSONSchemaInput, createPropertyInput } from '$lib/inputDefinitions.js';

	export let schema = `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "",
  "type": "object",
  "properties": {
    "gigi": {
      "type": "string"
    },: {
      "type": "string",
      "format": "date-time"
    }
  },
  "required": [
    "mike"
  ]
}`;
	// 	export let schema = `{
	//   "$schema": "https://json-schema.org/draft/2020-12/schema",
	//   "$id": "",
	//   "type": "object",
	//   "properties": {
	//     "gigi": {
	//       "type": "string"
	//     },
	//     "mike": {
	//       "type": "string",
	//       "format": "date-time"
	//     }
	//   },
	//   "required": [
	//     "mike"
	//   ]
	// }`;
</script>

{#key schema}
	<JSONSchemaField bind:schema />
	<div class="h-20" />
	<JSONSchemaEditor bind:schema />
{/key}
