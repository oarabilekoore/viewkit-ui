import { ComponentProperties } from "./component.js";
import type { Layout } from "./types.js";
export declare const optionsApi: (element: HTMLElement, options: string) => void;
/**
 * This class extends ComponentProperties class and returns a Layout view,
 * In which takes in the type and sets correct styling this is also done
 * To the childAlignmentProperties.
 */
declare class PageLayout extends ComponentProperties implements Layout {
    type: string;
    options: string;
    constructor(type: string, childAlignmentProperties: string);
}
export default PageLayout;
