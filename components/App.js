import { renderApplication, pageRouter } from "rosana";
import homePage from "./pages/+homePage";

const routes = [
    { path: "/", component: homePage },
    {
        path: "/about",
        component: function () {
            return import("./pages/aboutPage");
        },
    },
];

globalThis.router = pageRouter(routes);
globalThis.router.setNotFound(() => {
    return import("./pages/+notFound");
});
globalThis.router.init();

renderApplication(homePage).mountView("#app");
