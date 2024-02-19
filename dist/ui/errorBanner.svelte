<script>export let error = void 0;
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
