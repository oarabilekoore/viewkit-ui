import { widget, signal } from "viewkit-ui";

function createContactForm(parent) {
    const formData = {
        name: signal(""),
        email: signal(""),
        message: signal(""),
    };

    const form = widget.Form(parent);
    form.style.maxWidth = "500px";
    form.style.margin = "0 auto";
    form.style.padding = "32px";

    // Name field
    const nameLabel = widget.Label("Name:", form);
    const nameInput = widget.TextInput(form);
    nameInput.placeholder = "Enter your name";
    nameInput.addEventListener("input", (e) => {
        formData.name.set(e.target.value);
    });

    // Email field
    const emailLabel = widget.Label("Email:", form);
    const emailInput = widget.EmailInput(form);
    emailInput.placeholder = "Enter your email";
    emailInput.addEventListener("input", (e) => {
        formData.email.set(e.target.value);
    });

    // Message field
    const messageLabel = widget.Label("Message:", form);
    const messageInput = widget.TextArea(form);
    messageInput.placeholder = "Enter your message";
    messageInput.rows = 5;
    messageInput.addEventListener("input", (e) => {
        formData.message.set(e.target.value);
    });

    // Submit button
    const submitBtn = widget.Button("Send Message", form);
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
