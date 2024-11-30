import { ComponentProperties } from "./component.js";
// Helper function for generating unique IDs
const generateId = () => {
    return typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `id-${Math.random().toString(36).substr(2, 9)}`;
};
export class Button extends ComponentProperties {
    constructor(parent, text, width, height, options) {
        super();
        this.element = document.createElement("button");
        this.SetSize(width, height, null).SetId(generateId()).SetType("BUTTON").SetText(text);
        //@ts-ignore
        parent?.AddChild?.(this);
    }
}
export class Text extends ComponentProperties {
    constructor(parent, text, width, height, options) {
        super();
        const elementTag = options?.split(",")[0] || "span";
        this.element = document.createElement(elementTag);
        this.SetSize(width, height, null).SetId(generateId()).SetType("TEXT").SetText(text);
        //@ts-ignore
        parent?.AddChild?.(this);
    }
}
export class Input extends ComponentProperties {
    constructor(parent, type, width, height, placeholder) {
        super();
        const elementTag = type?.split(",")[0] || "input";
        this.element = document.createElement(elementTag);
        this.SetSize(width, height, null).SetId(generateId()).SetType(`${type.toUpperCase()}-INPUT`);
        if (placeholder) {
            this.element.setAttribute("placeholder", placeholder);
        }
        //@ts-ignore
        parent?.AddChild?.(this);
    }
}
export class CheckBox extends ComponentProperties {
    constructor(parent, label, checked, options) {
        super();
        this.element = document.createElement("label");
        const input = document.createElement("input");
        input.type = "checkbox";
        input.checked = checked;
        this.element.appendChild(input);
        const span = document.createElement("span");
        span.textContent = label;
        this.element.appendChild(span);
        this.SetId(generateId()).SetType("CHECKBOX");
        //@ts-ignore
        parent?.AddChild?.(this);
    }
    /**Call a function once the state of the check is changed */
    SetOnCheck(handlerFn) {
        if (typeof handlerFn === "function") {
            handlerFn();
        }
        else {
            console.error(`The Provided SetOnCheck Parameter Expects A 
                Function, But Recieved : ${typeof handlerFn}`);
            return;
        }
    }
}
export class Slider extends ComponentProperties {
    constructor(parent, min, max, value, step) {
        super();
        this.element = document.createElement("input");
        //@ts-ignore
        this.element.range = "range";
        this.element.setAttribute("min", min.toString());
        this.element.setAttribute("max", max.toString());
        this.element.setAttribute("value", value.toString());
        this.element.setAttribute("step", step.toString());
        this.SetId(generateId()).SetType("SLIDER");
        //@ts-ignore
        parent?.AddChild?.(this);
    }
}
export class ImageView extends ComponentProperties {
    constructor(parent, src, width, height, options) {
        super();
        this.element = document.createElement("img");
        this.element.src = src;
        this.SetSize(width, height, null).SetId(generateId()).SetType("IMAGE");
        //@ts-ignore
        parent?.AddChild?.(this);
    }
}
export class ProgressBar extends ComponentProperties {
    constructor(parent, value, max, options) {
        super();
        this.element = document.createElement("progress");
        this.element.value = value;
        this.element.max = max;
        this.SetId(generateId()).SetType("PROGRESS");
        //@ts-ignore
        parent?.AddChild?.(this);
    }
}
export class TextArea extends ComponentProperties {
    constructor(parent, text, width, height, options) {
        super();
        this.element = document.createElement("textarea");
        this.SetSize(width, height, null).SetId(generateId()).SetType("TEXTAREA").SetText(text);
        //@ts-ignore
        parent?.AddChild?.(this);
    }
}
