import { $Layout } from "rosana";
import NavigationBar from "../.ui/navbar";

const homePage = $Layout.Linear("fillxy, top, scrolly");

NavigationBar(homePage, "rosana.js", "menu");

export default homePage;
