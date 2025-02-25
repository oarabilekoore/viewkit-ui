import {
    ShowIF,
    Router,
    Layout,
    Paragraph,
    Application,
    HorizontalRule,
    
} from "../Lib/+innerscope.ts";

import { PageRouterConfig } from "../Lib/router.ts";

import FilledButton from "./components/buttons.ts";
import FeatureGrid from "./components/featuregrid.ts";

import AboutPage from "./pages/about.ts";

const innerscope_app = new Application({
    title: "innerscope Framework",
    scrollbarvisibility: "hidden",
    allowzoom: false,
});

innerscope_app.onStart(LandingPage);

const routes: PageRouterConfig = {
    mode: "history",
    routes: [
        {
            path: "/",
            component: LandingPage,
        },
        {
            path: "/about",
            component: AboutPage,
        },
    ],
}
const router = new Router(innerscope_app.root, routes);

function LandingPage() {
    const page = Layout("linear", innerscope_app.root);
    page.scrollDirection("y");
    page.scrollBarVisibility("hidden");
    page.childAlignment("top", "vcenter", "vertical");

    page.style.backgroundColor = "#1e1e1e"; 
    page.style.color = "#ffffff"; 
    page.style.minHeight = "100vh";
    page.style.fontFamily = "Arial, sans-serif";

    // Hero Section
    const Hero = Layout("linear", page);
    Hero.style.padding = "64px 32px";
    Hero.style.textAlign = "center";
    Hero.childAlignment("center", "vertical", "fillxy");

    const HeroTitle = Paragraph("innerscope.ts", Hero);
    HeroTitle.style.fontSize = "2rem";
    HeroTitle.style.fontWeight = "bold";
    HeroTitle.style.marginBottom = "16px";

    HorizontalRule(Hero).style.width = "3rem";

    const HeroDescription = Paragraph(
        "innerscope is a lightweight, modern framework for building web apps. " +
            "It provides a simple and intuitive API for creating responsive, beautiful UIs.",
        Hero
    );
    HeroDescription.style.fontSize = "1.1rem";
    HeroDescription.style.color = "#cccccc";
    HeroDescription.style.marginBottom = "32px";

    FilledButton("Get Started", Hero).onclick = () => {
        router.Open("/about");
    };

    const installButton = FilledButton(`Why Innerscope ?`, page);

    ShowIF(installButton, true);
    
    // Features Section
    const features = Layout("linear", page);
    features.style.backgroundColor = "#252526"; 
    features.style.padding = "64px 32px";
    features.style.width = "100%";
    features.style.textAlign = "center";

    const featuresTitle = Paragraph("Features", features);
    featuresTitle.style.fontSize = "2rem";
    featuresTitle.style.fontWeight = "bold";
    featuresTitle.style.marginBottom = "32px";

    FeatureGrid(features)

    // Footer Section
    const footer = Layout("linear", page);
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