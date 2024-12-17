import { Container, Heading, Image, Link } from "rosana";
import { home } from "../ui/styles";

// This is like the main app div that contains other smaller
// divs and html elements, we call these widgets
const homePage = new Container("linear", "fillxy, top");

// Then this is the like a div we built for the nav bar
const nav = new Container("linear", "fillx, vcenter", {
    parent: homePage,
    style: home.nav,
});

Heading("rosana.js", 1, {
    style: home.text,
    parent: nav,
});

const body = new Container("linear", "fillxy, vcenter", {
    style: home.body,
    parent: homePage,
});

Image("../rosana.png", {
    style: home.image,
    parent: body,
});

Link("Hello World", {
    style: home.button,
    to: "/about",
    parent: body,
});

export default homePage;
