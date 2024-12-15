import { Container, Button, Text } from "rosana";

const notFoundPage = new Container("linear", "fillxy, vcenter");

Text("404", {
    parent: notFoundPage,
});

Button("Go Back", {
    parent: notFoundPage,
}).onPress = () => globalThis.router.navigateTo("./");

export default notFoundPage;
