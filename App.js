import { $createApp, $hashRouter } from "rosana";

import { homePage } from "./.pages/index.js";
import { aboutPage } from "./.pages/about.js";
import { userPage } from "./.pages/user.js";
const routes = [
    { path: "/", component: homePage },
    { path: "/about", component: aboutPage },
    { path: "/user/:id", component: userPage },
];
const router = $hashRouter(routes);

window.app = $createApp(homePage).use(router).mount("#app");
