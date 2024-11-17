import { $Html } from "rosana";

export const navigationBar = function (parent) {
    let nav = $Html.Div(parent);
    nav.css`
    position: relative;
    top: 0;
    left: 0;
    z-index: 20;
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 64px;
    color: black;
    background: linear-gradient(black, black) left bottom / 100% 2px repeat-x;
    background-size: 10px 1px;
    background-clip: content-box;
    `;

    let text = $Html.Span(nav);
    text.batch({
        textContent: "RosanaJs",
    });
    text.alignment("right");
    text.css`
    font-family: "Chokokutai", system-ui;
    font-weight: 700;
    font-size: 16px;
    letter-spacing: 0.2px;
    text-rendering: optimize-legibility;
    text-size-adjust: 100%;
    line-height: 24px;
    font-style: normal;
    color: #ff4500;
    `;

    return nav;
};

export const navigationBarB = function (parent) {
    let nav = $Html.Div(parent);

    // Apply CSS styles to the nav element
    nav.css`
        position: relative;
        top: 0;
        left: 0;
        z-index: 20;
        box-sizing: border-box;
        display: block;
        width: 100%;
        height: 64px;
        color: black;
        background: linear-gradient(black, black) left bottom / 100% 2px repeat-x;
        background-size: 10px 1px;
        background-clip: content-box;
    `;

    // Create a text element inside the nav
    let text = $Html.Span(nav);
    text.alignment("right");

    // Apply CSS styles to the text element
    text.css`
        font-family: "Chokokutai", system-ui;
        font-weight: 700;
        font-size: 16px;
        letter-spacing: 0.2px;
        text-rendering: optimize-legibility;
        text-size-adjust: 100%;
        line-height: 24px;
        font-style: normal;
        color: #ff4500;
    `;

    // Store reference to text for future updates in the name method
    nav.text = text;

    // Add the `.name` method directly to `nav`
    nav.name = function (txt) {
        if (this.text) {
            this.text.element.textContent = txt; // Update text content dynamically
        }
    };

    // Return the nav element
    return nav;
};
