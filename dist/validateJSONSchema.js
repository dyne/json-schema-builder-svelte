import Ajv from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
export const SCHEMA_VERSION = 'https://json-schema.org/draft/2020-12/schema';
export function validateJSONSchema(schema) {
    const ajv = new Ajv.default();
    addFormats.default(ajv);
    // Ajv is initialized every time to avoid conflicts between stored schemas
    try {
        ajv.compile(JSON.parse(schema));
        return {
            result: true
        };
    }
    catch (e) {
        let message = '';
        if (e instanceof Error)
            message = e.message;
        else
            message = JSON.stringify(e, null, 2);
        return {
            result: false,
            message
        };
    }
}
