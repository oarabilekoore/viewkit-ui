import type { Component } from "./types.js";
export declare const eventHandlersMap: Map<string, Function>;
export declare class ComponentProperties implements Component {
    private ismounted;
    private classes;
    element: HTMLElement;
    type: string;
    constructor();
    SetBackColor(color: string): this;
    SetText(text: string): this;
    SetHtml(html: string): this;
    Focus(): this;
    ClearFocus(): this;
    SetDescription(text: string): this;
    SetSize(width: number | null, height: number | null, unit: "px" | "%" | "em" | "rem" | null): this;
    SetOnMount(callback: () => void): this;
    SetOnUnMount(callback: () => void): this;
    Batch(props: Partial<Record<keyof Component, any>>): this;
    SetOnTouch(handler: () => void): this;
    SetId(id: string): this;
    SetType(type: string): this;
    SetClassList(classnames: TemplateStringsArray, ...expressions: any[]): this;
    RemoveClassList(classnames: TemplateStringsArray, ...expressions: any[]): this;
    Styled(styles: TemplateStringsArray | Record<string, string>): this;
    Show(): this;
    Hide(): this;
    Gone(): this;
    /** Helper method to process template literals */
    private interpolateTemplate;
}
