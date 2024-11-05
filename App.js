// Main Testing Script

import { $createApp, $hashRouter } from "./.src/reckt.core.js";

import { homePage } from "./.pages/index.js";

const routes = [{ path: "index", component: homePage }];
const router = $hashRouter(routes);

window.app = $createApp(homePage).use(router).mount("#app");
