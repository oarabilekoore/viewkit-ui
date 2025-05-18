import { genericElement } from "./+ui-engine";
import { LayoutConstructor } from "./layouts";
import type { Parent } from "./types";

export const Widget = {
    // Layouts
    LinearLayout: function (parent: Parent | HTMLElement) {
        const layout = new LayoutConstructor(parent, "linear");
        return layout;
    },

    ColumnLayout: function (parent: Parent | HTMLElement) {
        const layout = new LayoutConstructor(parent, "column");
        layout.LayoutDirection = "TOP_TO_BOTTOM";
        return layout;
    },

    GridLayout: function (parent: Parent | HTMLElement) {
        const layout = new LayoutConstructor(parent, "grid");
        return layout;
    },

    // Text Content
    Paragraph: genericElement("p"),
    Heading1: genericElement("h1"),
    Heading2: genericElement("h2"),
    Heading3: genericElement("h3"),
    Heading4: genericElement("h4"),
    Heading5: genericElement("h5"),
    Heading6: genericElement("h6"),
    Span: genericElement("span"),
    Emphasis: genericElement("em"),
    Strong: genericElement("strong"),
    Code: genericElement("code"),
    Preformatted: genericElement("pre"),
    Blockquote: genericElement("blockquote"),
    Quote: genericElement("q"),
    Cite: genericElement("cite"),
    Definition: genericElement("dfn"),
    Abbreviation: genericElement("abbr"),
    Time: genericElement("time"),
    Variable: genericElement("var"),
    SampleOutput: genericElement("samp"),
    KeyboardInput: genericElement("kbd"),
    Subscript: genericElement("sub"),
    Superscript: genericElement("sup"),
    SmallText: genericElement("small"),
    MarkedText: genericElement("mark"),
    DeletedText: genericElement("del"),
    InsertedText: genericElement("ins"),

    // Interactive Elements
    Button: genericElement("button"),
    TextInput: genericElement("input"),
    Checkbox: genericElement("input"),
    Radio: genericElement("input"),
    Range: genericElement("input"),
    FileInput: genericElement("input"),
    SubmitButton: genericElement("input"),
    ResetButton: genericElement("input"),
    ColorPicker: genericElement("input"),
    DatePicker: genericElement("input"),
    DateTimePicker: genericElement("input"),
    EmailInput: genericElement("input"),
    NumberInput: genericElement("input"),
    PasswordInput: genericElement("input"),
    SearchInput: genericElement("input"),
    TelInput: genericElement("input"),
    UrlInput: genericElement("input"),
    TextArea: genericElement("textarea"),
    Select: genericElement("select"),
    Option: genericElement("option"),
    Label: genericElement("label"),
    Fieldset: genericElement("fieldset"),
    Legend: genericElement("legend"),
    Progress: genericElement("progress"),
    Meter: genericElement("meter"),
    Output: genericElement("output"),

    // Media Elements
    Image: genericElement("img"),
    Video: genericElement("video"),
    Audio: genericElement("audio"),
    Canvas: genericElement("canvas"),
    Picture: genericElement("picture"),
    Source: genericElement("source"),
    Track: genericElement("track"),
    Embed: genericElement("embed"),
    ObjectEmbed: genericElement("object"),
    IFrame: genericElement("iframe"),
    HtmlMap: genericElement("map"),
    Area: genericElement("area"),

    // Semantic Elements
    Article: genericElement("article"),
    Section: genericElement("section"),
    Nav: genericElement("nav"),
    Header: genericElement("header"),
    Footer: genericElement("footer"),
    Aside: genericElement("aside"),
    Main: genericElement("main"),
    Figure: genericElement("figure"),
    Figcaption: genericElement("figcaption"),
    Details: genericElement("details"),
    Summary: genericElement("summary"),
    Dialog: genericElement("dialog"),
    Menu: genericElement("menu"),
    MenuItem: genericElement("menuitem"),

    // Table Elements
    Table: genericElement("table"),
    TableHead: genericElement("thead"),
    TableBody: genericElement("tbody"),
    TableRow: genericElement("tr"),
    TableHeader: genericElement("th"),
    TableData: genericElement("td"),
    TableCaption: genericElement("caption"),
    ColGroup: genericElement("colgroup"),
    Col: genericElement("col"),

    // List Elements
    OrderedList: genericElement("ol"),
    UnorderedList: genericElement("ul"),
    ListItem: genericElement("li"),
    DescriptionList: genericElement("dl"),
    DescriptionTerm: genericElement("dt"),
    DescriptionDetail: genericElement("dd"),

    // Form Elements
    Form: genericElement("form"),

    // Metadata Elements
    Style: genericElement("style"),
    Link: genericElement("link"),
    Meta: genericElement("meta"),
    Base: genericElement("base"),
    Title: genericElement("title"),
    Script: genericElement("script"),
    NoScript: genericElement("noscript"),

    // Specialized Elements
    Anchor: genericElement("a"),
    Break: genericElement("br"),
    HorizontalRule: genericElement("hr"),
    Div: genericElement("div"),
    SpanElement: genericElement("span"),
    Template: genericElement("template"),
    Slot: genericElement("slot"),

    // Interactive Components
    DataList: genericElement("datalist"),
    OutputElement: genericElement("output"),
};
