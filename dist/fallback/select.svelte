<script>export let value = void 0;
export let name = "";
export let id = "";
export let placeholder = "";
export let required = false;
let className = "";
export {};
className = `x-select ${className}`;
</script>

<select {name} {id} {required} {placeholder} class={className} bind:value>
	<slot />
</select>
