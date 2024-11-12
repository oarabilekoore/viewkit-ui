import { $router, $createApp } from "rosana";
import homePage from "./.pages/index.js";

const routes = [
    { path: "/", component: homePage },
    { path: "/about", component: () => import("./.pages/about.js") },
    { path: "/user/:id", component: () => import("./.pages/user.js") },
];

const router = new $router(routes);
router.setNotFound(() => import("./.pages/404.js"));
window.app = $createApp(homePage);

app.use(router).mount("#app");
