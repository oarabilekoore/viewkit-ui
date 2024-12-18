import type { WidgetOptions, LinkOptions, AnchorOptions } from "./types.js";
/**
 * Creates an HTML button element with optional text content and properties.
 * @param {string} [text=""] - The text content of the button.
 * @param {WidgetOptions} properties - The widget options for the button.
 * @returns {HTMLButtonElement} The created button element.
 */
export declare const Button: (text: string | undefined, properties: WidgetOptions) => HTMLButtonElement;
/**
 * Creates an HTML image element with a specified source and properties.
 * @param {string} src - The source URL for the image.
 * @param {WidgetOptions} properties - The widget options for the image.
 * @returns {HTMLImageElement} The created image element.
 */
export declare const Image: (src: string, properties: WidgetOptions) => HTMLImageElement;
/**
 * Creates an HTML anchor element with a specified href, text, and properties.
 * @param {string} text - The text content of the anchor.
 * @param {AnchorOptions} properties - The widget options for the anchor.
 * @returns {HTMLAnchorElement} The created anchor element.
 */
export declare const Anchor: (text: string, properties: AnchorOptions) => HTMLAnchorElement;
/**
 * Creates an HTML heading element with a specified level, text, and properties.
 * @param {string} text - The text content of the heading.
 * @param {1 | 2 | 3 | 4 | 5 | 6} level - The heading level (1-6).
 * @param {WidgetOptions} properties - The widget options for the heading.
 * @returns {HTMLHeadingElement} The created heading element.
 */
export declare const Heading: (text: string, level: 1 | 2 | 3 | 4 | 5 | 6, properties: WidgetOptions) => HTMLHeadingElement;
/**
 * Creates an HTML input element with a specified type and properties.
 * @param {string} type - The type of the input element (e.g., "text", "password").
 * @param {WidgetOptions} properties - The widget options for the input.
 * @returns {HTMLInputElement} The created input element.
 */
export declare const Input: (type: string, properties: WidgetOptions) => HTMLInputElement;
/**
 * Creates an HTML textarea element with a specified placeholder and properties.
 * @param {string} placeholder - The placeholder text for the textarea.
 * @param {WidgetOptions} properties - The widget options for the textarea.
 * @returns {HTMLTextAreaElement} The created textarea element.
 */
export declare const TextArea: (placeholder: string, properties: WidgetOptions) => HTMLTextAreaElement;
/**
 * Creates an HTML video element with a specified source and properties.
 * @param {string} src - The source URL for the video.
 * @param {WidgetOptions} properties - The widget options for the video.
 * @returns {HTMLVideoElement} The created video element.
 */
export declare const Video: (src: string, properties: WidgetOptions) => HTMLVideoElement;
/**
 * Creates an HTML audio element with a specified source and properties.
 * @param {string} src - The source URL for the audio.
 * @param {WidgetOptions} properties - The widget options for the audio.
 * @returns {HTMLAudioElement} The created audio element.
 */
export declare const Audio: (src: string, properties: WidgetOptions) => HTMLAudioElement;
/**
 * Creates an HTML iframe element with a specified source and properties.
 * @param {string} src - The source URL for the iframe.
 * @param {WidgetOptions} properties - The widget options for the iframe.
 * @returns {HTMLIFrameElement} The created iframe element.
 */
export declare const IFrame: (src: string, properties: WidgetOptions) => HTMLIFrameElement;
/**
 * Creates an HTML canvas element with specified properties.
 * @param {WidgetOptions} properties - The widget options for the canvas.
 * @returns {HTMLCanvasElement} The created canvas element.
 */
export declare const Canvas: (properties: WidgetOptions) => HTMLCanvasElement;
/**
 * Creates an HTML horizontal rule (hr) element with specified properties.
 * @param {WidgetOptions} properties - The widget options for the hr element.
 * @returns {HTMLHRElement} The created hr element.
 */
export declare const Hr: (properties: WidgetOptions) => HTMLHRElement;
/**
 * Creates an HTML line break (br) element with specified properties.
 * @param {WidgetOptions} properties - The widget options for the br element.
 * @returns {HTMLBRElement} The created br element.
 */
export declare const Br: (properties: WidgetOptions) => HTMLBRElement;
/**
 * Creates an HTML link (a) element with specified text, options, and routing behavior.
 * @param {string} [text=""] - The text content of the link.
 * @param {LinkOptions} properties - The widget options and routing configuration for the link.
 * @returns {HTMLAnchorElement} The created link element.
 */
export declare const Link: (text: string | undefined, properties: LinkOptions) => HTMLAnchorElement;
