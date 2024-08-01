import Ajv from 'ajv';
import addFormats from 'ajv-formats';

//

export function createAjv(): Ajv {
	const ajv = new Ajv();
	addFormats.default(ajv);
	return ajv;
}
