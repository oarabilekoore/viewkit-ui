import type { Layout, propertiesObject } from "./types.js";
import { ComponentProperties } from "./component.js";
export declare const optionsApi: (element: HTMLElement, options: string) => void;
/**
 * This class extends ComponentProperties class and returns a Layout view,
 * In which takes in the type and sets correct styling this is also done
 * To the childAlignmentProperties.
 */
declare class Container extends ComponentProperties implements Layout {
    eltype: string;
    options: string;
    constructor(type: string, childAlignmentProperties: string, properties?: Partial<propertiesObject>);
}
export default Container;
