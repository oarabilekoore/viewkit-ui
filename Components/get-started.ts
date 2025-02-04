import { Layout, Paragraph } from "../Lib/+innerscope";

export default function AboutPage() {
    const layout = Layout("linear", document.body);
    layout.childAlignment("center");

    Paragraph(`You Are On The Get Started Page`, layout);
}
