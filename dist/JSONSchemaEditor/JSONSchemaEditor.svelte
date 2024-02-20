<script>import JSONSchemaBuilder from "../JSONSchemaBuilder/JSONSchemaBuilder.svelte";
import JSONSchemaField from "../JSONSchemaField/JSONSchemaField.svelte";
import { stringsStore } from "../ui/strings.js";
import { iconSize } from "../ui/settings.js";
import ErrorBanner from "../ui/errorBanner.svelte";
import WarningBanner from "../ui/warningBanner.svelte";
import ArrowRight from "svelte-heros-v2/ArrowRight.svelte";
import { createJSONObjectSchema } from "../logic/utils.js";
export let schema = createJSONObjectSchema();
export let returnType = "object";
export let mode = "builder";
export let label = void 0;
function changeMode() {
  mode = getOtherMode(mode);
}
function getOtherMode(mode2) {
  return mode2 == "field" ? "builder" : "field";
}
let error = void 0;
</script>

<div class="space-y-8">
	<div class="flex justify-between items-center">
		<p class="x-label">
			{#if label}
				{label}
			{/if}
		</p>
		<button class="x-button flex items-center" type="button" on:click={changeMode}>
			<ArrowRight size={iconSize} />
			<span class="ml-1">{$stringsStore[getOtherMode(mode)]}</span>
		</button>
	</div>

	{#if mode == 'builder'}
		<div class="space-y-6">
			<JSONSchemaBuilder bind:schema bind:error {returnType} />
		</div>
	{:else}
		<JSONSchemaField bind:schema bind:error {returnType} />
	{/if}

	<div class="space-y-2">
		<ErrorBanner {error} />

		{#if mode == 'builder'}
			<WarningBanner {error}>
				<svelte:fragment slot="right">
					<button type="button" class="underline" on:click={changeMode}>
						{$stringsStore.view_in_plain_text}
					</button>
				</svelte:fragment>
			</WarningBanner>
		{/if}
	</div>
</div>
