<script>import { Effect, pipe } from "effect";
import { stringify, createJSONObjectSchema, returnSchema } from "../logic/utils.js";
import { parseJSONObjectSchemaFromString } from "../logic/parsing.js";
import { nanoid } from "nanoid";
import { schemaPropToString } from "../logic/conversion.js";
export let schema = createJSONObjectSchema();
export let error = void 0;
export let returnType = "object";
export let id = `json-schema-${nanoid(5)}`;
let tempSchema = schemaPropToString(schema);
$:
  updateSchema(tempSchema);
function updateSchema(schemaString) {
  error = void 0;
  Effect.runSync(
    Effect.match(pipe(schemaString, parseJSONObjectSchemaFromString), {
      onSuccess: (newSchema) => schema = returnSchema(newSchema, returnType),
      onFailure: (cause) => error = cause
    })
  );
}
</script>

<textarea class="x-textarea font-mono" rows="20" {id} name={id} bind:value={tempSchema} />
