<script lang="ts">
	export let id = '';
	export let type: string | undefined = 'button';
</script>

<button {type} {id} on:click><slot /></button>
