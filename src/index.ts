import { Application, PageRouterConfig } from "../package/mod.ts";

import LandingPage from "./pages/index.ts";
import { page_routes } from "./routes.ts";

export const app = new Application({
    title: "innerscope Framework",
    scrollbarvisibility: "hidden",
    statusbarcolor: "#252526",
    allowzoom: false,
    routes: page_routes
});

app.onStart(LandingPage);
