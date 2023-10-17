<script lang="ts" generics="T">
	export let value: T;
</script>

<option {value}>
	<slot />
</option>
