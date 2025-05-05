import "./baseline.css";

const version = "0.1.9";
console.log(`innerscope v${version}`);

export interface ApplicationConfig {
  title: string;
  icon?: string;
  routes: PageRouterConfig;
  allowzoom?: boolean;
  statusbarcolor?: string;
  scrollbarvisibility?: "shown" | "hidden";
}

export type PageRouterConfig = {
  mode: "hash" | "history";
  routes: Routes;
};
export type Routes = {
  path: string;
  component: Function;
}[];

export class Application {
  root: HTMLElement;
  router_map: Map<string, Function> | null;
  page_routes: Routes | null;
  router_mode: string | null;
  page_index: number = 0;

  constructor(config?: ApplicationConfig) {
    this.router_map = new Map();
    this.page_routes = null;
    this.router_mode = null;
    this.root = document.body;

    config
      ? this.setConfig(config)
      : console.error("Application config Was Not Passed.");
  }

  setConfig(cfg: ApplicationConfig) {
    this.router_mode = cfg.routes.mode;
    this.page_routes = cfg.routes.routes;

    this.page_index = window.history.state?.index || 0;

    if (this.router_mode === "hash") {
      var route = window.location.hash.slice(1);
      window.onhashchange = (event) => {
        this.hash_change_handler(route);
      };
    } else if (this.router_mode === "history") {
      var route = window.location.pathname;

      window.onpopstate = (event) => {
        const newIndex = event.state?.index || 0;
        this.page_index = newIndex;
        this.popstate_handler(route, event);
      };
    }

    this.page_routes?.forEach((route) => {
      this.addRoute(route.path, route.component);
    });

    if (cfg.title) {
      document.title = cfg.title;
    }

    if (cfg.statusbarcolor) {
      const meta = document.createElement("meta");
      meta.name = "theme-color";
      meta.content = cfg.statusbarcolor;
      document.head.appendChild(meta);
    }

    if (cfg.scrollbarvisibility) {
      if (cfg.scrollbarvisibility == "shown") {
        document.body.classList.remove(`noscrollbar`);
      } else document.body.classList.add(`noscrollbar`);
    }

    if (!cfg.allowzoom) {
      let meta = document.querySelector('meta[name="viewport"]');

      if (!meta) {
        meta = document.createElement("meta");
        //@ts-ignore
        meta.name = "viewport";
        document.head.appendChild(meta);
      }
      //@ts-ignore
      meta.content =
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
    }
  }

  onExit(Fn: Function) {
    window.addEventListener("beforeunload", (event) => {
      event.preventDefault();
      Fn(event);
    });
  }

  onBack(Fn: Function) {
    window.addEventListener("popstate", (event) => {
      event.preventDefault();
      Fn(event);
    });
  }

  onStart(Fn: Function) {
    window.addEventListener("load", (event) => {
      Fn(event);
    });
  }

  onPause(Fn: Function) {
    window.addEventListener("blur", (event) => {
      Fn(event);
    });
  }

  onResume(Fn: Function) {
    window.addEventListener("focus", (event) => {
      Fn(event);
    });
  }

  onOffline(Fn: Function) {
    window.addEventListener("offline", (event) => {
      Fn(event);
    });
  }

  onOnline(Fn: Function) {
    window.addEventListener("online", (event) => {
      Fn(event);
    });
  }

  onResize(Fn: Function) {
    window.addEventListener("resize", (event) => {
      Fn(event);
    });
  }

  onScroll(Fn: Function) {
    window.addEventListener("scroll", (event) => {
      Fn(event);
    });
  }

  addRoute(route: string, Function: Function) {
    this.router_map?.set(route, Function);
  }

  openRoute(path: string) {
    if (!this.does_route_exist(path)) {
      path = "/404";
    }

    if (this.router_mode == "hash") {
      this.hash_change_handler(path);
    } else this.popstate_handler(path);
  }

  private hash_change_handler(route: string) {}

  private popstate_handler(route: string, event?: Event) {
    const component = this.router_map?.get(route);
    document.body.innerHTML = "";
    component ? component() : console.error();

    const newIndex = this.page_index + 1;

    this.page_index = newIndex;
    history.pushState({ index: newIndex }, "", route);
  }

  private does_route_exist(path: string) {
    return this.router_map?.has(path);
  }
}

export function showIF(element: HTMLElement, condition: boolean) {
  if (condition) {
    element.classList.add("show");
  } else {
    element.classList.add("hide");
  }
}

export const Paragraph = genericElement("p");
export const Heading1 = genericElement("h1");
export const Heading2 = genericElement("h2");
export const Heading3 = genericElement("h3");
export const Heading4 = genericElement("h4");
export const Heading5 = genericElement("h5");
export const Heading6 = genericElement("h6");
export const Span = genericElement("span");
export const Emphasis = genericElement("em");
export const Strong = genericElement("strong");
export const Code = genericElement("code");
export const Preformatted = genericElement("pre");
export const Blockquote = genericElement("blockquote");
export const Quote = genericElement("q");
export const Cite = genericElement("cite");
export const Definition = genericElement("dfn");
export const Abbreviation = genericElement("abbr");
export const Time = genericElement("time");
export const Variable = genericElement("var");
export const SampleOutput = genericElement("samp");
export const KeyboardInput = genericElement("kbd");
export const Subscript = genericElement("sub");
export const Superscript = genericElement("sup");
export const SmallText = genericElement("small");
export const MarkedText = genericElement("mark");
export const DeletedText = genericElement("del");
export const InsertedText = genericElement("ins");

// Interactive Elements
export const Button = genericElement("button");
export const TextInput = genericElement("input");
export const Checkbox = genericElement("input");
export const Radio = genericElement("input");
export const Range = genericElement("input");
export const FileInput = genericElement("input");
export const SubmitButton = genericElement("input");
export const ResetButton = genericElement("input");
export const ColorPicker = genericElement("input");
export const DatePicker = genericElement("input");
export const DateTimePicker = genericElement("input");
export const EmailInput = genericElement("input");
export const NumberInput = genericElement("input");
export const PasswordInput = genericElement("input");
export const SearchInput = genericElement("input");
export const TelInput = genericElement("input");
export const UrlInput = genericElement("input");
export const TextArea = genericElement("textarea");
export const Select = genericElement("select");
export const Option = genericElement("option");
export const Label = genericElement("label");
export const Fieldset = genericElement("fieldset");
export const Legend = genericElement("legend");
export const Progress = genericElement("progress");
export const Meter = genericElement("meter");
export const Output = genericElement("output");

// Media Elements
export const Image = genericElement("img");
export const Video = genericElement("video");
export const Audio = genericElement("audio");
export const Canvas = genericElement("canvas");
export const Picture = genericElement("picture");
export const Source = genericElement("source");
export const Track = genericElement("track");
export const Embed = genericElement("embed");
export const ObjectEmbed = genericElement("object");
export const IFrame = genericElement("iframe");
export const HtmlMap = genericElement("map");
export const Area = genericElement("area");

// Semantic Elements
export const Article = genericElement("article");
export const Section = genericElement("section");
export const Nav = genericElement("nav");
export const Header = genericElement("header");
export const Footer = genericElement("footer");
export const Aside = genericElement("aside");
export const Main = genericElement("main");
export const Figure = genericElement("figure");
export const Figcaption = genericElement("figcaption");
export const Details = genericElement("details");
export const Summary = genericElement("summary");
export const Dialog = genericElement("dialog");
export const Menu = genericElement("menu");
//export const MenuItem = genericElement("menuitem");

// Table Elements
export const Table = genericElement("table");
export const TableHead = genericElement("thead");
export const TableBody = genericElement("tbody");
export const TableRow = genericElement("tr");
export const TableHeader = genericElement("th");
export const TableData = genericElement("td");
export const TableCaption = genericElement("caption");
export const ColGroup = genericElement("colgroup");
export const Col = genericElement("col");

// List Elements
export const OrderedList = genericElement("ol");
export const UnorderedList = genericElement("ul");
export const ListItem = genericElement("li");
export const DescriptionList = genericElement("dl");
export const DescriptionTerm = genericElement("dt");
export const DescriptionDetail = genericElement("dd");

// Form Elements
export const Form = genericElement("form");
export const LabelFor = (
  forId: string,
  content: string,
  parent: Parent | HTMLElement,
) => {
  return createElement("label", parent, { content, attrs: { for: forId } });
};

// Metadata Elements
export const Style = genericElement("style");
export const Link = genericElement("link");
export const Meta = genericElement("meta");
export const Base = genericElement("base");
export const Title = genericElement("title");
export const Script = genericElement("script");
export const NoScript = genericElement("noscript");

// Specialized Elements
export const Anchor = genericElement("a");
export const Break = genericElement("br");
export const HorizontalRule = genericElement("hr");
export const Div = genericElement("div");
export const SpanElement = genericElement("span");
export const Template = genericElement("template");
export const Slot = genericElement("slot");

// Interactive Components
export const DataList = genericElement("datalist");
export const OutputElement = genericElement("output");
