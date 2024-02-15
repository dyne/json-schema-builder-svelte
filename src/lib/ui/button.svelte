<script lang="ts">
	export let id = '';
	export let type: HTMLButtonElement['type'] = 'button';

	let className = '';
	export { className as class };

	className = `x-button ${className}`;
</script>

<button class={className} {type} {id} on:click><slot /></button>
