import type { Component, Layout, propertiesObject } from "./types.js";
import { ComponentProperties } from "./component.js";
import { generateId } from "./helpers.js";

/**
 * Represents an HTML widget, inheriting properties from ComponentProperties.
 * Automatically creates an HTML element of the specified tag, assigns it a unique ID,
 * and attaches it to a parent layout if provided.
 */
class HtmlWidget extends ComponentProperties implements Component {
    /**
     * @param {Layout} parent - The parent layout to attach the widget to.
     * @param {string} tag - The HTML tag to create for the widget.
     */
    constructor(parent: Layout, tag: string) {
        super();

        this.element = document.createElement(tag);
        this.id(generateId());
        parent?.addChild(this);
    }
}

class ImageWidget extends ComponentProperties implements Component {
    element: HTMLImageElement;
    constructor(sourceURL: string, properties: propertiesObject) {
        super();
        const height: number | undefined = properties?.height;
        const width: number | undefined = properties?.width;
        const parent = properties.parent;

        this.element = document.createElement("img");
        this.element.src = sourceURL;
        this.size(width, height);
        this.id(generateId());

        parent.addChild(this);
    }
}

/**
 * Add a button to your container
 * @param text
 * @param properties
 * @returns
 */
export const Button = function (text: string = "", properties: propertiesObject): Component {
    const height: number | undefined = properties?.height;
    const width: number | undefined = properties?.width;
    const parent = properties.parent;

    return new HtmlWidget(parent, "button").text(text).size(width, height, null);
};

/**
 * Adds a text view to the specified layout. Allows specifying the type of text
 * element via the options parameter.
 * @param {string} text - The text content of the text view.
 * @returns {HtmlWidget} The created text view widget.
 */
export const Text = function (text: string = "", properties: propertiesObject): Component {
    const options = properties.options;
    const height = properties.height;
    const parent = properties.parent;
    const width = properties.width;
    return new HtmlWidget(parent, options?.split(",")[0] || "span").text(text).size(width, height, null);
};

/**
 * Add an Image Element
 * @param {string} sourceUrl - The url of the image view.
 * @returns
 */
export const Image = function (sourceUrl: string, properties: propertiesObject): Component {
    return new ImageWidget(sourceUrl, properties);
};
