export type UINode = Partial<{
    textContent: string;
    parent: UINode;
    styles: string;
    type: string;
    options: string;
    children: UINode[];
    attributes: Record<any, any>;
    observe: Function;
}> & {
    tagname: string;
    id: string;
};

export type Widget = Partial<{
    children: Widget[];
}>;
export type WidgetProps = Partial<UINode>;

export interface Renderer {
    root: any;
    clear(): void;
    update(node: UINode, prop: keyof UINode, value: any): void;
}

declare global {
    interface Window {
        RENDERER: Renderer;
    }
}

export interface Route {
    /** Path of the route */
    path: string;

    /** Dynamic import for the component associated with the route */
    component: () => Promise<{ default: any }>;

    /** Additional options for the route */
    options?: RouteOptions;

    /** Callback invoked when the route is loaded */
    onLoad?: (component: any) => void;

    /** Child routes for nested routing */
    children?: Route[];

    /** Fallback component for error or loading states */
    fallback?: () => Promise<{ default: any }>;
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
