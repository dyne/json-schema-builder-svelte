import type { Property } from '../logic/types.js';

export function createStringProperty(): Property {
	return {
		name: '',
		schema: {
			type: 'string'
		},
		required: false
	};
}
