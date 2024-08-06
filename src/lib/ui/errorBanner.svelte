<script lang="ts">
	import type { BaseError } from '$lib/utils/types.js';
	import { stringsStore } from '$lib/ui/strings.js';

	export let error: BaseError | undefined = undefined;
</script>

{#if error}
	<!-- {@const detail = error.detail} -->
	{@const tag = error._tag}
	<div class="x-banner x-banner-error">
		<div>
			<p class="font-bold">{tag}</p>
			<!-- <p class="font-bold">{$stringsStore[tag] ?? tag}</p> -->

			<!-- {#if tag == ErrorCode.DuplicateKeysError}
				<p>Changing editor mode will remove the duplicate properties.</p>
			{/if} -->

			<!-- {#if typeof detail == 'string'}
				<p>{detail}</p>
			{:else if detail}
				<p>{JSON.stringify(detail, null, 2)}</p>
			{/if} -->
		</div>

		<slot name="right" />
	</div>
{/if}
