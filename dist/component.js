import { dimensioningHeightFn, dimensioningWidthFn } from "./helpers.js";
import { cssParser } from "./parser.js";
export const eventHandlersMap = new Map();
document.body.addEventListener("click", (event) => {
    const target = event.target;
    if (target?.id && eventHandlersMap.has(target.id)) {
        eventHandlersMap.get(target.id)?.();
    }
});
/** ComponentProperties class extended for improved type handling and flexibility */
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
    SetBackColor(color) {
        this.element.style.backgroundColor = color;
        return this;
    }
    SetText(text) {
        this.element.textContent = text;
        return this;
    }
    SetHtml(html) {
        this.element.innerHTML = html;
        return this;
    }
    Focus() {
        this.element.focus();
        return this;
    }
    ClearFocus() {
        this.element.blur();
        return this;
    }
    SetDescription(text) {
        this.element.setAttribute("aria-label", text);
        return this;
    }
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
    SetOnMount(callback) {
        if (this.ismounted)
            callback();
        return this;
    }
    SetOnUnMount(callback) {
        if (!this.ismounted)
            callback();
        return this;
    }
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
    SetOnTouch(handler) {
        if (typeof handler !== "function") {
            throw new Error(`SetOnTouch expects a function but received: ${typeof handler}`);
        }
        eventHandlersMap.set(this.element.id, handler);
        return this;
    }
    SetId(id) {
        this.element.id = id;
        return this;
    }
    SetType(type) {
        this.type = type.toUpperCase();
        return this;
    }
    SetClassList(classnames, ...expressions) {
        const combined = this.interpolateTemplate(classnames, expressions);
        const classList = combined.trim().split(/\s+/);
        this.classes.push(...classList);
        this.element.classList.add(...classList);
        return this;
    }
    RemoveClassList(classnames, ...expressions) {
        const combined = this.interpolateTemplate(classnames, expressions);
        const classList = combined.trim().split(/\s+/);
        this.classes = this.classes.filter((cls) => !classList.includes(cls));
        this.element.classList.remove(...classList);
        return this;
    }
    Styled(styles) {
        const className = cssParser(styles);
        this.element.classList.add(className);
        this.classes.push(className);
        return this;
    }
    Show() {
        this.element.classList.remove("hide", "gone");
        this.element.classList.add("show");
        return this;
    }
    Hide() {
        this.element.classList.remove("show");
        this.element.classList.add("hide");
        return this;
    }
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
