import { Application, Layout, Button, Paragraph, HorizontalRule, showIF } from "./Lib/+innerscope.ts";
import { PageRouter } from "./Lib/router.ts"

import AboutPage from "./Components/Pages/about.ts"

const app = new Application({
    title: "innerscope Framework",
    icon: "./innerscope.png",
    statusbarcolor: "#1e1e1e",
});

app.onStart(LandingPage);

const router = new PageRouter(app.root, {
    mode: "history",
    routes: [
        {
            path: "/",
            component: LandingPage
        }, 
        {
            path: "/about",
            component: AboutPage
        }
    ]
})

function LandingPage() {
    // Create a linear layout for the page
    const page = Layout("linear", app.root);
    page.scrollDirection("vertical");
    page.scrollBarVisibility("hide");
    page.childAlignment('top', 'vcenter', 'vertical');

    // Set page styles
    page.style.backgroundColor = "#1e1e1e"; // Dark background
    page.style.color = "#ffffff"; // White text
    page.style.minHeight = "100vh"; // Full height
    page.style.fontFamily = "Arial, sans-serif"; // Modern font

    // Hero Section
    const hero = Layout("linear", page);
    hero.style.padding = "64px 32px";
    hero.style.textAlign = "center";
    hero.childAlignment("center", "vertical", "fillxy");

    const heroTitle = Paragraph("innerscope.ts", hero);
    heroTitle.style.fontSize = "2rem";
    heroTitle.style.fontWeight = "bold";
    heroTitle.style.marginBottom = "16px";

    HorizontalRule(hero).style.width = '3rem'

    const heroDescription = Paragraph(
        "innerscope is a lightweight, modern framework for building web applications. " +
            "It provides a simple and intuitive API for creating responsive, beautiful UIs.",
        hero,
    );
    heroDescription.style.fontSize = "1.1rem";
    heroDescription.style.color = "#cccccc"; // Light gray text
    heroDescription.style.marginBottom = "32px";

    const ctaButton = Button("Get Started", hero);
    ctaButton.style.backgroundColor = "#007acc"; // Blue accent color
    ctaButton.style.color = "#ffffff"; // White text
    ctaButton.style.padding = "12px 24px";
    ctaButton.style.borderRadius = "4px";
    ctaButton.style.border = "none";
    ctaButton.style.fontSize = "1rem";
    ctaButton.style.cursor = "pointer";
    ctaButton.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)"; // Shadow for elevation

    ctaButton.onclick = () => {
        router.Open('/about')
    };

    const installButton = Button(`Why Innerscope ?`, page);
    installButton.style.backgroundColor = "#007acc"; // Blue accent color
    installButton.style.color = "#ffffff"; // White text
    installButton.style.padding = "12px 24px";
    installButton.style.borderRadius = "4px";
    installButton.style.border = "none";
    installButton.style.fontSize = "1rem";
    installButton.style.cursor = "pointer";
    installButton.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)"; // Shadow for elevation
    installButton.style.marginBottom = "32px";

    showIF(installButton, true)

    // Features Section
    const features = Layout("linear", page);
    features.style.backgroundColor = "#252526"; // Dark background
    features.style.padding = "64px 32px";
    features.style.width = "100%";
    features.style.textAlign = "center";

    const featuresTitle = Paragraph("Features", features);
    featuresTitle.style.fontSize = "2rem";
    featuresTitle.style.fontWeight = "bold";
    featuresTitle.style.marginBottom = "32px";

    const featureGrid = Layout("grid", features);
    featureGrid.style.display = "grid";
    featureGrid.style.gridTemplateColumns = "repeat(auto-fit, minmax(250px, 1fr))";
    featureGrid.style.gap = "32px";
    featureGrid.style.maxWidth = "1200px";
    featureGrid.style.margin = "0 auto";

    const featureData = [
        {
            title: "Simple API",
            description: "Intuitive and easy-to-use API for building UIs.",
            icon: "🚀",
        },
        {
            title: "Responsive Design",
            description: "Build apps that look great on any device.",
            icon: "📱",
        },
        {
            title: "Lightweight",
            description: "Minimal footprint for fast performance.",
            icon: "⚡",
        },
    ];

    featureData.forEach((feature) => {
        const featureCard = Layout("linear", featureGrid);
        featureCard.style.backgroundColor = "#2d2d2d"; // Dark card background
        featureCard.style.padding = "24px";
        featureCard.style.borderRadius = "8px";
        featureCard.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)"; // Shadow for elevation
        featureCard.style.textAlign = "center";

        const featureIcon = Paragraph(feature.icon, featureCard);
        featureIcon.style.fontSize = "2rem";
        featureIcon.style.marginBottom = "16px";

        const featureTitle = Paragraph(feature.title, featureCard);
        featureTitle.style.fontSize = "1.5rem";
        featureTitle.style.fontWeight = "bold";
        featureTitle.style.marginBottom = "8px";

        const featureDescription = Paragraph(feature.description, featureCard);
        featureDescription.style.fontSize = "1rem";
        featureDescription.style.color = "#cccccc"; // Light gray text
    });

    // Footer Section
    const footer = Layout("linear", page);
    footer.style.backgroundColor = "#1e1e1e"; // Dark background
    footer.style.color = "#ffffff"; // White text
    footer.style.padding = "32px";
    footer.style.width = "100%";
    footer.style.textAlign = "center";
    footer.style.marginTop = "64px";

    const footerText = Paragraph("© 2025 innerscope Framework. All rights reserved.", footer);
    footerText.style.fontSize = "0.9rem";
    footerText.style.opacity = "0.8";
}
