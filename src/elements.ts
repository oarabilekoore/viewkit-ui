import { ComponentProperties } from "./component.js";
import type { LayoutComponent } from "./types.js";

// Helper function for generating unique IDs
const generateId = (): string => {
    return typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `id-${Math.random().toString(36).substr(2, 9)}`;
};
export class Button extends ComponentProperties {
    constructor(parent: LayoutComponent, text: string, width: number, height: number, options?: string) {
        super();
        this.element = document.createElement("button");
        this.SetSize(width, height, null).SetId(generateId()).SetType("BUTTON").SetText(text);

        //@ts-ignore
        parent?.AddChild?.(this);
    }
}

export class Text extends ComponentProperties {
    constructor(parent: LayoutComponent, text: string, width: number, height: number, options?: string) {
        super();
        const elementTag = options?.split(",")[0] || "span";
        this.element = document.createElement(elementTag);
        this.SetSize(width, height, null).SetId(generateId()).SetType("TEXT").SetText(text);
        //@ts-ignore
        parent?.AddChild?.(this);
    }
}

export class Input extends ComponentProperties {
    constructor(parent: LayoutComponent, type: string, width: number, height: number, placeholder?: string) {
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
    constructor(parent: LayoutComponent, label: string, checked: boolean, options?: string) {
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
    SetOnCheck(handlerFn: Function) {
        if (typeof handlerFn === "function") {
            handlerFn();
        } else {
            console.error(`The Provided SetOnCheck Parameter Expects A 
                Function, But Recieved : ${typeof handlerFn}`);
            return;
        }
    }
}

export class Slider extends ComponentProperties {
    constructor(parent: LayoutComponent, min: number, max: number, value: number, step: number) {
        super();
        this.element = document.createElement("input");
        //@ts-ignore
        (this.element as HTMLInputElement).range = "range";
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
    constructor(parent: LayoutComponent, src: string, width: number, height: number, options?: string) {
        super();
        this.element = document.createElement("img");
        (this.element as HTMLImageElement).src = src;
        this.SetSize(width, height, null).SetId(generateId()).SetType("IMAGE");
        //@ts-ignore
        parent?.AddChild?.(this);
    }
}

export class ProgressBar extends ComponentProperties {
    constructor(parent: LayoutComponent, value: number, max: number, options?: string) {
        super();
        this.element = document.createElement("progress");
        (this.element as HTMLProgressElement).value = value;
        (this.element as HTMLProgressElement).max = max;

        this.SetId(generateId()).SetType("PROGRESS");
        //@ts-ignore
        parent?.AddChild?.(this);
    }
}

export class TextArea extends ComponentProperties {
    constructor(parent: LayoutComponent, text: string, width: number, height: number, options?: string) {
        super();
        this.element = document.createElement("textarea");
        this.SetSize(width, height, null).SetId(generateId()).SetType("TEXTAREA").SetText(text);
        //@ts-ignore
        parent?.AddChild?.(this);
    }
}
