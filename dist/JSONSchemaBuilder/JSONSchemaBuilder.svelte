<script>import { Effect, pipe } from "effect";
import {
  JSONObjectSchemaToPropertyList,
  propertyListToJSONObjectSchema,
  schemaPropToString
} from "../logic/conversion.js";
import { validatePropertyList, validatePropertyListKeys } from "../logic/validation.js";
import {
  parseJSONObjectSchema,
  parseJSONObjectSchemaFromString,
  parseJSONSchema
} from "../logic/parsing.js";
import { createJSONObjectSchema, returnSchema, stringify } from "../logic/utils.js";
import PropertyListEditor from "./partials/propertyListEditor.svelte";
export let schema = createJSONObjectSchema();
export let error = void 0;
export let returnType = "object";
let propertyList = schemaPropToPropertyList(schema);
$:
  if (propertyList)
    updateSchema(propertyList);
function schemaPropToPropertyList(schemaProp) {
  return Effect.runSync(
    Effect.match(
      pipe(
        schemaProp,
        schemaPropToString,
        parseJSONObjectSchemaFromString,
        Effect.map(JSONObjectSchemaToPropertyList),
        Effect.flatMap(validatePropertyList)
      ),
      {
        onSuccess: (propertyList2) => propertyList2,
        onFailure: (cause) => {
          error = cause;
          return void 0;
        }
      }
    )
  );
}
function updateSchema(propertyList2) {
  clearError();
  Effect.runSync(
    Effect.match(
      pipe(
        propertyList2,
        validatePropertyListKeys,
        Effect.map(propertyListToJSONObjectSchema),
        Effect.flatMap(parseJSONSchema),
        Effect.flatMap(parseJSONObjectSchema)
      ),
      {
        onSuccess: (newSchema) => schema = returnSchema(newSchema, returnType),
        onFailure: (cause) => error = cause
      }
    )
  );
}
function clearError() {
  error = void 0;
}
</script>

{#if propertyList}
	<PropertyListEditor bind:propertyList />
{/if}
