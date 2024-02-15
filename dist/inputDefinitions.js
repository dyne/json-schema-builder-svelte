import { PropertyType } from './JSONSchemaDefinitions.js';
//
export var PropertyName;
(function (PropertyName) {
    PropertyName["STRING"] = "string";
    PropertyName["INTEGER"] = "integer";
    PropertyName["FLOAT"] = "float";
    PropertyName["DATE"] = "date";
    PropertyName["DATETIME"] = "datetime";
    PropertyName["BOOLEAN"] = "boolean";
    PropertyName["LIST"] = "list";
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
    },
    boolean: {
        type: PropertyType.BOOLEAN
    },
    list: {
        type: PropertyType.STRING,
        enum: []
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
        // $id: '',
        // title: '',
        // description: '',
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
        type: PropertyType.OBJECT,
        properties
    };
    if ($id)
        schema['$id'] = $id;
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
        const normalizedPropertyInput = Object.values(propertyOptions).find((p) => p.format == property.format && p.type == property.type) ?? propertyOptions.string;
        if (property.enum)
            normalizedPropertyInput.enum = property.enum;
        return {
            name: key,
            data: normalizedPropertyInput,
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
