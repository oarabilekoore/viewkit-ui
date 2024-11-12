import { componentController } from "./control.js";
import { $Element } from "./elements.js";
export const $Html = Object();

/**
 * Creates a paragraph (`<p>`) element.
 * @function
 * @param {componentController} parent
 */

$Html.P = (parent) => {
    return new $Element("p", parent);
};

/**
 * Creates a division (`<div>`) element.
 * @function
 * @param {componentController} parent
 */

$Html.Div = (parent) => {
    return new $Element("div", parent);
};

/**
 * Creates a span (`<span>`) element.
 * @function
 * @param {componentController} parent
 */

$Html.Span = (parent) => {
    return new $Element("span", parent);
};

/**
 * Creates an image (`<img>`) element.
 * @function
 * @param {componentController} parent
 */

$Html.Image = (parent) => {
    return new $Element("img", parent);
};

/**
 * Creates a button (`<button>`) element.
 * @function
 * @param {componentController} parent
 */

$Html.Button = (parent) => {
    return new $Element("button", parent);
};

/**
 * Creates an input (`<input>`) element.
 * @function
 * @param {componentController} parent
 */

$Html.Input = (parent) => {
    return new $Element("input", parent);
};

/**
 * Creates an unordered list (`<ul>`) element.
 * @function
 * @param {componentController} parent
 */

$Html.Ul = (parent) => {
    return new $Element("ul", parent);
};

/**
 * Creates a list item (`<li>`) element.
 * @function
 * @param {componentController} parent
 */

$Html.Li = (parent) => {
    return new $Element("li", parent);
};

/**
 * Creates a heading (`<h1>`) element.
 * @function
 * @param {componentController} parent
 */

$Html.H1 = (parent) => {
    return new $Element("h1", parent);
};

/**
 * Creates a heading (`<h2>`) element.
 * @function
 * @param {componentController} parent
 */

$Html.H2 = (parent) => {
    return new $Element("h2", parent);
};

/**
 * Creates an anchor (`<a>`) element.
 * @function
 * @param {componentController} parent
 * @param {componentController} parent
 */

$Html.A = (parent) => {
    return new $Element("a", parent);
};

/**
 * Creates a form (`<form>`) element.
 * @function
 * @param {componentController} parent
 */

$Html.Form = (parent) => {
    return new $Element("form", parent);
};
