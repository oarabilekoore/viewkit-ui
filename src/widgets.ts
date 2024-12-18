import type { WidgetOptions, LinkOptions, AnchorOptions } from "./types.js";
import { generateId } from "./helpers.js";

class HtmlWidget<T extends HTMLElement = HTMLElement> {
    private element: T;

    private constructor(properties: WidgetOptions, tag: string) {
        this.element = document.createElement(tag) as T;
        this.element.id = generateId();
        const { style, parent } = properties;
        if (style) {
            this.element.className = style;
        }

        parent?.AddChild<T>(this.element);
    }

    static Build<T extends HTMLElement = HTMLElement>(properties: WidgetOptions, tag: string): T {
        return new HtmlWidget<T>(properties, tag).element;
    }
}

/**
 * Creates an HTML button element with optional text content and properties.
 * @param {string} [text=""] - The text content of the button.
 * @param {WidgetOptions} properties - The widget options for the button.
 * @returns {HTMLButtonElement} The created button element.
 */
export const Button = (text = "", properties: WidgetOptions): HTMLButtonElement => {
    const button = HtmlWidget.Build<HTMLButtonElement>(properties, "button");
    button.textContent = text;
    return button;
};

/**
 * Creates an HTML image element with a specified source and properties.
 * @param {string} src - The source URL for the image.
 * @param {WidgetOptions} properties - The widget options for the image.
 * @returns {HTMLImageElement} The created image element.
 */
export const Image = (src: string, properties: WidgetOptions): HTMLImageElement => {
    const img = HtmlWidget.Build<HTMLImageElement>(properties, "img");
    img.src = src;
    return img;
};

/**
 * Creates an HTML anchor element with a specified href, text, and properties.
 * @param {string} text - The text content of the anchor.
 * @param {AnchorOptions} properties - The widget options for the anchor.
 * @returns {HTMLAnchorElement} The created anchor element.
 */
export const Anchor = (text: string, properties: AnchorOptions): HTMLAnchorElement => {
    const link = HtmlWidget.Build<HTMLAnchorElement>(properties, "a");
    link.href = properties.href;
    link.textContent = text;
    return link;
};

/**
 * Creates an HTML heading element with a specified level, text, and properties.
 * @param {string} text - The text content of the heading.
 * @param {1 | 2 | 3 | 4 | 5 | 6} level - The heading level (1-6).
 * @param {WidgetOptions} properties - The widget options for the heading.
 * @returns {HTMLHeadingElement} The created heading element.
 */
export const Heading = (text: string, level: 1 | 2 | 3 | 4 | 5 | 6, properties: WidgetOptions): HTMLHeadingElement => {
    const heading = HtmlWidget.Build<HTMLHeadingElement>(properties, `h${level}`);
    heading.textContent = text;
    return heading;
};

/**
 * Creates an HTML input element with a specified type and properties.
 * @param {string} type - The type of the input element (e.g., "text", "password").
 * @param {WidgetOptions} properties - The widget options for the input.
 * @returns {HTMLInputElement} The created input element.
 */
export const Input = (type: string, properties: WidgetOptions): HTMLInputElement => {
    const input = HtmlWidget.Build<HTMLInputElement>(properties, "input");
    input.type = type;
    return input;
};

/**
 * Creates an HTML textarea element with a specified placeholder and properties.
 * @param {string} placeholder - The placeholder text for the textarea.
 * @param {WidgetOptions} properties - The widget options for the textarea.
 * @returns {HTMLTextAreaElement} The created textarea element.
 */
export const TextArea = (placeholder: string, properties: WidgetOptions): HTMLTextAreaElement => {
    const textarea = HtmlWidget.Build<HTMLTextAreaElement>(properties, "textarea");
    textarea.placeholder = placeholder;
    return textarea;
};

/**
 * Creates an HTML video element with a specified source and properties.
 * @param {string} src - The source URL for the video.
 * @param {WidgetOptions} properties - The widget options for the video.
 * @returns {HTMLVideoElement} The created video element.
 */
export const Video = (src: string, properties: WidgetOptions): HTMLVideoElement => {
    const video = HtmlWidget.Build<HTMLVideoElement>(properties, "video");
    video.src = src;
    return video;
};

/**
 * Creates an HTML audio element with a specified source and properties.
 * @param {string} src - The source URL for the audio.
 * @param {WidgetOptions} properties - The widget options for the audio.
 * @returns {HTMLAudioElement} The created audio element.
 */
export const Audio = (src: string, properties: WidgetOptions): HTMLAudioElement => {
    const audio = HtmlWidget.Build<HTMLAudioElement>(properties, "audio");
    audio.src = src;
    return audio;
};

/**
 * Creates an HTML iframe element with a specified source and properties.
 * @param {string} src - The source URL for the iframe.
 * @param {WidgetOptions} properties - The widget options for the iframe.
 * @returns {HTMLIFrameElement} The created iframe element.
 */
export const IFrame = (src: string, properties: WidgetOptions): HTMLIFrameElement => {
    const iframe = HtmlWidget.Build<HTMLIFrameElement>(properties, "iframe");
    iframe.src = src;
    return iframe;
};

/**
 * Creates an HTML canvas element with specified properties.
 * @param {WidgetOptions} properties - The widget options for the canvas.
 * @returns {HTMLCanvasElement} The created canvas element.
 */
export const Canvas = (properties: WidgetOptions): HTMLCanvasElement => {
    return HtmlWidget.Build<HTMLCanvasElement>(properties, "canvas");
};

/**
 * Creates an HTML horizontal rule (hr) element with specified properties.
 * @param {WidgetOptions} properties - The widget options for the hr element.
 * @returns {HTMLHRElement} The created hr element.
 */
export const Hr = (properties: WidgetOptions): HTMLHRElement => {
    return HtmlWidget.Build<HTMLHRElement>(properties, "hr");
};

/**
 * Creates an HTML line break (br) element with specified properties.
 * @param {WidgetOptions} properties - The widget options for the br element.
 * @returns {HTMLBRElement} The created br element.
 */
export const Br = (properties: WidgetOptions): HTMLBRElement => {
    return HtmlWidget.Build<HTMLBRElement>(properties, "br");
};

/**
 * Creates an HTML link (a) element with specified text, options, and routing behavior.
 * @param {string} [text=""] - The text content of the link.
 * @param {LinkOptions} properties - The widget options and routing configuration for the link.
 * @returns {HTMLAnchorElement} The created link element.
 */
export const Link = (text = "", properties: LinkOptions): HTMLAnchorElement => {
    const { parent, to = "/", style = "", query = {}, behaveLikeLink = false } = properties;
    const link = HtmlWidget.Build<HTMLAnchorElement>({ parent, style }, "a");

    link.textContent = text;
    if (!behaveLikeLink) {
        link.onclick = () => {
            //@ts-ignore
            globalThis.router.open(to, query);
        };
    } else {
        link.href = to;
        link.addEventListener("click", (e) => {
            e.preventDefault();
            //@ts-ignore
            globalThis.router.open(to, query);
        });
    }

    return link;
};
