<script>export let value = void 0;
export let type = "text";
export let id = "";
export let name = "";
export let placeholder = "";
export let required = false;
let className = "";
export { className as class };
className = `x-input ${className}`;
const typeAction = (node, { type: type2 }) => {
  node.type = type2;
  return {
    update: ({ type: type3 }) => {
      node.type = type3;
    }
  };
};
</script>

<input
	class={className}
	{id}
	{name}
	{placeholder}
	{required}
	use:typeAction={{ type }}
	bind:value
/>
