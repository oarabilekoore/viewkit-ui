import { ComponentProperties } from "./component.js";
import type { LayoutComponent } from "./types.js";
export declare class Button extends ComponentProperties {
    type: string;
    constructor(parent: LayoutComponent, text: string, width: number, height: number, options: string);
}
export declare class Text extends ComponentProperties {
    type: string;
    constructor(parent: LayoutComponent, text: string, width: number, height: number, options: string);
}
