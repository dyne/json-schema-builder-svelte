<script>import { Effect, pipe } from "effect";
import {
  JSONObjectSchemaToPropertyList,
  propertyListToJSONObjectSchema,
  schemaPropToString
} from "../logic/conversion.js";
import { validatePropertyList, validatePropertyListKeys } from "../logic/validation.js";
import {
  AjvOptions,
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
export let ajvOptions = {};
let propertyList = [];
$:
  updatePropertyList(schema);
$:
  updateSchema(propertyList, returnType);
function updatePropertyList(schemaProp) {
  pipe(
    schemaProp,
    schemaPropToString,
    parseJSONObjectSchemaFromString,
    Effect.map(JSONObjectSchemaToPropertyList),
    Effect.flatMap(validatePropertyList),
    Effect.match({
      onFailure: (e) => error = e,
      onSuccess: (v) => propertyList = v
    }),
    Effect.provideService(AjvOptions, ajvOptions),
    Effect.runSync
  );
}
function updateSchema(propertyList2, returnType2) {
  if (error && propertyList2.length == 0)
    return;
  error = void 0;
  pipe(
    propertyList2,
    validatePropertyListKeys,
    Effect.map(propertyListToJSONObjectSchema),
    Effect.flatMap(parseJSONSchema),
    Effect.flatMap(parseJSONObjectSchema),
    Effect.map((schema2) => returnSchema(schema2, returnType2)),
    Effect.match({
      onFailure: (e) => error = e,
      onSuccess: (v) => schema = v
    }),
    Effect.provideService(AjvOptions, ajvOptions),
    Effect.runSync
  );
}
</script>

<PropertyListEditor bind:propertyList {requiredDefault} {hideRequired} />
