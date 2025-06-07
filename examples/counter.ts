import { html, signal, css } from "viewkit-ui";

export function createCounter(parent) {
    const count = signal(0);

    const container = html.LinearLayout(parent);
    container.classList.add("center", "top_to_bottom");
    container.style.padding = "32px";

    // Display
    const display = html.Heading2(`Count: ${count.get()}`, container);
    display.style.marginBottom = "24px";

    // Buttons container
    const buttons = html.LinearLayout(container);
    buttons.LayoutDirection = "LEFT_TO_RIGHT";
    buttons.ElementAlignment = "CENTER";
    buttons.DomElement.style.gap = "16px";

    // Decrement button
    const decrementBtn = html.Button("-", buttons);
    decrementBtn.addEventListener("click", () => {
        count.set(count.get() - 1);
    });

    // Increment button
    const incrementBtn = html.Button("+", buttons);
    incrementBtn.addEventListener("click", () => {
        count.set(count.get() + 1);
    });

    // Style buttons
    const buttonStyle = css({
        padding: "12px 24px",
        fontSize: "1.2rem",
        border: "2px solid #007acc",
        backgroundColor: "transparent",
        color: "#007acc",
        borderRadius: "4px",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#007acc",
            color: "#ffffff",
        },
    });

    decrementBtn.classList.add(buttonStyle);
    incrementBtn.classList.add(buttonStyle);

    // Update display when count changes
    count.subscribe((newValue) => {
        display.textContent = `Count: ${newValue}`;
    });
}
