import { WidgetProperties } from "./component.js";
import { generateId } from "./helpers.js";
// This is a base class for all widgets, we create an
// instance of it everytime we create a widget.
class HtmlWidget extends WidgetProperties {
    constructor(parent, tag) {
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
export const Button = function (text = "", properties) {
    const button = new HtmlWidget(properties.parent, "button");
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
export const Image = function (src, properties) {
    const img = new HtmlWidget(properties.parent, "img");
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
export const Anchor = function (href, text, properties) {
    const link = new HtmlWidget(properties.parent, "a");
    link.element.textContent = text;
    link.element.setAttribute("href", href);
    const { style = "" } = properties;
    if (style.length !== 0) {
        link.element.classList.add(style);
    }
    return link;
};
/**
 * Heading Elements (h1 to h6)
 * @param {number} level
 * @param {string} text
 * @param {WidgetOptions} properties
 * @returns {Widget}
 */
export const Heading = function (text, level, properties) {
    const heading = new HtmlWidget(properties.parent, `h${level}`);
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
export const Input = function (type, properties) {
    const input = new HtmlWidget(properties.parent, "input");
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
export const TextArea = function (placeholder, properties) {
    const textarea = new HtmlWidget(properties.parent, "textarea");
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
export const Select = function (properties) {
    const { style = "" } = properties;
    const select = new HtmlWidget(properties.parent, "select");
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
export const Option = function (text, properties) {
    const option = new HtmlWidget(properties.parent, "option");
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
export const Video = function (src, properties) {
    const video = new HtmlWidget(properties.parent, "video");
    video.element.src = src;
    const { style = "" } = properties;
    if (style.length !== 0) {
        video.element.classList.add(style);
    }
    return video;
};
export const Audio = function (src, properties) {
    const audio = new HtmlWidget(properties.parent, "audio");
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
export const IFrame = function (src, properties) {
    const iframe = new HtmlWidget(properties.parent, "iframe");
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
export const Canvas = function (properties) {
    const canvas = new HtmlWidget(properties.parent, "canvas");
    const { style = "" } = properties;
    if (style.length !== 0) {
        canvas.element.classList.add(style);
    }
    return canvas;
};
/**
 * Horizontal Rule Widget
 */
export const Hr = function (properties) {
    const hr = new HtmlWidget(properties.parent, "hr");
    const { style = "" } = properties;
    if (style.length !== 0) {
        hr.element.classList.add(style);
    }
    return hr;
};
/**
 * Break Line Widget
 */
export const Br = function (properties) {
    const br = new HtmlWidget(properties.parent, "br");
    const { style = "" } = properties;
    if (style.length !== 0) {
        br.element.classList.add(style);
    }
    return br;
};
/**
 * Link Widget is used for routing, add to as a defined route
 * and your text.
 */
export const Link = function (text = "", properties) {
    const { parent, to = "/", style = "", query = {}, behaveLikeLink = false } = properties;
    const link = new HtmlWidget(parent, "a");
    if (style.length !== 0) {
        link.element.classList.add(style);
    }
    link.element.text = text;
    if (!behaveLikeLink) {
        link.onPress = () => {
            //@ts-ignore
            globalThis.router.open(to, query);
        };
    }
    else {
        link.element.href = to;
        link.element.addEventListener("click", (e) => {
            e.preventDefault();
            //@ts-ignore
            globalThis.router.open(to, query);
        });
    }
    return link;
};
