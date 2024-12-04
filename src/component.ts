import { dimensioningHeightFn, dimensioningWidthFn } from "./helpers.js";
import type { Component } from "./types.js";
import { cssParser } from "./parser.js";

// This Map takes in an elements id and its handler Function, It will
// monitor all clicks on the page and check if the target maps to the
// element, great as it reduces eventListeners = reduces memory usage
export const onclickEventHandlerMap = new Map<string, Function>();

document.body.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target?.id && onclickEventHandlerMap.has(target.id)) {
        onclickEventHandlerMap.get(target.id)?.();
    }
});

/**
 * This class manages all the properties of controls.
 * If an element is not initialized, it defaults to creating its own
 * HTML element, typically a `<div>`.
 *
 * @class ComponentProperties
 * @description
 * The `ComponentProperties` class ensures that all controls have the necessary
 * properties and provides a fallback mechanism to create a `<div>`
 * when an element is not explicitly defined.
 */

export class ComponentProperties implements Component {
    private ismounted: boolean;
    private classes: string[];
    element: HTMLElement; // Flexible element type
    type: string;

    constructor() {
        this.element = document.createElement("div");
        this.ismounted = true;
        this.classes = [];
        this.type = "DIV";
    }

    /** Set an elements backColor */
    SetBackColor(color: string): this {
        this.element.style.backgroundColor = color;
        return this;
    }

    /** Set the textContent of this element */
    SetText(text: string): this {
        this.element.textContent = text;
        return this;
    }

    /** Set the innerHtml of the element */
    SetHtml(html: string): this {
        this.element.innerHTML = html;
        return this;
    }

    /** Set the focus of the page on this element */
    Focus(): this {
        this.element.focus();
        return this;
    }

    /** Remove the focus of the page from this element */
    ClearFocus(): this {
        this.element.blur();
        return this;
    }

    /** Set the Aria-label attribute of this element */
    SetDescription(text: string): this {
        this.element.setAttribute("aria-label", text);
        return this;
    }

    /** Set the size of this element, you can add an unit or rely on the screen-to-ratio 0 to 1 unit ratio */
    SetSize(width: number | null, height: number | null, unit: "px" | "%" | "em" | "rem" | null): this {
        if (unit) {
            this.Styled({
                width: width !== null ? `${width}${unit}` : "auto",
                height: height !== null ? `${height}${unit}` : "auto",
            });
        } else {
            this.Styled({
                width: width !== null ? `${dimensioningWidthFn(width)}px` : "auto",
                height: height !== null ? `${dimensioningHeightFn(height)}px` : "auto",
            });
        }
        return this;
    }

    /** Call a function when the element is mounted to the DOM */
    SetOnMount(callback: () => void): this {
        if (this.ismounted) callback();
        return this;
    }

    /** Call a function when the element is unmounted from the DOM */
    SetOnUnMount(callback: () => void): this {
        if (!this.ismounted) callback();
        return this;
    }

    /** Batch the elements methods in succesion, great for fast updates */
    Batch(props: Partial<Record<keyof Component, any>>): this {
        Object.entries(props).forEach(([key, value]) => {
            const method = this[key as keyof this];
            if (typeof method === "function") {
                method.call(this, value);
            } else {
                console.warn(`Property ${key} is not a valid method on this component.`);
            }
        });
        return this;
    }

    /** Call a function when this element is clicked */
    SetOnTouch(handler: () => void): this {
        if (typeof handler !== "function") {
            throw new Error(`SetOnTouch expects a function but received: ${typeof handler}`);
        }
        onclickEventHandlerMap.set(this.element.id, handler);
        return this;
    }

    /** Set this elemements Id */
    SetId(id: string): this {
        this.element.id = id;
        return this;
    }

    /** Set this elements type */
    SetType(type: string): this {
        this.type = type.toUpperCase();
        return this;
    }

    /** Add classes to this element */
    SetClassList(classnames: TemplateStringsArray, ...expressions: any[]): this {
        const combined = this.interpolateTemplate(classnames, expressions);
        const classList = combined.trim().split(/\s+/);
        this.classes.push(...classList);
        this.element.classList.add(...classList);
        return this;
    }

    /** Remove classes from this element */
    RemoveClassList(classnames: TemplateStringsArray, ...expressions: any[]): this {
        const combined = this.interpolateTemplate(classnames, expressions);
        const classList = combined.trim().split(/\s+/);
        this.classes = this.classes.filter((cls) => !classList.includes(cls));
        this.element.classList.remove(...classList);
        return this;
    }

    /** Add scoped css to this element, as an Emotion like object or a template literal */
    Styled(styles: TemplateStringsArray | Record<string, string>): this {
        const className = cssParser(styles);
        this.element.classList.add(className);
        this.classes.push(className);
        return this;
    }

    /** Make the element visiblr */
    Show(): this {
        this.element.classList.remove("hide", "gone");
        this.element.classList.add("show");
        return this;
    }

    /** Hide the element visually */
    Hide(): this {
        this.element.classList.remove("show");
        this.element.classList.add("hide");
        return this;
    }

    /** Hide the element visually, and take no space in the DOM */
    Gone(): this {
        this.element.classList.remove("show", "hide");
        this.element.classList.add("gone");
        return this;
    }

    /** Helper method to process template literals */
    private interpolateTemplate(classnames: TemplateStringsArray, expressions: any[]): string {
        return classnames.reduce((result, part, i) => result + part + (expressions[i] || ""), "");
    }
}
