<script lang="ts">
	import { ErrorCode, type BaseError } from '$lib/logic/errors.js';

	export let error: BaseError | undefined = undefined;
</script>

{#if error && error._tag != ErrorCode.DuplicateKeysError}
	<div class="x-banner x-banner-warning justify-between">
		<slot />
	</div>
{/if}
