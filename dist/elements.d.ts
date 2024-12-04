import { ComponentProperties } from "./component.js";
import type { Layout } from "./types.js";
export declare class HtmlWidget extends ComponentProperties {
    constructor(parent: Layout, tag: string);
}
export declare const Button: (parent: Layout, text: string, width: number, height: number) => HtmlWidget;
export declare const Text: (parent: Layout, text: string, width: number, height: number, options: string) => HtmlWidget;
