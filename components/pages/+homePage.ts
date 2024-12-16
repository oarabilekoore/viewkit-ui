import { Container, Button, Text, Image } from "rosana";
import { home } from "../ui/styles";

// This is like the main app div that contains other smaller
// divs and html elements, we call these widgets
const homePage = new Container("linear", "fillxy, top");

// Then this is the like a div we built for the nav bar
const nav = new Container("linear", "fillx, vcenter", {
    parent: homePage,
    style: home.nav,
});

Text("rosana.js", {
    style: home.text,
    options: "p",
    parent: nav,
});

const body = new Container("linear", "fillxy, vcenter", {
    style: home.body,
    parent: homePage,
});

Image("../rosana.png", {
    style: home.image,
    parent: body,
}).element.ariaLabel = "Framework Logo";

Button("Hello World", {
    style: home.button,
    parent: body,
}).onPress = () => globalThis.router.navigateTo("/about");

export default homePage;
