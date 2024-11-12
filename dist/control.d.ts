export class componentController {
    /** @type {HTMLElement | null} */
    element: HTMLElement | null;
    /** @type {Array<string>} */
    elementClasses: Array<string>;
    /** @type {Array<[string, Function]>} */
    eventListeners: Array<[string, Function]>;
    /**
     * Add a child element to this element.
     * @param {componentController} child - The child component to add.
     * @returns {this} - Returns the instance of the class for chaining.
     */
    addChild(child: componentController): this;
    /**
     * Set the alignment of child elements in the control.
     * @param {string} options - Alignment options.
     */
    alignment(options: string): void;
    /**
     * batch dom api setters and getters effeciently
     * @param {object} props
     */
    batch(props: object): void;
    /**
     * Add an onclick event listener to the element.
     * @param {Function} handler - The event handler function.
     */
    set onclick(handler: Function);
    /**
     * Add css scoped styles to your element.
     * @param {TemplateStringsArray | object} styles
     * @returns {this}
     */
    css(styles: TemplateStringsArray | object): this;
    /**
     * Remove a child element from this element.
     * @param {componentController} child - The child component to remove.
     * @returns {this} - Returns the instance of the class for chaining.
     */
    destroyChild(child: componentController): this;
    /**
     * Sets the visibility of the element.
     */
    show(): void;
    /**
     * Hide the element
     */
    hide(): void;
    /**
     * Sets the display and visibility of the element.
     */
    gone(): void;
}
