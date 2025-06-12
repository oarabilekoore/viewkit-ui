import { genericElement } from "./generator";

// The html object contains methods that create valid elements, named
// after them.
export const html = {
    // Text Content
    p: genericElement<HTMLParagraphElement>("p"),
    h1: genericElement<HTMLHeadingElement>("h1"),
    h2: genericElement<HTMLHeadingElement>("h2"),
    h3: genericElement<HTMLHeadingElement>("h3"),
    h4: genericElement<HTMLHeadingElement>("h4"),
    h5: genericElement<HTMLHeadingElement>("h5"),
    h6: genericElement<HTMLHeadingElement>("h6"),
    span: genericElement<HTMLSpanElement>("span"),
    em: genericElement<HTMLElement>("em"),
    strong: genericElement<HTMLElement>("strong"),
    code: genericElement<HTMLElement>("code"),
    pre: genericElement<HTMLPreElement>("pre"),
    blockquote: genericElement<HTMLQuoteElement>("blockquote"),
    q: genericElement<HTMLQuoteElement>("q"),
    cite: genericElement<HTMLElement>("cite"),
    dfn: genericElement<HTMLElement>("dfn"),
    abbr: genericElement<HTMLElement>("abbr"),
    time: genericElement<HTMLTimeElement>("time"),
    var: genericElement<HTMLElement>("var"),
    samp: genericElement<HTMLElement>("samp"),
    kbd: genericElement<HTMLElement>("kbd"),
    sub: genericElement<HTMLElement>("sub"),
    sup: genericElement<HTMLElement>("sup"),
    small: genericElement<HTMLElement>("small"),
    mark: genericElement<HTMLElement>("mark"),
    del: genericElement<HTMLElement>("del"),
    ins: genericElement<HTMLElement>("ins"),

    // Interactive Elements
    button: genericElement<HTMLButtonElement>("button"),
    input: genericElement<HTMLInputElement>("input"),
    textarea: genericElement<HTMLTextAreaElement>("textarea"),
    select: genericElement<HTMLSelectElement>("select"),
    option: genericElement<HTMLOptionElement>("option"),
    label: genericElement<HTMLLabelElement>("label"),
    fieldset: genericElement<HTMLFieldSetElement>("fieldset"),
    legend: genericElement<HTMLLegendElement>("legend"),
    progress: genericElement<HTMLProgressElement>("progress"),
    meter: genericElement<HTMLMeterElement>("meter"),
    output: genericElement<HTMLOutputElement>("output"),

    // Media Elements
    img: genericElement<HTMLImageElement>("img"),
    video: genericElement<HTMLVideoElement>("video"),
    audio: genericElement<HTMLAudioElement>("audio"),
    canvas: genericElement<HTMLCanvasElement>("canvas"),
    picture: genericElement<HTMLPictureElement>("picture"),
    source: genericElement<HTMLSourceElement>("source"),
    track: genericElement<HTMLTrackElement>("track"),
    embed: genericElement<HTMLEmbedElement>("embed"),
    object: genericElement<HTMLObjectElement>("object"),
    iframe: genericElement<HTMLIFrameElement>("iframe"),
    map: genericElement<HTMLMapElement>("map"),
    area: genericElement<HTMLAreaElement>("area"),

    // Semantic Elements
    article: genericElement<HTMLElement>("article"),
    section: genericElement<HTMLElement>("section"),
    nav: genericElement<HTMLElement>("nav"),
    header: genericElement<HTMLElement>("header"),
    footer: genericElement<HTMLElement>("footer"),
    aside: genericElement<HTMLElement>("aside"),
    main: genericElement<HTMLElement>("main"),
    figure: genericElement<HTMLElement>("figure"),
    figcaption: genericElement<HTMLElement>("figcaption"),
    details: genericElement<HTMLDetailsElement>("details"),
    summary: genericElement<HTMLElement>("summary"),
    dialog: genericElement<HTMLDialogElement>("dialog"),
    menu: genericElement<HTMLMenuElement>("menu"),
    menuitem: genericElement<HTMLElement>("menuitem"),

    // Table Elements
    table: genericElement<HTMLTableElement>("table"),
    thead: genericElement<HTMLTableSectionElement>("thead"),
    tbody: genericElement<HTMLTableSectionElement>("tbody"),
    tr: genericElement<HTMLTableRowElement>("tr"),
    th: genericElement<HTMLTableCellElement>("th"),
    td: genericElement<HTMLTableCellElement>("td"),
    caption: genericElement<HTMLTableCaptionElement>("caption"),
    colgroup: genericElement<HTMLTableColElement>("colgroup"),
    col: genericElement<HTMLTableColElement>("col"),

    // List Elements
    ol: genericElement<HTMLOListElement>("ol"),
    ul: genericElement<HTMLUListElement>("ul"),
    li: genericElement<HTMLLIElement>("li"),
    dl: genericElement<HTMLDListElement>("dl"),
    dt: genericElement<HTMLElement>("dt"),
    dd: genericElement<HTMLElement>("dd"),

    // Form Elements
    form: genericElement<HTMLFormElement>("form"),

    // Metadata Elements
    style: genericElement<HTMLStyleElement>("style"),
    link: genericElement<HTMLLinkElement>("link"),
    meta: genericElement<HTMLMetaElement>("meta"),
    base: genericElement<HTMLBaseElement>("base"),
    title: genericElement<HTMLTitleElement>("title"),
    script: genericElement<HTMLScriptElement>("script"),
    noscript: genericElement<HTMLElement>("noscript"),

    // Specialized Elements
    a: genericElement<HTMLAnchorElement>("a"),
    br: genericElement<HTMLBRElement>("br"),
    hr: genericElement<HTMLHRElement>("hr"),
    div: genericElement<HTMLDivElement>("div"),
    template: genericElement<HTMLTemplateElement>("template"),
    slot: genericElement<HTMLSlotElement>("slot"),

    // Interactive Components
    datalist: genericElement<HTMLDataListElement>("datalist"),
};
