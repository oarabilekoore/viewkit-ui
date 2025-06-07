import { signal } from "../package/mod";
import { createLandingPage } from "../examples/landingpage";

var root = document.querySelector("body") as HTMLElement;
createLandingPage(root);
