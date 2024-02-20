import Ajv from 'ajv';
import addFormats from 'ajv-formats';
/* Functions */
export function createStringProperty() {
    return {
        name: '',
        definition: {
            type: 'string'
        },
        required: false
    };
}
export function createJSONObjectSchema() {
    return {
        type: 'object',
        properties: {
            '': {
                type: 'string'
            }
        }
    };
}
export function createAjv() {
    const ajv = new Ajv.default();
    addFormats.default(ajv);
    return ajv;
}
export function stringify(data) {
    return JSON.stringify(data, null, 2);
}
export function convertEmptyStringToObjectSchema(string) {
    if (!string || string.trim() === '')
        return stringify(createJSONObjectSchema());
    else
        return string;
}
