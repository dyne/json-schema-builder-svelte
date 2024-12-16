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
export function createAjv(options = {}) {
    const { allowedFormats = [], allowedKeywords = [] } = options;
    const ajv = new Ajv({
        validateSchema: false
    });
    addFormats.default(ajv);
    allowedKeywords.forEach((k) => ajv.addKeyword(k));
    allowedFormats.forEach((f) => ajv.addFormat(f, { validate: () => true }));
    return ajv;
}
export function stringify(data) {
    return JSON.stringify(data, null, 2);
}
export function returnSchema(schema, returnType = 'object') {
    return returnType == 'object' ? schema : stringify(schema);
}
export function debugSchema(schema) {
    return typeof schema === 'object' ? stringify(schema) : schema;
}
