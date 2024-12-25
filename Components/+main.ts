import { CreateLayout, Button } from "../Lib/index.js";
import { DOMRenderer } from "../Lib/index.js";
import { home } from "./style.js";

const homePage = CreateLayout("linear", "fillxy,vcenter", {
    styles: home.page,
});

Button("Hello World", {
    styles: home.button,
    parent: homePage,
});

Button("Hello World 2", {
    parent: homePage,
    styles: home.button,
});

setTimeout(() => {
    homePage.id = "Hello World";
}, 2500);
const appRoot = document.getElementById("app")!;
window.RENDERER = new DOMRenderer(appRoot, homePage);
