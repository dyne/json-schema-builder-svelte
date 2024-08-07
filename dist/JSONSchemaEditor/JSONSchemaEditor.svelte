<script>import JSONSchemaBuilder from "../JSONSchemaBuilder/JSONSchemaBuilder.svelte";
import JSONSchemaField from "../JSONSchemaField/JSONSchemaField.svelte";
import { stringsStore } from "../ui/strings.js";
import { iconSize } from "../ui/settings.js";
import ErrorBanner from "../ui/errorBanner.svelte";
import WarningBanner from "../ui/warningBanner.svelte";
import ArrowRight from "svelte-heros-v2/ArrowRight.svelte";
import { createJSONObjectSchema, returnSchema } from "../logic/utils.js";
import { onMount } from "svelte";
export let schema = createJSONObjectSchema();
export let returnType = "object";
export let requiredDefault = false;
export let hideRequired = false;
export let mode = "builder";
export let label = void 0;
function changeMode() {
  mode = getOtherMode(mode);
}
function getOtherMode(mode2) {
  return mode2 == "field" ? "builder" : "field";
}
let error = void 0;
onMount(() => {
  if (error)
    mode = "field";
});
function clearSchema() {
  schema = returnSchema(createJSONObjectSchema(), returnType);
  error = void 0;
}
</script>

<div>
	{#if mode == 'builder'}
		<div class="space-y-6">
			<JSONSchemaBuilder bind:schema bind:error {returnType} {requiredDefault} {hideRequired} />
		</div>
	{:else}
		<JSONSchemaField bind:schema bind:error {returnType} />
	{/if}

	{#if error}
		<div class="space-y-2 mt-8">
			<ErrorBanner {error} />

			{#if mode == 'builder'}
				<WarningBanner {error}>
					<div>
						<p>{$stringsStore.the_schema_cannot_be_opened_in_the_gui}</p>
						<button type="button" class="underline" on:click={changeMode}>
							{$stringsStore.view_in_plain_text}
						</button>
					</div>
					<div>
						<p>{$stringsStore.otherwise}</p>
						<button type="button" class="underline" on:click={clearSchema}>
							{$stringsStore.delete_schema_and_edit}
						</button>
					</div>
				</WarningBanner>
			{/if}
		</div>
	{/if}

	<div class="flex justify-between items-center mt-4">
		<p class="x-label">
			{#if label}
				{label}
			{/if}
		</p>
		<button class="x-link" type="button" on:click={changeMode}>
			<span class="ml-1 flex items-center gap-2">
				<ArrowRight size={iconSize} />
				{$stringsStore[getOtherMode(mode)]}
			</span>
		</button>
	</div>
</div>
