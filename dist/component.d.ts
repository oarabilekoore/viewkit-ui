import type { Component, Signal, Unit } from "./types.js";
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
    ismounted: Signal<boolean>;
    element: HTMLElement;
    eltype: string;
    private classes;
    constructor();
    /*** Add a child component to this component.*/
    addChild(child: Component): this;
    /*** Remove a child component from the layout */
    removeChild(child: Component): this;
    /** Set an elements backColor */
    backColor(color: string): this;
    /** Set the textContent of this element */
    text(text: string): this;
    /** Set the innerHtml of the element */
    html(html: string): this;
    /** Set the focus of the page on this element */
    focus(): this;
    /** Remove the focus of the page from this element */
    clearFocus(): this;
    /** Set the Aria-label attribute of this element */
    setDescription(text: string): this;
    /** Set the size of this element, you can add an unit or rely on the screen-to-ratio 0 to 1 unit ratio */
    size(width: number | null | undefined, height: number | null | undefined, unit?: Unit): this;
    /**
     * Set the margins of this element.
     * @param {number} [left] - The left margin value.
     * @param {number} [top] - The top margin value.
     * @param {number} [right] - The right margin value.
     * @param {number} [bottom] - The bottom margin value.
     * @param {Unit} [unit] - The unit of measurement (e.g., px, %, em, rem). Defaults to responsive scaling.
     */
    margins(left?: number, top?: number, right?: number, bottom?: number, unit?: Unit): void;
    /**
     * Set the padding of this element.
     * @param {number} [left] - The left padding value.
     * @param {number} [top] - The top padding value.
     * @param {number} [right] - The right padding value.
     * @param {number} [bottom] - The bottom padding value.
     * @param {Unit} [unit] - The unit of measurement (e.g., px, %, em, rem). Defaults to responsive scaling.
     */
    padding(left?: number, top?: number, right?: number, bottom?: number, unit?: Unit): void;
    /**
     * Set the margins for all child elements of this component.
     * @param {number} [left] - The left margin value for children.
     * @param {number} [top] - The top margin value for children.
     * @param {number} [right] - The right margin value for children.
     * @param {number} [bottom] - The bottom margin value for children.
     * @param {Unit} [unit] - The unit of measurement (e.g., px, %, em, rem). Defaults to responsive scaling.
     */
    childMargins(left?: number, top?: number, right?: number, bottom?: number, unit?: Unit): void;
    /**
     * Set the position of this element.
     * @param {string} type - The position type (e.g., "absolute", "relative", "fixed", "sticky").
     * @param {number} [left] - The left offset of the element.
     * @param {number} [top] - The top offset of the element.
     * @param {number} [right] - The right offset of the element.
     * @param {number} [bottom] - The bottom offset of the element.
     * @param {Unit} [unit] - The unit of measurement (e.g., px, %, em, rem). Defaults to responsive scaling.
     */
    position(type: "absolute" | "relative" | "fixed" | "sticky", left?: number, top?: number, right?: number, bottom?: number, unit?: Unit): void;
    /** Call a function when the element is mounted to the DOM */
    onMount(callback: () => void): this;
    /** Call a function when the element is unmounted from the DOM */
    onUnMount(callback: () => void): this;
    /** Batch the elements methods in succesion, great for fast updates */
    batch(props: Partial<Record<keyof Component, any>>): this;
    /** Call a function when this element is clicked */
    set onPress(handler: Function);
    /** Set this elemements Id */
    id(id: string | any): this;
    /** Set this elements type */
    type(type: string | any): this;
    /** Add classes to this element */
    classList(classnames: TemplateStringsArray, ...expressions: any[]): this;
    /** Remove classes from this element */
    removeClassList(classnames: TemplateStringsArray, ...expressions: any[]): this;
    /** Add scoped css to this element, as an Emotion like object or a template literal */
    styled(styles: TemplateStringsArray | Object): this;
    /** Make the element visiblr */
    show(): this;
    /** Hide the element visually */
    hide(): this;
    /** Hide the element visually, and take no space in the DOM */
    gone(): this;
    /** Helper method to process template literals */
    private interpolateTemplate;
}
