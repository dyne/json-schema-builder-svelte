<script>
	let htmlFor = '';
	let className = '';

	export { htmlFor as for, className as class };
	className = `x-label ${className}`;
</script>

<label for={htmlFor} class={className}>
	<slot />
</label>
