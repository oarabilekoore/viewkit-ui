import { $Element } from "./elements.js";
/**
 * Utility function to validate HTML tags.
 */
const isValidHtmlTag = (tag) => {
    return document.createElement(tag).toString() !== "[object HTMLUnknownElement]";
};
/**
 * Creates a generic HTML element with the provided tag.
 */
const createHtmlElement = (parent, tag) => {
    if (!isValidHtmlTag(tag)) {
        throw new Error(`Invalid HTML tag: ${tag}`);
    }
    return new $Element(tag, parent);
};
// Define the $Html object with explicit function types
const $Html = {};
/**
 * Creates a paragraph (`<p>`) element.
 */
$Html.P = (parent) => {
    return createHtmlElement(parent, "p");
};
/**
 * Creates a division (`<div>`) element.
 */
$Html.Div = (parent) => {
    return createHtmlElement(parent, "div");
};
/**
 * Creates a span (`<span>`) element.
 */
$Html.Span = (parent) => {
    return createHtmlElement(parent, "span");
};
/**
 * Creates an image (`<img>`) element.
 */
$Html.Image = (parent) => {
    return createHtmlElement(parent, "img");
};
/**
 * Creates a button (`<button>`) element.
 */
$Html.Button = (parent) => {
    return createHtmlElement(parent, "button");
};
/**
 * Creates an input (`<input>`) element.
 */
$Html.Input = (parent) => {
    return createHtmlElement(parent, "input");
};
/**
 * Creates an unordered list (`<ul>`) element.
 */
$Html.Ul = (parent) => {
    return createHtmlElement(parent, "ul");
};
/**
 * Creates a list item (`<li>`) element.
 */
$Html.Li = (parent) => {
    return createHtmlElement(parent, "li");
};
/**
 * Creates a heading (`<h1>`) element.
 */
$Html.H1 = (parent) => {
    return createHtmlElement(parent, "h1");
};
/**
 * Creates a heading (`<h2>`) element.
 */
$Html.H2 = (parent) => {
    return createHtmlElement(parent, "h2");
};
/**
 * Creates an anchor (`<a>`) element.
 */
$Html.A = (parent) => {
    return createHtmlElement(parent, "a");
};
/**
 * Creates a form (`<form>`) element.
 */
$Html.Form = (parent) => {
    return createHtmlElement(parent, "form");
};
/**
 * Creates a generic HTML element.
 */
$Html.Obj = (parent, tag = "div") => {
    return createHtmlElement(parent, tag);
};
export default $Html;
