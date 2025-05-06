import { LinearLayout, Paragraph, HorizontalRule, showIF } from "innerscope";
import FeatureGrid from "../components/featuregrid.ts";
import FilledButton from "../components/buttons.ts";
import { app } from "../index.ts";

export default function LandingPage() {
    const page = LinearLayout(app.root);
    page.ParentFill = "FILLXY";
    page.ScrollDirection = "VERTICAL";
    page.ElementAlignment = "VCENTER";
    page.ScrollBarVisibility = "HIDDEN";
    page.LayoutDirection = "TOP_TO_BOTTOM";

    page.style.backgroundColor = "#1e1e1e";
    page.style.color = "#ffffff";
    page.style.minHeight = "100vh";
    page.style.fontFamily = "Arial, sans-serif";

    const Hero = LinearLayout(page);
    Hero.style.padding = "64px 32px";
    Hero.style.textAlign = "center";
    Hero.ElementAlignment = "CENTER";
    Hero.ParentFill = "FILLXY";
    Hero.LayoutDirection = "TOP_TO_BOTTOM";

    const HeroTitle = Paragraph("innerscope.ts", Hero);
    HeroTitle.style.fontSize = "2rem";
    HeroTitle.style.fontWeight = "bold";
    HeroTitle.style.marginBottom = "16px";

    HorizontalRule(Hero).style.width = "3rem";

    const HeroDescription = Paragraph(
        "innerscope is a lightweight, modern framework for building web apps. " +
            "It provides a simple and intuitive API for creating responsive, beautiful UIs.",
        Hero,
    );
    HeroDescription.style.fontSize = "1.1rem";
    HeroDescription.style.color = "#cccccc";
    HeroDescription.style.marginBottom = "32px";

    FilledButton("Get Started", Hero).onclick = () => {
        app.openRoute("/about");
    };

    const installButton = FilledButton(`Why Innerscope ?`, page);

    showIF(installButton, true);

    const features = LinearLayout(page);
    features.LayoutDirection = "TOP_TO_BOTTOM";
    features.ElementAlignment = "VCENTER";
    features.style.backgroundColor = "#252526";
    features.style.padding = "64px 32px";
    features.style.width = "100%";
    features.style.textAlign = "center";

    const featuresTitle = Paragraph("Features", features);
    featuresTitle.style.fontSize = "2rem";
    featuresTitle.style.fontWeight = "bold";
    featuresTitle.style.marginBottom = "32px";

    FeatureGrid(features);

    // Footer Section
    const footer = LinearLayout(page);
    footer.LayoutDirection = "TOP_TO_BOTTOM";
    footer.ElementAlignment = "VCENTER";
    footer.ParentFill = "FILLXY";
    footer.style.backgroundColor = "#1e1e1e";
    footer.style.color = "#ffffff";
    footer.style.padding = "32px";
    footer.style.width = "100%";
    footer.style.textAlign = "center";
    footer.style.marginTop = "64px";

    const footerText = Paragraph("© 2025 innerscope Framework. All rights reserved.", footer);
    footerText.style.fontSize = "0.9rem";
    footerText.style.opacity = "0.8";
}
