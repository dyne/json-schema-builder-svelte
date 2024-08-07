<script>import { ErrorCode } from "../logic/errors.js";
export let error = void 0;
</script>

{#if error && error._tag != ErrorCode.DuplicateKeysError}
	<div class="x-banner x-banner-warning justify-between">
		<slot />
	</div>
{/if}
