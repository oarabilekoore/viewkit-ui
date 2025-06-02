import { LayoutConstructor, Widget } from "../../package/mod.ts";
import FilledButton from "../components/buttons.ts";
import { app } from "../index.ts";

export default function AboutPage() {
    const page = new LayoutConstructor(app.root, "linear", ["testclass"]);
    page.ElementAlignment = "VCENTER";
    page.LayoutDirection = "TOP_TO_BOTTOM";
    page.ParentFill = "FILLXY";
    Widget.Paragraph(`You Are On The Get Started Page`, page);

    FilledButton("Open A RandomPage", page).onclick = () => {
        app.openRoute("/randompage");
    };

    FilledButton("Open A AboutPage", page).onclick = () => {
        app.openRoute("/about");
    };
    const page_handler = new LayoutConstructor(page, "linear", ["testclass"]);
    page_handler.ElementAlignment = "CENTER";
    page_handler.DomElement.style.width = "400px";
    page_handler.DomElement.style.backgroundColor = "black";
    page_handler.DomElement.style.height = "400px";

    app.setRouteView(page_handler);
}
