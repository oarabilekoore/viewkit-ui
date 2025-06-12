import { html, css, Router, Routes } from "viewkit-ui";

// Initialize router
const appContainer = document.querySelector("body")!;

// Routes configuration
const routes: Routes = [
    {
        title: "Home",
        path: "/",
        component: createHomePage,
        animation: {
            onEnter: "slide-in-right",
            onLeave: "slide-out-left",
            animationLength: 300,
        },
        guards: {
            beforeEnter: async () => {
                // Check authentication
                return confirm("Are you sure you want to enter?");
            },
            beforeLeave: async () => {
                // Confirm navigation away
                return confirm("Are you sure you want to leave?");
            },
        },
    },
    {
        title: "About",
        path: "/about",
        component: createAboutPage,
    },
    {
        title: "Contact",
        path: "/contact",
        component: createContactPage,
    },
];

const router = new Router(routes, appContainer);

// Add CSS for animations
css({
    ".slide-in-right": {
        animation: "slideInRight 0.3s ease-out",
    },
    ".slide-out-left": {
        animation: "slideOutLeft 0.3s ease-out",
    },
});

// Page components
function createHomePage() {
    const container = html.div();
    html.h1("Welcome Home", container);
    html.p("This is the home page", container);

    const navBtn = html.button("Go to About", container);
    navBtn.addEventListener("click", () => {
        router.open("/about");
    });

    return container;
}

function createAboutPage() {
    const container = html.div();
    html.h1("About Us", container);
    html.p("Learn more about our company", container);
    return container;
}

function createContactPage(params?: any) {
    const container = html.div();
    html.h1("Contact", container);
    if (params?.userId) {
        html.p(`User ID: ${params.userId}`, container);
    }
    return container;
}
