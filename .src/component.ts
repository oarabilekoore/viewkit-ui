import type { rosanaComponent } from "./types.js";
import { $Element } from "./elements.js";

/*** Utility function to validate HTML tags. */
const isValidHtmlTag = (tag: string): boolean => {
    return document.createElement(tag).toString() !== "[object HTMLUnknownElement]";
};

/*** Creates a generic HTML element with the provided tag.*/
const createHtmlElement = (parent: rosanaComponent, tag: string): InstanceType<typeof $Element> => {
    if (!isValidHtmlTag(tag)) {
        throw new Error(`Invalid HTML tag: ${tag}`);
    }
    return new $Element(tag, parent);
};

/**
 * Creates a `<button>` element.
 * @param {rosanaComponent} parent - The parent component to attach the element to.
 * @returns {InstanceType<typeof $Element>} - The created button element.
 */
export const $Button = (parent: rosanaComponent): InstanceType<typeof $Element> => {
    return createHtmlElement(parent, "button");
};

/**
 * Creates an `<img>` element.
 * @param {rosanaComponent} parent - The parent component to attach the element to.
 * @returns {InstanceType<typeof $Element>} - The created image element.
 */
export const $Image = (parent: rosanaComponent): InstanceType<typeof $Element> => {
    return createHtmlElement(parent, "img");
};

/**
 * Creates an `<input>` element.
 * @param {rosanaComponent} parent - The parent component to attach the element to.
 * @returns {InstanceType<typeof $Element>} - The created input element.
 */
export const $Input = (parent: rosanaComponent): InstanceType<typeof $Element> => {
    return createHtmlElement(parent, "input");
};

/**
 * Creates an `<a>` (anchor) element.
 * @param {rosanaComponent} parent - The parent component to attach the element to.
 * @returns {InstanceType<typeof $Element>} - The created anchor element.
 */
export const $A = (parent: rosanaComponent): InstanceType<typeof $Element> => {
    return createHtmlElement(parent, "a");
};

/**
 * Creates a `<form>` element.
 * @param {rosanaComponent} parent - The parent component to attach the element to.
 * @returns {InstanceType<typeof $Element>} - The created form element.
 */
export const $Form = (parent: rosanaComponent): InstanceType<typeof $Element> => {
    return createHtmlElement(parent, "form");
};

/**
 * Creates a `<table>` element.
 * @param {rosanaComponent} parent - The parent component to attach the element to.
 * @returns {InstanceType<typeof $Element>} - The created table element.
 */
export const $Table = (parent: rosanaComponent): InstanceType<typeof $Element> => {
    return createHtmlElement(parent, "table");
};

/**
 * Creates a generic HTML element with a specified tag (default: `<div>`).
 * @param {rosanaComponent} parent - The parent component to attach the element to.
 * @param {string} tag - The HTML tag to create.
 * @returns {InstanceType<typeof $Element>} - The created generic element.
 */
export const $Obj = (parent: rosanaComponent, tag: string = "div"): InstanceType<typeof $Element> => {
    return createHtmlElement(parent, tag);
};
