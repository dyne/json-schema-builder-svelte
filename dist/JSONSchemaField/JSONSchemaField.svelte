<script>import { Effect, pipe } from "effect";
import { parseJSONObjectSchemaFromString } from "../logic/parsing.js";
import { stringify, createJSONObjectSchema } from "../logic/utils.js";
import { nanoid } from "nanoid";
import ErrorBanner from "../ui/errorBanner.svelte";
export let schema = createJSONObjectSchema();
export let id = `json-schema-${nanoid(5)}`;
let error = void 0;
let schemaString = stringify(schema);
$:
  updateSchema(schemaString);
function updateSchema(schemaString2) {
  error = void 0;
  Effect.runSync(
    Effect.match(pipe(schemaString2, parseJSONObjectSchemaFromString), {
      onSuccess: (newSchema) => schema = newSchema,
      onFailure: (cause) => error = cause
    })
  );
}
function resetSchemaString() {
  schemaString = stringify(schema);
}
</script>

<div class="flex flex-col gap-2">
	<textarea class="x-textarea" rows="20" {id} name={id} bind:value={schemaString} />
	<ErrorBanner bind:error>
		<button class="x-button" slot="right" on:click={resetSchemaString}>
			Restore previous state
		</button>
	</ErrorBanner>
</div>
