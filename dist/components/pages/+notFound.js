import { Container, Button, Heading } from "rosana";
import { home, notFound } from "../ui/styles";
const notFoundPage = new Container("linear", "fillxy, vcenter", {
    style: notFound.container,
});
Heading("404 - Page Not Found", 2, {
    style: notFound.notFoundText,
    parent: notFoundPage,
});
Heading("Oops! The page you are looking for doesn't exist.", 4, {
    style: notFound.oopsText,
    parent: notFoundPage,
});
Button("Go To HomePage", {
    style: home.button,
    parent: notFoundPage,
}).onPress = () => globalThis.router.open("./");
export default notFoundPage;
