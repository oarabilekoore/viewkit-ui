import { rosanaComponentProperties } from "./control.js";
import type { rosanaComponent } from "./types.js";
export type HtmlTag = string;
export declare class $Element extends rosanaComponentProperties {
    type: HtmlTag;
    parent: rosanaComponent;
    element: HTMLElement;
    constructor(tag: HtmlTag, parent: rosanaComponent);
}
export declare class Button extends rosanaComponentProperties {
    type: string;
    constructor(parent: rosanaComponent);
}
