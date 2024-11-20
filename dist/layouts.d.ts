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
    ismounted: Boolean;
    element: HTMLElement;
    elementClasses: string[];
    show(): any;
    hide(): any;
    addChild(child: import("./control.js").rosanaComponent): any;
    onMount: Function;
    onUnMount: Function;
    alignment(options: string): any;
    batch(props: Record<string, unknown>): any;
    ontouch: Function;
    css(styles: TemplateStringsArray | Record<string, string>): any;
    destroyChild(child: import("./control.js").rosanaComponent): any;
    clear(): any;
    showEl(): any;
    hideEl(): any;
    gone(): any;
};
/**
 * Creates an absolute layout with optional child alignment properties.
 * @param {string} [childAlignmentProperties] - Optional string for child alignment (e.g., "top", "center").
 */
export declare const $AbsoluteLayout: (childAlignmentProperties: string) => {
    type: string;
    ismounted: Boolean;
    element: HTMLElement;
    elementClasses: string[];
    show(): any;
    hide(): any;
    addChild(child: import("./control.js").rosanaComponent): any;
    onMount: Function;
    onUnMount: Function;
    alignment(options: string): any;
    batch(props: Record<string, unknown>): any;
    ontouch: Function;
    css(styles: TemplateStringsArray | Record<string, string>): any;
    destroyChild(child: import("./control.js").rosanaComponent): any;
    clear(): any;
    showEl(): any;
    hideEl(): any;
    gone(): any;
};
/**
 * Creates a frame layout with optional child alignment properties.
 * @param {string} [childAlignmentProperties] - Optional string for child alignment (e.g., "top", "center").
 */
export declare const $FrameLayout: (childAlignmentProperties: string) => {
    type: string;
    ismounted: Boolean;
    element: HTMLElement;
    elementClasses: string[];
    show(): any;
    hide(): any;
    addChild(child: import("./control.js").rosanaComponent): any;
    onMount: Function;
    onUnMount: Function;
    alignment(options: string): any;
    batch(props: Record<string, unknown>): any;
    ontouch: Function;
    css(styles: TemplateStringsArray | Record<string, string>): any;
    destroyChild(child: import("./control.js").rosanaComponent): any;
    clear(): any;
    showEl(): any;
    hideEl(): any;
    gone(): any;
};
/**
 * Creates a stack layout, either horizontal or vertical, with optional child alignment properties.
 * @param {string} [stackOrientation="horizontal"] - The orientation of the stack layout (either "horizontal" or "vertical").
 */
export declare const $StackedLayout: (stackOrientation?: string) => {
    type: string;
    ismounted: Boolean;
    element: HTMLElement;
    elementClasses: string[];
    show(): any;
    hide(): any;
    addChild(child: import("./control.js").rosanaComponent): any;
    onMount: Function;
    onUnMount: Function;
    alignment(options: string): any;
    batch(props: Record<string, unknown>): any;
    ontouch: Function;
    css(styles: TemplateStringsArray | Record<string, string>): any;
    destroyChild(child: import("./control.js").rosanaComponent): any;
    clear(): any;
    showEl(): any;
    hideEl(): any;
    gone(): any;
};
