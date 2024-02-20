<script>import { ErrorCode } from "../logic/errors.js";
import { stringsStore } from "./strings.js";
export let error = void 0;
</script>

{#if error && error._tag != ErrorCode.DuplicateKeysError}
	<div class="x-banner x-banner-warning justify-between">
		<p>{$stringsStore.the_schema_cannot_be_opened_in_the_gui}</p>
		<slot name="right" />
	</div>
{/if}
