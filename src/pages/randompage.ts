import { LayoutConstructor, Widget } from "../../package/mod.ts";
import { app } from "../index.ts";

export default function RandomPage() {
    const page = new LayoutConstructor(app.root, "linear", ["testclass"]);
    page.ElementAlignment = "CENTER";
    page.DomElement.style.backgroundColor = "yellow";
    page.ParentFill = "INHERIT";
    Widget.Paragraph(`You Are On A Random Page`, page);
    return page.DomElement;
}
