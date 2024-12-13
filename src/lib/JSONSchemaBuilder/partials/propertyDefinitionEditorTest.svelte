<script lang="ts">
	import type { JSONSchema } from '$lib/logic/types.js';
	import PropertyDefinitionEditor from './propertyDefinitionEditor.svelte';

	let definition = $state<JSONSchema>({
		type: 'string',
		format: 'date-time'
	});
</script>

<PropertyDefinitionEditor bind:definition />

<pre>{JSON.stringify(definition, null, 4)}</pre>
