import { PropertyType } from './JSONSchemaDefinitions.js';
import { SCHEMA_VERSION } from './validateJSONSchema.js';
//
export var PropertyName;
(function (PropertyName) {
    PropertyName["STRING"] = "string";
    PropertyName["INTEGER"] = "integer";
    PropertyName["FLOAT"] = "float";
    PropertyName["DATE"] = "date";
    PropertyName["DATETIME"] = "datetime";
})(PropertyName || (PropertyName = {}));
export const propertyOptions = {
    string: {
        type: PropertyType.STRING
    },
    integer: {
        type: PropertyType.INTEGER
    },
    float: {
        type: PropertyType.NUMBER
    },
    date: {
        type: PropertyType.STRING,
        format: 'date'
    },
    datetime: {
        type: PropertyType.STRING,
        format: 'date-time'
    }
};
export function createPropertyInput(data = {}) {
    return {
        name: '',
        data: propertyOptions['string'],
        required: false,
        ...data
    };
}
export function createJSONSchemaInput(data = {}) {
    return {
        $id: '',
        title: '',
        description: '',
        properties: [createPropertyInput()],
        ...data
    };
}
//
export function createJSONSchema(input) {
    const { $id, title, description } = input;
    const properties = {};
    for (const p of input.properties) {
        properties[p.name] = p.data;
    }
    const schema = {
        $schema: SCHEMA_VERSION,
        $id,
        type: PropertyType.OBJECT,
        properties
    };
    if (title)
        schema['title'] = title;
    if (description)
        schema['description'] = description;
    const required = input.properties.filter((p) => p.required).map((p) => p.name);
    if (required.length)
        schema['required'] = required;
    return schema;
}
//
export function JSONSchemaToInput(schema) {
    const { $id, title, description, properties, required } = schema;
    const propertyInputs = Object.entries(properties).map(([key, property]) => {
        const normalizedPropertyInput = Object.values(propertyOptions).find((p) => p.format == property.format && p.type == property.type);
        return {
            name: key,
            data: normalizedPropertyInput ?? propertyOptions.string,
            required: required?.includes(key) ?? false
        };
    });
    return {
        $id,
        title,
        description,
        properties: propertyInputs
    };
}
