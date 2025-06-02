import { PageRouterConfig } from "../package/mod";

import LandingPage from "./pages";
import AboutPage from "./pages/about";
import RandomPage from "./pages/randompage";

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
        {
            path: "/randompage",
            component: RandomPage,
        },
    ],
};
