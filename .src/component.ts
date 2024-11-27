import { dimensioningHeightFn, dimensioningWidthFn } from "./helpers.js";
import { cssParser } from "./parser.js";

export const eventHandlersMap = new Map<string, Function>();

document.body.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target?.id && eventHandlersMap.has(target.id)) {
        eventHandlersMap.get(target.id)?.();
    }
});

// Component Controller Class Implementation
export class ComponentProperties {
    private ismounted: Boolean;
    private classes: string[];
    element: HTMLElement;

    constructor() {
        this.element = document.createElement("div"); // Default to a `div` element
        this.ismounted = true;
        this.classes = [];
    }

    /**Sets the element backcolor */
    SetBackColor(color: string) {
        this.element.style.backgroundColor = color;
    }

    /**Sets the elements textContent as the provided string */
    SetText(text: string) {
        this.element.textContent = text;
    }

    /**Sets the elements innerHtml as the provided string */
    Html(html: string) {
        this.element.innerHTML = html;
    }

    /**Set the focus of the page to be on that element */
    Focus() {
        this.element.focus();
    }

    /**Remove the focus on this element */
    ClearFocus() {
        this.element.blur();
    }

    /**Set the aria text of this element, good for accesability */
    SetDescription(text: string) {
        this.element.setAttribute("aria-label", text);
    }

    /**Sets the elements width and height, dimensions specified by you. */
    SetSize(w: number | null, h: number | null, dimension: any) {
        if (dimension) {
            // Set both width and height
            if (w !== null && h !== null) {
                this.css({
                    width: `${w}${dimension}`,
                    height: `${h}${dimension}`,
                });
            }
            // Set only height
            else if (h !== null) {
                this.css({
                    width: w === null ? "auto" : `${w}${dimension}`,
                    height: `${h}${dimension}`,
                });
            }
            // Set only width
            else if (w !== null) {
                this.css({
                    width: `${w}${dimension}`,
                    height: h === null ? "auto" : `${h}${dimension}`,
                });
            }
            // If both are null, use 'auto' for both
            else {
                this.css({
                    width: "auto",
                    height: "auto",
                });
            }
        } else {
            // Fallback to custom dimensioning scales
            this.css({
                width: w !== null ? `${dimensioningWidthFn(w)}px` : "auto",
                height: h !== null ? `${dimensioningHeightFn(h)}px` : "auto",
            });
        }
    }

    /*** Callback invoked when the component is added to the DOM/Android DOM.*/
    SetOnMount(Fn: Function) {
        if (this.element && typeof Fn === "function") {
            Fn();
        }
    }

    /*** Callback invoked when the component is removed from the DOM or Android DOM*/
    SetOnUnMount(Fn: Function) {
        if (!this.ismounted) {
            Fn();
        }
    }

    /*** Batch properties for this component.*/
    Batch(props: Record<string, unknown>) {
        //TODO
    }

    /**
     * Add an onclick event listener to this component.
     */
    SetOnTouch(handler: Function) {
        if (typeof handler !== "function") {
            throw new Error(`The onclick setter expects a function, but received: ${typeof handler}`);
        }
        eventHandlersMap.set(this.element.id, handler);
    }

    /**
     * Add CSS scoped styles to this component.
     */
    private css(styles: TemplateStringsArray | Record<string, string>): this {
        const className = cssParser(styles);
        this.element.classList.add(className);
        this.classes.push(className);
        return this;
    }

    /**
     * Make this component visible.
     */
    Show(): this {
        this.element.classList.remove("hide", "gone");
        this.element.classList.add("show");
        return this;
    }

    /*** Hide this component.*/
    Hide(): this {
        this.element.classList.remove("show");
        this.element.classList.add("hide");
        return this;
    }

    /*** Remove this component from the visual flow and hide it.*/
    Gone(): this {
        this.element.classList.remove("show", "hide");
        this.element.classList.add("gone");
        return this;
    }
}
