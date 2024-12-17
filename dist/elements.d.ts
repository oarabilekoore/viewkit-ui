import type { Widget, WidgetOptions } from "./types.js";
/**
 * Button Widget
 * @param {string} text
 * @param {WidgetOptions} properties
 * @returns {Widget}
 */
export declare const Button: (text: string | undefined, properties: WidgetOptions) => Widget<HTMLButtonElement>;
/**
 * Image Widget
 * @param {string} src
 * @param {WidgetOptions} properties
 * @returns {Widget}
 */
export declare const Image: (src: string, properties: WidgetOptions) => Widget<HTMLImageElement>;
/**
 * Anchor Widget
 * @param {string} href
 * @param {string} text
 * @param {WidgetOptions} properties
 * @returns {Widget}
 */
export declare const Anchor: (href: string, text: string, properties: WidgetOptions) => Widget<HTMLAnchorElement>;
type headingLevels = 1 | 2 | 3 | 4 | 5 | 6;
/**
 * Heading Elements (h1 to h6)
 * @param {number} level
 * @param {string} text
 * @param {WidgetOptions} properties
 * @returns {Widget}
 */
export declare const Heading: (text: string, level: headingLevels, properties: WidgetOptions) => Widget<HTMLHeadingElement>;
/**
 * Input Widget
 * @param {string} type
 * @param {WidgetOptions} properties
 * @returns {Widget}
 */
export declare const Input: (type: string, properties: WidgetOptions) => Widget<HTMLInputElement>;
/**
 * TextArea Widget
 * @param {WidgetOptions} properties
 * @returns {Widget}
 */
export declare const TextArea: (placeholder: string, properties: WidgetOptions) => Widget<HTMLTextAreaElement>;
/**
 * Select Widget
 * @param {WidgetOptions} properties
 * @returns {Widget}
 */
export declare const Select: (properties: WidgetOptions) => Widget<HTMLSelectElement>;
/**
 * Option Widget
 * @param {string} text
 * @param {WidgetOptions} properties
 * @returns {Widget}
 */
export declare const Option: (text: string, properties: WidgetOptions) => Widget<HTMLOptionElement>;
/**
 * Add a video widget to your container
 * @param src
 * @param properties
 * @returns {Widget}
 */
export declare const Video: (src: string, properties: WidgetOptions) => Widget<HTMLVideoElement>;
export declare const Audio: (src: string, properties: WidgetOptions) => Widget<HTMLAudioElement>;
/**
 * IFrame Widget
 * @param {string} src
 * @param {WidgetOptions} properties
 * @returns {Widget}
 */
export declare const IFrame: (src: string, properties: WidgetOptions) => Widget<HTMLIFrameElement>;
/**
 * Canvas Widget
 * @param {WidgetOptions} properties
 * @returns {Widget}
 */
export declare const Canvas: (properties: WidgetOptions) => Widget<HTMLCanvasElement>;
/**
 * Horizontal Rule Widget
 */
export declare const Hr: (properties: WidgetOptions) => Widget<HTMLHRElement>;
/**
 * Break Line Widget
 */
export declare const Br: (properties: WidgetOptions) => Widget<HTMLBRElement>;
export {};
