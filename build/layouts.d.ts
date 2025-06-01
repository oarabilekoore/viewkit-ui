import type { Parent, Scroll_Direction, Element_Alignment, Parent_Fill, Layout_Direction } from "./types";
export declare class LayoutConstructor implements Parent {
    private _layout;
    children: HTMLElement[];
    constructor(parent: Parent | HTMLElement | null, type: string, classes?: Array<string>);
    /**
     * Public accessor for the underlying DOM element of this layout.
     */
    get DomElement(): HTMLDivElement;
    appendChild(child: HTMLElement): void;
    removeChildren(): void;
    removeChild(child: HTMLElement): void;
    insertBefore(child: HTMLElement, before: HTMLElement): void;
    set LayoutDirection(direction: Layout_Direction);
    set ElementAlignment(alignment: Element_Alignment);
    set ParentFill(fill: Parent_Fill);
    set ScrollDirection(scrollDirection: Scroll_Direction);
    set ScrollBarVisibility(visibility: "SHOWN" | "HIDDEN");
}
