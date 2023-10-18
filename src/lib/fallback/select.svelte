<script lang="ts">
	export let value: any = undefined;
	export let name = '';
	export let id = '';
	export let placeholder = '';
	export let required = false;

	let classname = 'grow';
	export { classname as class };
</script>

<select {name} {id} {value} {required} {placeholder} class={classname}>
	<slot />
</select>
