import { Application, Layout, Button } from "./Lib/index.js";

const app = new Application({
    title: "droidxl App",
    icon: "./droidxl.png",
    statusbarcolor: "green",
});

const layout = Layout("linear", app.root);
layout.alignChildren = "center";
layout.parentFill = "xy";

Button("Click me", layout);
