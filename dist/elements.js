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
/**
 * Add an Image Element
 * @param {Layout} parent - The parent layout to attach the image view to.
 * @param {string} text - The text content of the image view.
 * @param {number} width - The width of the image view.
 * @param {number} height - The height of the image view.
 * @returns
 */
export const Image = function (parent, sourceUrl, width = -1, height = -1, options) {
    return new ImageWidget(parent, sourceUrl, width, height, options);
};
/**
 * Adds a Div element to the specified layout.
 *
 * @param {Layout} parent - The parent layout to attach the Div element to.
 * @param {number} width - The width of the Div element.
 * @param {number} height - The height of the Div element.
 * @param {string} [options] - Optional properties for customization.
 * @returns {HtmlWidget} The created Div element.
 */
export const Div = function (parent, width = 1, height = -1) {
    return new HtmlWidget(parent, "div").SetSize(width, height);
};
/**
 * Adds an Input element to the specified layout.
 *
 * @param {Layout} parent - The parent layout to attach the Input element to.
 * @param {string} type - The type of input (e.g., "text", "number").
 * @param {number} width - The width of the Input element.
 * @param {number} height - The height of the Input element.
 * @returns {HtmlWidget} The created Input element.
 */
export const Input = function (parent, type = "text", width = 1, height = -1) {
    const input = new HtmlWidget(parent, "input");
    input.element.setAttribute("type", type);
    return input.SetSize(width, height, null);
};
/**
 * Adds a CheckBox element to the specified layout.
 *
 * @param {Layout} parent - The parent layout to attach the CheckBox element to.
 * @returns {HtmlWidget} The created CheckBox element.
 */
export const CheckBox = function (parent) {
    return Input(parent, "checkbox");
};
/**
 * Adds a ProgressBar element to the specified layout.
 *
 * @param {Layout} parent - The parent layout to attach the ProgressBar element to.
 * @param {number} value - The initial value of the ProgressBar (0-100).
 * @returns {HtmlWidget} The created ProgressBar element.
 */
export const ProgressBar = function (parent, value = 0) {
    const progress = new HtmlWidget(parent, "progress");
    progress.element.setAttribute("value", value.toString());
    return progress;
};
/**
 * Adds an Iframe element to the specified layout.
 *
 * @param {Layout} parent - The parent layout to attach the Iframe element to.
 * @param {string} sourceUrl - The source URL for the Iframe.
 * @param {number} width - The width of the Iframe element.
 * @param {number} height - The height of the Iframe element.
 * @returns {HtmlWidget} The created Iframe element.
 */
export const Iframe = function (parent, sourceUrl, width = 1, height = -1) {
    const iframe = new HtmlWidget(parent, "iframe");
    iframe.element.setAttribute("src", sourceUrl);
    return iframe.SetSize(width, height, null);
};
/**
 * Adds a Canvas element to the specified layout.
 *
 * @param {Layout} parent - The parent layout to attach the Canvas element to.
 * @param {number} width - The width of the Canvas element.
 * @param {number} height - The height of the Canvas element.
 * @returns {HtmlWidget} The created Canvas element.
 */
export const Canvas = function (parent, width = 1, height = 1) {
    return new HtmlWidget(parent, "canvas").SetSize(width, height, null);
};
/**
 * Adds a List element to the specified layout.
 *
 * @param {Layout} parent - The parent layout to attach the List element to.
 * @param {string[]} items - The items to include in the List.
 * @param {boolean} ordered - Whether the List should be ordered (ol) or unordered (ul).
 * @returns {HtmlWidget} The created List element.
 */
export const List = function (parent, items = [], ordered = false) {
    const tag = ordered ? "ol" : "ul";
    const list = new HtmlWidget(parent, tag);
    items.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        list.element.appendChild(li);
    });
    return list;
};
