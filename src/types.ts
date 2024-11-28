export interface Component {
    element: HTMLElement;

    /** Sets the background color of the element */
    SetBackColor(color: string): void;

    /** Sets the text content of the element */
    SetText(text: string): void;

    /** Sets the inner HTML of the element */
    Html(html: string): void;

    /** Focuses the element */
    Focus(): void;

    /** Removes focus from the element */
    ClearFocus(): void;

    /** Sets the ARIA label for accessibility */
    SetDescription(text: string): void;

    /**
     * Sets the dimensions of the element
     * @param width Width of the element
     * @param height Height of the element
     * @param unit Dimension unit (e.g., px, %, etc.)
     */
    SetSize(width: number | null, height: number | null, unit: "px" | "%" | "em" | "rem" | null): void;

    /** Sets a callback to invoke when the component is mounted */
    SetOnMount(callback: () => void): void;

    /** Sets a callback to invoke when the component is unmounted */
    SetOnUnMount(callback: () => void): void;

    /**
     * Batch sets multiple properties for the component
     * @param props A record of properties to set
     */
    Batch(props: Partial<Record<keyof Component, any>>): void;

    /**
     * Sets a click/touch event handler for the element
     * @param handler The event handler function
     */
    SetOnTouch(handler: () => void): void;

    /**
     * Adds scoped CSS styles to the element
     * @param styles Styles as an object or template literal
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
    AddChild(child: Component): this;
    DestroyChild(child: Component): this;
}

export interface Plugin {
    install(): this;
}

export interface Route {
    path: string;
    component: () => Promise<{ default: any }>;
    options?: RouteOptions;
    onLoad?: (component: any) => void;
    children?: Route[];
}

export interface MatchedRoute extends Route {
    params: Record<string, string>;
    nested?: MatchedRoute;
}

export interface RouteOptions {
    [key: string]: any;
}
