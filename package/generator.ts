import { Parent, MergedParentTypes, SafeParent } from "./types";
import "./baseline.ts";

function parseArguments(args: any[]): { parent: MergedParentTypes; text?: string } {
    let parent: MergedParentTypes | undefined;
    let text: string | undefined;

    for (const arg of args) {
        if (typeof arg === "string") {
            text = arg;
        } else {
            // At this point we can assume the args
            // remaining is a parent.
            parent = arg;
        }
    }
    if (!parent) {
        throw new Error("Parent HTMLElement is required.");
    }

    return { parent, text };
}

/**
 * INTERNAL USE: Returns a function, used in Widgets
 * @param tag
 * @returns
 */
export function genericElement(tag: string) {
    return (...args: (string | Parent | HTMLElement | HTMLDivElement)[]) => {
        const { parent, text } = parseArguments(args);
        return createElement({ tag, text }, parent);
    };
}

/**
 * INTERNAL USE: Used to create html elements
 * @param data { tag: string; text?: string }
 * @param parent
 * @returns HTMLElement
 */
export function createElement(
    data: { tag: string; text?: string },
    parent: Parent | HTMLElement | HTMLDivElement
) {
    const element = document.createElement(data.tag);
    data.text ? (element.textContent = data.text) : null;

    if (parent instanceof HTMLElement) {
        parent.appendChild(element);
    } else {
        //@ts-ignore
        parent.DomElement.appendChild(element);
    }

    return element;
}

/**
 * Boolean based visibility function, decide if the element is visible or not
 * @param element {HTMLElement}
 * @param condition {boolean}
 */
export function showIF(element: HTMLElement, condition: boolean) {
    if (condition) {
        element.classList.add("show");
    } else {
        element.classList.add("hide");
    }
}
