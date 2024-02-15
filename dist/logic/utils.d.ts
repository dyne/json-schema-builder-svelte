import type { Property } from './types.js';
export type WithRequired<T, K extends keyof T> = T & {
    [P in K]-?: T[P];
};
export type WithChanged<T, K extends Partial<T>> = T & K;
export declare function createStringProperty(): Property;
