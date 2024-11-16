export declare class componentController {
    element: any;
    elementClasses: Array<string>;
    constructor();
    /**
     * Add a child element to this element.
     */
    addChild(child: componentController): this | undefined;
    /**
     * Set the alignment of child elements in the control
     */
    alignment(options: string): this;
    /**
     * batch dom api setters and getters effeciently
     */
    batch(props: object): this;
    /**
     * Add an onclick event listener to the element.
     */
    set onclick(handler: Function);
    /**
     * Add css scoped styles to your element.
     */
    css(styles: TemplateStringsArray | object): this;
    /**
     * Remove a child element from this element.
     */
    destroyChild(child: componentController): this;
    /**
     * Sets the visibility of the element.
     */
    show(): this;
    /**
     * Hide the element
     */
    hide(): this;
    /**
     * Sets the display and visibility of the element.
     */
    gone(): this;
}
