import { Container, Text } from "rosana";

const aboutPage = new Container("linear", "fillxy, vcenter");
aboutPage.backColor("yellow");

Text(`Hello Welcome !`, {
    parent: aboutPage,
});

export default aboutPage;
