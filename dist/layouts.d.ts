import type { Component } from "./types.js";
import { ComponentProperties } from "./component.js";
export declare const optionsApi: (element: HTMLElement, options: string) => void;
declare class Layout extends ComponentProperties {
    type: string;
    options: string;
    constructor(type: string, childAlignmentProperties: string);
    /*** Add a child component to this component.*/
    AddChild(child: Component): this;
    /*** Remove a child component from the layout */
    DestroyChild(child: Component): this;
}
export default Layout;
