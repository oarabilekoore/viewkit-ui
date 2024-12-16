import type { Component, Signal } from "./types.js";
export declare const onclickEventHandlerMap: Map<string, Function>;
/**
 * This class manages all the properties of controls.
 * If an element is not initialized, it defaults to creating its own
 * HTML element, typically a `<div>`.
 *
 * @class ComponentProperties
 * @description
 * The `ComponentProperties` class ensures that all controls have the necessary
 * properties and provides a fallback mechanism to create a `<div>`
 * when an element is not explicitly defined.
 */
export declare class ComponentProperties implements Component {
    isMounted: Signal<boolean>;
    element: HTMLElement;
    constructor();
    /** Call a function when the element is mounted to the DOM */
    set onMount(callback: () => void);
    /** Call a function when the element is unmounted from the DOM */
    set onUnMount(callback: () => void);
    /** Call a function when this element is clicked */
    set onPress(handler: Function);
    /** Add scoped css to this element, as an Emotion like object or a template literal */
    Styled(className?: string): this;
    /** Make the element visiblr */
    Show(): this;
    /** Hide the element visually */
    Hide(): this;
    /** Hide the element visually, and take no space in the DOM */
    Gone(): this;
    /** Helper method to process template literals */
    private interpolateTemplate;
}
