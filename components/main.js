import { createApp, createRouter } from "rosana";
import homePage from "./pages/+homePage";

const routes = [
    { path: "/", component: homePage },
    { path: "/about", component: () => import("./pages/aboutPage") },
];

const router = createRouter(routes);
router.setNotFound(() => import("./pages/+notFound"));
window.app = createApp(homePage);
app.mountView("#app");
app.usePlugin(router);
