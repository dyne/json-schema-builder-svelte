<script lang="ts">
	import JSONSchemaBuilder from '$lib/JSONSchemaBuilder.svelte';
</script>

<JSONSchemaBuilder
	on:create={(s) => {
		console.log(s);
	}}
/>
