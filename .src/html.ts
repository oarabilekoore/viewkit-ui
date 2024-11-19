import type { rosanaComponent } from "./control.js";
import { $Element } from "./elements.js";

/**
 * Utility function to validate HTML tags.
 */
const isValidHtmlTag = (tag: string): boolean => {
    return document.createElement(tag).toString() !== "[object HTMLUnknownElement]";
};

/**
 * Creates a generic HTML element with the provided tag.
 */
const createHtmlElement = (parent: rosanaComponent, tag: string): InstanceType<typeof $Element> => {
    if (!isValidHtmlTag(tag)) {
        throw new Error(`Invalid HTML tag: ${tag}`);
    }
    return new $Element(tag, parent);
};

// Define the $Html object with explicit function types
const $Html: Record<string, (parent: rosanaComponent, tag?: string) => InstanceType<typeof $Element>> = {};

/**
 * Creates a paragraph (`<p>`) element.
 */
$Html.P = (parent: rosanaComponent): InstanceType<typeof $Element> => {
    return createHtmlElement(parent, "p");
};

/**
 * Creates a division (`<div>`) element.
 */
$Html.Div = (parent: rosanaComponent): InstanceType<typeof $Element> => {
    return createHtmlElement(parent, "div");
};

/**
 * Creates a span (`<span>`) element.
 */
$Html.Span = (parent: rosanaComponent): InstanceType<typeof $Element> => {
    return createHtmlElement(parent, "span");
};

/**
 * Creates an image (`<img>`) element.
 */
$Html.Image = (parent: rosanaComponent): InstanceType<typeof $Element> => {
    return createHtmlElement(parent, "img");
};

/**
 * Creates a button (`<button>`) element.
 */
$Html.Button = (parent: rosanaComponent): InstanceType<typeof $Element> => {
    return createHtmlElement(parent, "button");
};

/**
 * Creates an input (`<input>`) element.
 */
$Html.Input = (parent: rosanaComponent): InstanceType<typeof $Element> => {
    return createHtmlElement(parent, "input");
};

/**
 * Creates an unordered list (`<ul>`) element.
 */
$Html.Ul = (parent: rosanaComponent): InstanceType<typeof $Element> => {
    return createHtmlElement(parent, "ul");
};

/**
 * Creates a list item (`<li>`) element.
 */
$Html.Li = (parent: rosanaComponent): InstanceType<typeof $Element> => {
    return createHtmlElement(parent, "li");
};

/**
 * Creates a heading (`<h1>`) element.
 */
$Html.H1 = (parent: rosanaComponent): InstanceType<typeof $Element> => {
    return createHtmlElement(parent, "h1");
};

/**
 * Creates a heading (`<h2>`) element.
 */
$Html.H2 = (parent: rosanaComponent): InstanceType<typeof $Element> => {
    return createHtmlElement(parent, "h2");
};

/**
 * Creates an anchor (`<a>`) element.
 */
$Html.A = (parent: rosanaComponent): InstanceType<typeof $Element> => {
    return createHtmlElement(parent, "a");
};

/**
 * Creates a form (`<form>`) element.
 */
$Html.Form = (parent: rosanaComponent): InstanceType<typeof $Element> => {
    return createHtmlElement(parent, "form");
};

/**
 * Creates a generic HTML element.
 */
$Html.Obj = (parent: rosanaComponent, tag: string = "div"): InstanceType<typeof $Element> => {
    return createHtmlElement(parent, tag);
};

export default $Html;
