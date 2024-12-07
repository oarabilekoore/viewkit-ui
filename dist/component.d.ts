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
    type: string;
    private classes;
    constructor();
    /*** Add a child component to this component.*/
    AddChild(child: Component): this;
    /*** Remove a child component from the layout */
    RemoveChild(child: Component): this;
    /** Set an elements backColor */
    SetBackColor(color: string): this;
    /** Set the textContent of this element */
    SetText(text: string): this;
    /** Set the innerHtml of the element */
    SetHtml(html: string): this;
    /** Set the focus of the page on this element */
    Focus(): this;
    /** Remove the focus of the page from this element */
    ClearFocus(): this;
    /** Set the Aria-label attribute of this element */
    SetDescription(text: string): this;
    /** Set the size of this element, you can add an unit or rely on the screen-to-ratio 0 to 1 unit ratio */
    SetSize(width: number | null, height: number | null, unit?: Unit): this;
    /**
     * Set the margins of this element.
     * @param {number} [left] - The left margin value.
     * @param {number} [top] - The top margin value.
     * @param {number} [right] - The right margin value.
     * @param {number} [bottom] - The bottom margin value.
     * @param {Unit} [unit] - The unit of measurement (e.g., px, %, em, rem). Defaults to responsive scaling.
     */
    SetMargins(left?: number, top?: number, right?: number, bottom?: number, unit?: Unit): void;
    /**
     * Set the padding of this element.
     * @param {number} [left] - The left padding value.
     * @param {number} [top] - The top padding value.
     * @param {number} [right] - The right padding value.
     * @param {number} [bottom] - The bottom padding value.
     * @param {Unit} [unit] - The unit of measurement (e.g., px, %, em, rem). Defaults to responsive scaling.
     */
    SetPadding(left?: number, top?: number, right?: number, bottom?: number, unit?: Unit): void;
    /**
     * Set the margins for all child elements of this component.
     * @param {number} [left] - The left margin value for children.
     * @param {number} [top] - The top margin value for children.
     * @param {number} [right] - The right margin value for children.
     * @param {number} [bottom] - The bottom margin value for children.
     * @param {Unit} [unit] - The unit of measurement (e.g., px, %, em, rem). Defaults to responsive scaling.
     */
    SetChildMargins(left?: number, top?: number, right?: number, bottom?: number, unit?: Unit): void;
    /**
     * Set the position of this element.
     * @param {string} type - The position type (e.g., "absolute", "relative", "fixed", "sticky").
     * @param {number} [left] - The left offset of the element.
     * @param {number} [top] - The top offset of the element.
     * @param {number} [right] - The right offset of the element.
     * @param {number} [bottom] - The bottom offset of the element.
     * @param {Unit} [unit] - The unit of measurement (e.g., px, %, em, rem). Defaults to responsive scaling.
     */
    SetPosition(type: "absolute" | "relative" | "fixed" | "sticky", left?: number, top?: number, right?: number, bottom?: number, unit?: Unit): void;
    /** Call a function when the element is mounted to the DOM */
    SetOnMount(callback: () => void): this;
    /** Call a function when the element is unmounted from the DOM */
    SetOnUnMount(callback: () => void): this;
    /** Batch the elements methods in succesion, great for fast updates */
    Batch(props: Partial<Record<keyof Component, any>>): this;
    /** Call a function when this element is clicked */
    SetOnTouch(handler: () => void): this;
    /** Set this elemements Id */
    SetId(id: string): this;
    /** Set this elements type */
    SetType(type: string): this;
    /** Add classes to this element */
    SetClassList(classnames: TemplateStringsArray, ...expressions: any[]): this;
    /** Remove classes from this element */
    RemoveClassList(classnames: TemplateStringsArray, ...expressions: any[]): this;
    /** Add scoped css to this element, as an Emotion like object or a template literal */
    Styled(styles: TemplateStringsArray | Object): this;
    /** Make the element visiblr */
    Show(): this;
    /** Hide the element visually */
    Hide(): this;
    /** Hide the element visually, and take no space in the DOM */
    Gone(): this;
    /** Helper method to process template literals */
    private interpolateTemplate;
}
