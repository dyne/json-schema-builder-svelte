<script lang="ts">
	export let value: any;
	export let disabled = false;
	export let placeholder = '';
</script>

<option {disabled} {placeholder} class="x-option" {value}>
	<slot />
</option>
