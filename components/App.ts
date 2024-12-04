import { BootstrapApplication, PageRouter } from "../dist/";
import homePage from "./pages/+homePage";

const routes = [
    { path: "/", component: homePage },
    {
        path: "/about",
        component: function () {
            return import("../components/pages/aboutPage");
        },
    },
];

//@ts-ignore
const router = PageRouter(routes);
router.setNotFound(() => import("./pages/+notFound"));
globalThis.app = BootstrapApplication(homePage);
globalThis.app.mountView("#app").usePlugin(router);
