<script>import { ErrorCode } from "../logic/errors.js";
import { stringsStore } from "./strings.js";
export let error = void 0;
</script>

{#if error}
	{@const detail = error.detail}
	{@const tag = error._tag}
	<div class="x-banner x-banner-error">
		<div>
			<p class="font-bold">{$stringsStore[tag] ?? tag}</p>

			{#if tag == ErrorCode.DuplicateKeysError}
				<p>Changing editor mode will remove the duplicate properties.</p>
			{/if}

			{#if typeof detail == 'string'}
				<p>{detail}</p>
			{:else if detail}
				<p>{JSON.stringify(detail, null, 2)}</p>
			{/if}
		</div>

		<slot name="right" />
	</div>
{/if}
