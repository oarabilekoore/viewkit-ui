import type { Component } from "./types.js";
export declare const eventHandlersMap: Map<string, Function>;
export declare class ComponentProperties implements Component {
    private ismounted;
    private classes;
    element: HTMLElement;
    type: string;
    constructor();
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
    SetSize(width: number | null, height: number | null, unit: "px" | "%" | "em" | "rem" | null): this;
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
    Styled(styles: TemplateStringsArray | Record<string, string>): this;
    /** Make the element visiblr */
    Show(): this;
    /** Hide the element visually */
    Hide(): this;
    /** Hide the element visually, and take no space in the DOM */
    Gone(): this;
    /** Helper method to process template literals */
    private interpolateTemplate;
}
