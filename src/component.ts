import { dimensioningHeightFn, dimensioningWidthFn } from "./helpers.js";
import type { Component } from "./types.js";
import { cssParser } from "./parser.js";

// This Map takes in an elements id and its handler Function, It will
// monitor all clicks on the page and check if the target maps to the
// element, great as it reduces eventListeners = reduces memory usage
export const eventHandlersMap = new Map<string, Function>();

document.body.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target?.id && eventHandlersMap.has(target.id)) {
        eventHandlersMap.get(target.id)?.();
    }
});

// This class holds all the controls properties and if an element
// is not initalized it will resolve to building its own element
// a div.
export class ComponentProperties {
    private ismounted: Boolean;
    private classes: string[];
    element: HTMLElement;

    constructor() {
        this.element = document.createElement("div");
        this.ismounted = true;
        this.classes = [];
    }

    /** Sets the element backcolor */
    SetBackColor(color: string) {
        this.element.style.backgroundColor = color;
    }

    /** Sets the elements textContent as the provided string */
    SetText(text: string) {
        this.element.textContent = text;
    }

    /** Sets the elements innerHtml as the provided string */
    Html(html: string) {
        this.element.innerHTML = html;
    }

    /** Set the focus of the page to be on that element */
    Focus() {
        this.element.focus();
    }

    /** Remove the focus on this element */
    ClearFocus() {
        this.element.blur();
    }

    /** Set the aria text of this element, good for accesability */
    SetDescription(text: string) {
        this.element.setAttribute("aria-label", text);
    }

    /** Sets the elements width and height, dimensions specified by you. */
    SetSize(width: number | null, height: number | null, unit: "px" | "%" | "em" | "rem" | null): void {
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
    }

    /*** Callback invoked when the component is added to the DOM DOM.*/
    SetOnMount(Fn: Function) {
        if (this.element && typeof Fn === "function") {
            Fn();
        }
    }

    /*** Callback invoked when the component is removed from the DOM*/
    SetOnUnMount(Fn: Function) {
        if (!this.ismounted) {
            Fn();
        }
    }

    /*** Batch properties for this component.*/
    Batch(props: Partial<Record<keyof Component, any>>): void {
        Object.entries(props).forEach(([key, value]) => {
            const method = key as keyof this;

            // Check if the method exists on the instance and is callable
            if (typeof this[method] === "function") {
                // Dynamically call the method with the provided value
                (this[method] as Function)(value);
            } else {
                console.warn(`Property ${key} is not a valid
                    method in that Object.`);
            }
        });
    }

    /** Add an onclick like event listener to this component.*/
    SetOnTouch(handler: Function) {
        if (typeof handler !== "function") {
            throw new Error(`The SetOnTouch Function expects a 
                function, but received: ${typeof handler}`);
        }
        eventHandlersMap.set(this.element.id, handler);
    }

    /** Add scoped css as an object similar to Emotion or as a TemplateLiteral.*/
    Styled(styles: TemplateStringsArray | Record<string, string>): this {
        const className = cssParser(styles);
        this.element.classList.add(className);
        this.classes.push(className);
        return this;
    }

    /** Make this component visible.*/
    Show(): this {
        this.element.classList.remove("hide", "gone");
        this.element.classList.add("show");
        return this;
    }

    /** Hide this component.*/
    Hide(): this {
        this.element.classList.remove("show");
        this.element.classList.add("hide");
        return this;
    }

    /** Hide this component as if it was not there.*/
    Gone(): this {
        this.element.classList.remove("show", "hide");
        this.element.classList.add("gone");
        return this;
    }
}
