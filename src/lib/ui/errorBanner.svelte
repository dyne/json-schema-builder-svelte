<script lang="ts">
	import type { BaseError } from '$lib/logic/errors.js';
	import { strings } from '$lib/ui/strings.js';

	export let error: BaseError | undefined = undefined;
</script>

{#if error}
	<div class="x-banner x-banner-error">
		<div>
			<p class="font-bold">{strings[error._tag]}</p>
			{#if error.detail}
				<p>{JSON.stringify(error.detail, null, 2)}</p>
			{/if}
		</div>

		<slot name="right" />
	</div>
{/if}
