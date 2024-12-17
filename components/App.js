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

pageRouter(routes);
renderApplication(homePage).mountView("#app");
