interface ApplicationConfig {
    title: string;
    icon: string;
    orientation?: string;
    statusbarcolor?: string;
}

export class Application {
    root: HTMLElement;

    constructor(config?: ApplicationConfig) {
        this.root = document.body;
        config ? this.setConfig(config) : console.error("Application Configuration Was Not Passed.");
    }
    private setConfig(cfg: ApplicationConfig) {
        if (cfg.statusbarcolor) {
            const meta = document.createElement("meta");
            meta.name = "theme-color";
            meta.content = cfg.statusbarcolor;
            document.head.appendChild(meta);
        }
        cfg.title ? (document.title = cfg.title) : null;
        cfg.orientation ? screen.orientation.lock(cfg.orientation) : null;
    }

    onExit(Fn: Function) {
        window.addEventListener("beforeunload", (event) => {
            Fn(event);
        });
    }

    onBack(Fn: Function) {
        window.addEventListener("popstate", (event) => {
            Fn(event);
        });
    }

    onStart(Fn: Function) {
        window.addEventListener("load", (event) => {
            Fn(event);
        });
    }

    onPause(Fn: Function) {
        window.addEventListener("blur", (event) => {
            Fn(event);
        });
    }

    onResume(Fn: Function) {
        window.addEventListener("focus", (event) => {
            Fn(event);
        });
    }

    onOffline(Fn: Function) {
        window.addEventListener("offline", (event) => {
            Fn(event);
        });
    }

    onOnline(Fn: Function) {
        window.addEventListener("online", (event) => {
            Fn(event);
        });
    }
}

export type Child_Alignment = "left" | "right" | "center" | "top" | "bottom" | "hcenter" | "vcenter";
export type Layout_Types = "linear" | "absolute" | "frame" | "card" | "row" | "column" | "grid";
export type Parent_Fill = "xy" | "x" | "y";
export type Scroll_Direction = "x" | "y";

interface Parent {
    root: HTMLElement;
    children: HTMLElement[];
    removeChildren(): void;
    appendChild(child: HTMLElement): void;
    removeChild(child: HTMLElement): void;
    insertBefore(child: HTMLElement, before: HTMLElement): void;
}

export class ElementContructor {
    element: HTMLElement;
    constructor(tag: string, parent: Parent | HTMLElement) {
        this.element = document.createElement(tag);
        parent.appendChild(this.element);
        document.body.style.margin = "0";
    }
}

export class LayoutConstructor implements Parent {
    root: HTMLElement;
    layout: HTMLElement;
    children: HTMLElement[];
    style: CSSStyleDeclaration;
    constructor(layout_type: Layout_Types, parent: Parent | HTMLElement) {
        this.layout = new ElementContructor("div", parent).element;
        this.layout.className = `${layout_type}-layout`;

        this.style = this.layout.style;
        this.root = this.layout;
        this.children = Array();
    }

    set scrollDirection(direction: Scroll_Direction) {
        this.layout.classList.add(`scroll${direction}`);
    }

    set alignChildren(alignment: Child_Alignment) {
        this.layout.classList.add(alignment);
    }

    set parentFill(fill: Parent_Fill) {
        this.layout.classList.add(`fill${fill}`);
    }

    appendChild(child: HTMLElement): void {
        this.layout.appendChild(child);
        this.children.push(child);
    }

    removeChildren(): void {
        this.layout.innerHTML = "";
    }

    removeChild(child: HTMLElement): void {
        this.layout.removeChild(child);
    }

    insertBefore(child: HTMLElement, before: HTMLElement): void {
        this.layout.insertBefore(child, before);
    }
}

export function Layout(layout_type: Layout_Types, parent: Parent | HTMLElement) {
    return new LayoutConstructor(layout_type, parent);
}

export function Button(title: string, parent: Parent) {
    const button = new ElementContructor("button", parent).element;
    button.innerText = title;
    return button;
}
