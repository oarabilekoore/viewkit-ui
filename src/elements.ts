import type { Widget, Layout, WidgetOptions } from "./types.js";
import { WidgetProperties } from "./component.js";
import { generateId } from "./helpers.js";

// This is a base class for all widgets, we create an
// instance of it everytime we create a widget.
class HtmlWidget<T extends HTMLElement = HTMLElement> extends WidgetProperties<T> {
    constructor(parent: Layout, tag: string) {
        super(tag);
        this.element.id = generateId();
        parent?.AddChild(this);
    }
}

/**
 * Button Widget
 * @param {string} text
 * @param {WidgetOptions} properties
 * @returns {Widget}
 */
export const Button = function (text: string = "", properties: WidgetOptions): Widget<HTMLButtonElement> {
    const button = new HtmlWidget<HTMLButtonElement>(properties.parent, "button");
    button.element.textContent = text;
    const { style = "" } = properties;
    if (style.length !== 0) {
        button.element.classList.add(style);
    }
    return button;
};

/**
 * Image Widget
 * @param {string} src
 * @param {WidgetOptions} properties
 * @returns {Widget}
 */
export const Image = function (src: string, properties: WidgetOptions): Widget<HTMLImageElement> {
    const img = new HtmlWidget<HTMLImageElement>(properties.parent, "img");
    img.element.src = src;
    const { style = "" } = properties;
    if (style.length !== 0) {
        img.element.classList.add(style);
    }
    return img;
};

/**
 * Anchor Widget
 * @param {string} href
 * @param {string} text
 * @param {WidgetOptions} properties
 * @returns {Widget}
 */
export const Anchor = function (href: string, text: string, properties: WidgetOptions): Widget<HTMLAnchorElement> {
    const link = new HtmlWidget<HTMLAnchorElement>(properties.parent, "a");
    link.element.textContent = text;
    link.element.setAttribute("href", href);
    const { style = "" } = properties;
    if (style.length !== 0) {
        link.element.classList.add(style);
    }
    return link;
};

type headingLevels = 1 | 2 | 3 | 4 | 5 | 6;
/**
 * Heading Elements (h1 to h6)
 * @param {number} level
 * @param {string} text
 * @param {WidgetOptions} properties
 * @returns {Widget}
 */
export const Heading = function (
    text: string,
    level: headingLevels,
    properties: WidgetOptions,
): Widget<HTMLHeadingElement> {
    const heading = new HtmlWidget<HTMLHeadingElement>(properties.parent, `h${level}`);
    heading.element.textContent = text;
    const { style = "" } = properties;
    if (style.length !== 0) {
        heading.element.classList.add(style);
    }
    return heading;
};

/**
 * Input Widget
 * @param {string} type
 * @param {WidgetOptions} properties
 * @returns {Widget}
 */
export const Input = function (type: string, properties: WidgetOptions): Widget<HTMLInputElement> {
    const input = new HtmlWidget<HTMLInputElement>(properties.parent, "input");
    input.element.setAttribute("type", type);
    const { style = "" } = properties;
    if (style.length !== 0) {
        input.element.classList.add(style);
    }
    return input;
};

/**
 * TextArea Widget
 * @param {WidgetOptions} properties
 * @returns {Widget}
 */
export const TextArea = function (placeholder: string, properties: WidgetOptions): Widget<HTMLTextAreaElement> {
    const textarea = new HtmlWidget<HTMLTextAreaElement>(properties.parent, "textarea");
    textarea.element.placeholder = placeholder;
    const { style = "" } = properties;
    if (style.length !== 0) {
        textarea.element.classList.add(style);
    }
    return textarea;
};

/**
 * Select Widget
 * @param {WidgetOptions} properties
 * @returns {Widget}
 */
export const Select = function (properties: WidgetOptions): Widget<HTMLSelectElement> {
    const { style = "" } = properties;
    const select = new HtmlWidget<HTMLSelectElement>(properties.parent, "select");
    if (style.length !== 0) {
        select.element.classList.add(style);
    }
    return select;
};

/**
 * Option Widget
 * @param {string} text
 * @param {WidgetOptions} properties
 * @returns {Widget}
 */
export const Option = function (text: string, properties: WidgetOptions): Widget<HTMLOptionElement> {
    const option = new HtmlWidget<HTMLOptionElement>(properties.parent, "option");
    option.element.textContent = text;
    const { style = "" } = properties;
    if (style.length !== 0) {
        option.element.classList.add(style);
    }
    return option;
};

/**
 * Add a video widget to your container
 * @param src
 * @param properties
 * @returns {Widget}
 */
export const Video = function (src: string, properties: WidgetOptions): Widget<HTMLVideoElement> {
    const video = new HtmlWidget<HTMLVideoElement>(properties.parent, "video");
    video.element.src = src;
    const { style = "" } = properties;
    if (style.length !== 0) {
        video.element.classList.add(style);
    }
    return video;
};

export const Audio = function (src: string, properties: WidgetOptions): Widget<HTMLAudioElement> {
    const audio = new HtmlWidget<HTMLAudioElement>(properties.parent, "audio");
    audio.element.src = src;
    const { style = "" } = properties;
    if (style.length !== 0) {
        audio.element.classList.add(style);
    }
    return audio;
};

/**
 * IFrame Widget
 * @param {string} src
 * @param {WidgetOptions} properties
 * @returns {Widget}
 */
export const IFrame = function (src: string, properties: WidgetOptions): Widget<HTMLIFrameElement> {
    const iframe = new HtmlWidget<HTMLIFrameElement>(properties.parent, "iframe");
    iframe.element.src = src;
    const { style = "" } = properties;
    if (style.length !== 0) {
        iframe.element.classList.add(style);
    }
    return iframe;
};

/**
 * Canvas Widget
 * @param {WidgetOptions} properties
 * @returns {Widget}
 */
export const Canvas = function (properties: WidgetOptions): Widget<HTMLCanvasElement> {
    const canvas = new HtmlWidget<HTMLCanvasElement>(properties.parent, "canvas");
    const { style = "" } = properties;
    if (style.length !== 0) {
        canvas.element.classList.add(style);
    }
    return canvas;
};

/**
 * Horizontal Rule Widget
 */
export const Hr = function (properties: WidgetOptions): Widget<HTMLHRElement> {
    const hr = new HtmlWidget<HTMLHRElement>(properties.parent, "hr");
    const { style = "" } = properties;
    if (style.length !== 0) {
        hr.element.classList.add(style);
    }
    return hr;
};

/**
 * Break Line Widget
 */
export const Br = function (properties: WidgetOptions): Widget<HTMLBRElement> {
    const br = new HtmlWidget<HTMLBRElement>(properties.parent, "br");
    const { style = "" } = properties;
    if (style.length !== 0) {
        br.element.classList.add(style);
    }
    return br;
};
