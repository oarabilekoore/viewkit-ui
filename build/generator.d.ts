import { Parent } from "./types";
/**
 * INTERNAL USE: Returns a function, used in Widgets
 * @param tag
 * @returns
 */
export declare function genericElement(tag: string): (...args: (string | Parent | HTMLElement | HTMLDivElement)[]) => HTMLElement;
/**
 * INTERNAL USE: Used to create html elements
 * @param data { tag: string; text?: string }
 * @param parent
 * @returns HTMLElement
 */
export declare function createElement(data: {
    tag: string;
    text?: string;
}, parent: Parent | HTMLElement | HTMLDivElement): HTMLElement;
/**
 * Boolean based visibility function, decide if the element is visible or not
 * @param element {HTMLElement}
 * @param condition {boolean}
 */
export declare function showIF(element: HTMLElement, condition: boolean): void;
