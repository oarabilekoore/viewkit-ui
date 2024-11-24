import type { rosanaComponent } from "./types.js";
import { $Element } from "./elements.js";
/**
 * Creates a `<button>` element.
 * @param {rosanaComponent} parent - The parent component to attach the element to.
 * @returns {InstanceType<typeof $Element>} - The created button element.
 */
export declare const $Button: (parent: rosanaComponent) => InstanceType<typeof $Element>;
/**
 * Creates an `<img>` element.
 * @param {rosanaComponent} parent - The parent component to attach the element to.
 * @returns {InstanceType<typeof $Element>} - The created image element.
 */
export declare const $Image: (parent: rosanaComponent) => InstanceType<typeof $Element>;
export declare const $Text: (parent: rosanaComponent) => InstanceType<typeof $Element>;
/**
 * Creates an `<input>` element.
 * @param {rosanaComponent} parent - The parent component to attach the element to.
 * @returns {InstanceType<typeof $Element>} - The created input element.
 */
export declare const $Input: (parent: rosanaComponent) => InstanceType<typeof $Element>;
/**
 * Creates an `<a>` (anchor) element.
 * @param {rosanaComponent} parent - The parent component to attach the element to.
 * @returns {InstanceType<typeof $Element>} - The created anchor element.
 */
export declare const $A: (parent: rosanaComponent) => InstanceType<typeof $Element>;
/**
 * Creates a `<form>` element.
 * @param {rosanaComponent} parent - The parent component to attach the element to.
 * @returns {InstanceType<typeof $Element>} - The created form element.
 */
export declare const $Form: (parent: rosanaComponent) => InstanceType<typeof $Element>;
/**
 * Creates a `<table>` element.
 * @param {rosanaComponent} parent - The parent component to attach the element to.
 * @returns {InstanceType<typeof $Element>} - The created table element.
 */
export declare const $Table: (parent: rosanaComponent) => InstanceType<typeof $Element>;
/**
 * Creates a generic HTML element with a specified tag (default: `<div>`).
 * @param {rosanaComponent} parent - The parent component to attach the element to.
 * @param {string} tag - The HTML tag to create.
 * @returns {InstanceType<typeof $Element>} - The created generic element.
 */
export declare const $Obj: (parent: rosanaComponent, tag?: string) => InstanceType<typeof $Element>;
