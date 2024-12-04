import { dimensioningHeightFn, dimensioningWidthFn } from "./helpers.js";
import { cssParser } from "./parser.js";
// This Map takes in an elements id and its handler Function, It will
// monitor all clicks on the page and check if the target maps to the
// element, great as it reduces eventListeners = reduces memory usage
export const eventHandlersMap = new Map();
document.body.addEventListener("click", (event) => {
    const target = event.target;
    if (target?.id && eventHandlersMap.has(target.id)) {
        eventHandlersMap.get(target.id)?.();
    }
});
// This class holds all the controls properties and if an element
// is not initalized it will resolve to building its own element
// a div.
export class ComponentProperties {
    ismounted;
    classes;
    element; // Flexible element type
    type;
    constructor() {
        this.element = document.createElement("div");
        this.ismounted = true;
        this.classes = [];
        this.type = "DIV";
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
    /** Call a function when the element is mounted to the DOM */
    SetOnMount(callback) {
        if (this.ismounted)
            callback();
        return this;
    }
    /** Call a function when the element is unmounted from the DOM */
    SetOnUnMount(callback) {
        if (!this.ismounted)
            callback();
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
        eventHandlersMap.set(this.element.id, handler);
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
