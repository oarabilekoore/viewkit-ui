import { $Router, $MountApp } from "rosana";
import homePage from "./.pages/+homePage.js";

const routes = [
    { path: "/", component: homePage },
    { path: "/about", component: () => import("./.pages/aboutPage.js") },
];

window.app = $MountApp(homePage);
const router = $Router(routes);

app.use(router).mount("#app");
