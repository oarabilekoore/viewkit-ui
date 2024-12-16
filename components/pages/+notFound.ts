import { Container, Button, Text } from "rosana";
import { home, notFound } from "../ui/styles";

const notFoundPage = new Container("linear", "fillxy, vcenter", {
    style: notFound.container,
});

Text("404 - Page Not Found", {
    style: notFound.notFoundText,
    parent: notFoundPage,
});

Text("Oops! The page you are looking for doesn't exist.", {
    style: notFound.oopsText,
    parent: notFoundPage,
});

Button("Go To HomePage", {
    style: home.button,
    parent: notFoundPage,
}).onPress = () => globalThis.router.navigateTo("./");

export default notFoundPage;
