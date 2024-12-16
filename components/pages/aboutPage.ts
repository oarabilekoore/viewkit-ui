import { Container, Text } from "rosana";

const aboutPage = new Container("linear", "fillxy, vcenter", {});

Text(`Hello Welcome !`, {
    parent: aboutPage,
});

export default aboutPage;
