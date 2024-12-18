import type { ContainerWidget, WidgetOptions } from "./types.js";
/**
 * Represents a container for holding and managing child elements in a layout.
 * @class
 */
declare class Container implements ContainerWidget {
    element: HTMLDivElement;
    options: string;
    constructor(type: string, childAlignmentProperties: string, properties?: Partial<WidgetOptions>);
    /*** Add a child component to this component.*/
    AddChild<T extends HTMLElement = HTMLElement>(child: T): this;
    /** Clear the layout and remove all children */
    Clear(): this;
    /*** Remove a child component from the layout */
    RemoveChild<T extends HTMLElement = HTMLElement>(child: T): this;
}
export default Container;
