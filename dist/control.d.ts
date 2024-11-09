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
     * @returns this
     */
    batch(props: object): this;
    /**
     * Add an event listener to the element.
     * @param {string} event - The event type.
     * @param {Function} handler - The event handler function.
     * @returns {this} - Returns the instance of the class for chaining.
     */
    on(event: string, handler: Function): this;
    css(styles: any): this;
    /**
     * Remove a child element from this element.
     * @param {instanceOf<componentController>} child - The child component to remove.
     * @returns {this} - Returns the instance of the class for chaining.
     */
    destroyChild(child: instanceOf<componentController>): this;
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
