import type { Component } from "./types.js";
export declare const eventHandlersMap: Map<string, Function>;
export declare class ComponentProperties {
    private ismounted;
    private classes;
    element: HTMLElement;
    constructor();
    /** Sets the element backcolor */
    SetBackColor(color: string): void;
    /** Sets the elements textContent as the provided string */
    SetText(text: string): void;
    /** Sets the elements innerHtml as the provided string */
    Html(html: string): void;
    /** Set the focus of the page to be on that element */
    Focus(): void;
    /** Remove the focus on this element */
    ClearFocus(): void;
    /** Set the aria text of this element, good for accesability */
    SetDescription(text: string): void;
    /** Sets the elements width and height, dimensions specified by you. */
    SetSize(width: number | null, height: number | null, unit: "px" | "%" | "em" | "rem" | null): void;
    /*** Callback invoked when the component is added to the DOM DOM.*/
    SetOnMount(Fn: Function): void;
    /*** Callback invoked when the component is removed from the DOM*/
    SetOnUnMount(Fn: Function): void;
    /*** Batch properties for this component.*/
    Batch(props: Partial<Record<keyof Component, any>>): void;
    /** Add an onclick like event listener to this component.*/
    SetOnTouch(handler: Function): void;
    /** Add scoped css as an object similar to Emotion or as a TemplateLiteral.*/
    Styled(styles: TemplateStringsArray | Record<string, string>): this;
    /** Make this component visible.*/
    Show(): this;
    /** Hide this component.*/
    Hide(): this;
    /** Hide this component as if it was not there.*/
    Gone(): this;
}
