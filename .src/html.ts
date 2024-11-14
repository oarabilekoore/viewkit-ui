import { componentController } from "./control.js";
import { $Element } from "./elements.js";

export const $Html: Record<string, (parent: componentController) => InstanceType<typeof $Element>> = {};

/**
 * Creates a paragraph (`<p>`) element.
 */
$Html.P = (parent: componentController): InstanceType<typeof $Element> => {
    return new $Element("p", parent);
};

/**
 * Creates a division (`<div>`) element.
 */
$Html.Div = (parent: componentController): InstanceType<typeof $Element> => {
    return new $Element("div", parent);
};

/**
 * Creates a span (`<span>`) element.
 */
$Html.Span = (parent: componentController): InstanceType<typeof $Element> => {
    return new $Element("span", parent);
};

/**
 * Creates an image (`<img>`) element.
 */
$Html.Image = (parent: componentController): InstanceType<typeof $Element> => {
    return new $Element("img", parent);
};

/**
 * Creates a button (`<button>`) element.
 */
$Html.Button = (parent: componentController): InstanceType<typeof $Element> => {
    return new $Element("button", parent);
};

/**
 * Creates an input (`<input>`) element.
 */
$Html.Input = (parent: componentController): InstanceType<typeof $Element> => {
    return new $Element("input", parent);
};

/**
 * Creates an unordered list (`<ul>`) element.
 */
$Html.Ul = (parent: componentController): InstanceType<typeof $Element> => {
    return new $Element("ul", parent);
};

/**
 * Creates a list item (`<li>`) element.
 */
$Html.Li = (parent: componentController): InstanceType<typeof $Element> => {
    return new $Element("li", parent);
};

/**
 * Creates a heading (`<h1>`) element.
 */
$Html.H1 = (parent: componentController): InstanceType<typeof $Element> => {
    return new $Element("h1", parent);
};

/**
 * Creates a heading (`<h2>`) element.
 */
$Html.H2 = (parent: componentController): InstanceType<typeof $Element> => {
    return new $Element("h2", parent);
};

/**
 * Creates an anchor (`<a>`) element.
 */
$Html.A = (parent: componentController): InstanceType<typeof $Element> => {
    return new $Element("a", parent);
};

/**
 * Creates a form (`<form>`) element.
 */
$Html.Form = (parent: componentController): InstanceType<typeof $Element> => {
    return new $Element("form", parent);
};
