<script lang="ts">
	import type { BaseError } from '$lib/logic/errors.js';
	import type { SchemaProp, ReturnType } from '$lib/logic/types.js';

	import JSONSchemaBuilder from '$lib/JSONSchemaBuilder/JSONSchemaBuilder.svelte';
	import JSONSchemaField from '$lib/JSONSchemaField/JSONSchemaField.svelte';

	import { stringsStore } from '$lib/ui/strings.js';
	import { iconSize } from '$lib/ui/settings.js';

	import ErrorBanner from '$lib/ui/errorBanner.svelte';
	import WarningBanner from '$lib/ui/warningBanner.svelte';
	import ArrowRight from 'svelte-heros-v2/ArrowRight.svelte';
	import { createJSONObjectSchema } from '$lib/logic/utils.js';

	//

	export let schema: SchemaProp = createJSONObjectSchema();
	export let returnType: ReturnType = 'object';

	export let mode: EditorMode = 'builder';
	export let label: string | undefined = undefined;

	//

	type EditorMode = 'builder' | 'field';

	function changeMode() {
		mode = getOtherMode(mode);
	}

	function getOtherMode(mode: EditorMode) {
		return mode == 'field' ? 'builder' : 'field';
	}

	//

	let error: BaseError | undefined = undefined;
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
