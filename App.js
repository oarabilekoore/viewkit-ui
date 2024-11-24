import { CreateApp } from "droidscript-native-for-web";

import homePage from "./pages/+homePage";

const app = CreateApp(homePage);
app.mount("#app");
