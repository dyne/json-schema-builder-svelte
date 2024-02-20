<script>import { Effect, pipe } from "effect";
import { parseJSONObjectSchemaFromString } from "../logic/parsing.js";
import {
  stringify,
  createJSONObjectSchema,
  convertEmptyStringToObjectSchema
} from "../logic/utils.js";
import { nanoid } from "nanoid";
export let schema = stringify(createJSONObjectSchema());
export let error = void 0;
export let id = `json-schema-${nanoid(5)}`;
let tempSchema = convertEmptyStringToObjectSchema(schema);
$:
  updateSchema(tempSchema);
function updateSchema(schemaString) {
  error = void 0;
  Effect.runSync(
    Effect.match(pipe(schemaString, parseJSONObjectSchemaFromString), {
      onSuccess: (newSchema) => schema = stringify(newSchema),
      onFailure: (cause) => error = cause
    })
  );
}
</script>

<textarea class="x-textarea font-mono" rows="20" {id} name={id} bind:value={tempSchema} />
