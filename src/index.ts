import { html, css, Router, Routes } from "viewkit-ui";
import { createCounter } from "../examples/counter";

// Initialize router
const appContainer = document.querySelector("body")!;

// Routes configuration
const routes: Routes = [
    {
        title: "Home",
        path: "/",
        component: createHomePage,
    },
    {
        title: "About",
        path: "/about",
        component: createAboutPage,
    },
];

const router = new Router(routes, appContainer);

function createHomePage(parent: HTMLElement) {
    const homePage = html.div(parent);
    homePage.style.textAlign = "center";
    homePage.style.padding = "32px";

    const title = html.h1("Welcome to ViewKit UI", homePage);
    title.style.color = "#007acc";

    const description = html.p("A lightweight UI library for building modern web applications.", homePage);
    description.style.color = "#555";

    const button = html.button("Go to About", homePage);
    button.addEventListener("click", () => {
        router.open("/about");
    });
    return homePage;
}

function createAboutPage(parent: HTMLElement) {
    const aboutPage = html.div(parent);
    aboutPage.style.textAlign = "center";
    aboutPage.style.padding = "32px";

    const title = html.h1("About ViewKit UI", aboutPage);
    title.style.color = "#007acc";

    const description = html.p(
        "ViewKit UI is a simple and lightweight library for building web applications.",
        aboutPage
    );
    description.style.color = "#555";

    const counterButton = html.button("Open Counter Example", aboutPage);
    counterButton.addEventListener("click", () => {
        createCounter(aboutPage);
    });
    return aboutPage;
}
