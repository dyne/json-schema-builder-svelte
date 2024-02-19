<script lang="ts">
	import type { BaseError } from '$lib/logic/utils.js';

	export let error: BaseError | undefined = undefined;
</script>

{#if error}
	<div class="x-banner x-banner-error">
		<div>
			<p class="font-bold">{error._tag}</p>
			{#if error.detail}
				<p>{JSON.stringify(error.detail, null, 2)}</p>
			{/if}
		</div>

		<slot name="right" />
	</div>
{/if}
