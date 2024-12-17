import type { Widget, Signal } from "./types.js";
export declare const onPressEventHanlerMap: Map<string, Function>;
/**
 * This class manages all the properties of widgets.
 * If an element is not initialized, it defaults to creating its own
 * HTML element, typically a `<div>`.
 *
 * @class WidgetProperties
 * @description
 * The `WidgetProperties` class ensures that all widgets have the necessary
 * properties and provides a fallback mechanism to create a `<div>`
 * when an element is not explicitly defined.
 */
export declare class WidgetProperties<T extends HTMLElement = HTMLElement> implements Widget {
    isMounted: Signal<boolean>;
    element: T;
    constructor(tag?: string);
    /** Call a function when the element is mounted to the DOM */
    set onMount(callback: () => void);
    /** Call a function when the element is unmounted from the DOM */
    set onUnMount(callback: () => void);
    /** Call a function when this element is clicked */
    set onPress(handler: Function);
}
