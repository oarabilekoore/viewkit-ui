(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.rosana = {}));
})(this, function(exports2) {
  "use strict";var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

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
  const $Animate = function(object, animationName, onAnimationEndFunction) {
    let animation = `animate__${animationName}`;
    object.element.classList.add(`animate__animated`, animation);
    function handleAnimationEnd(event) {
      event.stopPropagation();
      onAnimationEndFunction ? onAnimationEndFunction() : null;
      object.element.classList.remove(`animate__animated`, animation);
    }
    object.element.addEventListener("animationend", handleAnimationEnd, { once: true });
  };
  const createUniqueIdGenerator = (prefix) => {
    let count = 0;
    return () => `${prefix}-${count++}`;
  };
  const generateClassName = createUniqueIdGenerator("rosana-class");
  const debugInfo = function(title, source, debugObject) {
    let template = `rosana.js Error : ${title}

    The Following Debug Info Has Been Provided By ${source}

    Is HTMLELement : ${debugObject instanceof HTMLElement}

    Object Keys : ${Object.keys(debugObject)}

    Object Values : ${Object.values(debugObject)}`;
    throw Error(template);
  };
  const cssParser = (styles, ...values) => {
    let cssString = "";
    const className = generateClassName();
    const styleSheet = document.styleSheets[0];
    let nestedCssRules = [];
    let mediaQueryRules = [];
    const parseStyles = (styles2, selector) => {
      let baseStyles = "";
      Object.entries(styles2).forEach(([key, value]) => {
        if (typeof value === "object") {
          if (key.startsWith("@")) {
            mediaQueryRules.push({ media: key, selector, styles: value });
          } else if (key.startsWith("&")) {
            const pseudoSelector = key.replace("&", selector);
            nestedCssRules.push({ selector: pseudoSelector, styles: value });
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
    if (cssString) {
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
        styleSheet.insertRule(`${media} { ${selector} { ${nestedCssString} } }`, styleSheet.cssRules.length);
      }
    });
    return className;
  };
  const eventHandlersMap = /* @__PURE__ */ new Map();
  document.body.addEventListener("click", (event) => {
    var _a;
    const target = event.target;
    if ((target == null ? void 0 : target.id) && eventHandlersMap.has(target.id)) {
      (_a = eventHandlersMap.get(target.id)) == null ? void 0 : _a();
    }
  });
  class Ratio {
    constructor(antecedent, consequent) {
      __publicField(this, "consequent");
      __publicField(this, "antecedent");
      this.consequent = consequent;
      this.antecedent = antecedent;
    }
    getFirstToSecond(antecedentReliantValue) {
      return antecedentReliantValue * this.consequent / this.antecedent;
    }
    getSecondToFirst(consequentReliantValue) {
      return consequentReliantValue * this.antecedent / this.consequent;
    }
  }
  function dimensioningWidthFn(value) {
    const innerWidth = window.innerWidth;
    let ratio = new Ratio(1, innerWidth);
    return ratio.getFirstToSecond(value);
  }
  function dimensioningHeightFn(value) {
    const innerHeight = window.innerHeight;
    let ratio = new Ratio(1, innerHeight);
    return ratio.getFirstToSecond(value);
  }
  class rosanaComponentProperties {
    constructor() {
      __publicField(this, "ismounted");
      __publicField(this, "element");
      __publicField(this, "elementClasses");
      this.element = document.createElement("div");
      this.elementClasses = [];
      this.ismounted = true;
    }
    /**
     * Add a child component to this component.
     */
    addChild(child) {
      if (!(child == null ? void 0 : child.element)) {
        console.warn(`The passed object is not a valid Rosana/HTML element.`, child);
        return this;
      }
      this.element.appendChild(child.element);
      return this;
    }
    /**Sets the element backcolor */
    backColor(color) {
      this.css({ backgroundColor: color });
    }
    /**Sets the elements width and height, dimensions specified by you. */
    setSize(w, h, dimension) {
      if (dimension) {
        if (w !== null && h !== null) {
          this.css({
            width: `${w}${dimension}`,
            height: `${h}${dimension}`
          });
        } else if (h !== null) {
          this.css({
            height: `${h}${dimension}`
          });
        } else if (w !== null) {
          this.css({
            width: `${w}${dimension}`
          });
        } else {
          this.css({
            width: `${dimensioningWidthFn(w || 0)}px`,
            height: `${dimensioningHeightFn(h || 0)}px`
          });
        }
      } else {
        console.error("Dimension is required for setSize.");
      }
    }
    /**
     * Callback invoked when the component is added to the DOM.
     */
    set onMount(Fn) {
      if (this.element && typeof Fn === "function") {
        Fn();
      }
    }
    /**
     * Callback invoked when the component is removed from the DOM.
     */
    set onUnMount(Fn) {
      if (!this.ismounted) {
        Fn();
      }
    }
    /**
     * Set the alignment of child elements in this component.
     */
    alignment(options) {
      if (!options) {
        console.warn(`Alignment options are undefined for:`, this.element);
      }
      optionsApi(this.element, options);
      return this;
    }
    /**
     * Batch DOM API property setters for this component.
     */
    batch(props) {
      if (!props) {
        throw new Error(`Null batched props for: ${this}`);
      }
      Object.entries(props).forEach(([key, value]) => {
        requestAnimationFrame(() => {
          this.element[key] = value;
        });
      });
      return this;
    }
    /**
     * Add an onclick event listener to this component.
     */
    set ontouch(handler) {
      if (typeof handler !== "function") {
        throw new Error(`The onclick setter expects a function, but received: ${typeof handler}`);
      }
      eventHandlersMap.set(this.element.id, handler);
    }
    /**
     * Add CSS scoped styles to this component.
     */
    css(styles) {
      const className = cssParser(styles);
      this.element.classList.add(className);
      this.elementClasses.push(className);
      return this;
    }
    /**
     * Remove a child component from this component.
     */
    destroyChild(child) {
      if (!(child == null ? void 0 : child.element)) {
        debugInfo("The passed child is null/undefined or not a valid Rosana component.", "destroyChild Function", child);
        return this;
      }
      eventHandlersMap.delete(child.element.id);
      child.element.remove();
      return this;
    }
    /**
     * Remove All Children In That Layout
     */
    clear() {
      this.element.innerHTML = "";
      return this;
    }
    /**
     * Make this component visible.
     */
    show() {
      this.element.classList.remove("hide", "gone");
      this.element.classList.add("show");
      return this;
    }
    /**
     * Hide this component.
     */
    hide() {
      this.element.classList.remove("show");
      this.element.classList.add("hide");
      return this;
    }
    /**
     * Remove this component from the visual flow and hide it.
     */
    gone() {
      this.element.classList.remove("show", "hide");
      this.element.classList.add("gone");
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
    if (options)
      optionsApi(layout, options);
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
  const $LayoutInitializer = class extends rosanaComponentProperties {
    /**
     * Creates a new layout element with the specified type and options.
     */
    constructor(type, options) {
      super();
      __publicField(this, "type");
      this.element = document.createElement("div");
      this.element.id = crypto.randomUUID();
      this.type = `layout-${type}`;
      type ? layoutFitApi(this.element, type, options) : null;
    }
  };
  const $Layout = {
    /**creates a linear layout with optional child alignment properties */
    Linear: function(childAlignmentProperties) {
      return new $LayoutInitializer("linear", childAlignmentProperties);
    },
    /**creates an absolute layout with optional child alignment properties */
    Absolute: function(childAlignmentProperties) {
      return new $LayoutInitializer("absolute", childAlignmentProperties);
    },
    /*creates a frame layout with optional child alignment properties. */
    Frame: function(childAlignmentProperties) {
      return new $LayoutInitializer("frame", childAlignmentProperties);
    },
    /**creates a stack layout, either horizontal or vertical, with optional child alignment properties. */
    Stacked: function(stackOrientation = "horizontal") {
      return new $LayoutInitializer("stack", stackOrientation);
    }
  };
  function $Router(routes) {
    const guards = [];
    let params = null;
    let notFound = null;
    const handleRouteChange = async () => {
      const path = window.location.pathname;
      const matchedRoute = matchRoute(path, routes);
      if (matchedRoute) {
        params = matchedRoute.params;
        for (const guard of guards) {
          if (!await guard(matchedRoute)) {
            console.warn("Navigation cancelled by guard.");
            return;
          }
        }
        await loadComponent(matchedRoute);
      } else if (notFound) {
        await loadComponent({ component: notFound });
      } else {
        console.error(`Route not found for path: ${path}`);
      }
    };
    const matchRoute = (path, routes2) => {
      for (const route of routes2) {
        const { regex, keys } = pathToRegex(route.path);
        const match = path.match(regex);
        if (match) {
          const params2 = keys.reduce((acc, key, index) => {
            acc[key] = match[index + 1];
            return acc;
          }, {});
          if (route.children) {
            const nestedRoute = matchRoute(path.replace(regex, ""), route.children);
            if (nestedRoute) {
              return { ...route, params: params2, nested: nestedRoute };
            }
          }
          return { ...route, params: params2 };
        }
      }
      return null;
    };
    const pathToRegex = (path) => {
      const keys = [];
      const regexString = path.replace(/:([\w]+)/g, (_, key) => {
        keys.push(key);
        return "([^\\/]+)";
      }).replace(/\//g, "\\/");
      return { regex: new RegExp(`^${regexString}$`), keys };
    };
    const loadComponent = async (route) => {
      let component = route.component;
      if (typeof component === "function") {
        const module2 = await component();
        component = module2.default;
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
              instance.routingInfo(params);
            }
            if (route.nested) {
              await loadComponent(route.nested);
            }
          } else {
            console.error(`Imported Route Is Not A Valid Component: ${instance}`);
          }
        }
      }
    };
    return {
      install(app) {
        app.router = this;
        this.init();
      },
      addGuard(guardFn) {
        guards.push(guardFn);
      },
      setNotFound(component) {
        notFound = component;
      },
      add(path, component, options = {}) {
        routes.push({ path, component, options });
      },
      on(route, fn) {
        const matchedRoute = routes.find((r) => r.path === route);
        if (matchedRoute)
          matchedRoute.onLoad = fn;
      },
      navigate(path, params2 = {}) {
        const fullPath = path.replace(/:([\w]+)/g, (_, key) => {
          if (params2[key] === void 0) {
            console.error(`Parameter "${key}" not provided for path: ${path}`);
            return `:${key}`;
          }
          return params2[key];
        });
        history.pushState(null, "", fullPath);
        handleRouteChange();
      },
      init() {
        handleRouteChange();
        window.addEventListener("popstate", handleRouteChange);
      },
      back() {
        history.back();
      },
      forward() {
        history.forward();
      }
    };
  }
  const $ShowIF = function(restingParameter, onTruthyElement, onFalseyElement) {
    if (onTruthyElement === void 0 || onFalseyElement === void 0) {
      console.error(`showIF not called, one of the elements is undefined`);
      return;
    }
    restingParameter ? onTruthyElement.show() : onTruthyElement.hide();
    !restingParameter ? onFalseyElement.show() : onFalseyElement.hide();
  };
  var Easing = Object.freeze({
    Linear: Object.freeze({
      None: function(amount) {
        return amount;
      },
      In: function(amount) {
        return amount;
      },
      Out: function(amount) {
        return amount;
      },
      InOut: function(amount) {
        return amount;
      }
    }),
    Quadratic: Object.freeze({
      In: function(amount) {
        return amount * amount;
      },
      Out: function(amount) {
        return amount * (2 - amount);
      },
      InOut: function(amount) {
        if ((amount *= 2) < 1) {
          return 0.5 * amount * amount;
        }
        return -0.5 * (--amount * (amount - 2) - 1);
      }
    }),
    Cubic: Object.freeze({
      In: function(amount) {
        return amount * amount * amount;
      },
      Out: function(amount) {
        return --amount * amount * amount + 1;
      },
      InOut: function(amount) {
        if ((amount *= 2) < 1) {
          return 0.5 * amount * amount * amount;
        }
        return 0.5 * ((amount -= 2) * amount * amount + 2);
      }
    }),
    Quartic: Object.freeze({
      In: function(amount) {
        return amount * amount * amount * amount;
      },
      Out: function(amount) {
        return 1 - --amount * amount * amount * amount;
      },
      InOut: function(amount) {
        if ((amount *= 2) < 1) {
          return 0.5 * amount * amount * amount * amount;
        }
        return -0.5 * ((amount -= 2) * amount * amount * amount - 2);
      }
    }),
    Quintic: Object.freeze({
      In: function(amount) {
        return amount * amount * amount * amount * amount;
      },
      Out: function(amount) {
        return --amount * amount * amount * amount * amount + 1;
      },
      InOut: function(amount) {
        if ((amount *= 2) < 1) {
          return 0.5 * amount * amount * amount * amount * amount;
        }
        return 0.5 * ((amount -= 2) * amount * amount * amount * amount + 2);
      }
    }),
    Sinusoidal: Object.freeze({
      In: function(amount) {
        return 1 - Math.sin((1 - amount) * Math.PI / 2);
      },
      Out: function(amount) {
        return Math.sin(amount * Math.PI / 2);
      },
      InOut: function(amount) {
        return 0.5 * (1 - Math.sin(Math.PI * (0.5 - amount)));
      }
    }),
    Exponential: Object.freeze({
      In: function(amount) {
        return amount === 0 ? 0 : Math.pow(1024, amount - 1);
      },
      Out: function(amount) {
        return amount === 1 ? 1 : 1 - Math.pow(2, -10 * amount);
      },
      InOut: function(amount) {
        if (amount === 0) {
          return 0;
        }
        if (amount === 1) {
          return 1;
        }
        if ((amount *= 2) < 1) {
          return 0.5 * Math.pow(1024, amount - 1);
        }
        return 0.5 * (-Math.pow(2, -10 * (amount - 1)) + 2);
      }
    }),
    Circular: Object.freeze({
      In: function(amount) {
        return 1 - Math.sqrt(1 - amount * amount);
      },
      Out: function(amount) {
        return Math.sqrt(1 - --amount * amount);
      },
      InOut: function(amount) {
        if ((amount *= 2) < 1) {
          return -0.5 * (Math.sqrt(1 - amount * amount) - 1);
        }
        return 0.5 * (Math.sqrt(1 - (amount -= 2) * amount) + 1);
      }
    }),
    Elastic: Object.freeze({
      In: function(amount) {
        if (amount === 0) {
          return 0;
        }
        if (amount === 1) {
          return 1;
        }
        return -Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
      },
      Out: function(amount) {
        if (amount === 0) {
          return 0;
        }
        if (amount === 1) {
          return 1;
        }
        return Math.pow(2, -10 * amount) * Math.sin((amount - 0.1) * 5 * Math.PI) + 1;
      },
      InOut: function(amount) {
        if (amount === 0) {
          return 0;
        }
        if (amount === 1) {
          return 1;
        }
        amount *= 2;
        if (amount < 1) {
          return -0.5 * Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
        }
        return 0.5 * Math.pow(2, -10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI) + 1;
      }
    }),
    Back: Object.freeze({
      In: function(amount) {
        var s = 1.70158;
        return amount === 1 ? 1 : amount * amount * ((s + 1) * amount - s);
      },
      Out: function(amount) {
        var s = 1.70158;
        return amount === 0 ? 0 : --amount * amount * ((s + 1) * amount + s) + 1;
      },
      InOut: function(amount) {
        var s = 1.70158 * 1.525;
        if ((amount *= 2) < 1) {
          return 0.5 * (amount * amount * ((s + 1) * amount - s));
        }
        return 0.5 * ((amount -= 2) * amount * ((s + 1) * amount + s) + 2);
      }
    }),
    Bounce: Object.freeze({
      In: function(amount) {
        return 1 - Easing.Bounce.Out(1 - amount);
      },
      Out: function(amount) {
        if (amount < 1 / 2.75) {
          return 7.5625 * amount * amount;
        } else if (amount < 2 / 2.75) {
          return 7.5625 * (amount -= 1.5 / 2.75) * amount + 0.75;
        } else if (amount < 2.5 / 2.75) {
          return 7.5625 * (amount -= 2.25 / 2.75) * amount + 0.9375;
        } else {
          return 7.5625 * (amount -= 2.625 / 2.75) * amount + 0.984375;
        }
      },
      InOut: function(amount) {
        if (amount < 0.5) {
          return Easing.Bounce.In(amount * 2) * 0.5;
        }
        return Easing.Bounce.Out(amount * 2 - 1) * 0.5 + 0.5;
      }
    }),
    generatePow: function(power) {
      if (power === void 0) {
        power = 4;
      }
      power = power < Number.EPSILON ? Number.EPSILON : power;
      power = power > 1e4 ? 1e4 : power;
      return {
        In: function(amount) {
          return Math.pow(amount, power);
        },
        Out: function(amount) {
          return 1 - Math.pow(1 - amount, power);
        },
        InOut: function(amount) {
          if (amount < 0.5) {
            return Math.pow(amount * 2, power) / 2;
          }
          return (1 - Math.pow(2 - amount * 2, power)) / 2 + 0.5;
        }
      };
    }
  });
  var now = function() {
    return performance.now();
  };
  var Group = (
    /** @class */
    function() {
      function Group2() {
        var tweens = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          tweens[_i] = arguments[_i];
        }
        this._tweens = {};
        this._tweensAddedDuringUpdate = {};
        this.add.apply(this, tweens);
      }
      Group2.prototype.getAll = function() {
        var _this = this;
        return Object.keys(this._tweens).map(function(tweenId) {
          return _this._tweens[tweenId];
        });
      };
      Group2.prototype.removeAll = function() {
        this._tweens = {};
      };
      Group2.prototype.add = function() {
        var _a;
        var tweens = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          tweens[_i] = arguments[_i];
        }
        for (var _b = 0, tweens_1 = tweens; _b < tweens_1.length; _b++) {
          var tween = tweens_1[_b];
          (_a = tween._group) === null || _a === void 0 ? void 0 : _a.remove(tween);
          tween._group = this;
          this._tweens[tween.getId()] = tween;
          this._tweensAddedDuringUpdate[tween.getId()] = tween;
        }
      };
      Group2.prototype.remove = function() {
        var tweens = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          tweens[_i] = arguments[_i];
        }
        for (var _a = 0, tweens_2 = tweens; _a < tweens_2.length; _a++) {
          var tween = tweens_2[_a];
          tween._group = void 0;
          delete this._tweens[tween.getId()];
          delete this._tweensAddedDuringUpdate[tween.getId()];
        }
      };
      Group2.prototype.allStopped = function() {
        return this.getAll().every(function(tween) {
          return !tween.isPlaying();
        });
      };
      Group2.prototype.update = function(time, preserve) {
        if (time === void 0) {
          time = now();
        }
        if (preserve === void 0) {
          preserve = true;
        }
        var tweenIds = Object.keys(this._tweens);
        if (tweenIds.length === 0)
          return;
        while (tweenIds.length > 0) {
          this._tweensAddedDuringUpdate = {};
          for (var i = 0; i < tweenIds.length; i++) {
            var tween = this._tweens[tweenIds[i]];
            var autoStart = !preserve;
            if (tween && tween.update(time, autoStart) === false && !preserve)
              this.remove(tween);
          }
          tweenIds = Object.keys(this._tweensAddedDuringUpdate);
        }
      };
      return Group2;
    }()
  );
  var Interpolation = {
    Linear: function(v, k) {
      var m = v.length - 1;
      var f = m * k;
      var i = Math.floor(f);
      var fn = Interpolation.Utils.Linear;
      if (k < 0) {
        return fn(v[0], v[1], f);
      }
      if (k > 1) {
        return fn(v[m], v[m - 1], m - f);
      }
      return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
    },
    Bezier: function(v, k) {
      var b = 0;
      var n = v.length - 1;
      var pw = Math.pow;
      var bn = Interpolation.Utils.Bernstein;
      for (var i = 0; i <= n; i++) {
        b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
      }
      return b;
    },
    CatmullRom: function(v, k) {
      var m = v.length - 1;
      var f = m * k;
      var i = Math.floor(f);
      var fn = Interpolation.Utils.CatmullRom;
      if (v[0] === v[m]) {
        if (k < 0) {
          i = Math.floor(f = m * (1 + k));
        }
        return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
      } else {
        if (k < 0) {
          return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
        }
        if (k > 1) {
          return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
        }
        return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
      }
    },
    Utils: {
      Linear: function(p0, p1, t) {
        return (p1 - p0) * t + p0;
      },
      Bernstein: function(n, i) {
        var fc = Interpolation.Utils.Factorial;
        return fc(n) / fc(i) / fc(n - i);
      },
      Factorial: /* @__PURE__ */ function() {
        var a = [1];
        return function(n) {
          var s = 1;
          if (a[n]) {
            return a[n];
          }
          for (var i = n; i > 1; i--) {
            s *= i;
          }
          a[n] = s;
          return s;
        };
      }(),
      CatmullRom: function(p0, p1, p2, p3, t) {
        var v0 = (p2 - p0) * 0.5;
        var v1 = (p3 - p1) * 0.5;
        var t2 = t * t;
        var t3 = t * t2;
        return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
      }
    }
  };
  var Sequence = (
    /** @class */
    function() {
      function Sequence2() {
      }
      Sequence2.nextId = function() {
        return Sequence2._nextId++;
      };
      Sequence2._nextId = 0;
      return Sequence2;
    }()
  );
  var mainGroup = new Group();
  var Tween = (
    /** @class */
    function() {
      function Tween2(object, group) {
        this._isPaused = false;
        this._pauseStart = 0;
        this._valuesStart = {};
        this._valuesEnd = {};
        this._valuesStartRepeat = {};
        this._duration = 1e3;
        this._isDynamic = false;
        this._initialRepeat = 0;
        this._repeat = 0;
        this._yoyo = false;
        this._isPlaying = false;
        this._reversed = false;
        this._delayTime = 0;
        this._startTime = 0;
        this._easingFunction = Easing.Linear.None;
        this._interpolationFunction = Interpolation.Linear;
        this._chainedTweens = [];
        this._onStartCallbackFired = false;
        this._onEveryStartCallbackFired = false;
        this._id = Sequence.nextId();
        this._isChainStopped = false;
        this._propertiesAreSetUp = false;
        this._goToEnd = false;
        this._object = object;
        if (typeof group === "object") {
          this._group = group;
          group.add(this);
        } else if (group === true) {
          this._group = mainGroup;
          mainGroup.add(this);
        }
      }
      Tween2.prototype.getId = function() {
        return this._id;
      };
      Tween2.prototype.isPlaying = function() {
        return this._isPlaying;
      };
      Tween2.prototype.isPaused = function() {
        return this._isPaused;
      };
      Tween2.prototype.getDuration = function() {
        return this._duration;
      };
      Tween2.prototype.to = function(target, duration) {
        if (duration === void 0) {
          duration = 1e3;
        }
        if (this._isPlaying)
          throw new Error("Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.");
        this._valuesEnd = target;
        this._propertiesAreSetUp = false;
        this._duration = duration < 0 ? 0 : duration;
        return this;
      };
      Tween2.prototype.duration = function(duration) {
        if (duration === void 0) {
          duration = 1e3;
        }
        this._duration = duration < 0 ? 0 : duration;
        return this;
      };
      Tween2.prototype.dynamic = function(dynamic) {
        if (dynamic === void 0) {
          dynamic = false;
        }
        this._isDynamic = dynamic;
        return this;
      };
      Tween2.prototype.start = function(time, overrideStartingValues) {
        if (time === void 0) {
          time = now();
        }
        if (overrideStartingValues === void 0) {
          overrideStartingValues = false;
        }
        if (this._isPlaying) {
          return this;
        }
        this._repeat = this._initialRepeat;
        if (this._reversed) {
          this._reversed = false;
          for (var property in this._valuesStartRepeat) {
            this._swapEndStartRepeatValues(property);
            this._valuesStart[property] = this._valuesStartRepeat[property];
          }
        }
        this._isPlaying = true;
        this._isPaused = false;
        this._onStartCallbackFired = false;
        this._onEveryStartCallbackFired = false;
        this._isChainStopped = false;
        this._startTime = time;
        this._startTime += this._delayTime;
        if (!this._propertiesAreSetUp || overrideStartingValues) {
          this._propertiesAreSetUp = true;
          if (!this._isDynamic) {
            var tmp = {};
            for (var prop in this._valuesEnd)
              tmp[prop] = this._valuesEnd[prop];
            this._valuesEnd = tmp;
          }
          this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat, overrideStartingValues);
        }
        return this;
      };
      Tween2.prototype.startFromCurrentValues = function(time) {
        return this.start(time, true);
      };
      Tween2.prototype._setupProperties = function(_object, _valuesStart, _valuesEnd, _valuesStartRepeat, overrideStartingValues) {
        for (var property in _valuesEnd) {
          var startValue = _object[property];
          var startValueIsArray = Array.isArray(startValue);
          var propType = startValueIsArray ? "array" : typeof startValue;
          var isInterpolationList = !startValueIsArray && Array.isArray(_valuesEnd[property]);
          if (propType === "undefined" || propType === "function") {
            continue;
          }
          if (isInterpolationList) {
            var endValues = _valuesEnd[property];
            if (endValues.length === 0) {
              continue;
            }
            var temp = [startValue];
            for (var i = 0, l = endValues.length; i < l; i += 1) {
              var value = this._handleRelativeValue(startValue, endValues[i]);
              if (isNaN(value)) {
                isInterpolationList = false;
                console.warn("Found invalid interpolation list. Skipping.");
                break;
              }
              temp.push(value);
            }
            if (isInterpolationList) {
              _valuesEnd[property] = temp;
            }
          }
          if ((propType === "object" || startValueIsArray) && startValue && !isInterpolationList) {
            _valuesStart[property] = startValueIsArray ? [] : {};
            var nestedObject = startValue;
            for (var prop in nestedObject) {
              _valuesStart[property][prop] = nestedObject[prop];
            }
            _valuesStartRepeat[property] = startValueIsArray ? [] : {};
            var endValues = _valuesEnd[property];
            if (!this._isDynamic) {
              var tmp = {};
              for (var prop in endValues)
                tmp[prop] = endValues[prop];
              _valuesEnd[property] = endValues = tmp;
            }
            this._setupProperties(nestedObject, _valuesStart[property], endValues, _valuesStartRepeat[property], overrideStartingValues);
          } else {
            if (typeof _valuesStart[property] === "undefined" || overrideStartingValues) {
              _valuesStart[property] = startValue;
            }
            if (!startValueIsArray) {
              _valuesStart[property] *= 1;
            }
            if (isInterpolationList) {
              _valuesStartRepeat[property] = _valuesEnd[property].slice().reverse();
            } else {
              _valuesStartRepeat[property] = _valuesStart[property] || 0;
            }
          }
        }
      };
      Tween2.prototype.stop = function() {
        if (!this._isChainStopped) {
          this._isChainStopped = true;
          this.stopChainedTweens();
        }
        if (!this._isPlaying) {
          return this;
        }
        this._isPlaying = false;
        this._isPaused = false;
        if (this._onStopCallback) {
          this._onStopCallback(this._object);
        }
        return this;
      };
      Tween2.prototype.end = function() {
        this._goToEnd = true;
        this.update(this._startTime + this._duration);
        return this;
      };
      Tween2.prototype.pause = function(time) {
        if (time === void 0) {
          time = now();
        }
        if (this._isPaused || !this._isPlaying) {
          return this;
        }
        this._isPaused = true;
        this._pauseStart = time;
        return this;
      };
      Tween2.prototype.resume = function(time) {
        if (time === void 0) {
          time = now();
        }
        if (!this._isPaused || !this._isPlaying) {
          return this;
        }
        this._isPaused = false;
        this._startTime += time - this._pauseStart;
        this._pauseStart = 0;
        return this;
      };
      Tween2.prototype.stopChainedTweens = function() {
        for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
          this._chainedTweens[i].stop();
        }
        return this;
      };
      Tween2.prototype.group = function(group) {
        if (!group) {
          console.warn("tween.group() without args has been removed, use group.add(tween) instead.");
          return this;
        }
        group.add(this);
        return this;
      };
      Tween2.prototype.remove = function() {
        var _a;
        (_a = this._group) === null || _a === void 0 ? void 0 : _a.remove(this);
        return this;
      };
      Tween2.prototype.delay = function(amount) {
        if (amount === void 0) {
          amount = 0;
        }
        this._delayTime = amount;
        return this;
      };
      Tween2.prototype.repeat = function(times) {
        if (times === void 0) {
          times = 0;
        }
        this._initialRepeat = times;
        this._repeat = times;
        return this;
      };
      Tween2.prototype.repeatDelay = function(amount) {
        this._repeatDelayTime = amount;
        return this;
      };
      Tween2.prototype.yoyo = function(yoyo) {
        if (yoyo === void 0) {
          yoyo = false;
        }
        this._yoyo = yoyo;
        return this;
      };
      Tween2.prototype.easing = function(easingFunction) {
        if (easingFunction === void 0) {
          easingFunction = Easing.Linear.None;
        }
        this._easingFunction = easingFunction;
        return this;
      };
      Tween2.prototype.interpolation = function(interpolationFunction) {
        if (interpolationFunction === void 0) {
          interpolationFunction = Interpolation.Linear;
        }
        this._interpolationFunction = interpolationFunction;
        return this;
      };
      Tween2.prototype.chain = function() {
        var tweens = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          tweens[_i] = arguments[_i];
        }
        this._chainedTweens = tweens;
        return this;
      };
      Tween2.prototype.onStart = function(callback) {
        this._onStartCallback = callback;
        return this;
      };
      Tween2.prototype.onEveryStart = function(callback) {
        this._onEveryStartCallback = callback;
        return this;
      };
      Tween2.prototype.onUpdate = function(callback) {
        this._onUpdateCallback = callback;
        return this;
      };
      Tween2.prototype.onRepeat = function(callback) {
        this._onRepeatCallback = callback;
        return this;
      };
      Tween2.prototype.onComplete = function(callback) {
        this._onCompleteCallback = callback;
        return this;
      };
      Tween2.prototype.onStop = function(callback) {
        this._onStopCallback = callback;
        return this;
      };
      Tween2.prototype.update = function(time, autoStart) {
        var _this = this;
        var _a;
        if (time === void 0) {
          time = now();
        }
        if (autoStart === void 0) {
          autoStart = Tween2.autoStartOnUpdate;
        }
        if (this._isPaused)
          return true;
        var property;
        if (!this._goToEnd && !this._isPlaying) {
          if (autoStart)
            this.start(time, true);
          else
            return false;
        }
        this._goToEnd = false;
        if (time < this._startTime) {
          return true;
        }
        if (this._onStartCallbackFired === false) {
          if (this._onStartCallback) {
            this._onStartCallback(this._object);
          }
          this._onStartCallbackFired = true;
        }
        if (this._onEveryStartCallbackFired === false) {
          if (this._onEveryStartCallback) {
            this._onEveryStartCallback(this._object);
          }
          this._onEveryStartCallbackFired = true;
        }
        var elapsedTime = time - this._startTime;
        var durationAndDelay = this._duration + ((_a = this._repeatDelayTime) !== null && _a !== void 0 ? _a : this._delayTime);
        var totalTime = this._duration + this._repeat * durationAndDelay;
        var calculateElapsedPortion = function() {
          if (_this._duration === 0)
            return 1;
          if (elapsedTime > totalTime) {
            return 1;
          }
          var timesRepeated = Math.trunc(elapsedTime / durationAndDelay);
          var timeIntoCurrentRepeat = elapsedTime - timesRepeated * durationAndDelay;
          var portion = Math.min(timeIntoCurrentRepeat / _this._duration, 1);
          if (portion === 0 && elapsedTime === _this._duration) {
            return 1;
          }
          return portion;
        };
        var elapsed = calculateElapsedPortion();
        var value = this._easingFunction(elapsed);
        this._updateProperties(this._object, this._valuesStart, this._valuesEnd, value);
        if (this._onUpdateCallback) {
          this._onUpdateCallback(this._object, elapsed);
        }
        if (this._duration === 0 || elapsedTime >= this._duration) {
          if (this._repeat > 0) {
            var completeCount = Math.min(Math.trunc((elapsedTime - this._duration) / durationAndDelay) + 1, this._repeat);
            if (isFinite(this._repeat)) {
              this._repeat -= completeCount;
            }
            for (property in this._valuesStartRepeat) {
              if (!this._yoyo && typeof this._valuesEnd[property] === "string") {
                this._valuesStartRepeat[property] = // eslint-disable-next-line
                // @ts-ignore FIXME?
                this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
              }
              if (this._yoyo) {
                this._swapEndStartRepeatValues(property);
              }
              this._valuesStart[property] = this._valuesStartRepeat[property];
            }
            if (this._yoyo) {
              this._reversed = !this._reversed;
            }
            this._startTime += durationAndDelay * completeCount;
            if (this._onRepeatCallback) {
              this._onRepeatCallback(this._object);
            }
            this._onEveryStartCallbackFired = false;
            return true;
          } else {
            if (this._onCompleteCallback) {
              this._onCompleteCallback(this._object);
            }
            for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
              this._chainedTweens[i].start(this._startTime + this._duration, false);
            }
            this._isPlaying = false;
            return false;
          }
        }
        return true;
      };
      Tween2.prototype._updateProperties = function(_object, _valuesStart, _valuesEnd, value) {
        for (var property in _valuesEnd) {
          if (_valuesStart[property] === void 0) {
            continue;
          }
          var start = _valuesStart[property] || 0;
          var end = _valuesEnd[property];
          var startIsArray = Array.isArray(_object[property]);
          var endIsArray = Array.isArray(end);
          var isInterpolationList = !startIsArray && endIsArray;
          if (isInterpolationList) {
            _object[property] = this._interpolationFunction(end, value);
          } else if (typeof end === "object" && end) {
            this._updateProperties(_object[property], start, end, value);
          } else {
            end = this._handleRelativeValue(start, end);
            if (typeof end === "number") {
              _object[property] = start + (end - start) * value;
            }
          }
        }
      };
      Tween2.prototype._handleRelativeValue = function(start, end) {
        if (typeof end !== "string") {
          return end;
        }
        if (end.charAt(0) === "+" || end.charAt(0) === "-") {
          return start + parseFloat(end);
        }
        return parseFloat(end);
      };
      Tween2.prototype._swapEndStartRepeatValues = function(property) {
        var tmp = this._valuesStartRepeat[property];
        var endValue = this._valuesEnd[property];
        if (typeof endValue === "string") {
          this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(endValue);
        } else {
          this._valuesStartRepeat[property] = this._valuesEnd[property];
        }
        this._valuesEnd[property] = tmp;
      };
      Tween2.autoStartOnUpdate = false;
      return Tween2;
    }()
  );
  var TWEEN = mainGroup;
  TWEEN.getAll.bind(TWEEN);
  TWEEN.removeAll.bind(TWEEN);
  TWEEN.add.bind(TWEEN);
  TWEEN.remove.bind(TWEEN);
  TWEEN.update.bind(TWEEN);
  function resolveEasing(type) {
    const easingParts = type.split(".");
    let easingFn = Easing;
    for (let part of easingParts) {
      easingFn = easingFn[part];
    }
    return easingFn;
  }
  const $Tween = function(object, tweenProperties) {
    const easingFn = resolveEasing(tweenProperties == null ? void 0 : tweenProperties.easing);
    const defaultPosition = { x: 0, y: 0 };
    const tween = new Tween(defaultPosition).to(tweenProperties == null ? void 0 : tweenProperties.target, tweenProperties == null ? void 0 : tweenProperties.duration).easing(easingFn).onUpdate(() => {
      object == null ? void 0 : object.element.style.setProperty("transform", "translate(" + defaultPosition.x + "px, " + defaultPosition.y + "px)");
    }).start();
    animate(0);
    function animate(time) {
      requestAnimationFrame(animate);
      tween.update(time);
    }
  };
  class $Element extends rosanaComponentProperties {
    constructor(tag, parent) {
      super();
      __publicField(this, "type");
      __publicField(this, "parent");
      __publicField(this, "element");
      this.type = tag.toUpperCase();
      this.parent = parent;
      this.element = document.createElement(tag);
      this.element.id = crypto.randomUUID();
      parent.addChild(this);
      const handler = {
        get(obj, prop) {
          if (prop in obj) {
            return obj[prop];
          } else {
            return obj.element[prop];
          }
        },
        set(obj, prop, value) {
          if (prop in obj) {
            obj[prop] = value;
          } else {
            obj.element[prop] = value;
          }
          return true;
        }
      };
      const proxy = new Proxy(this, handler);
      return proxy;
    }
  }
  const isValidHtmlTag = (tag) => {
    return document.createElement(tag).toString() !== "[object HTMLUnknownElement]";
  };
  const createHtmlElement = (parent, tag) => {
    if (!isValidHtmlTag(tag)) {
      throw new Error(`Invalid HTML tag: ${tag}`);
    }
    return new $Element(tag, parent);
  };
  const $Button = (parent) => {
    return createHtmlElement(parent, "button");
  };
  const $Image = (parent) => {
    return createHtmlElement(parent, "img");
  };
  const $Input = (parent) => {
    return createHtmlElement(parent, "input");
  };
  const $A = (parent) => {
    return createHtmlElement(parent, "a");
  };
  const $Form = (parent) => {
    return createHtmlElement(parent, "form");
  };
  const $Table = (parent) => {
    return createHtmlElement(parent, "table");
  };
  const $Obj = (parent, tag = "div") => {
    return createHtmlElement(parent, tag);
  };
  const $WeakSignal = function(defaultValue) {
    let internal_variable = defaultValue;
    let subscriptions = [];
    const notify = function() {
      for (let subscriber of subscriptions) {
        subscriber(internal_variable);
      }
    };
    return {
      /** * set the signal's value*/
      set value(val) {
        internal_variable = val;
        notify();
      },
      /** * returns the signals value*/
      get value() {
        return internal_variable;
      },
      /** * subscribe to the signal*/
      subscribe: (fn) => {
        subscriptions.push(fn);
      }
    };
  };
  const $WeakStore = function(initialValue) {
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
  exports2.$A = $A;
  exports2.$Animate = $Animate;
  exports2.$Button = $Button;
  exports2.$Form = $Form;
  exports2.$Image = $Image;
  exports2.$Input = $Input;
  exports2.$Layout = $Layout;
  exports2.$Obj = $Obj;
  exports2.$Router = $Router;
  exports2.$ShowIF = $ShowIF;
  exports2.$Table = $Table;
  exports2.$Tween = $Tween;
  exports2.$WeakSignal = $WeakSignal;
  exports2.$WeakStore = $WeakStore;
  exports2.$createApp = $createApp;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
