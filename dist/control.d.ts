export interface rosanaComponent {
    ismounted: Boolean;
    element: HTMLElement;
    elementClasses: string[];
    addChild(child: rosanaComponent): this;
    alignment(options: string): this;
    batch(props: Record<string, unknown>): this;
    css(styles: TemplateStringsArray | Record<string, string>): this;
    destroyChild(child: rosanaComponent): this;
    show(): this;
    hide(): this;
    gone(): this;
}
export declare class componentController implements rosanaComponent {
    ismounted: Boolean;
    element: HTMLElement;
    elementClasses: string[];
    constructor();
    /**
     * Add a child component to this component.
     */
    addChild(child: rosanaComponent): this;
    /**
     * Callback invoked when the component is added to the DOM.
     */
    set onMount(Fn: Function);
    /**
     * Callback invoked when the component is removed from the DOM.
     */
    set onUnMount(Fn: Function);
    /**
     * Set the alignment of child elements in this component.
     */
    alignment(options: string): this;
    /**
     * Batch DOM API property setters for this component.
     */
    batch(props: Record<string, unknown>): this;
    /**
     * Add an onclick event listener to this component.
     */
    set onclick(handler: Function);
    /**
     * Add CSS scoped styles to this component.
     */
    css(styles: TemplateStringsArray | Record<string, string>): this;
    /**
     * Remove a child component from this component.
     */
    destroyChild(child: rosanaComponent): this;
    /**
     * Remove All Children In That Layout
     */
    clear(): this;
    /**
     * Make this component visible.
     */
    show(): this;
    /**
     * Hide this component.
     */
    hide(): this;
    /**
     * Remove this component from the visual flow and hide it.
     */
    gone(): this;
}
