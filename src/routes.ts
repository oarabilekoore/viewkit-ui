import { PageRouterConfig } from "../package/mod";

import LandingPage from "./pages";
import AboutPage from "./pages/about";

export const page_routes: PageRouterConfig = {
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
};
