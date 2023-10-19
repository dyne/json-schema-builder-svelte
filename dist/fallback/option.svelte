<script>export let value;
export let disabled = false;
export let placeholder = "";
</script>

<option {disabled} {placeholder} class="x-option" {value}>
	<slot />
</option>
