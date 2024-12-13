<script>import { Effect, pipe } from "effect";
import { stringify, createJSONObjectSchema, returnSchema } from "../logic/utils.js";
import { parseJSONObjectSchemaFromString } from "../logic/parsing.js";
import { nanoid } from "nanoid";
import { schemaPropToString } from "../logic/conversion.js";
export let schema = createJSONObjectSchema();
export let error = void 0;
export let returnType = "object";
export let id = `json-schema-${nanoid(5)}`;
let tempSchema = "";
$:
  updateTempSchema(schema);
$:
  updateSchema(tempSchema, returnType);
function updateTempSchema(schema2) {
  tempSchema = schemaPropToString(schema2);
}
function updateSchema(schemaString, returnType2) {
  error = void 0;
  pipe(
    stringToSchemaProp(schemaString, returnType2),
    Effect.match({
      onFailure: (e) => error = e,
      onSuccess: (v) => schema = v
    }),
    Effect.runSync
  );
}
function stringToSchemaProp(schemaString, returnType2) {
  return pipe(
    schemaString,
    parseJSONObjectSchemaFromString,
    Effect.map((schema2) => returnSchema(schema2, returnType2))
  );
}
</script>

<textarea class="x-textarea font-mono" rows="20" {id} name={id} bind:value={tempSchema} />
