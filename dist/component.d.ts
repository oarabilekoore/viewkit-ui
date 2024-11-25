export declare const eventHandlersMap: Map<string, Function>;
export declare class ComponentProperties {
    ismounted: Boolean;
    element: HTMLElement;
    elementClasses: string[];
    constructor();
    /**Sets the element backcolor */
    SetBackColor(color: any): void;
    /**Sets the elements textContent as the provided string */
    SetText(text: string): void;
    /**Sets the elements innerHtml as the provided string */
    Html(html: string): void;
    /**Set the focus of the page to be on that element */
    Focus(): void;
    /**Remove the focus on this element */
    ClearFocus(): void;
    /**Set the aria text of this element, good for accesability */
    SetDescription(text: string): void;
    /**Sets the elements width and height, dimensions specified by you. */
    SetSize(w: number | null, h: number | null, dimension: string): void;
    /*** Callback invoked when the component is added to the DOM/Android DOM.*/
    SetOnMount(Fn: Function): void;
    /*** Callback invoked when the component is removed from the DOM or Android DOM*/
    SetOnUnMount(Fn: Function): void;
    /**
     * Set the alignment of child elements in this component.
     */
    alignment(options: string): this;
    /*** Batch properties for this component.*/
    Batch(props: Record<string, unknown>): this;
    /**
     * Add an onclick event listener to this component.
     */
    SetOnTouch(handler: Function): void;
    /**
     * Add CSS scoped styles to this component.
     */
    private css;
    /**
     * Make this component visible.
     */
    Show(): this;
    /*** Hide this component.*/
    Hide(): this;
    /*** Remove this component from the visual flow and hide it.*/
    Gone(): this;
}
