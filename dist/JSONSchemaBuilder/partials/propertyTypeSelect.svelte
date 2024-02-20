<script context="module">export var UIPropertyTypeOption = /* @__PURE__ */ ((UIPropertyTypeOption2) => {
  UIPropertyTypeOption2["string"] = "string";
  UIPropertyTypeOption2["integer"] = "integer";
  UIPropertyTypeOption2["float"] = "float";
  UIPropertyTypeOption2["boolean"] = "boolean";
  UIPropertyTypeOption2["list"] = "list";
  UIPropertyTypeOption2["datetime"] = "datetime";
  UIPropertyTypeOption2["date"] = "date";
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
      else if (property.definition.format == Format.date)
        return "date" /* date */;
      else if (property.definition.format == Format.datetime)
        return "datetime" /* datetime */;
      else
        return "string" /* string */;
    default:
      return void 0;
  }
}
</script>

<script>import { nanoid } from "nanoid";
import {
  JSONSchemaType as Type,
  JSONSchemaFormat as Format
} from "../../logic/types.js";
import { stringsStore } from "../../ui/strings.js";
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
  const previousFormat = property.definition.format;
  delete property.definition.format;
  switch (type) {
    case UIPropertyTypeOption.list:
      property.definition.enum = previousEnum ?? [];
      property.definition.type = Type.string;
      break;
    case UIPropertyTypeOption.string:
      property.definition.type = Type.string;
      break;
    case UIPropertyTypeOption.integer:
      property.definition.type = Type.integer;
      break;
    case UIPropertyTypeOption.float:
      property.definition.type = Type.number;
      break;
    case UIPropertyTypeOption.boolean:
      property.definition.type = Type.boolean;
      break;
    case UIPropertyTypeOption.date:
      property.definition.type = Type.string;
      property.definition.format = Format.date;
      break;
    case UIPropertyTypeOption.datetime:
      property.definition.type = Type.string;
      property.definition.format = Format.datetime;
      break;
  }
}
const typeValues = Object.values(UIPropertyTypeOption);
const name = id;
const placeholder = $stringsStore.select_a_type;
</script>

<select class="x-select" {placeholder} {name} {id} bind:value={UIPropertyType} required>
	<option value={undefined} disabled>{placeholder}</option>
	{#each typeValues as property}
		<option value={property}>{$stringsStore[property]}</option>
	{/each}
</select>
