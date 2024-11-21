/**
 * Applies the provided options to the given HTML element by adding corresponding CSS classes.
 */
export declare const optionsApi: (element: HTMLElement, options: string) => void;
declare const $Layout: {
    /**creates a linear layout with optional child alignment properties */
    Linear: (childAlignmentProperties: string) => {
        type: string;
        ismounted: Boolean;
        element: HTMLElement;
        elementClasses: string[];
        addChild(child: import("./types.js").rosanaComponent): any;
        onMount: Function;
        onUnMount: Function;
        alignment(options: string): any;
        batch(props: Record<string, unknown>): any;
        ontouch: Function;
        css(styles: TemplateStringsArray | Record<string, string>): any;
        destroyChild(child: import("./types.js").rosanaComponent): any;
        clear(): any;
        show(): any;
        hide(): any;
        gone(): any;
    };
    /**creates an absolute layout with optional child alignment properties */
    Absolute: (childAlignmentProperties: string) => {
        type: string;
        ismounted: Boolean;
        element: HTMLElement;
        elementClasses: string[];
        addChild(child: import("./types.js").rosanaComponent): any;
        onMount: Function;
        onUnMount: Function;
        alignment(options: string): any;
        batch(props: Record<string, unknown>): any;
        ontouch: Function;
        css(styles: TemplateStringsArray | Record<string, string>): any;
        destroyChild(child: import("./types.js").rosanaComponent): any;
        clear(): any;
        show(): any;
        hide(): any;
        gone(): any;
    };
    Frame: (childAlignmentProperties: string) => {
        type: string;
        ismounted: Boolean;
        element: HTMLElement;
        elementClasses: string[];
        addChild(child: import("./types.js").rosanaComponent): any;
        onMount: Function;
        onUnMount: Function;
        alignment(options: string): any;
        batch(props: Record<string, unknown>): any;
        ontouch: Function;
        css(styles: TemplateStringsArray | Record<string, string>): any;
        destroyChild(child: import("./types.js").rosanaComponent): any;
        clear(): any;
        show(): any;
        hide(): any;
        gone(): any;
    };
    /**creates a stack layout, either horizontal or vertical, with optional child alignment properties. */
    Stacked: (stackOrientation?: string) => {
        type: string;
        ismounted: Boolean;
        element: HTMLElement;
        elementClasses: string[];
        addChild(child: import("./types.js").rosanaComponent): any;
        onMount: Function;
        onUnMount: Function;
        alignment(options: string): any;
        batch(props: Record<string, unknown>): any;
        ontouch: Function;
        css(styles: TemplateStringsArray | Record<string, string>): any;
        destroyChild(child: import("./types.js").rosanaComponent): any;
        clear(): any;
        show(): any;
        hide(): any;
        gone(): any;
    };
};
export default $Layout;
