import { Container, Heading } from "rosana";

const aboutPage = new Container("linear", "fillxy, vcenter", {});

Heading(`Hello Welcome !`, 3, {
    parent: aboutPage,
});

export default aboutPage;
