/**
 * Extends HTMLElement to include an `onPress` setter.
 * The setter registers a click handler for the element by associating
 * it with its id in the `onPressEventHanlerMap`.
 */
declare global {
    interface GlobalEventHanlders {
        set onpress(handler: Function);
    }
    interface HTMLElement {
        set onpress(handler: Function);
    }
}
export type WidgetOptions = Partial<{
    style: string;
}> & {
    parent: ContainerWidget;
};
export type AnchorOptions = Partial<{
    style: string;
}> & {
    href: string;
    parent: ContainerWidget;
};
export type LinkOptions = Partial<{
    style: string;
    behaveLikeLink: boolean;
    query: Record<string, string>;
}> & {
    to: string;
    parent: ContainerWidget;
};
export interface ContainerWidget {
    element: HTMLDivElement;
    options: string;
    /**
     * Adds a child component to the layout
     * @param child The child component to add
     */
    AddChild<T extends HTMLElement = HTMLElement>(child: T): this;
    /** Clear the layout and remove all children */
    Clear(): this;
    /**
     * Removes a child component from the layout
     * @param child The child component to remove
     */
    RemoveChild<T extends HTMLElement = HTMLElement>(child: T): this;
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
