import { widget, Parent } from "../../package/mod.ts";

export default function FeatureGrid(parent: Parent | HTMLDivElement) {
    const featureGrid = widget.GridLayout(parent);
    featureGrid.DomElement.style.display = "grid";
    featureGrid.DomElement.style.gridTemplateColumns = "repeat(auto-fit, minmax(250px, 1fr))";
    featureGrid.DomElement.style.gap = "32px";
    featureGrid.DomElement.style.maxWidth = "1200px";
    featureGrid.DomElement.style.margin = "0 auto";

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
        const featureCard = widget.LinearLayout(featureGrid);
        featureCard.LayoutDirection = "TOP_TO_BOTTOM";
        featureCard.ElementAlignment = "VCENTER";
        featureCard.DomElement.style.backgroundColor = "#2d2d2d";
        featureCard.DomElement.style.margin = "15px";
        featureCard.DomElement.style.padding = "24px";
        featureCard.DomElement.style.borderRadius = "8px";
        featureCard.DomElement.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
        featureCard.DomElement.style.textAlign = "center";

        const featureIcon = widget.Paragraph(feature.icon, featureCard);
        featureIcon.style.fontSize = "2rem";
        featureIcon.style.marginBottom = "16px";

        const featureTitle = widget.Paragraph(feature.title, featureCard);
        featureTitle.style.fontSize = "1.5rem";
        featureTitle.style.fontWeight = "bold";
        featureTitle.style.marginBottom = "8px";

        const featureDescription = widget.Paragraph(feature.description, featureCard);
        featureDescription.style.fontSize = "1rem";
        featureDescription.style.color = "#cccccc";
    });
}
