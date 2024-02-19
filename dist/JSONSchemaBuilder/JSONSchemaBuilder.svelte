<script>import { Effect, pipe } from "effect";
import {
  JSONObjectSchemaToPropertyList,
  propertyListToJSONObjectSchema
} from "../logic/conversion.js";
import { BaseError, createJSONObjectSchema } from "../logic/utils.js";
import { parseJSONObjectSchema, parseJSONSchema } from "../logic/parsing.js";
import { validatePropertyListKeys } from "../logic/validation.js";
import PropertyListEditor from "./partials/propertyListEditor.svelte";
import ErrorBanner from "../ui/errorBanner.svelte";
export let schema = createJSONObjectSchema();
let error = void 0;
function clearError() {
  error = void 0;
}
let propertyList = schemaToPropertyList(schema);
$:
  if (propertyList)
    updateSchema(propertyList);
function schemaToPropertyList(schema2) {
  return Effect.runSync(
    Effect.match(
      pipe(
        schema2,
        parseJSONSchema,
        Effect.flatMap(parseJSONObjectSchema),
        Effect.map(JSONObjectSchemaToPropertyList)
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
        onSuccess: (newSchema) => schema = newSchema,
        onFailure: (cause) => error = cause
      }
    )
  );
}
</script>

{#if propertyList}
	<PropertyListEditor bind:propertyList />
{/if}
<ErrorBanner {error} />
