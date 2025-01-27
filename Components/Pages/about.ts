import { Layout, Paragraph } from "../../Lib/+innerscope"

export default function AboutPage() {
    const layout = Layout('linear', document.body)
    layout.alignChildren = "center"
    layout.parentFill = "xy"

    Paragraph(layout).textContent = `You Are On The About Page`
}