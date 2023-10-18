<script>export let value = void 0;
export let name = "";
export let id = "";
export let placeholder = "";
export let required = false;
let classname = "grow";
export { classname as class };
classname = `x-select ${classname}`;
</script>

<select {name} {id} {value} {required} {placeholder} class={classname}>
	<slot />
</select>
