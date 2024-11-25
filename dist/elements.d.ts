import { ComponentProperties } from "./component.js";
import type { Layout } from "./types.js";
export type HtmlTag = string;
export declare class Button extends ComponentProperties {
    type: string;
    constructor(parent: Layout, text: string, width: number, height: number, options: string);
}
