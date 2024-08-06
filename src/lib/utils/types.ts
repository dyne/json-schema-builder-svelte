import type { Effect } from 'effect';

export type EffectErrorChannel<T> = T extends Effect.Effect<unknown, infer E, unknown> ? E : never;

export abstract class BaseError<T = unknown> {
	abstract readonly _tag: string;
	constructor(readonly message?: string, public readonly detail?: T) {}
}
