import FeatureGrid from "../components/grid.ts";
import FilledButton from "../components/buttons.ts";

import { Widget } from "../../package/mod.ts";
import { app } from "../index.ts";

export default function LandingPage() {
    const page = Widget.LinearLayout(app.root);
    page.ParentFill = "FILLXY";
    page.ScrollDirection = "VERTICAL";
    page.ElementAlignment = "VCENTER";
    page.ScrollBarVisibility = "HIDDEN";
    page.LayoutDirection = "TOP_TO_BOTTOM";

    page.DomElement.style.backgroundColor = "#1e1e1e";
    page.DomElement.style.color = "#ffffff";
    page.DomElement.style.minHeight = "100vh";
    page.DomElement.style.fontFamily = "Arial, sans-serif";

    const Hero = Widget.LinearLayout(page);
    Hero.DomElement.style.padding = "64px 32px";
    Hero.DomElement.style.textAlign = "center";
    Hero.ElementAlignment = "CENTER";
    Hero.ParentFill = "FILLXY";
    Hero.LayoutDirection = "TOP_TO_BOTTOM";

    const HeroTitle = Widget.Paragraph(Hero, "viewkit.ui.ts");
    HeroTitle.style.fontSize = "2rem";
    HeroTitle.style.fontWeight = "bold";
    HeroTitle.style.marginBottom = "16px";

    Widget.HorizontalRule(Hero).style.width = "3rem";

    const HeroDescription = Widget.Paragraph(
        "viewkit.ui is a lightweight, modern framework for building web apps. " +
            "It provides a simple and intuitive API for creating responsive, beautiful UIs.",
        Hero
    );
    HeroDescription.style.fontSize = "1.1rem";
    HeroDescription.style.color = "#cccccc";
    HeroDescription.style.marginBottom = "32px";

    FilledButton("Get Started", Hero).onclick = () => {
        app.openRoute("/about");
    };

    FilledButton(`Why viewkit.ui ?`, page);

    const features = Widget.LinearLayout(page);
    features.LayoutDirection = "TOP_TO_BOTTOM";
    features.ElementAlignment = "VCENTER";
    features.DomElement.style.backgroundColor = "#252526";
    features.DomElement.style.padding = "64px 32px";
    features.DomElement.style.width = "100%";
    features.DomElement.style.textAlign = "center";

    const featuresTitle = Widget.Paragraph("Features", features);
    featuresTitle.style.fontSize = "2rem";
    featuresTitle.style.fontWeight = "bold";
    featuresTitle.style.marginBottom = "32px";

    FeatureGrid(features);

    // Footer Section
    const footer = Widget.LinearLayout(page);
    footer.LayoutDirection = "TOP_TO_BOTTOM";
    footer.ElementAlignment = "VCENTER";
    footer.ParentFill = "FILLXY";
    footer.DomElement.style.backgroundColor = "#1e1e1e";
    footer.DomElement.style.color = "#ffffff";
    footer.DomElement.style.padding = "32px";
    footer.DomElement.style.width = "100%";
    footer.DomElement.style.textAlign = "center";
    footer.DomElement.style.marginTop = "64px";

    const footerText = Widget.Paragraph("© 2025 viewkit.ui Framework. All rights reserved.", footer);
    footerText.style.fontSize = "0.9rem";
    footerText.style.opacity = "0.8";
}
