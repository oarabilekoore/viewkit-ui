import type { Parent } from "./+viewkit";

export type Layout_Direction = "TOP_TO_BOTTOM" | "BOTTOM_TO_TOP" | "LEFT_TO_RIGHT" | "RIGHT_TO_LEFT";

export type Element_Alignment = "CENTER" | "LEFT" | "BOTTOM" | "RIGHT" | "VCENTER" | "HCENTER";

export type Scroll_Direction = "HORIZONTAL" | "VERTICAL" | "BOTH";
export type Parent_Fill = "FILLXY" | "FILLX" | "FILLY";

export class LayoutConstructor implements Parent {
    root: HTMLElement | HTMLDivElement;
    layout: HTMLDivElement;
    children: HTMLElement[];
    style: CSSStyleDeclaration;

    constructor(parent: Parent | HTMLElement, type: string, classes?: Array<string>) {
        this.layout = document.createElement("div");

        if (parent instanceof HTMLElement) {
            parent.appendChild(this.layout);
        } else {
            parent.root.appendChild(this.layout);
        }

        if (parent === document.body) {
            document.body.style.margin = "0";
        }

        if (classes && typeof classes === "object") {
            for (let i = 0; classes.length < 0; i++) {
                this.layout.classList.add(classes[i]);
            }
        }

        this.layout.classList.add(`${type}-layout`, "show");

        this.style = this.layout.style;
        this.root = this.layout;
        this.children = [];
    }

    appendChild(child: HTMLElement): void {
        this.layout.appendChild(child);
        this.children.push(child);
    }

    removeChildren(): void {
        this.layout.innerHTML = "";
        this.children = [];
    }

    removeChild(child: HTMLElement): void {
        this.layout.removeChild(child);
        this.children = this.children.filter((c) => c !== child);
    }

    insertBefore(child: HTMLElement, before: HTMLElement): void {
        this.layout.insertBefore(child, before);
    }

    set LayoutDirection(direction: Layout_Direction) {
        switch (direction) {
            case "TOP_TO_BOTTOM":
                this.layout.classList.add("top_to_bottom");
                break;
            case "BOTTOM_TO_TOP":
                this.layout.classList.add("bottom_to_top");
                break;
            case "LEFT_TO_RIGHT":
                this.layout.classList.add("left_to_right");
                break;
            default:
                this.layout.classList.add("RIGHT_TO_LEFT");
        }
    }

    set ElementAlignment(alignment: Element_Alignment) {
        this.layout.classList.add(alignment.toLowerCase());
    }

    set ParentFill(fill: Parent_Fill) {
        this.layout.classList.add(fill.toLowerCase());
    }

    set ScrollDirection(scrollDirection: Scroll_Direction) {
        if (scrollDirection === "HORIZONTAL") {
            this.layout.classList.add("scrollx");
        } else if (scrollDirection === "VERTICAL") {
            this.layout.classList.add("scrolly");
        } else {
            this.layout.classList.add("scrollxy");
        }
    }

    set ScrollBarVisibility(visibility: "SHOWN" | "HIDDEN") {
        if (visibility === "SHOWN") {
            this.layout.classList.remove("noscrollbar");
        } else {
            this.layout.classList.add("noscrollbar");
        }
    }
}

vgl.LinearLayout = function (parent: Parent | HTMLElement, classList?: string) {
    const layout = new LayoutConstructor(parent, "linear");
    return layout;
};

export function ColumnLayout(parent: Parent | HTMLElement) {
    const layout = new LayoutConstructor(parent, "column");
    layout.LayoutDirection = "TOP_TO_BOTTOM";
    return layout;
}

export function GridLayout(parent: Parent | HTMLElement) {
    const layout = new LayoutConstructor(parent, "grid");
    return layout;
}
