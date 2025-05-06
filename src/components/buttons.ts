import { Button, Parent } from "innerscope";

export default function FilledButton(text: string, parent: Parent) {
    const button = Button(text, parent);
    button.style.backgroundColor = "#007acc";
    button.style.color = "#ffffff";
    button.style.padding = "12px 24px";
    button.style.borderRadius = "4px";
    button.style.border = "none";
    button.style.fontSize = "1rem";
    button.style.cursor = "pointer";
    button.style.marginBottom = "32px";
    button.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
    return button;
}
