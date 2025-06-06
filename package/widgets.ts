import { genericElement } from "./generator";
import { LayoutConstructor } from "./layouts";
import type { Parent } from "./types";

/**
 * A widget is an object containing method functions that return
 * HtmlElements, basically under the hood this is
 * document.CreateElement
 */
export const widget = {
    // Layouts
    LinearLayout: function (parent?: Parent | HTMLElement) {
        const layout = new LayoutConstructor(parent, "linear");
        return layout;
    },

    ColumnLayout: function (parent?: Parent | HTMLElement) {
        const layout = new LayoutConstructor(parent, "column");
        layout.LayoutDirection = "TOP_TO_BOTTOM";
        return layout;
    },

    GridLayout: function (parent?: Parent | HTMLElement) {
        const layout = new LayoutConstructor(parent, "grid");
        return layout;
    },

    // Text Content
    Paragraph: genericElement<HTMLParagraphElement>("p"),
    Heading1: genericElement<HTMLHeadingElement>("h1"),
    Heading2: genericElement<HTMLHeadingElement>("h2"),
    Heading3: genericElement<HTMLHeadingElement>("h3"),
    Heading4: genericElement<HTMLHeadingElement>("h4"),
    Heading5: genericElement<HTMLHeadingElement>("h5"),
    Heading6: genericElement<HTMLHeadingElement>("h6"),
    Span: genericElement<HTMLSpanElement>("span"),
    Emphasis: genericElement<HTMLElement>("em"),
    Strong: genericElement<HTMLElement>("strong"),
    Code: genericElement<HTMLElement>("code"),
    Preformatted: genericElement<HTMLPreElement>("pre"),
    Blockquote: genericElement<HTMLQuoteElement>("blockquote"),
    Quote: genericElement<HTMLQuoteElement>("q"),
    Cite: genericElement<HTMLElement>("cite"),
    Definition: genericElement<HTMLElement>("dfn"),
    Abbreviation: genericElement<HTMLElement>("abbr"),
    Time: genericElement<HTMLTimeElement>("time"),
    Variable: genericElement<HTMLElement>("var"),
    SampleOutput: genericElement<HTMLElement>("samp"),
    KeyboardInput: genericElement<HTMLElement>("kbd"),
    Subscript: genericElement<HTMLElement>("sub"),
    Superscript: genericElement<HTMLElement>("sup"),
    SmallText: genericElement<HTMLElement>("small"),
    MarkedText: genericElement<HTMLElement>("mark"),
    DeletedText: genericElement<HTMLElement>("del"),
    InsertedText: genericElement<HTMLElement>("ins"),

    // Interactive Elements
    Button: genericElement<HTMLButtonElement>("button"),
    TextInput: genericElement<HTMLInputElement>("input"),
    Checkbox: genericElement<HTMLInputElement>("input"),
    Radio: genericElement<HTMLInputElement>("input"),
    Range: genericElement<HTMLInputElement>("input"),
    FileInput: genericElement<HTMLInputElement>("input"),
    SubmitButton: genericElement<HTMLInputElement>("input"),
    ResetButton: genericElement<HTMLInputElement>("input"),
    ColorPicker: genericElement<HTMLInputElement>("input"),
    DatePicker: genericElement<HTMLInputElement>("input"),
    DateTimePicker: genericElement<HTMLInputElement>("input"),
    EmailInput: genericElement<HTMLInputElement>("input"),
    NumberInput: genericElement<HTMLInputElement>("input"),
    PasswordInput: genericElement<HTMLInputElement>("input"),
    SearchInput: genericElement<HTMLInputElement>("input"),
    TelInput: genericElement<HTMLInputElement>("input"),
    UrlInput: genericElement<HTMLInputElement>("input"),
    TextArea: genericElement<HTMLTextAreaElement>("textarea"),
    Select: genericElement<HTMLSelectElement>("select"),
    Option: genericElement<HTMLOptionElement>("option"),
    Label: genericElement<HTMLLabelElement>("label"),
    Fieldset: genericElement<HTMLFieldSetElement>("fieldset"),
    Legend: genericElement<HTMLLegendElement>("legend"),
    Progress: genericElement<HTMLProgressElement>("progress"),
    Meter: genericElement<HTMLMeterElement>("meter"),
    Output: genericElement<HTMLOutputElement>("output"),

    // Media Elements
    Image: genericElement<HTMLImageElement>("img"),
    Video: genericElement<HTMLVideoElement>("video"),
    Audio: genericElement<HTMLAudioElement>("audio"),
    Canvas: genericElement<HTMLCanvasElement>("canvas"),
    Picture: genericElement<HTMLPictureElement>("picture"),
    Source: genericElement<HTMLSourceElement>("source"),
    Track: genericElement<HTMLTrackElement>("track"),
    Embed: genericElement<HTMLEmbedElement>("embed"),
    ObjectEmbed: genericElement<HTMLObjectElement>("object"),
    IFrame: genericElement<HTMLIFrameElement>("iframe"),
    HtmlMap: genericElement<HTMLMapElement>("map"),
    Area: genericElement<HTMLAreaElement>("area"),

    // Semantic Elements
    Article: genericElement<HTMLElement>("article"),
    Section: genericElement<HTMLElement>("section"),
    Nav: genericElement<HTMLElement>("nav"),
    Header: genericElement<HTMLElement>("header"),
    Footer: genericElement<HTMLElement>("footer"),
    Aside: genericElement<HTMLElement>("aside"),
    Main: genericElement<HTMLElement>("main"),
    Figure: genericElement<HTMLElement>("figure"),
    Figcaption: genericElement<HTMLElement>("figcaption"),
    Details: genericElement<HTMLDetailsElement>("details"),
    Summary: genericElement<HTMLElement>("summary"),
    Dialog: genericElement<HTMLDialogElement>("dialog"),
    Menu: genericElement<HTMLMenuElement>("menu"),
    MenuItem: genericElement<HTMLElement>("menuitem"),

    // Table Elements
    Table: genericElement<HTMLTableElement>("table"),
    TableHead: genericElement<HTMLTableSectionElement>("thead"),
    TableBody: genericElement<HTMLTableSectionElement>("tbody"),
    TableRow: genericElement<HTMLTableRowElement>("tr"),
    TableHeader: genericElement<HTMLTableCellElement>("th"),
    TableData: genericElement<HTMLTableCellElement>("td"),
    TableCaption: genericElement<HTMLTableCaptionElement>("caption"),
    ColGroup: genericElement<HTMLTableColElement>("colgroup"),
    Col: genericElement<HTMLTableColElement>("col"),

    // List Elements
    OrderedList: genericElement<HTMLOListElement>("ol"),
    UnorderedList: genericElement<HTMLUListElement>("ul"),
    ListItem: genericElement<HTMLLIElement>("li"),
    DescriptionList: genericElement<HTMLDListElement>("dl"),
    DescriptionTerm: genericElement<HTMLElement>("dt"),
    DescriptionDetail: genericElement<HTMLElement>("dd"),

    // Form Elements
    Form: genericElement<HTMLFormElement>("form"),

    // Metadata Elements
    Style: genericElement<HTMLStyleElement>("style"),
    Link: genericElement<HTMLLinkElement>("link"),
    Meta: genericElement<HTMLMetaElement>("meta"),
    Base: genericElement<HTMLBaseElement>("base"),
    Title: genericElement<HTMLTitleElement>("title"),
    Script: genericElement<HTMLScriptElement>("script"),
    NoScript: genericElement<HTMLElement>("noscript"),

    // Specialized Elements
    Anchor: genericElement<HTMLAnchorElement>("a"),
    Break: genericElement<HTMLBRElement>("br"),
    HorizontalRule: genericElement<HTMLHRElement>("hr"),
    Div: genericElement<HTMLDivElement>("div"),
    SpanElement: genericElement<HTMLSpanElement>("span"),
    Template: genericElement<HTMLTemplateElement>("template"),
    Slot: genericElement<HTMLSlotElement>("slot"),

    // Interactive Components
    DataList: genericElement<HTMLDataListElement>("datalist"),
    OutputElement: genericElement<HTMLOutputElement>("output"),
};
