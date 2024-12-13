<script lang="ts">
	import type { Property } from '$lib/logic/types.js';
	import PropertyListEditor from './propertyListEditor.svelte';

	let list = $state<Property[]>([]);
</script>

<PropertyListEditor bind:propertyList={list} />

<pre>{JSON.stringify(list, null, 2)}</pre>
