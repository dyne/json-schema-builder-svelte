<script lang="ts">
	import type { BaseError } from '$lib/logic/utils.js';

	export let error: BaseError | undefined = undefined;
</script>

{#if error}
	<div class="x-banner-error">
		<div>
			<p class="x-banner-error-title">{error._tag}</p>
			{#if error.detail}
				<p class="x-banner-error-message">{JSON.stringify(error.detail, null, 2)}</p>
			{/if}
		</div>

		<slot name="right" />
	</div>
{/if}
