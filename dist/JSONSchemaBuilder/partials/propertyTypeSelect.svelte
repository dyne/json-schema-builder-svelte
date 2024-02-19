<script context="module">var UIPropertyTypeOption = /* @__PURE__ */ ((UIPropertyTypeOption2) => {
  UIPropertyTypeOption2["string"] = "string";
  UIPropertyTypeOption2["integer"] = "integer";
  UIPropertyTypeOption2["float"] = "float";
  UIPropertyTypeOption2["boolean"] = "boolean";
  UIPropertyTypeOption2["list"] = "list";
  return UIPropertyTypeOption2;
})(UIPropertyTypeOption || {});
function getUIPropertyType(property) {
  switch (property.definition.type) {
    case "boolean":
      return "boolean" /* boolean */;
    case "number":
      return "float" /* float */;
    case "integer":
      return "integer" /* integer */;
    case "string":
      if (property.definition.enum)
        return "list" /* list */;
      else
        return "string" /* string */;
    default:
      return void 0;
  }
}
</script>

<script>import { nanoid } from "nanoid";
import { JSONSchemaType } from "../../logic/types.js";
export let id = `property-data-${nanoid(5)}`;
export let property;
let UIPropertyType = getUIPropertyType(property);
$:
  updatePropertyType(UIPropertyType);
function updatePropertyType(type) {
  if (!type)
    return;
  const previousEnum = property.definition.enum;
  delete property.definition.enum;
  switch (type) {
    case UIPropertyTypeOption.list:
      property.definition.enum = previousEnum ?? [];
      property.definition.type = JSONSchemaType.string;
      break;
    case UIPropertyTypeOption.string:
      property.definition.type = JSONSchemaType.string;
      break;
    case UIPropertyTypeOption.integer:
      property.definition.type = JSONSchemaType.integer;
      break;
    case UIPropertyTypeOption.float:
      property.definition.type = JSONSchemaType.number;
      break;
    case UIPropertyTypeOption.boolean:
      property.definition.type = JSONSchemaType.boolean;
      break;
  }
}
const typeValues = Object.values(UIPropertyTypeOption);
const typeLabels = Object.keys(UIPropertyTypeOption);
const name = id;
const placeholder = "Select a type";
</script>

<select class="x-select" {placeholder} {name} {id} bind:value={UIPropertyType} required>
	<option value={undefined} disabled>{placeholder}</option>
	{#each typeValues as property, i (property)}
		<option class="x-option" value={property}>{typeLabels[i]}</option>
	{/each}
</select>
