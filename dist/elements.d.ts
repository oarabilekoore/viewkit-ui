import { ComponentProperties } from "./component.js";
import type { LayoutComponent } from "./types.js";
export declare class Button extends ComponentProperties {
    constructor(parent: LayoutComponent, text: string, width: number, height: number, options?: string);
}
export declare class Text extends ComponentProperties {
    constructor(parent: LayoutComponent, text: string, width: number, height: number, options?: string);
}
export declare class Input extends ComponentProperties {
    constructor(parent: LayoutComponent, type: string, width: number, height: number, placeholder?: string);
}
export declare class CheckBox extends ComponentProperties {
    constructor(parent: LayoutComponent, label: string, checked: boolean, options?: string);
    /**Call a function once the state of the check is changed */
    SetOnCheck(handlerFn: Function): void;
}
export declare class Slider extends ComponentProperties {
    constructor(parent: LayoutComponent, min: number, max: number, value: number, step: number);
}
export declare class ImageView extends ComponentProperties {
    constructor(parent: LayoutComponent, src: string, width: number, height: number, options?: string);
}
export declare class ProgressBar extends ComponentProperties {
    constructor(parent: LayoutComponent, value: number, max: number, options?: string);
}
export declare class TextArea extends ComponentProperties {
    constructor(parent: LayoutComponent, text: string, width: number, height: number, options?: string);
}
