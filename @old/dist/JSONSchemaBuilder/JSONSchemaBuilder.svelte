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
import { createJSONObjectSchema, returnSchema } from "../logic/utils.js";
import PropertyListEditor from "./partials/propertyListEditor.svelte";
export let schema = createJSONObjectSchema();
export let error = void 0;
export let returnType = "object";
export let requiredDefault = false;
export let hideRequired = false;
let propertyList = [];
$:
  updatePropertyList(schema);
$:
  updateSchema(propertyList, returnType);
function schemaPropToPropertyList(schemaProp) {
  return pipe(
    schemaProp,
    schemaPropToString,
    parseJSONObjectSchemaFromString,
    Effect.map(JSONObjectSchemaToPropertyList),
    Effect.flatMap(validatePropertyList)
  );
}
function propertyListToSchema(propertyList2, returnType2) {
  return pipe(
    propertyList2,
    validatePropertyListKeys,
    Effect.map(propertyListToJSONObjectSchema),
    Effect.flatMap(parseJSONSchema),
    Effect.flatMap(parseJSONObjectSchema),
    Effect.map((schema2) => returnSchema(schema2, returnType2))
  );
}
function updatePropertyList(schemaProp) {
  pipe(
    schemaPropToPropertyList(schemaProp),
    Effect.match({
      onFailure: (e) => error = e,
      onSuccess: (v) => propertyList = v
    }),
    Effect.runSync
  );
}
function updateSchema(propertyList2, returnType2) {
  if (error)
    return;
  pipe(
    propertyListToSchema(propertyList2, returnType2),
    Effect.match({
      onFailure: (e) => error = e,
      onSuccess: (v) => schema = v
    }),
    Effect.runSync
  );
}
function clearError() {
  error = void 0;
}
</script>

{#if propertyList}
	<PropertyListEditor bind:propertyList {requiredDefault} {hideRequired} />
{/if}
