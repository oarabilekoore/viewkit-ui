import { Application, Router } from "../Lib/+innerscope.ts";
import { PageRouterConfig } from "../Lib/router.ts";

import LandingPage from "./pages/index.ts";
import AboutPage from "./pages/about.ts";

export const app = new Application({
    title: "innerscope Framework",
    scrollbarvisibility: "hidden",
    statusbarcolor: "#252526",
    allowzoom: false,
});

app.onStart(LandingPage);

const routes: PageRouterConfig = {
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
export const router = new Router(app.root, routes);

