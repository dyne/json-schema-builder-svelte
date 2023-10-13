<script>import { nanoid } from "nanoid";
import { propertyOptions } from "./inputDefinitions.js";
export let value = propertyOptions["string"];
export let id = `property-data-${nanoid()}`;
const name = id;
</script>

<select class="grow" {name} {id} bind:value required>
	{#each Object.entries(propertyOptions) as [label, property]}
		<option value={property}>{label}</option>
	{/each}
</select>
