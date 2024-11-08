export const $uiControl: {
    new (): {
        /** @type {HTMLElement | null} */
        element: HTMLElement | null;
        /** @type {Array<string>} */
        elementClasses: Array<string>;
        /** @type {Array<[string, Function]>} */
        eventListeners: Array<[string, Function]>;
        /**
         * Add a child element to this element.
         * @param {$uiControl} child - The child component to add.
         * @returns {this} - Returns the instance of the class for chaining.
         */
        addChild(child: any): any;
        /**
         * Set the alignment of child elements in the control.
         * @param {string} options - Alignment options.
         */
        alignment: string;
        /**
         * batch dom api setters and getters effeciently
         * @param {object} props
         * @returns this
         */
        batch(props: object): any;
        /**
         * Add an event listener to the element.
         * @param {string} event - The event type.
         * @param {Function} handler - The event handler function.
         * @returns {this} - Returns the instance of the class for chaining.
         */
        on(event: string, handler: Function): any;
        css(styles: any): any;
        /**
         * Remove a child element from this element.
         * @param {instanceOf<$uiControl>} child - The child component to remove.
         * @returns {this} - Returns the instance of the class for chaining.
         */
        destroyChild(child: instanceOf<any>): any;
        /**
         * Sets the visibility of the element.
         * @param {boolean} bool - Visibility state.
         */
        show(): void;
        /**
         * Hide the element
         */
        hide(): void;
        /**
         * Sets the display and visibility of the element.
         * @param {boolean} bool - Visibility and space control state.
         */
        gone: boolean;
    };
};
export function $sysTheme(): "dark" | "light";
export function $on(event: HTMLEventListener, handlerFn: Function): void;
export function $layout(type?: string, options?: string): HTMLDivElement;
export function $component(tag: HTMLElementTagNameMap, parent: InstanceType<{
    /** @type {HTMLElement | null} */
    element: HTMLElement | null;
    /** @type {Array<string>} */
    elementClasses: Array<string>;
    /** @type {Array<[string, Function]>} */
    eventListeners: Array<[string, Function]>;
    /**
     * Add a child element to this element.
     * @param {$uiControl} child - The child component to add.
     * @returns {this} - Returns the instance of the class for chaining.
     */
    addChild(child: any): any;
    /**
     * Set the alignment of child elements in the control.
     * @param {string} options - Alignment options.
     */
    alignment: string;
    /**
     * batch dom api setters and getters effeciently
     * @param {object} props
     * @returns this
     */
    batch(props: object): any;
    /**
     * Add an event listener to the element.
     * @param {string} event - The event type.
     * @param {Function} handler - The event handler function.
     * @returns {this} - Returns the instance of the class for chaining.
     */
    on(event: string, handler: Function): any;
    css(styles: any): any;
    /**
     * Remove a child element from this element.
     * @param {instanceOf<$uiControl>} child - The child component to remove.
     * @returns {this} - Returns the instance of the class for chaining.
     */
    destroyChild(child: instanceOf<any>): any;
    /**
     * Sets the visibility of the element.
     * @param {boolean} bool - Visibility state.
     */
    show(): void;
    /**
     * Hide the element
     */
    hide(): void;
    /**
     * Sets the display and visibility of the element.
     * @param {boolean} bool - Visibility and space control state.
     */
    gone: boolean;
}>, props?: Object): {
    /** @type {HTMLElement | null} */
    element: HTMLElement | null;
    /** @type {Array<string>} */
    elementClasses: Array<string>;
    /** @type {Array<[string, Function]>} */
    eventListeners: Array<[string, Function]>;
    /**
     * Add a child element to this element.
     * @param {$uiControl} child - The child component to add.
     * @returns {this} - Returns the instance of the class for chaining.
     */
    addChild(child: {
        /** @type {HTMLElement | null} */
        element: HTMLElement | null;
        /** @type {Array<string>} */
        elementClasses: Array<string>;
        /** @type {Array<[string, Function]>} */
        eventListeners: Array<[string, Function]>;
        addChild(child: any): any;
        /**
         * Set the alignment of child elements in the control.
         * @param {string} options - Alignment options.
         */
        alignment: string;
        /**
         * batch dom api setters and getters effeciently
         * @param {object} props
         * @returns this
         */
        batch(props: object): any;
        /**
         * Add an event listener to the element.
         * @param {string} event - The event type.
         * @param {Function} handler - The event handler function.
         * @returns {this} - Returns the instance of the class for chaining.
         */
        on(event: string, handler: Function): any;
        css(styles: any): any;
        /**
         * Remove a child element from this element.
         * @param {instanceOf<$uiControl>} child - The child component to remove.
         * @returns {this} - Returns the instance of the class for chaining.
         */
        destroyChild(child: instanceOf<any>): any;
        /**
         * Sets the visibility of the element.
         * @param {boolean} bool - Visibility state.
         */
        show(): void;
        /**
         * Hide the element
         */
        hide(): void;
        /**
         * Sets the display and visibility of the element.
         * @param {boolean} bool - Visibility and space control state.
         */
        gone: boolean;
    }): any;
    /**
     * Set the alignment of child elements in the control.
     * @param {string} options - Alignment options.
     */
    alignment: string;
    /**
     * batch dom api setters and getters effeciently
     * @param {object} props
     * @returns this
     */
    batch(props: object): any;
    /**
     * Add an event listener to the element.
     * @param {string} event - The event type.
     * @param {Function} handler - The event handler function.
     * @returns {this} - Returns the instance of the class for chaining.
     */
    on(event: string, handler: Function): any;
    css(styles: any): any;
    /**
     * Remove a child element from this element.
     * @param {instanceOf<$uiControl>} child - The child component to remove.
     * @returns {this} - Returns the instance of the class for chaining.
     */
    destroyChild(child: instanceOf<{
        /** @type {HTMLElement | null} */
        element: HTMLElement | null;
        /** @type {Array<string>} */
        elementClasses: Array<string>;
        /** @type {Array<[string, Function]>} */
        eventListeners: Array<[string, Function]>;
        /**
         * Add a child element to this element.
         * @param {$uiControl} child - The child component to add.
         * @returns {this} - Returns the instance of the class for chaining.
         */
        addChild(child: any): any;
        /**
         * Set the alignment of child elements in the control.
         * @param {string} options - Alignment options.
         */
        alignment: string;
        /**
         * batch dom api setters and getters effeciently
         * @param {object} props
         * @returns this
         */
        batch(props: object): any;
        /**
         * Add an event listener to the element.
         * @param {string} event - The event type.
         * @param {Function} handler - The event handler function.
         * @returns {this} - Returns the instance of the class for chaining.
         */
        on(event: string, handler: Function): any;
        css(styles: any): any;
        /**
         * Remove a child element from this element.
         * @param {instanceOf<$uiControl>} child - The child component to remove.
         * @returns {this} - Returns the instance of the class for chaining.
         */
        destroyChild(child: instanceOf<any>): any;
        /**
         * Sets the visibility of the element.
         * @param {boolean} bool - Visibility state.
         */
        show(): void;
        /**
         * Hide the element
         */
        hide(): void;
        /**
         * Sets the display and visibility of the element.
         * @param {boolean} bool - Visibility and space control state.
         */
        gone: boolean;
    }>): any;
    /**
     * Sets the visibility of the element.
     * @param {boolean} bool - Visibility state.
     */
    show(): void;
    /**
     * Hide the element
     */
    hide(): void;
    /**
     * Sets the display and visibility of the element.
     * @param {boolean} bool - Visibility and space control state.
     */
    gone: boolean;
};
export function $createApp(mainComponent: Function): {
    _rootComponent: Function;
    _plugins: never[];
    /**
     * An Elements Id
     * The provided string is queried so that the
     * main component is appended to it.
     * @param {string} selector
     * @returns this
     */
    mount: (selector: string) => any | undefined;
    /**
     *
     * @param {Function} plugin
     * @returns this
     */
    use(plugin: Function): any;
};
