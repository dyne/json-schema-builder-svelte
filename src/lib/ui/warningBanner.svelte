<script lang="ts">
	import { ErrorCode, type BaseError } from '$lib/logic/errors.js';
	import { stringsStore } from '$lib/ui/strings.js';

	export let error: BaseError | undefined = undefined;
</script>

{#if error && error._tag != ErrorCode.DuplicateKeysError}
	<div class="x-banner x-banner-warning justify-between">
		<slot>
			<p>{$stringsStore.the_schema_cannot_be_opened_in_the_gui}</p>
		</slot>
		<slot name="right" />
	</div>
{/if}
