import { widget, signal, css } from "viewkit-ui";

function createCounter(parent) {
    const count = signal(0);

    const container = widget.LinearLayout(parent);
    container.ElementAlignment = "CENTER";
    container.LayoutDirection = "TOP_TO_BOTTOM";
    container.DomElement.style.padding = "32px";

    // Display
    const display = widget.Heading2(`Count: ${count.get()}`, container);
    display.style.marginBottom = "24px";

    // Buttons container
    const buttons = widget.LinearLayout(container);
    buttons.LayoutDirection = "LEFT_TO_RIGHT";
    buttons.ElementAlignment = "CENTER";
    buttons.DomElement.style.gap = "16px";

    // Decrement button
    const decrementBtn = widget.Button("-", buttons);
    decrementBtn.addEventListener("click", () => {
        count.set(count.get() - 1);
    });

    // Increment button
    const incrementBtn = widget.Button("+", buttons);
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
