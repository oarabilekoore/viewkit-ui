var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const createUniqueIdGenerator = (prefix) => {
  let count = 0;
  return () => `${prefix}-${count++}`;
};
const generateId = createUniqueIdGenerator("rosana-id");
const generateClassName = createUniqueIdGenerator("rosana-class");
const $pageTheme = function() {
  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  return darkThemeMq.matches ? "dark" : "light";
};
const $on = function(event, handlerFn) {
  document.addEventListener(event, handlerFn);
};
const cssParser = (styles, ...values) => {
  const className = generateClassName();
  const styleSheet = document.styleSheets[0];
  let cssString = "";
  let nestedCssRules = [];
  let mediaQueryRules = [];
  const parseStyles = (styles2, selector) => {
    let baseStyles = "";
    Object.entries(styles2).forEach(([key, value]) => {
      if (typeof value === "object") {
        if (key.startsWith("@")) {
          mediaQueryRules.push({ media: key, selector, styles: value });
        } else if (key.startsWith("&:")) {
          nestedCssRules.push({ selector: key.replace("&", selector), styles: value });
        } else {
          nestedCssRules.push({ selector: `${selector} ${key}`, styles: value });
        }
      } else {
        baseStyles += `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value}; `;
      }
    });
    return baseStyles;
  };
  if (typeof styles === "object" && !Array.isArray(styles)) {
    cssString = parseStyles(styles, `.${className}`);
  } else if (Array.isArray(styles)) {
    cssString = styles.reduce((result, str, i) => result + str + (values[i] || ""), "");
  }
  if (document.readyState === "loading" && cssString) {
    document.head.insertAdjacentHTML("beforeend", `<style>.${className} { ${cssString} }</style>`);
  } else if (cssString) {
    styleSheet.insertRule(`.${className} { ${cssString} }`, styleSheet.cssRules.length);
  }
  nestedCssRules.forEach(({ selector, styles: styles2 }) => {
    const nestedCssString = parseStyles(styles2, selector);
    if (nestedCssString) {
      styleSheet.insertRule(`${selector} { ${nestedCssString} }`, styleSheet.cssRules.length);
    }
  });
  mediaQueryRules.forEach(({ media, selector, styles: styles2 }) => {
    const nestedCssString = parseStyles(styles2, selector);
    if (nestedCssString) {
      styleSheet.insertRule(
        `${media} { ${selector} { ${nestedCssString} } }`,
        styleSheet.cssRules.length
      );
    }
  });
  return className;
};
const eventHandlersMap = /* @__PURE__ */ new Map();
document.body.addEventListener("click", (event) => {
  const targetId = event.target.id;
  if (eventHandlersMap.has(targetId)) {
    eventHandlersMap.get(targetId)();
  }
});
class componentController {
  constructor() {
    __publicField(this, "element");
    __publicField(this, "elementClasses");
    this.element = null;
    this.elementClasses = [];
  }
  /**
   * Add a child element to this element.
   */
  addChild(child) {
    if (child instanceof componentController && this.element) {
      this.element.appendChild(child.element);
    } else {
      console.error("Mounted Child Is Not A Rosana Component");
    }
    return this;
  }
  /**
   * Set the alignment of child elements in the control
   */
  alignment(options) {
    if (options) {
      optionsApi(this.element, options);
    } else {
      console.log("Alignment Options Undefined");
    }
    return this;
  }
  /**
   * batch dom api setters and getters effeciently
   */
  batch(props) {
    Object.entries(props).forEach(([key, value]) => {
      requestAnimationFrame(() => {
        if (this.element) {
          this.element[key] = value;
        }
      });
    });
    return this;
  }
  /**
   * Add an onclick event listener to the element.
   */
  set onclick(handler) {
    var _a;
    eventHandlersMap.set((_a = this.element) == null ? void 0 : _a.id, handler);
  }
  /**
   * Add css scoped styles to your element.
   */
  css(styles) {
    var _a;
    const className = cssParser(styles);
    (_a = this.element) == null ? void 0 : _a.classList.add(className);
    this.elementClasses.push(className);
    return this;
  }
  /**
   * Remove a child element from this element.
   */
  destroyChild(child) {
    var _a, _b;
    if (child instanceof componentController) {
      eventHandlersMap.delete((_a = child.element) == null ? void 0 : _a.id);
      (_b = child.element) == null ? void 0 : _b.remove();
    } else {
      console.error("Child Is Not A Rosana Component");
    }
    return this;
  }
  /**
   * Sets the visibility of the element.
   */
  show() {
    var _a;
    (_a = this.element) == null ? void 0 : _a.classList.add("show");
    return this;
  }
  /**
   * Hide the element
   */
  hide() {
    var _a;
    (_a = this.element) == null ? void 0 : _a.classList.add("hide");
    return this;
  }
  /**
   * Sets the display and visibility of the element.
   */
  gone() {
    var _a;
    (_a = this.element) == null ? void 0 : _a.classList.add("gone");
    return this;
  }
}
let viewOptions = [
  "noscrollbar",
  "scrollxy",
  "scrollx",
  "scrolly",
  "top",
  "bottom",
  "left",
  "right",
  "horizontal",
  "vertical",
  "vcenter",
  "center",
  "fillxy",
  "fillx",
  "filly"
];
const optionsApi = (element, options) => {
  options.toLowerCase().replace(/\s/g, "").split(",").forEach((option) => {
    if (viewOptions.includes(option)) {
      element.classList.add(option);
    } else {
      console.error(`Unknown option: ${option}`);
    }
  });
};
function layoutFitApi(layout, type, options) {
  if (options) optionsApi(layout, options);
  const layoutTYPE = type.toLowerCase();
  switch (layoutTYPE) {
    case "linear":
      layout.classList.add("layout-linear");
      break;
    case "absolute":
      layout.classList.add("layout-absolute");
      break;
    case "frame":
      layout.classList.add("layout-frame");
      break;
    case "stack":
      const directionClass = (options == null ? void 0 : options.includes("vertical")) ? "layout-stack-vertical" : "layout-stack-horizontal";
      layout.classList.add(directionClass);
      break;
    default:
      console.error("Unknown Layout", layoutTYPE);
  }
}
const $LayoutInitializer = class extends componentController {
  /**
   * Creates a new layout element with the specified type and options.
   */
  constructor(type, options) {
    super();
    __publicField(this, "type");
    this.element = document.createElement("div");
    this.element.id = generateId();
    this.type = `layout-${type}`;
    type ? layoutFitApi(this.element, type, options) : null;
  }
};
const $LinearLayout = function(childAlignmentProperties) {
  return new $LayoutInitializer("linear", childAlignmentProperties);
};
const $AbsoluteLayout = function(childAlignmentProperties) {
  return new $LayoutInitializer("absolute", childAlignmentProperties);
};
const $FrameLayout = function(childAlignmentProperties) {
  return new $LayoutInitializer("frame", childAlignmentProperties);
};
const $StackedLayout = function(stackOrientation = "horizontal") {
  return new $LayoutInitializer("stack", stackOrientation);
};
const $signal = function(defaultValue) {
  let internal_variable = defaultValue;
  let subscriptions = [];
  const notify = function() {
    for (let subscriber of subscriptions) {
      subscriber(internal_variable);
    }
  };
  return {
    /**
     * set the signal's value
     */
    set value(val) {
      internal_variable = val;
      notify();
    },
    /**
     * returns the signals value
     */
    get value() {
      return internal_variable;
    },
    /**
     * subscribe to the signal
     */
    subscribe: (fn) => {
      subscriptions.push(fn);
    }
  };
};
const $store = function(initialValue) {
  let state = { ...initialValue };
  const listeners = /* @__PURE__ */ new Set();
  return {
    /**
     * set the signal's value
     */
    set(key, value) {
      state[key] = value;
      listeners.forEach((listener) => listener(state));
    },
    /**
     * returns the signals value
     */
    get(key) {
      return state[key];
    },
    /*** subscribe to the signal */
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
};
const $createApp = function(mainComponent) {
  const app = {
    _rootComponent: mainComponent,
    _plugins: [],
    /**
     * Mounts the main component to a DOM element identified by the selector.
     */
    mount: function(selector) {
      const container = document.querySelector(selector);
      if (!container) {
        console.error(`No element found for selector "${selector}"`);
        return this;
      }
      document.body.style.margin = "0";
      document.body.style.width = "100%";
      container.innerHTML = "";
      const instance = this._rootComponent;
      if (instance && instance.element) {
        container.appendChild(instance.element);
      } else {
        console.error("Main component does not have an element property.");
      }
      if (this.router) {
        this.router.init();
      }
      return this;
    },
    /**
     * Adds a plugin to the application
     */
    //@ts-ignore
    use: function(plugin) {
      if (plugin && typeof plugin.install === "function") {
        plugin.install(this);
        this._plugins.push(plugin);
      } else {
        console.warn("Plugin is missing install method:", plugin);
      }
      return this;
    }
  };
  return app;
};
class $router {
  constructor(routes) {
    __publicField(this, "guards", []);
    __publicField(this, "params", null);
    __publicField(this, "routes", []);
    __publicField(this, "notFound", null);
    __publicField(this, "currentRoute", null);
    this.routes = routes;
    window.addEventListener("popstate", () => this._handleRouteChange());
  }
  /**
   * Attach the router to the app.
   */
  install(app) {
    app.router = this;
    this.init();
  }
  /**
   * Add route guard to validate route changes.
   */
  addGuard(guardFn) {
    this.guards.push(guardFn);
  }
  /**
   * Set a component for 404 (not found) pages.
   */
  setNotFound(component) {
    this.notFound = component;
  }
  /**
   * Define a new route, supporting nested routes.
   */
  add(path, component, options = {}) {
    this.routes.push({ path, component, options });
  }
  /**
   * Register a callback to trigger on route load.
   */
  on(route, fn) {
    const matchedRoute = this.routes.find((r) => r.path === route);
    if (matchedRoute) matchedRoute.onLoad = fn;
  }
  /**
   * Navigate to a specified route.
   */
  navigate(path, params = {}) {
    const fullPath = path.replace(/:([\w]+)/g, (_, key) => {
      if (params[key] === void 0) {
        console.error(`Parameter "${key}" not provided for path: ${path}`);
        return `:${key}`;
      }
      return params[key];
    });
    history.pushState(null, "", fullPath);
    this._handleRouteChange();
  }
  /**
   * Initialize the router by handling the initial route.
   */
  init() {
    this._handleRouteChange();
  }
  /**
   * Handle route changes and apply guards.
   */
  async _handleRouteChange() {
    const path = window.location.pathname;
    const matchedRoute = this._matchRoute(path, this.routes);
    if (matchedRoute) {
      this.params = matchedRoute.params;
      for (const guard of this.guards) {
        if (!await guard(matchedRoute)) {
          console.warn("Navigation cancelled by guard.");
          return;
        }
      }
      this.currentRoute = matchedRoute;
      await this._loadComponent(matchedRoute);
    } else if (this.notFound) {
      await this._loadComponent({ component: this.notFound });
    } else {
      console.error(`Route not found for path: ${path}`);
    }
  }
  /**
   * Match a route with dynamic parameters, including nested routes.
   */
  _matchRoute(path, routes) {
    for (const route of routes) {
      const { regex, keys } = this._pathToRegex(route.path);
      const match = path.match(regex);
      if (match) {
        const params = keys.reduce((acc, key, index) => {
          acc[key] = match[index + 1];
          return acc;
        }, {});
        if (route.children) {
          const nestedRoute = this._matchRoute(path.replace(regex, ""), route.children);
          if (nestedRoute) {
            return { ...route, params, nested: nestedRoute };
          }
        }
        return { ...route, params };
      }
    }
    return null;
  }
  /**
   * Convert route path to a regular expression with dynamic parameters.
   */
  _pathToRegex(path) {
    const keys = [];
    const regexString = path.replace(/:([\w]+)/g, (_, key) => {
      keys.push(key);
      return "([^\\/]+)";
    }).replace(/\//g, "\\/");
    return { regex: new RegExp(`^${regexString}$`), keys };
  }
  /**
   * Load a route component, supporting lazy loading and nested routes.
   */
  async _loadComponent(route) {
    let component = route.component;
    if (typeof component === "function") {
      const module = await component();
      component = module.default;
    }
    if (component && typeof route.onLoad === "function") {
      route.onLoad(component);
    } else if (component) {
      const container = document.querySelector("#app");
      if (container) {
        container.innerHTML = "";
        const instance = component;
        if (instance && instance.element) {
          container.appendChild(instance.element);
          if (typeof instance.routingInfo === "function") {
            instance.routingInfo(this.params);
          }
          if (route.nested) {
            await this._loadComponent(route.nested);
          }
        } else {
          console.error(`Imported Route Is Not A Valid Component: ${instance}`);
        }
      }
    }
  }
  /**
   * Navigate back in history.
   */
  back() {
    history.back();
  }
  /**
   * Navigate forward in history.
   */
  forward() {
    history.forward();
  }
}
const $showIF = function(restingParameter, onTruthyElement, onFalseyElement) {
  if (onTruthyElement === void 0 || onFalseyElement === void 0) {
    console.error(`showIF not called, one of the elements is undefined`);
    return;
  }
  restingParameter ? onTruthyElement.show() : onTruthyElement.hide();
  !restingParameter ? onFalseyElement.show() : onFalseyElement.hide();
};
const $Element = class extends componentController {
  constructor(tag, parent) {
    super();
    __publicField(this, "type");
    __publicField(this, "parent");
    this.type = tag.toLocaleUpperCase();
    this.parent = parent;
    this.element = document.createElement(tag);
    this.element.id = generateId();
    if (parent instanceof componentController) {
      parent.addChild(this);
    } else {
      console.error("No Parent For Component To Attach To.");
      return;
    }
  }
};
const $Html = {};
$Html.P = (parent) => {
  return new $Element("p", parent);
};
$Html.Div = (parent) => {
  return new $Element("div", parent);
};
$Html.Span = (parent) => {
  return new $Element("span", parent);
};
$Html.Image = (parent) => {
  return new $Element("img", parent);
};
$Html.Button = (parent) => {
  return new $Element("button", parent);
};
$Html.Input = (parent) => {
  return new $Element("input", parent);
};
$Html.Ul = (parent) => {
  return new $Element("ul", parent);
};
$Html.Li = (parent) => {
  return new $Element("li", parent);
};
$Html.H1 = (parent) => {
  return new $Element("h1", parent);
};
$Html.H2 = (parent) => {
  return new $Element("h2", parent);
};
$Html.A = (parent) => {
  return new $Element("a", parent);
};
$Html.Form = (parent) => {
  return new $Element("form", parent);
};
export {
  $AbsoluteLayout,
  $FrameLayout,
  $Html,
  $LinearLayout,
  $StackedLayout,
  $createApp,
  $on,
  $pageTheme,
  $router,
  $showIF,
  $signal,
  $store
};
//# sourceMappingURL=rosana.es.js.map
