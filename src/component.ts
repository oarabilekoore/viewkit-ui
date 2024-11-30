import { dimensioningHeightFn, dimensioningWidthFn } from "./helpers.js";
import type { Component } from "./types.js";
import { cssParser } from "./parser.js";

export const eventHandlersMap = new Map<string, Function>();

document.body.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target?.id && eventHandlersMap.has(target.id)) {
        eventHandlersMap.get(target.id)?.();
    }
});

/** ComponentProperties class extended for improved type handling and flexibility */
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

    SetBackColor(color: string): this {
        this.element.style.backgroundColor = color;
        return this;
    }

    SetText(text: string): this {
        this.element.textContent = text;
        return this;
    }

    SetHtml(html: string): this {
        this.element.innerHTML = html;
        return this;
    }

    Focus(): this {
        this.element.focus();
        return this;
    }

    ClearFocus(): this {
        this.element.blur();
        return this;
    }

    SetDescription(text: string): this {
        this.element.setAttribute("aria-label", text);
        return this;
    }

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

    SetOnMount(callback: () => void): this {
        if (this.ismounted) callback();
        return this;
    }

    SetOnUnMount(callback: () => void): this {
        if (!this.ismounted) callback();
        return this;
    }

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

    SetOnTouch(handler: () => void): this {
        if (typeof handler !== "function") {
            throw new Error(`SetOnTouch expects a function but received: ${typeof handler}`);
        }
        eventHandlersMap.set(this.element.id, handler);
        return this;
    }

    SetId(id: string): this {
        this.element.id = id;
        return this;
    }

    SetType(type: string): this {
        this.type = type.toUpperCase();
        return this;
    }

    SetClassList(classnames: TemplateStringsArray, ...expressions: any[]): this {
        const combined = this.interpolateTemplate(classnames, expressions);
        const classList = combined.trim().split(/\s+/);
        this.classes.push(...classList);
        this.element.classList.add(...classList);
        return this;
    }

    RemoveClassList(classnames: TemplateStringsArray, ...expressions: any[]): this {
        const combined = this.interpolateTemplate(classnames, expressions);
        const classList = combined.trim().split(/\s+/);
        this.classes = this.classes.filter((cls) => !classList.includes(cls));
        this.element.classList.remove(...classList);
        return this;
    }

    Styled(styles: TemplateStringsArray | Record<string, string>): this {
        const className = cssParser(styles);
        this.element.classList.add(className);
        this.classes.push(className);
        return this;
    }

    Show(): this {
        this.element.classList.remove("hide", "gone");
        this.element.classList.add("show");
        return this;
    }

    Hide(): this {
        this.element.classList.remove("show");
        this.element.classList.add("hide");
        return this;
    }

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
