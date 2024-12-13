<script lang="ts">
	import JsonSchemaBuilderTest from '$lib/JSONSchemaBuilder/JSONSchemaBuilderTest.svelte';
	import PropertyDefinitionEditorTest from '$lib/JSONSchemaBuilder/partials/propertyDefinitionEditorTest.svelte';
	import PropertyEditorTest from '$lib/JSONSchemaBuilder/partials/propertyEditorTest.svelte';
	import PropertyListEditorTest from '$lib/JSONSchemaBuilder/partials/propertyListEditorTest.svelte';

	const components = {
		JsonSchemaBuilderTest,
		PropertyListEditorTest,
		PropertyEditorTest,
		PropertyDefinitionEditorTest
	};
</script>

<div class="divide-y">
	{#each Object.entries(components) as [componentName, Component]}
		<div class="space-y-4 p-4 py-12">
			<p class="mb-6 text-2xl font-semibold">{componentName}</p>
			<Component />
		</div>
	{/each}
</div>
