import { html } from "../../package/mod.ts";

export default function FeatureGrid(parent: HTMLElement) {
    const featureGrid = html.Div(parent);
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

    3;
    featureData.forEach((feature) => {
        const featureCard = html.Div(featureGrid);
        featureCard.classList.add("to_to_bottom", "vcenter");
        featureCard.style.backgroundColor = "#2d2d2d";
        featureCard.style.margin = "15px";
        featureCard.style.padding = "24px";
        featureCard.style.borderRadius = "8px";
        featureCard.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
        featureCard.style.textAlign = "center";

        const featureIcon = html.Paragraph(feature.icon, featureCard);
        featureIcon.style.fontSize = "2rem";
        featureIcon.style.marginBottom = "16px";

        const featureTitle = html.Paragraph(feature.title, featureCard);
        featureTitle.style.fontSize = "1.5rem";
        featureTitle.style.fontWeight = "bold";
        featureTitle.style.marginBottom = "8px";

        const featureDescription = html.Paragraph(feature.description, featureCard);
        featureDescription.style.fontSize = "1rem";
        featureDescription.style.color = "#cccccc";
    });
}
