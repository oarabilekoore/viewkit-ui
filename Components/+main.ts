import { CreateLayout, Button } from "../Lib/";
import { DOMRenderer } from "../Lib";
import { home } from "./style";

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

const appRoot = document.getElementById("app")!;
window.RENDERER = new DOMRenderer(appRoot, homePage);
