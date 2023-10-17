<script lang="ts">
	export let id = '';
	export let type: HTMLButtonElement['type'] = 'button';
</script>

<button {type} {id} on:click><slot /></button>
