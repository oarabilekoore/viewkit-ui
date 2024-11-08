import { $createApp, $hashRouter } from "rosana";

import { homePage } from "./.pages/index.js";
import { aboutPage } from "./.pages/about.js";

const routes = [
    { path: "index", component: homePage },
    { path: "about", component: aboutPage },
];
const router = $hashRouter(routes);

window.app = $createApp(homePage).use(router).mount("#app");
