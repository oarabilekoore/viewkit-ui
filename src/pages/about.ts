import { LayoutConstructor, Widget } from "../../package/mod.ts";
import FilledButton from "../components/buttons.ts";

const root = document.getElementById("root");
export default function AboutPage() {
    const page = new LayoutConstructor(root, "linear", ["testclass"]);
    page.ElementAlignment = "VCENTER";
    page.LayoutDirection = "TOP_TO_BOTTOM";
    page.ParentFill = "FILLXY";
    Widget.Paragraph(`You Are On The Get Started Page`, page);
}
