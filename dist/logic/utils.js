import Ajv from 'ajv';
import addFormats from 'ajv-formats';
/* Classes */
export class BaseError {
    detail;
    constructor(detail) {
        this.detail = detail;
    }
}
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
        properties: {}
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
