import { $Element } from "./elements.js";
// Use InstanceType to derive the type of $Element instances.
export const $Html = {};
/**
 * Creates a paragraph (`<p>`) element.
 */
$Html.P = (parent) => {
    return new $Element("p", parent);
};
/**
 * Creates a division (`<div>`) element.
 */
$Html.Div = (parent) => {
    return new $Element("div", parent);
};
/**
 * Creates a span (`<span>`) element.
 */
$Html.Span = (parent) => {
    return new $Element("span", parent);
};
/**
 * Creates an image (`<img>`) element.
 */
$Html.Image = (parent) => {
    return new $Element("img", parent);
};
/**
 * Creates a button (`<button>`) element.
 */
$Html.Button = (parent) => {
    return new $Element("button", parent);
};
/**
 * Creates an input (`<input>`) element.
 */
$Html.Input = (parent) => {
    return new $Element("input", parent);
};
/**
 * Creates an unordered list (`<ul>`) element.
 */
$Html.Ul = (parent) => {
    return new $Element("ul", parent);
};
/**
 * Creates a list item (`<li>`) element.
 */
$Html.Li = (parent) => {
    return new $Element("li", parent);
};
/**
 * Creates a heading (`<h1>`) element.
 */
$Html.H1 = (parent) => {
    return new $Element("h1", parent);
};
/**
 * Creates a heading (`<h2>`) element.
 */
$Html.H2 = (parent) => {
    return new $Element("h2", parent);
};
/**
 * Creates an anchor (`<a>`) element.
 */
$Html.A = (parent) => {
    return new $Element("a", parent);
};
/**
 * Creates a form (`<form>`) element.
 */
$Html.Form = (parent) => {
    return new $Element("form", parent);
};
