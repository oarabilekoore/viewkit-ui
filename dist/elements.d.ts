import type { Component, propertiesObject } from "./types.js";
/**
 * Add a button to your container
 * @param text
 * @param properties
 * @returns
 */
export declare const Button: (text: string | undefined, properties: propertiesObject) => Component;
/**
 * Adds a text view to the specified layout. Allows specifying the type of text
 * element via the options parameter.
 * @param {string} text - The text content of the text view.
 * @returns {HtmlWidget} The created text view widget.
 */
export declare const Text: (text: string | undefined, properties: propertiesObject) => Component;
/**
 * Add an Image Element
 * @param {string} sourceUrl - The url of the image view.
 * @returns
 */
export declare const Image: (sourceUrl: string, properties: propertiesObject) => Component;
