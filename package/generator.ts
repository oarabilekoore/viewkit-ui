import { Parent, MergedParentTypes, SafeParent } from "./types";
import "./baseline.css";

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

export function genericElement(tag: string) {
    return (...args: (string | Parent)[]) => {
        const { parent, text } = parseArguments(args);
        return createElement({ tag, text }, parent);
    };
}

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

export function showIF(element: HTMLElement, condition: boolean) {
    if (condition) {
        element.classList.add("show");
    } else {
        element.classList.add("hide");
    }
}
