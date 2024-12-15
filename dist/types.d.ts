export interface Component {
    ismounted: Signal<boolean>;
    element: HTMLElement;
    eltype: string;
    /** Sets the background color of the element */
    backColor(color: string): this;
    /** Sets the text content of the element */
    text(text: string): this;
    /** Sets the inner HTML of the element */
    html(html: string): this;
    /** Focuses the element */
    focus(): this;
    /** Removes focus from the element */
    clearFocus(): this;
    /** Sets the ARIA label for accessibility */
    setDescription(text: string): this;
    /**
     * Sets the dimensions of the element
     * @param width Width of the element, or `null` to keep unchanged
     * @param height Height of the element, or `null` to keep unchanged
     * @param unit Dimension unit (e.g., px, %, em, rem, or `null` for default)
     */
    size(width: number | null, height: number | null, unit: "px" | "%" | "em" | "rem" | null): this;
    /** Sets a callback to invoke when the component is mounted */
    onMount(callback: () => void): this;
    /** Sets a callback to invoke when the component is unmounted */
    onUnMount(callback: () => void): this;
    /**
     * Batch sets multiple properties for the component
     * @param props A record of properties and their values
     */
    batch(props: Partial<Record<keyof Component, any>>): this;
    /**
     * Sets a click/touch event handler for the element
     * @param handler The event handler function
     */
    set onPress(handler: Function);
    /**
     * Adds scoped CSS styles to the element
     * @param styles Styles as a template literal or a style object
     */
    styled(styles: TemplateStringsArray | Record<string, string>): this;
    /** Makes the component visible */
    show(): this;
    /** Hides the component */
    hide(): this;
    /** Hides the component completely */
    gone(): this;
    /**
     * Adds a child component to the layout
     * @param child The child component to add
     */
    addChild(child: Component): this;
    /**
     * Removes a child component from the layout
     * @param child The child component to remove
     */
    removeChild(child: Component): this;
}
export type propertiesObject = Partial<{
    options: string;
    height: number;
    width: number;
}> & {
    parent: Layout;
};
export interface Layout {
    element: HTMLElement;
    eltype: string;
    /**
     * Adds a child component to the layout
     * @param child The child component to add
     */
    addChild(child: Component): this;
    /**
     * Removes a child component from the layout
     * @param child The child component to remove
     */
    removeChild(child: Component): this;
}
export interface Plugin {
    /** Install the plugin */
    install(): this;
    /** Optional plugin metadata */
    name?: string;
    version?: string;
    author?: string;
}
export interface Route {
    /** Path of the route */
    path: string;
    /** Dynamic import for the component associated with the route */
    component: () => Promise<{
        default: any;
    }>;
    /** Additional options for the route */
    options?: RouteOptions;
    /** Callback invoked when the route is loaded */
    onLoad?: (component: any) => void;
    /** Child routes for nested routing */
    children?: Route[];
    /** Fallback component for error or loading states */
    fallback?: () => Promise<{
        default: any;
    }>;
}
export interface MatchedRoute extends Route {
    /** Route parameters */
    params: Record<string, string>;
    /** Nested matched route */
    nested?: MatchedRoute;
}
export interface RouteOptions {
    /** Any custom route options */
    [key: string]: any;
}
export type Unit = "px" | "%" | "em" | "rem" | null;
export type Subscriber<T> = (value: T) => void;
/**
 * A generic type representing a reactive signal.
 * @template T - The type of the value held by the signal.
 */
export type Signal<T> = {
    /** Sets the signal's value. */
    set value(val: T);
    /** Gets the signal's value. */
    get value(): T;
    /**
     * Subscribes to the signal. The provided function will be called
     * whenever the signal's value changes.
     * @param {Subscriber<T>} fn - The function to call on value changes.
     * @returns {() => void} A function to unsubscribe the given subscriber.
     */
    subscribe(fn: Subscriber<T>): () => void;
};
/**
 * Creates a signal with the specified default value.
 * @template T - The type of the value held by the signal.
 * @param {T} defaultValue - The initial value of the signal.
 * @returns {Signal<T>} The created signal.
 */
