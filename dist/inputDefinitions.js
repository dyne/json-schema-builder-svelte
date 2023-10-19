import { PropertyType } from './JSONSchemaDefinitions.js';
//
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
        $schema: 'https://json-schema.org/draft/2020-12/schema',
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
