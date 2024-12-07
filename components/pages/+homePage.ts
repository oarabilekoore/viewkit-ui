import { PageLayout, Button, Text, Image } from "rosana";

// This is like the main app div that contains other smaller
// divs and html elements
const homePage = new PageLayout("linear", "fillxy, top");

// Then this is the like a div we built for the nav bar
const nav = new PageLayout("linear", "fillx, vcenter");
nav.SetSize(null, 52, "px");
nav.SetBackColor("white");
homePage.AddChild(nav);

Text(nav, `rosana.js Framework`, -1);

// Then here is the main content div
const body = new PageLayout("linear", "fillxy, vcenter");
body.SetChildMargins(0, 0, 0, 0.2);
body.SetBackColor("orange");
homePage.AddChild(body);

Image(body, "../rosana.png", -1, 0.1);

const btn = Button(body, "Hello World", -1, 0.05);
btn.SetOnTouch(() => {
    globalThis.app.router.navigate("/about");
});

export default homePage;
