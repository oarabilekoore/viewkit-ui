import { optionsApi } from "./layouts.js";
import { cssParser } from "./parser.js";
import { debugInfo } from "./helpers.js";
const eventHandlersMap = new Map();
document.body.addEventListener("click", (event) => {
    const target = event.target;
    if (target?.id && eventHandlersMap.has(target.id)) {
        eventHandlersMap.get(target.id)?.();
    }
});
export class Ratio {
    consequent;
    antecedent;
    constructor(antecedent, consequent) {
        this.consequent = consequent;
        this.antecedent = antecedent;
    }
    getFirstToSecond(antecedentReliantValue) {
        return (antecedentReliantValue * this.consequent) / this.antecedent;
    }
    getSecondToFirst(consequentReliantValue) {
        return (consequentReliantValue * this.antecedent) / this.consequent;
    }
}
export function dimensioningWidthFn(value) {
    const innerWidth = window.innerWidth;
    let ratio = new Ratio(1, innerWidth);
    return ratio.getFirstToSecond(value);
}
export function dimensioningHeightFn(value) {
    const innerHeight = window.innerHeight;
    let ratio = new Ratio(1, innerHeight);
    return ratio.getFirstToSecond(value);
}
// Component Controller Class Implementation
export class rosanaComponentProperties {
    ismounted;
    element;
    elementClasses;
    constructor() {
        this.element = document.createElement("div");
        // Default to a `div` element
        this.elementClasses = [];
        this.ismounted = true;
    }
    /**
     * Add a child component to this component.
     */
    addChild(child) {
        if (!child?.element) {
            console.warn(`The passed object is not a valid Rosana/HTML element.`, child);
            return this;
        }
        this.element.appendChild(child.element);
        return this;
    }
    /**Sets the element backcolor */
    set backColor(color) {
        this.css({ backgroundColor: color });
    }
    /**Sets the elements textContent as the provided string */
    set text(text) {
        this.element.textContent = text;
    }
    /**Sets the elements innerHtml as the provided string */
    set html(html) {
        this.element.innerHTML = html;
    }
    /**Set the focus of the page to be on that element */
    set focus(isFocused) {
        isFocused ? this.element.focus() : this.element.blur();
    }
    /**Set the aria text of this element, good for accesability */
    set ariaText(text) {
        this.element.setAttribute("aria-label", text);
    }
    /**Sets the elements width and height, dimensions specified by you. */
    setSize(w, h, dimension) {
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
                    height: `${h}${dimension}`,
                });
            }
            // Set only width
            else if (w !== null) {
                this.css({
                    width: `${w}${dimension}`,
                });
            }
            // Fallback to custom dimensioning scales
            else {
                this.css({
                    width: `${dimensioningWidthFn(w || 0)}px`,
                    height: `${dimensioningHeightFn(h || 0)}px`,
                });
            }
        }
        else {
            console.error("Dimension is required for setSize.");
        }
    }
    /**
     * Callback invoked when the component is added to the DOM.
     */
    set onMount(Fn) {
        if (this.element && typeof Fn === "function") {
            Fn();
        }
    }
    /**
     * Callback invoked when the component is removed from the DOM.
     */
    set onUnMount(Fn) {
        if (!this.ismounted) {
            Fn();
        }
    }
    /**
     * Set the alignment of child elements in this component.
     */
    alignment(options) {
        if (!options) {
            console.warn(`Alignment options are undefined for:`, this.element);
        }
        optionsApi(this.element, options);
        return this;
    }
    /**
     * Batch DOM API property setters for this component.
     */
    batch(props) {
        if (!props) {
            throw new Error(`Null batched props for: ${this}`);
        }
        Object.entries(props).forEach(([key, value]) => {
            requestAnimationFrame(() => {
                this.element[key] = value;
            });
        });
        return this;
    }
    /**
     * Add an onclick event listener to this component.
     */
    set onclick(handler) {
        if (typeof handler !== "function") {
            throw new Error(`The onclick setter expects a function, but received: ${typeof handler}`);
        }
        eventHandlersMap.set(this.element.id, handler);
    }
    /**
     * Add CSS scoped styles to this component.
     */
    css(styles) {
        const className = cssParser(styles);
        this.element.classList.add(className);
        this.elementClasses.push(className);
        return this;
    }
    /**
     * Remove a child component from this component.
     */
    destroyChild(child) {
        if (!child?.element) {
            debugInfo("The passed child is null/undefined or not a valid Rosana component.", "destroyChild Function", child);
            return this;
        }
        eventHandlersMap.delete(child.element.id);
        child.element.remove();
        return this;
    }
    /**
     * Remove All Children In That Layout
     */
    clear() {
        this.element.innerHTML = "";
        return this;
    }
    /**
     * Make this component visible.
     */
    show() {
        this.element.classList.remove("hide", "gone");
        this.element.classList.add("show");
        return this;
    }
    /**
     * Hide this component.
     */
    hide() {
        this.element.classList.remove("show");
        this.element.classList.add("hide");
        return this;
    }
    /**
     * Remove this component from the visual flow and hide it.
     */
    gone() {
        this.element.classList.remove("show", "hide");
        this.element.classList.add("gone");
        return this;
    }
}
