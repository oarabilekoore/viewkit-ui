export interface Component {
    element: HTMLElement;
    type: string;

    /** Sets the background color of the element */
    SetBackColor(color: string): this;

    /** Sets the text content of the element */
    SetText(text: string): this;

    /** Sets the inner HTML of the element */
    SetHtml(html: string): this;

    /** Focuses the element */
    Focus(): this;

    /** Removes focus from the element */
    ClearFocus(): this;

    /** Sets the ARIA label for accessibility */
    SetDescription(text: string): this;

    /**
     * Sets the dimensions of the element
     * @param width Width of the element, or `null` to keep unchanged
     * @param height Height of the element, or `null` to keep unchanged
     * @param unit Dimension unit (e.g., px, %, em, rem, or `null` for default)
     */
    SetSize(width: number | null, height: number | null, unit: "px" | "%" | "em" | "rem" | null): this;

    /** Sets a callback to invoke when the component is mounted */
    SetOnMount(callback: () => void): this;

    /** Sets a callback to invoke when the component is unmounted */
    SetOnUnMount(callback: () => void): this;

    /**
     * Batch sets multiple properties for the component
     * @param props A record of properties and their values
     */
    Batch(props: Partial<Record<keyof Component, any>>): this;

    /**
     * Sets a click/touch event handler for the element
     * @param handler The event handler function
     */
    SetOnTouch(handler: Function): this;

    /**
     * Adds scoped CSS styles to the element
     * @param styles Styles as a template literal or a style object
     */
    Styled(styles: TemplateStringsArray | Record<string, string>): this;

    /** Makes the component visible */
    Show(): this;

    /** Hides the component */
    Hide(): this;

    /** Hides the component completely */
    Gone(): this;
}

export interface LayoutComponent {
    element: HTMLElement;
    type: string;

    /**
     * Adds a child component to the layout
     * @param child The child component to add
     */
    AddChild(child: Component): this;

    /**
     * Removes a child component from the layout
     * @param child The child component to remove
     */
    DestroyChild(child: Component): this;
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
