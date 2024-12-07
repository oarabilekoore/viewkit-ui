import { ComponentProperties } from "./component.js";
import type { Component, Layout } from "./types.js";
/**
 * Represents an HTML widget, inheriting properties from ComponentProperties.
 * Automatically creates an HTML element of the specified tag, assigns it a unique ID,
 * and attaches it to a parent layout if provided.
 */
export declare class HtmlWidget extends ComponentProperties implements Component {
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
export declare const Button: (parent: Layout, text?: string, width?: number, height?: number) => Component;
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
export declare const Text: (parent: Layout, text?: string, width?: number, height?: number, options?: string) => Component;
/**
 * Add an Image Element
 * @param {Layout} parent - The parent layout to attach the image view to.
 * @param {string} text - The text content of the image view.
 * @param {number} width - The width of the image view.
 * @param {number} height - The height of the image view.
 * @returns
 */
export declare const Image: (parent: Layout, sourceUrl: string, width?: number, height?: number, options?: string) => Component;
/**
 * Adds a Div element to the specified layout.
 *
 * @param {Layout} parent - The parent layout to attach the Div element to.
 * @param {number} width - The width of the Div element.
 * @param {number} height - The height of the Div element.
 * @param {string} [options] - Optional properties for customization.
 * @returns {HtmlWidget} The created Div element.
 */
export declare const Div: (parent: Layout, width?: number, height?: number) => Component;
/**
 * Adds an Input element to the specified layout.
 *
 * @param {Layout} parent - The parent layout to attach the Input element to.
 * @param {string} type - The type of input (e.g., "text", "number").
 * @param {number} width - The width of the Input element.
 * @param {number} height - The height of the Input element.
 * @returns {HtmlWidget} The created Input element.
 */
export declare const Input: (parent: Layout, type?: string, width?: number, height?: number) => Component;
/**
 * Adds a CheckBox element to the specified layout.
 *
 * @param {Layout} parent - The parent layout to attach the CheckBox element to.
 * @returns {HtmlWidget} The created CheckBox element.
 */
export declare const CheckBox: (parent: Layout) => Component;
/**
 * Adds a ProgressBar element to the specified layout.
 *
 * @param {Layout} parent - The parent layout to attach the ProgressBar element to.
 * @param {number} value - The initial value of the ProgressBar (0-100).
 * @returns {HtmlWidget} The created ProgressBar element.
 */
export declare const ProgressBar: (parent: Layout, value?: number) => Component;
/**
 * Adds an Iframe element to the specified layout.
 *
 * @param {Layout} parent - The parent layout to attach the Iframe element to.
 * @param {string} sourceUrl - The source URL for the Iframe.
 * @param {number} width - The width of the Iframe element.
 * @param {number} height - The height of the Iframe element.
 * @returns {HtmlWidget} The created Iframe element.
 */
export declare const Iframe: (parent: Layout, sourceUrl: string, width?: number, height?: number) => Component;
/**
 * Adds a Canvas element to the specified layout.
 *
 * @param {Layout} parent - The parent layout to attach the Canvas element to.
 * @param {number} width - The width of the Canvas element.
 * @param {number} height - The height of the Canvas element.
 * @returns {HtmlWidget} The created Canvas element.
 */
export declare const Canvas: (parent: Layout, width?: number, height?: number) => Component;
/**
 * Adds a List element to the specified layout.
 *
 * @param {Layout} parent - The parent layout to attach the List element to.
 * @param {string[]} items - The items to include in the List.
 * @param {boolean} ordered - Whether the List should be ordered (ol) or unordered (ul).
 * @returns {HtmlWidget} The created List element.
 */
export declare const List: (parent: Layout, items?: string[], ordered?: boolean) => Component;
