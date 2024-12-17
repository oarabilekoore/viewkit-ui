import type { Layout, Widget, WidgetOptions } from "./types.js";
import { WidgetProperties } from "./component.js";
export declare const optionsApi: (element: HTMLElement, options: string) => void;
/**
 * This class extends WidgetProperties class and returns a Layout view,
 * In which takes in the type and sets correct styling this is also done
 * To the childAlignmentProperties.
 */
declare class Container extends WidgetProperties implements Layout {
    type: string;
    options: string;
    constructor(type: string, childAlignmentProperties: string, properties?: Partial<WidgetOptions>);
    /*** Add a child component to this component.*/
    AddChild(child: Widget): this;
    /** Clear the layout and remove all children */
    Clear(): this;
    /*** Remove a child component from the layout */
    RemoveChild(child: Widget): this;
}
export default Container;
