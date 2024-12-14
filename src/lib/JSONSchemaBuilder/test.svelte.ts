import type { JSONObjectSchema, Property } from '$lib/logic/types.js';

import {
	JSONObjectSchemaToPropertyList,
	propertyListToJSONObjectSchema
} from '$lib/logic/conversion.js';
import { AjvOptions, parseJSONObjectSchema, parseJSONSchema } from '$lib/logic/parsing.js';
import { createJSONObjectSchema, type CreateAjvOptions } from '$lib/logic/utils.js';
import { validatePropertyList } from '$lib/logic/validation.js';
import { Effect, Either, pipe } from 'effect';

// export class Builder {
// 	// schema = $state<JSONObjectSchema>(createJSONObjectSchema())

// 	constructor(
// 		public schema: object,
// 		private ajvOptions: CreateAjvOptions = {}
// 	) {}

// 	stateEffect = $derived.by(() =>
// 		schemaToPropertyList(this.schema).pipe(Effect.provideService(AjvOptions, this.ajvOptions))
// 	);
// 	stateConcrete = $derived.by(() => this.stateEffect.pipe(Effect.either, Effect.runSync));

// 	propertyList = $derived.by(() => this.stateConcrete.pipe(Either.getRight));
// 	error = $derived.by(() => this.stateConcrete.pipe(Either.getLeft));

// 	operationsError = $state<Error>();

// 	addProperty(property: Property) {
// 		this.stateEffect.pipe(
// 			Effect.map((properties) => propertyListToJSONObjectSchema([...properties, property])),
// 			Effect.tap((newSchema) => {
// 				this.schema = newSchema;
// 			}),
// 			Effect.runSync
// 		);
// 	}
// }

export class SchemaModel {
	constructor() {}
}

export class SchemaModel2 {
	private schema = createJSONObjectSchema();

	constructor() {}

	getPropertyList(): Property[] {
		return JSONObjectSchemaToPropertyList(this.schema);
	}

	setPropertyList(v: Property[]) {
		this.schema = propertyListToJSONObjectSchema(v);
	}

	// addProperty() {
	// 	this.stateEffect.pipe(
	// 		Effect.map((properties) => propertyListToJSONObjectSchema([...properties, property])),
	// 		Effect.tap((newSchema) => {
	// 			this.schema = newSchema;
	// 		}),
	// 		Effect.runSync
	// 	);
	// }
}

// function schemaToPropertyList(obj: object) {
// 	// error = undefined;
// 	return pipe(
// 		obj,
// 		parseJSONSchema,
// 		Effect.flatMap(parseJSONObjectSchema),
// 		Effect.map(JSONObjectSchemaToPropertyList),
// 		Effect.flatMap(validatePropertyList)
// 	);
// }
