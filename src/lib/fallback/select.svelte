<script lang="ts">
	export let value: any = undefined;
	export let name = '';
	export let id = '';
	export let placeholder = '';
	export let required = false;

	let className = '';
	export { classname as class };

	className = `x-select ${className}`;
</script>

<select {name} {id} {required} {placeholder} class={className} bind:value>
	<slot />
</select>
