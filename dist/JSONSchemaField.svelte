<script>export let schema = {
  type: "object",
  properties: {}
};
</script>

<pre>{JSON.stringify(schema, null, 2)}</pre>

<!-- <div class="flex flex-col space-y-2">
	<textarea class="x-textarea" rows="20" {name} id={name} bind:value={tempSchema} />
	{#if error}
		<div class="flex justify-between x-banner x-banner-error">
			<p>{error}</p>
			<button class="x-button x-button-square" on:click={clearError}>
				<XMark size={$componentsSettings.iconSize} />
			</button>
		</div>
	{/if}
</div> -->
