<script lang="ts">
	import type { Property } from '$lib/logic/types.js';
	import PropertyEditor from './propertyEditor.svelte';

	let property = $state<Property>({
		name: 'ok',
		title: 'ok',
		definition: {
			type: 'string'
		},
		required: false
	});
</script>

<table>
	<tbody>
		<PropertyEditor bind:property />
	</tbody>
</table>

<pre>{JSON.stringify(property, null, 2)}</pre>
