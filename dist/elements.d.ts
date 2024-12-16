import type { Component, propertiesObject } from "./types.js";
import { ComponentProperties } from "./component.js";
export declare class CustomWidget extends ComponentProperties implements Component {
    element: HTMLElement;
    constructor(customTag: string, properties: propertiesObject);
}
/**
 * Add a button to your container
 * @param text
 * @param properties
 * @returns
 */
export declare const Button: (text: string | undefined, properties: propertiesObject) => Component;
/**
 * Adds a text widget to the specified layout. Allows specifying the type of text
 * element via the options parameter.
 * @param {string} text - The text content of the text widget.
 * @returns {HtmlWidget} The created text widget widget.
 */
export declare const Text: (text: string | undefined, properties: propertiesObject) => Component;
/**
 * Add an Image Element
 * @param {string} sourceUrl - The url of the image widget.
 * @returns
 */
export declare const Image: (sourceUrl: string, properties: propertiesObject) => Component;
