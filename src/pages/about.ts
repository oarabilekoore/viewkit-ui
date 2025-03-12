
import { LinearLayout, Paragraph } from "../../Lib/+innerscope";

export default function AboutPage() {
    const page = LinearLayout(document.body);
    page.ElementAlignment = "CENTER"
    page.ParentFill = "FILLXY"
    Paragraph(`You Are On The Get Started Page`, page);
}
