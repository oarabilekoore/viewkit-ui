import { widget, css } from "viewkit-ui";

export function createLandingPage(root) {
    // Main page layout
    const page = widget.LinearLayout(root);
    page.ParentFill = "FILLXY";
    page.LayoutDirection = "TOP_TO_BOTTOM";
    page.ElementAlignment = "CENTER";
    page.ScrollDirection = "VERTICAL";
    page.ScrollBarVisibility = "HIDDEN";

    // Styling
    page.DomElement.style.backgroundColor = "#1e1e1e";
    page.DomElement.style.color = "#ffffff";
    page.DomElement.style.fontFamily = "Arial, sans-serif";

    // Hero section
    const hero = widget.LinearLayout(page);
    hero.ElementAlignment = "CENTER";
    hero.LayoutDirection = "TOP_TO_BOTTOM";
    hero.DomElement.style.padding = "64px 32px";
    hero.DomElement.style.textAlign = "center";

    const title = widget.Heading1("Welcome to viewkit-ui", hero);
    title.style.fontSize = "3rem";
    title.style.marginBottom = "16px";

    const subtitle = widget.Paragraph("Build beautiful web apps with TypeScript", hero);
    subtitle.style.fontSize = "1.2rem";
    subtitle.style.color = "#cccccc";

    // CTA Button
    const ctaButton = widget.Button("Get Started", hero);
    ctaButton.onclick = function () {
        window.open("https://github.com/oarabilekoore/viewkit-ui/blob/main/INTRO.md");
    };
    const buttonStyle = css({
        backgroundColor: "#007acc",
        color: "#ffffff",
        padding: "16px 32px",
        border: "none",
        borderRadius: "8px",
        fontSize: "1.1rem",
        cursor: "pointer",
        marginTop: "32px",
        "&:hover": {
            backgroundColor: "#005a9e",
        },
    });
    ctaButton.classList.add(buttonStyle);
}
