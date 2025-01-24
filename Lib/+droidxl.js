/**
 * @typedef {Object} ApplicationConfig
 * @property {string} title
 * @property {string} icon
 * @property {string} [orientation]
 * @property {string} [statusbarcolor]
 */

export class Application {
    /**
     * @type {HTMLElement}
     */
    constructor(config) {
        this.root = document.body;
        if (config) {
            this.setConfig(config);
        } else {
            console.error("Application Configuration Was Not Passed.");
        }
    }

    /**
     * @private
     * @param {ApplicationConfig} cfg
     */
    setConfig(cfg) {
        if (cfg.statusbarcolor) {
            const meta = document.createElement("meta");
            meta.name = "theme-color";
            meta.content = cfg.statusbarcolor;
            document.head.appendChild(meta);
        }
        if (cfg.title) {
            document.title = cfg.title;
        }
        // The following line uses a feature not directly available in JavaScript
        if (cfg.orientation) {
            screen.orientation.lock(cfg.orientation);
        }
    }

    /**
     * @param {Function} Fn
     */
    onExit(Fn) {
        window.addEventListener("beforeunload", (event) => {
            Fn(event);
        });
    }

    /**
     * @param {Function} Fn
     */
    onBack(Fn) {
        window.addEventListener("popstate", (event) => {
            Fn(event);
        });
    }

    /**
     * @param {Function} Fn
     */
    onStart(Fn) {
        window.addEventListener("load", (event) => {
            Fn(event);
        });
    }

    /**
     * @param {Function} Fn
     */
    onPause(Fn) {
        window.addEventListener("blur", (event) => {
            Fn(event);
        });
    }

    /**
     * @param {Function} Fn
     */
    onResume(Fn) {
        window.addEventListener("focus", (event) => {
            Fn(event);
        });
    }

    /**
     * @param {Function} Fn
     */
    onOffline(Fn) {
        window.addEventListener("offline", (event) => {
            Fn(event);
        });
    }

    /**
     * @param {Function} Fn
     */
    onOnline(Fn) {
        window.addEventListener("online", (event) => {
            Fn(event);
        });
    }
}

/**
 * @typedef {"left" | "right" | "center" | "top" | "bottom" | "hcenter" | "vcenter" | "vertical"} Child_Alignment
 */

/**
 * @typedef {"linear" | "absolute" | "frame" | "card" | "row" | "column" | "grid"} Layout_Types
 */

/**
 * @typedef {"xy" | "x" | "y"} Parent_Fill
 */

/**
 * @typedef {"x" | "y"} Scroll_Direction
 */

/**
 * @typedef {Object} Parent
 * @property {HTMLElement} root
 * @property {HTMLElement[]} children
 * @property {Function} removeChildren
 * @property {Function} appendChild
 * @property {Function} removeChild
 * @property {Function} insertBefore
 */

export class ElementContructor {
    /**
     * @type {HTMLElement}
     */
    constructor(tag, parent) {
        this.element = document.createElement(tag);
        if (parent instanceof HTMLElement) {
            parent.appendChild(this.element);
        } else {
            parent.appendChild(this.element);
        }
        document.body.style.margin = "0";
    }
}

export class LayoutConstructor {
    /**
     * @type {HTMLElement}
     */
    constructor(layout_type, parent) {
        this.layout = new ElementContructor("div", parent).element;
        this.layout.className = `${layout_type}-layout`;

        this.style = this.layout.style;
        this.root = this.layout;
        this.children = [];
    }

    /**
     * @param {Scroll_Direction} direction
     */
    set scrollDirection(direction) {
        this.layout.classList.add(`scroll${direction}`);
    }

    /**
     * @param {Child_Alignment} alignment
     */
    set alignChildren(alignment) {
        alignment.split(" ").forEach((token) => {
            this.layout.classList.add(token);
        });
    }

    /**
     * @param {Parent_Fill} fill
     */
    set parentFill(fill) {
        this.layout.classList.add(`fill${fill}`);
    }

    /**
     * @param {HTMLElement} child
     */
    appendChild(child) {
        this.layout.appendChild(child);
        this.children.push(child);
    }

    removeChildren() {
        this.layout.innerHTML = "";
        this.children = [];
    }

    /**
     * @param {HTMLElement} child
     */
    removeChild(child) {
        this.layout.removeChild(child);
        this.children = this.children.filter(c => c !== child);
    }

    /**
     * @param {HTMLElement} child
     * @param {HTMLElement} before
     */
    insertBefore(child, before) {
        this.layout.insertBefore(child, before);
        this.children.push(child);
    }
}

export function Layout(layout_type, parent) {
    return new LayoutConstructor(layout_type, parent);
}

// Base element creation helper
function createElement(tag, parent, options) {
    const el = document.createElement(tag);

    // Set content (text or nodes)
    if (options && options.content) {
        if (typeof options.content === "string") {
            el.textContent = options.content;
        } else {
            el.appendChild(options.content);
        }
    }

    // Set attributes
    if (options && options.attrs) {
        for (const [key, value] of Object.entries(options.attrs)) {
            el.setAttribute(key, value);
        }
    }

    // Append children
    if (options && options.children) {
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
function genericElement(tag) {
    return function (...args) {
        let content;
        let attrs = {};
        let parent;

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
    };
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
export const LabelFor = function(forId, content, parent) {
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
