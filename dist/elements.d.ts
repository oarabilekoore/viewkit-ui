import { ComponentProperties } from "./component.js";
import type { Layout } from "./types.js";
/**
 * Represents an HTML widget, inheriting properties from ComponentProperties.
 * Automatically creates an HTML element of the specified tag, assigns it a unique ID,
 * and attaches it to a parent layout if provided.
 */
export declare class HtmlWidget extends ComponentProperties {
    /**
     * @param {Layout} parent - The parent layout to attach the widget to.
     * @param {string} tag - The HTML tag to create for the widget.
     */
    constructor(parent: Layout, tag: string);
}
/**
 * Adds an HTML button to the specified layout.
 *
 * @param {Layout} parent - The parent layout to attach the button to.
 * @param {string} text - The text content of the button.
 * @param {number} width - The width of the button.
 * @param {number} height - The height of the button.
 * @returns {HtmlWidget} The created button widget.
 */
export declare const Button: (parent: Layout, text: string, width: number, height: number) => HtmlWidget;
/**
 * Adds a text view to the specified layout. Allows specifying the type of text
 * element via the options parameter.
 *
 * @param {Layout} parent - The parent layout to attach the text view to.
 * @param {string} text - The text content of the text view.
 * @param {number} width - The width of the text view.
 * @param {number} height - The height of the text view.
 * @param {string} [options] - A comma-separated string specifying the text element tag (e.g., "p,h1,h6").
 * Defaults to "span" if no valid option is provided.
 * @returns {HtmlWidget} The created text view widget.
 */
export declare const Text: (parent: Layout, text: string, width: number, height: number, options: string) => HtmlWidget;
