import type { Layout } from "./types.js";
/**
 * Applies the provided options to the given HTML element by adding corresponding CSS classes.
 */
export declare const optionsApi: (element: HTMLElement, options: string) => void;
declare const $Layout: (type: string, options: string) => Layout;
export default $Layout;
