import { useState, showIF } from "./reactivity.js";

export { useState, showIF }

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
        //@ts-ignore : TS does not have that function in type definition.
        cfg.orientation ? screen.orientation.lock(cfg.orientation) : null;
    }

    onExit(Fn: Function) {
        window.addEventListener("beforeunload", (event) => {
            event.preventDefault();
            Fn(event);
        });
    }

    onBack(Fn: Function) {
        window.addEventListener("popstate", (event) => {
            event.preventDefault();
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

export type Child_Alignment = "left" | "right" | "center" | "top" | "bottom" | "hcenter" | "vcenter" | "vertical";
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
        this.layout.className = `${layout_type}-layout show`;

        this.style = this.layout.style;
        this.root = this.layout;
        this.children = Array();
    }

    /**
     * set the layouts scroll axis as x or y which also applies the direction
     */
    set scrollDirection(direction: Scroll_Direction) {
        this.layout.classList.add(`scroll${direction}`);
    }

    /**
     * set a boolean to hide or view the scollbars visibility
     */
    set scrollBarVisibility(visibility: boolean) {
        visibility ? this.layout.classList.add(`noscrollbar`) : this.layout.classList.remove(`noscrollbar`);    
    }

    /**
     * set how children in a layout should be arranged
     */
    set alignChildren(alignment: string) {
        alignment.split(" ").forEach((token) => {
            this.layout.classList.add(token);
        });
    }

    /**
     * parent fill is used if you want your layout to be fullscreen but on an axial position.
     */
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

// Base element creation helper
function createElement<T extends keyof HTMLElementTagNameMap>(
    tag: T,
    parent: Parent | HTMLElement,
    options?: {
        content?: string | Node;
        attrs?: Record<string, string>;
        children?: HTMLElement[];
    },
): HTMLElementTagNameMap[T] {
    const el = document.createElement(tag);

    // Set content (text or nodes)
    if (options?.content) {
        if (tag === "img") {
            //@ts-ignore
            (el.src = options.content) as HTMLImageElement;
        }
        typeof options.content === "string" ? (el.textContent = options.content) : el.appendChild(options.content);
    }

    // Set attributes
    if (options?.attrs) {
        for (const [key, value] of Object.entries(options.attrs)) {
            el.setAttribute(key, value);
        }
    }

    // Append children
    if (options?.children) {
        options.children.forEach((child) => el.appendChild(child));
    }

    // Append to parent
    if (parent instanceof HTMLElement) {
        parent.appendChild(el);
    } else {
        parent.appendChild(el);
    }

    return el;
}

// Generic element factory
type ElementFactory<T> = {
    (parent: Parent | HTMLElement): T;
    (attrs: Record<string, string>, parent: Parent | HTMLElement): T;
    (content: string, parent: Parent | HTMLElement): T;
    (content: string, attrs: Record<string, string>, parent: Parent | HTMLElement): T;
};

function genericElement<T extends keyof HTMLElementTagNameMap>(tag: T): ElementFactory<HTMLElementTagNameMap[T]> {
    return function (...args: any[]): any {
        let content: string | undefined;
        let attrs: Record<string, string> = {};
        let parent: Parent | HTMLElement;

        // Parse arguments
        if (args.length === 1) {
            parent = args[0];
        } else if (typeof args[0] === "string" && args.length === 2) {
            content = args[0];
            parent = args[1];
        } else if (typeof args[0] === "object" && args.length === 2) {
            attrs = args[0];
            parent = args[1];
        } else if (args.length === 3) {
            content = args[0];
            attrs = args[1];
            parent = args[2];
        } else {
            throw new Error("Invalid arguments");
        }

        return createElement(tag, parent, { content, attrs });
    } as ElementFactory<HTMLElementTagNameMap[T]>;
}

// Text Elements
export const Paragraph = genericElement("p");
export const Heading1 = genericElement("h1");
export const Heading2 = genericElement("h2");
export const Heading3 = genericElement("h3");
export const Heading4 = genericElement("h4");
export const Heading5 = genericElement("h5");
export const Heading6 = genericElement("h6");
export const Span = genericElement("span");
export const Emphasis = genericElement("em");
export const Strong = genericElement("strong");
export const Code = genericElement("code");
export const Preformatted = genericElement("pre");
export const Blockquote = genericElement("blockquote");
export const Quote = genericElement("q");
export const Cite = genericElement("cite");
export const Definition = genericElement("dfn");
export const Abbreviation = genericElement("abbr");
export const Time = genericElement("time");
export const Variable = genericElement("var");
export const SampleOutput = genericElement("samp");
export const KeyboardInput = genericElement("kbd");
export const Subscript = genericElement("sub");
export const Superscript = genericElement("sup");
export const SmallText = genericElement("small");
export const MarkedText = genericElement("mark");
export const DeletedText = genericElement("del");
export const InsertedText = genericElement("ins");

// Interactive Elements
export const Button = genericElement("button");
export const TextInput = genericElement("input");
export const Checkbox = genericElement("input");
export const Radio = genericElement("input");
export const Range = genericElement("input");
export const FileInput = genericElement("input");
export const SubmitButton = genericElement("input");
export const ResetButton = genericElement("input");
export const ColorPicker = genericElement("input");
export const DatePicker = genericElement("input");
export const DateTimePicker = genericElement("input");
export const EmailInput = genericElement("input");
export const NumberInput = genericElement("input");
export const PasswordInput = genericElement("input");
export const SearchInput = genericElement("input");
export const TelInput = genericElement("input");
export const UrlInput = genericElement("input");
export const TextArea = genericElement("textarea");
export const Select = genericElement("select");
export const Option = genericElement("option");
export const Label = genericElement("label");
export const Fieldset = genericElement("fieldset");
export const Legend = genericElement("legend");
export const Progress = genericElement("progress");
export const Meter = genericElement("meter");
export const Output = genericElement("output");

// Media Elements
export const Image = genericElement("img");
export const Video = genericElement("video");
export const Audio = genericElement("audio");
export const Canvas = genericElement("canvas");
export const Picture = genericElement("picture");
export const Source = genericElement("source");
export const Track = genericElement("track");
export const Embed = genericElement("embed");
export const ObjectEmbed = genericElement("object");
export const IFrame = genericElement("iframe");
export const Map = genericElement("map");
export const Area = genericElement("area");

// Semantic Elements
export const Article = genericElement("article");
export const Section = genericElement("section");
export const Nav = genericElement("nav");
export const Header = genericElement("header");
export const Footer = genericElement("footer");
export const Aside = genericElement("aside");
export const Main = genericElement("main");
export const Figure = genericElement("figure");
export const Figcaption = genericElement("figcaption");
export const Details = genericElement("details");
export const Summary = genericElement("summary");
export const Dialog = genericElement("dialog");
export const Menu = genericElement("menu");
//export const MenuItem = genericElement("menuitem");

// Table Elements
export const Table = genericElement("table");
export const TableHead = genericElement("thead");
export const TableBody = genericElement("tbody");
export const TableRow = genericElement("tr");
export const TableHeader = genericElement("th");
export const TableData = genericElement("td");
export const TableCaption = genericElement("caption");
export const ColGroup = genericElement("colgroup");
export const Col = genericElement("col");

// List Elements
export const OrderedList = genericElement("ol");
export const UnorderedList = genericElement("ul");
export const ListItem = genericElement("li");
export const DescriptionList = genericElement("dl");
export const DescriptionTerm = genericElement("dt");
export const DescriptionDetail = genericElement("dd");

// Form Elements
export const Form = genericElement("form");
export const LabelFor = (forId: string, content: string, parent: Parent | HTMLElement) => {
    return createElement("label", parent, { content, attrs: { for: forId } });
};

// Metadata Elements
export const Style = genericElement("style");
export const Link = genericElement("link");
export const Meta = genericElement("meta");
export const Base = genericElement("base");
export const Title = genericElement("title");
export const Script = genericElement("script");
export const NoScript = genericElement("noscript");

// Specialized Elements
export const Anchor = genericElement("a");
export const Break = genericElement("br");
export const HorizontalRule = genericElement("hr");
export const Div = genericElement("div");
export const SpanElement = genericElement("span");
export const Template = genericElement("template");
export const Slot = genericElement("slot");

// Interactive Components
export const DataList = genericElement("datalist");
export const OutputElement = genericElement("output");
