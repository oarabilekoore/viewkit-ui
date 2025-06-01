import { LayoutConstructor, Widget } from "../../package/mod.ts";
import { app } from "../index.ts";

export default function AboutPage() {
    const page = new LayoutConstructor(app.root, "linear", ["testclass"]);
    page.ElementAlignment = "CENTER";
    page.ParentFill = "FILLXY";
    Widget.Paragraph(`You Are On The Get Started Page`, page);
}
