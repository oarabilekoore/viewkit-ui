import type { rosanaComponent } from "./types.js";
export declare class Ratio {
    consequent: number;
    antecedent: number;
    constructor(antecedent: number, consequent: number);
    getFirstToSecond(antecedentReliantValue: number): number;
    getSecondToFirst(consequentReliantValue: number): number;
}
export declare function dimensioningWidthFn(value: number): number;
export declare function dimensioningHeightFn(value: number): number;
export declare class rosanaComponentProperties implements rosanaComponent {
    ismounted: Boolean;
    element: HTMLElement;
    elementClasses: string[];
    constructor();
    /**
     * Add a child component to this component.
     */
    addChild(child: rosanaComponent): this;
    /**Sets the element backcolor */
    set backColor(color: any);
    /**Sets the elements textContent as the provided string */
    set text(text: string);
    /**Sets the elements innerHtml as the provided string */
    set html(html: string);
    /**Set the focus of the page to be on that element */
    set focus(isFocused: boolean);
    /**Set the aria text of this element, good for accesability */
    set ariaText(text: string);
    /**Sets the elements width and height, dimensions specified by you. */
    setSize(w: number | null, h: number | null, dimension: string): void;
    /**
     * Callback invoked when the component is added to the DOM.
     */
    set onMount(Fn: Function);
    /**
     * Callback invoked when the component is removed from the DOM.
     */
    set onUnMount(Fn: Function);
    /**
     * Set the alignment of child elements in this component.
     */
    alignment(options: string): this;
    /**
     * Batch DOM API property setters for this component.
     */
    batch(props: Record<string, unknown>): this;
    /**
     * Add an onclick event listener to this component.
     */
    set onclick(handler: Function);
    /**
     * Add CSS scoped styles to this component.
     */
    css(styles: TemplateStringsArray | Record<string, string>): this;
    /**
     * Remove a child component from this component.
     */
    destroyChild(child: rosanaComponent): this;
    /**
     * Remove All Children In That Layout
     */
    clear(): this;
    /**
     * Make this component visible.
     */
    show(): this;
    /**
     * Hide this component.
     */
    hide(): this;
    /**
     * Remove this component from the visual flow and hide it.
     */
    gone(): this;
}
