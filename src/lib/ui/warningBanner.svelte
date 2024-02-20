<script lang="ts">
	import type { BaseError } from '$lib/logic/errors.js';
	import { stringsStore } from '$lib/ui/strings.js';

	export let error: BaseError | undefined = undefined;
</script>

{#if error}
	<div class="x-banner x-banner-warning justify-between">
		<p>
			{$stringsStore.the_schema_seems_to_be_invalid}
		</p>

		<slot name="right" />
	</div>
{/if}
