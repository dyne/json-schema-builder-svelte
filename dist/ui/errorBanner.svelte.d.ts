import { SvelteComponent } from "svelte";
import type { BaseError } from '../logic/utils.js';
declare const __propDef: {
    props: {
        error?: BaseError | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        right: {};
    };
};
export type ErrorBannerProps = typeof __propDef.props;
export type ErrorBannerEvents = typeof __propDef.events;
export type ErrorBannerSlots = typeof __propDef.slots;
export default class ErrorBanner extends SvelteComponent<ErrorBannerProps, ErrorBannerEvents, ErrorBannerSlots> {
}
export {};
