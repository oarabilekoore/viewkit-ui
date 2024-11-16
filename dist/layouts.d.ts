import { componentController } from "./control.js";
/**
 * Applies the provided options to the given HTML element by adding corresponding CSS classes.
 */
export declare const optionsApi: (element: HTMLElement, options: string) => void;
/**
 * Creates a linear layout with optional child alignment properties.
 * @param {string} [childAlignmentProperties] - Optional string for child alignment (e.g., "top", "center").
 */
export declare const $LinearLayout: (childAlignmentProperties: string) => {
    type: string;
    element: any;
    elementClasses: Array<string>;
    addChild(child: componentController): any | undefined;
    alignment(options: string): any;
    batch(props: object): any;
    onclick: Function;
    css(styles: TemplateStringsArray | object): any;
    destroyChild(child: componentController): any;
    show(): any;
    hide(): any;
    gone(): any;
};
/**
 * Creates an absolute layout with optional child alignment properties.
 * @param {string} [childAlignmentProperties] - Optional string for child alignment (e.g., "top", "center").
 */
export declare const $AbsoluteLayout: (childAlignmentProperties: string) => {
    type: string;
    element: any;
    elementClasses: Array<string>;
    addChild(child: componentController): any | undefined;
    alignment(options: string): any;
    batch(props: object): any;
    onclick: Function;
    css(styles: TemplateStringsArray | object): any;
    destroyChild(child: componentController): any;
    show(): any;
    hide(): any;
    gone(): any;
};
/**
 * Creates a frame layout with optional child alignment properties.
 * @param {string} [childAlignmentProperties] - Optional string for child alignment (e.g., "top", "center").
 */
export declare const $FrameLayout: (childAlignmentProperties: string) => {
    type: string;
    element: any;
    elementClasses: Array<string>;
    addChild(child: componentController): any | undefined;
    alignment(options: string): any;
    batch(props: object): any;
    onclick: Function;
    css(styles: TemplateStringsArray | object): any;
    destroyChild(child: componentController): any;
    show(): any;
    hide(): any;
    gone(): any;
};
/**
 * Creates a stack layout, either horizontal or vertical, with optional child alignment properties.
 * @param {string} [stackOrientation="horizontal"] - The orientation of the stack layout (either "horizontal" or "vertical").
 */
export declare const $StackedLayout: (stackOrientation?: string) => {
    type: string;
    element: any;
    elementClasses: Array<string>;
    addChild(child: componentController): any | undefined;
    alignment(options: string): any;
    batch(props: object): any;
    onclick: Function;
    css(styles: TemplateStringsArray | object): any;
    destroyChild(child: componentController): any;
    show(): any;
    hide(): any;
    gone(): any;
};
