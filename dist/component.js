import { dimensioningHeightFn, dimensioningWidthFn } from "./helpers.js";
import { cssParser } from "./parser.js";
import signal from "./signal.js";
// This Map takes in an elements id and its handler Function, It will
// monitor all clicks on the page and check if the target maps to the
// element, great as it reduces eventListeners = reduces memory usage
export const onclickEventHandlerMap = new Map();
document.body.addEventListener("click", (event) => {
    const target = event.target;
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
export class ComponentProperties {
    ismounted;
    element;
    type;
    classes;
    constructor() {
        this.element = document.createElement("div");
        this.ismounted = signal(true);
        this.classes = [];
        this.type = "DIV";
    }
    /*** Add a child component to this component.*/
    AddChild(child) {
        if (!child?.element) {
            console.warn(`The passed object is not a valid
                Rosana/HTML element.`, child);
            return this;
        }
        this.element.appendChild(child.element);
        child.ismounted.value = true;
        return this;
    }
    /*** Remove a child component from the layout */
    RemoveChild(child) {
        if (!child?.element) {
            throw Error(`The passed child is null/undefined or not a
                 valid Rosana component.", "destroyChild Function`);
            return this;
        }
        onclickEventHandlerMap.delete(child.element.id);
        child.ismounted.value = false;
        child.element.remove();
        return this;
    }
    /** Set an elements backColor */
    SetBackColor(color) {
        this.element.style.backgroundColor = color;
        return this;
    }
    /** Set the textContent of this element */
    SetText(text) {
        this.element.textContent = text;
        return this;
    }
    /** Set the innerHtml of the element */
    SetHtml(html) {
        this.element.innerHTML = html;
        return this;
    }
    /** Set the focus of the page on this element */
    Focus() {
        this.element.focus();
        return this;
    }
    /** Remove the focus of the page from this element */
    ClearFocus() {
        this.element.blur();
        return this;
    }
    /** Set the Aria-label attribute of this element */
    SetDescription(text) {
        this.element.setAttribute("aria-label", text);
        return this;
    }
    /** Set the size of this element, you can add an unit or rely on the screen-to-ratio 0 to 1 unit ratio */
    SetSize(width, height, unit) {
        if (unit) {
            this.Styled({
                width: width !== null ? `${width}${unit}` : "auto",
                height: height !== null ? `${height}${unit}` : "auto",
            });
        }
        else {
            this.Styled({
                width: width !== null ? `${dimensioningWidthFn(width)}px` : "auto",
                height: height !== null ? `${dimensioningHeightFn(height)}px` : "auto",
            });
        }
        return this;
    }
    /**
     * Set the margins of this element.
     * @param {number} [left] - The left margin value.
     * @param {number} [top] - The top margin value.
     * @param {number} [right] - The right margin value.
     * @param {number} [bottom] - The bottom margin value.
     * @param {Unit} [unit] - The unit of measurement (e.g., px, %, em, rem). Defaults to responsive scaling.
     */
    SetMargins(left, top, right, bottom, unit) {
        // top and bottom margins are height based
        // left and right are width based
        // isWidth will be boolean to represent that
        const convertValue = (value, isWidth) => {
            if (value === undefined)
                return "0"; // Default to "0" if no value provided
            if (unit) {
                return `${value}${unit}`;
            }
            // Use dimensioning functions for responsive scaling
            return `${isWidth ? dimensioningWidthFn(value) : dimensioningHeightFn(value)}px`;
        };
        const margins = [
            convertValue(top, false),
            convertValue(right, true),
            convertValue(bottom, false),
            convertValue(left, true),
        ].join(" ");
        this.Styled({
            margin: margins,
        });
    }
    /**
     * Set the padding of this element.
     * @param {number} [left] - The left padding value.
     * @param {number} [top] - The top padding value.
     * @param {number} [right] - The right padding value.
     * @param {number} [bottom] - The bottom padding value.
     * @param {Unit} [unit] - The unit of measurement (e.g., px, %, em, rem). Defaults to responsive scaling.
     */
    SetPadding(left, top, right, bottom, unit) {
        // top and bottom margins are height based
        // left and right are width based
        // isWidth will be boolean to represent that
        const convertValue = (value, isWidth) => {
            if (value === undefined)
                return "0"; // Default to "0" if no value provided
            if (unit) {
                return `${value}${unit}`;
            }
            // Use dimensioning functions for responsive scaling
            return `${isWidth ? dimensioningWidthFn(value) : dimensioningHeightFn(value)}px`;
        };
        const paddings = [
            convertValue(top, false),
            convertValue(right, true),
            convertValue(bottom, false),
            convertValue(left, true),
        ].join(" ");
        this.Styled({
            padding: paddings,
        });
    }
    /**
     * Set the margins for all child elements of this component.
     * @param {number} [left] - The left margin value for children.
     * @param {number} [top] - The top margin value for children.
     * @param {number} [right] - The right margin value for children.
     * @param {number} [bottom] - The bottom margin value for children.
     * @param {Unit} [unit] - The unit of measurement (e.g., px, %, em, rem). Defaults to responsive scaling.
     */
    SetChildMargins(left, top, right, bottom, unit) {
        const convertValue = (value, isWidth) => {
            if (value === undefined)
                return "0"; // Default to "0" if no value provided
            if (unit) {
                return `${value}${unit}`; // Use provided unit
            }
            // Use dimensioning functions for responsive scaling
            return `${isWidth ? dimensioningWidthFn(value) : dimensioningHeightFn(value)}px`;
        };
        const margins = [
            convertValue(top, false),
            convertValue(right, true),
            convertValue(bottom, false),
            convertValue(left, true),
        ].join(" ");
        // Apply styles to child elements using this.Styled
        this.Styled({
            "& > *": {
                margin: margins,
            },
        });
    }
    /**
     * Set the position of this element.
     * @param {string} type - The position type (e.g., "absolute", "relative", "fixed", "sticky").
     * @param {number} [left] - The left offset of the element.
     * @param {number} [top] - The top offset of the element.
     * @param {number} [right] - The right offset of the element.
     * @param {number} [bottom] - The bottom offset of the element.
     * @param {Unit} [unit] - The unit of measurement (e.g., px, %, em, rem). Defaults to responsive scaling.
     */
    SetPosition(type, left, top, right, bottom, unit) {
        const convertValue = (value, isWidth) => {
            if (value === undefined)
                return "auto"; // Default to "auto" if no value provided
            if (unit) {
                return `${value}${unit}`;
            }
            // Use dimensioning functions for responsive scaling
            return `${isWidth ? dimensioningWidthFn(value) : dimensioningHeightFn(value)}px`;
        };
        this.Styled({
            position: type,
            top: convertValue(top, false),
            right: convertValue(right, true),
            bottom: convertValue(bottom, false),
            left: convertValue(left, true),
        });
    }
    /** Call a function when the element is mounted to the DOM */
    SetOnMount(callback) {
        this.ismounted.subscribe((ismounted) => {
            if (ismounted)
                callback();
        });
        return this;
    }
    /** Call a function when the element is unmounted from the DOM */
    SetOnUnMount(callback) {
        this.ismounted.subscribe((ismounted) => {
            if (!ismounted)
                callback();
        });
        return this;
    }
    /** Batch the elements methods in succesion, great for fast updates */
    Batch(props) {
        Object.entries(props).forEach(([key, value]) => {
            const method = this[key];
            if (typeof method === "function") {
                method.call(this, value);
            }
            else {
                console.warn(`Property ${key} is not a valid method on this component.`);
            }
        });
        return this;
    }
    /** Call a function when this element is clicked */
    SetOnTouch(handler) {
        if (typeof handler !== "function") {
            throw new Error(`SetOnTouch expects a function but received: ${typeof handler}`);
        }
        onclickEventHandlerMap.set(this.element.id, handler);
        return this;
    }
    /** Set this elemements Id */
    SetId(id) {
        this.element.id = id;
        return this;
    }
    /** Set this elements type */
    SetType(type) {
        this.type = type.toUpperCase();
        return this;
    }
    /** Add classes to this element */
    SetClassList(classnames, ...expressions) {
        const combined = this.interpolateTemplate(classnames, expressions);
        const classList = combined.trim().split(/\s+/);
        this.classes.push(...classList);
        this.element.classList.add(...classList);
        return this;
    }
    /** Remove classes from this element */
    RemoveClassList(classnames, ...expressions) {
        const combined = this.interpolateTemplate(classnames, expressions);
        const classList = combined.trim().split(/\s+/);
        this.classes = this.classes.filter((cls) => !classList.includes(cls));
        this.element.classList.remove(...classList);
        return this;
    }
    /** Add scoped css to this element, as an Emotion like object or a template literal */
    Styled(styles) {
        const className = cssParser(styles);
        this.element.classList.add(className);
        this.classes.push(className);
        return this;
    }
    /** Make the element visiblr */
    Show() {
        this.element.classList.remove("hide", "gone");
        this.element.classList.add("show");
        return this;
    }
    /** Hide the element visually */
    Hide() {
        this.element.classList.remove("show");
        this.element.classList.add("hide");
        return this;
    }
    /** Hide the element visually, and take no space in the DOM */
    Gone() {
        this.element.classList.remove("show", "hide");
        this.element.classList.add("gone");
        return this;
    }
    /** Helper method to process template literals */
    interpolateTemplate(classnames, expressions) {
        return classnames.reduce((result, part, i) => result + part + (expressions[i] || ""), "");
    }
}
