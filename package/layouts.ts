import type { Scroll_Direction, Element_Alignment, Parent_Fill, Layout_Direction } from "./types";

export class LayoutConstructor implements Parent {
    private _layout: HTMLDivElement;
    children: HTMLElement[];

    constructor(parent?: HTMLElement | null, type?: string, classes?: Array<string>) {
        this._layout = document.createElement("div");
        this.children = [];
        this._layout.classList.add(`${type}-layout`, "show");

        if (parent) {
            if (parent instanceof HTMLElement) {
                // Added a check for null parent, common for root layouts
                parent.appendChild(this._layout);
            } else if ("DomElement" in parent && parent.DomElement instanceof HTMLElement) {
                // Check if it's a Parent-like object with DomElement (like another LayoutConstructor)
                parent.DomElement.appendChild(this._layout);
            } else {
                // Fallback or error handling if parent type is unexpected
                try {
                    parent.appendChild(this._layout);
                } catch (error) {
                    throw Error(
                        "LayoutConstructor: Parent is not an HTMLElement or a valid ViewKit Parent object. Appending to body as a fallback if parent was null, otherwise this might be an error."
                    );
                }
            }
        } else {
            // Nothing should happen here, ideally Routers should take over as
            // the parent administrator
        }
        if (classes) {
            for (let i = 0; i < classes.length; i++) {
                this._layout.classList.add(classes[i]);
            }
        }
    }

    /** * Public accessor for the underlying DOM element of this layout. */
    public get DomElement(): HTMLDivElement {
        return this._layout;
    }

    appendChild(child: HTMLElement): void {
        this._layout.appendChild(child);
        this.children.push(child);
    }

    removeChildren(): void {
        this._layout.innerHTML = "";
        this.children = [];
    }

    removeChild(child: HTMLElement): void {
        this._layout.removeChild(child);
        this.children = this.children.filter((c) => c !== child);
    }

    insertBefore(child: HTMLElement, before: HTMLElement): void {
        this._layout.insertBefore(child, before);
    }

    set LayoutDirection(direction: Layout_Direction) {
        // Clear existing direction classes to prevent conflicts
        this._layout.classList.remove("top_to_bottom", "bottom_to_top", "left_to_right", "right_to_left");
        switch (direction) {
            case "TOP_TO_BOTTOM":
                this._layout.classList.add("top_to_bottom");
                break;
            case "BOTTOM_TO_TOP":
                this._layout.classList.add("bottom_to_top");
                break;
            case "LEFT_TO_RIGHT":
                this._layout.classList.add("left_to_right");
                break;
            case "RIGHT_TO_LEFT":
                this._layout.classList.add("right_to_left");
                break;
            default:
                this._layout.classList.add("top_to_bottom");
        }
    }

    set ElementAlignment(alignment: Element_Alignment) {
        this._layout.classList.add(alignment.toLowerCase());
    }

    set ParentFill(fill: Parent_Fill) {
        this._layout.classList.add(fill.toLowerCase());
    }

    set ScrollDirection(scrollDirection: Scroll_Direction) {
        this._layout.classList.remove("scrollx", "scrolly", "scrollxy");
        if (scrollDirection === "HORIZONTAL") {
            this._layout.classList.add("scrollx");
        } else if (scrollDirection === "VERTICAL") {
            this._layout.classList.add("scrolly");
        } else {
            // Assumes "BOTH" or any other value means scrollxy
            this._layout.classList.add("scrollxy");
        }
    }

    set ScrollBarVisibility(visibility: "SHOWN" | "HIDDEN") {
        if (visibility === "SHOWN") {
            this._layout.classList.remove("noscrollbar");
        } else {
            // HIDDEN
            this._layout.classList.add("noscrollbar");
        }
    }
}
