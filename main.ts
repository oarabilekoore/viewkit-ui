import { Layout, Button } from "droidxl";

const page = Layout("linear", "fillxy center");
page.BindToPage();

const button = Button("Hello World", page, {
    onclick: () => alert("Hello World"),
    id: "hello-world-button",
}).SetEnabled(false);
