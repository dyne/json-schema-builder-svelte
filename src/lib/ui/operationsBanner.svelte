<script lang="ts">
	import type { BaseError } from '$lib/logic/errors.js';
	import { createEventDispatcher } from 'svelte';
	import { strings } from './strings.js';

	//

	export let error: BaseError | undefined = undefined;

	//

	const dispatch = createEventDispatcher<{ reset: {}; restore: {} }>();

	function dispatchReset() {
		dispatch('reset', {});
	}
	function dispatchRestore() {
		dispatch('restore', {});
	}
</script>

{#if error}
	<div class="x-banner x-banner-warning flex justify-between">
		<p>{strings.the_schema_seems_to_be_invalid}</p>
		<div class="flex gap-2">
			<button class="x-button" type="button" on:click={dispatchReset}>{strings.reset_schema}</button
			>
			<button class="x-button" type="button" on:click={dispatchRestore}
				>{strings.restore_last_valid_state}</button
			>
		</div>
	</div>
{/if}
