<script>import { Effect, pipe } from "effect";
import {
  JSONObjectSchemaToPropertyList,
  propertyListToJSONObjectSchema
} from "../logic/conversion.js";
import { validatePropertyList, validatePropertyListKeys } from "../logic/validation.js";
import {
  parseJSONObjectSchema,
  parseJSONObjectSchemaFromString,
  parseJSONSchema
} from "../logic/parsing.js";
import {
  convertEmptyStringToObjectSchema,
  createJSONObjectSchema,
  stringify
} from "../logic/utils.js";
import PropertyListEditor from "./partials/propertyListEditor.svelte";
export let schema = stringify(createJSONObjectSchema());
export let error = void 0;
let propertyList = schemaToPropertyList(schema);
$:
  if (propertyList)
    updateSchema(propertyList);
function schemaToPropertyList(schema2) {
  return Effect.runSync(
    Effect.match(
      pipe(
        schema2,
        convertEmptyStringToObjectSchema,
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
        onSuccess: (newSchema) => schema = stringify(newSchema),
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
