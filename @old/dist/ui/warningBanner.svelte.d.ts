import { SvelteComponent } from "svelte";
import { type BaseError } from '../logic/errors.js';
declare const __propDef: {
    props: {
        error?: BaseError | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type WarningBannerProps = typeof __propDef.props;
export type WarningBannerEvents = typeof __propDef.events;
export type WarningBannerSlots = typeof __propDef.slots;
export default class WarningBanner extends SvelteComponent<WarningBannerProps, WarningBannerEvents, WarningBannerSlots> {
}
export {};
