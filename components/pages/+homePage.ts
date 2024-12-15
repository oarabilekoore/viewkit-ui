import { Container, Button, Text, Image } from "rosana";

// This is like the main app div that contains other smaller
// divs and html elemContainerents
const homePage = new Container("linear", "fillxy, top");

// Then this is the like a div we built for the nav bar
const nav = new Container("linear", "fillx, vcenter", {
    parent: homePage,
    height: 0.05,
});

nav.backColor("white");

Text("rosana.js", {
    options: "p",
    width: 0.1,
    height: -1,
    parent: nav,
});

// Then here is the main content div
const body = new Container("linear", "fillxy, vcenter", {
    parent: homePage,
});

body.childMargins(0, 0, 0, 0.2);
body.backColor("orange");

Image("../rosana.png", {
    width: 0.1,
    height: -1,
    parent: body,
}).setDescription("Framework Logo");

const btn = Button("Hello World", {
    width: 0.1,
    height: -1,
    parent: body,
});

btn.onPress = () => globalThis.router.navigateTo("/about");

export default homePage;
