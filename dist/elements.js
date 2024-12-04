import { ComponentProperties } from "./component.js";
import { generateId } from "./helpers.js";
/**
 * Represents an HTML widget, inheriting properties from ComponentProperties.
 * Automatically creates an HTML element of the specified tag, assigns it a unique ID,
 * and attaches it to a parent layout if provided.
 */
export class HtmlWidget extends ComponentProperties {
    /**
     * @param {Layout} parent - The parent layout to attach the widget to.
     * @param {string} tag - The HTML tag to create for the widget.
     */
    constructor(parent, tag) {
        super();
        this.element = document.createElement(tag);
        this.SetId(generateId());
        parent?.AddChild(this);
    }
}
class ImageWidget extends ComponentProperties {
    element;
    constructor(parent, sourceUrl, width = -1, height = -1, options) {
        super();
        this.element = document.createElement("img");
        this.element.src = sourceUrl;
        this.SetId(generateId());
        this.SetSize(width, height);
        parent?.AddChild(this);
    }
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
export const Button = function (parent, text = "", width = 0.5, height = -1) {
    return new HtmlWidget(parent, "button").SetText(text).SetSize(width, height, null);
};
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
export const Text = function (parent, text = "", width = 0.5, height = -1, options) {
    return new HtmlWidget(parent, options?.split(",")[0] || "span")
        .SetText(text)
        .SetSize(width, height, null);
};
export const Image = function (parent, sourceUrl, width = -1, height = -1, options) {
    return new ImageWidget(parent, sourceUrl, width, height, options);
};
