import { $router, $createApp } from "rosana";
import homePage from "./.pages/+homePage.js";

const routes = [
    { path: "/", component: homePage },
    { path: "/about", component: () => import("./.pages/aboutPage.js") },
    { path: "/user/:id", component: () => import("./.pages/userPage.js") },
];

const router = new $router(routes);
router.setNotFound(() => import("./.pages/notFound.js"));
window.app = $createApp(homePage);

app.use(router).mount("#app");
