import { html, signal } from "../package/mod";

export function createContactform(parent) {
    const formData = {
        name: signal(""),
        email: signal(""),
        message: signal(""),
    };

    const form = html.form(parent);
    form.style.maxWidth = "500px";
    form.style.margin = "0 auto";
    form.style.padding = "32px";

    // Name field
    const namelabel = html.label("Name:", form);
    const nameInput = html.input(form);
    nameInput.type = "text";
    nameInput.placeholder = "Enter your name";
    nameInput.addEventListener("input", (e: Event) => {
        formData.name.set(e.target.value);
    });

    // Email field
    const emaillabel = html.label("Email:", form);
    const emailInput = html.input(form);
    emailInput.type = "email";
    emailInput.placeholder = "Enter your email";
    emailInput.addEventListener("input", (e) => {
        formData.email.set(e.target.value);
    });

    // Message field
    const messagelabel = html.label("Message:", form);
    const messageInput = html.textarea(form);
    messageInput.placeholder = "Enter your message";
    messageInput.rows = 5;
    messageInput.addEventListener("input", (e) => {
        formData.message.set(e.target.value);
    });

    // Submit button
    const submitBtn = html.button("Send Message", form);
    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log({
            name: formData.name.get(),
            email: formData.email.get(),
            message: formData.message.get(),
        });
    });

    // Style form elements
    [nameInput, emailInput, messageInput].forEach((input) => {
        input.style.width = "100%";
        input.style.padding = "12px";
        input.style.marginBottom = "16px";
        input.style.border = "1px solid #ccc";
        input.style.borderRadius = "4px";
    });
}
