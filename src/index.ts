import { Application, PageRouterConfig } from "../Lib/+innerscope.ts";


import LandingPage from "./pages/index.ts";
import AboutPage from "./pages/about.ts";

const page_routes: PageRouterConfig = {
    mode: "history",
    routes: [
        {
            path: "/",
            component: LandingPage,
        },
        {
            path: "/about",
            component: AboutPage,
        },
    ],
}

export const app = new Application({
    title: "innerscope Framework",
    scrollbarvisibility: "hidden",
    statusbarcolor: "#252526",
    allowzoom: false,
    routes: page_routes
});

app.onStart(LandingPage);
