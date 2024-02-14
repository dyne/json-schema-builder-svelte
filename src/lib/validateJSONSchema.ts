import Ajv from 'ajv';
import addFormats from 'ajv-formats';

export function validateJSONSchema(schema: string): { result: boolean; message?: string } {
	const ajv = new Ajv.default();
	addFormats.default(ajv);
	// Ajv is initialized every time to avoid conflicts between stored schemas

	try {
		ajv.compile(JSON.parse(schema));
		return {
			result: true
		};
	} catch (e) {
		let message = '';
		if (e instanceof Error) message = e.message;
		else message = JSON.stringify(e, null, 2);
		return {
			result: false,
			message
		};
	}
}
