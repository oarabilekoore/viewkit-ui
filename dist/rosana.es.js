const p = class {
  constructor() {
    this.element = null, this.elementClasses = [], this.eventListeners = [];
  }
  /**
   * Add a child element to this element.
   * @param {$uiControl} child - The child component to add.
   * @returns {this} - Returns the instance of the class for chaining.
   */
  addChild(t) {
    return t instanceof p && this.element ? this.element.appendChild(t.element) : console.error("Mounted Child Is Not A Rosana Component"), this;
  }
  /**
   * Set the alignment of child elements in the control.
   * @param {string} options - Alignment options.
   */
  set alignment(t) {
    t ? x(this.element, t) : console.log("Alignment Options Undefined");
  }
  /**
   * batch dom api setters and getters effeciently
   * @param {object} props
   * @returns this
   */
  batch(t) {
    return Object.entries(t).forEach(([n, s]) => {
      requestAnimationFrame(() => {
        this.element && (this.element[n] = s);
      });
    }), this;
  }
  /**
   * Add an event listener to the element.
   * @param {string} event - The event type.
   * @param {Function} handler - The event handler function.
   * @returns {this} - Returns the instance of the class for chaining.
   */
  on(t, n) {
    var s;
    return (s = this.element) == null || s.addEventListener(t, n), this.eventListeners.push([t, n]), this;
  }
  css(t) {
    var s;
    const n = r(t);
    return (s = this.element) == null || s.classList.add(n), this.elementClasses.push(n), this;
  }
  /**
   * Remove a child element from this element.
   * @param {instanceOf<$uiControl>} child - The child component to remove.
   * @returns {this} - Returns the instance of the class for chaining.
   */
  destroyChild(t) {
    var n;
    return t instanceof p ? (t.eventListeners.forEach(([s, e]) => {
      var o;
      (o = t.element) == null || o.removeEventListener(s, e);
    }), (n = t.element) == null || n.remove()) : console.error("Child Is Not A Rosana Component"), this;
  }
  /**
   * Sets the visibility of the element.
   * @param {boolean} bool - Visibility state.
   */
  show() {
    this.css({ visibility: "visible" });
  }
  /**
   * Hide the element
   */
  hide() {
    this.css({ visibility: "hidden" });
  }
  /**
   * Sets the display and visibility of the element.
   * @param {boolean} bool - Visibility and space control state.
   */
  set gone(t) {
    this.css({
      display: t ? "none !important" : "block",
      visibility: t ? "hidden" : "visible"
    });
  }
};
let C = 0, b = 0;
function y() {
  return `rosana-id-${C++}`;
}
function v() {
  return `rosana-class-${b++}`;
}
const r = (t, ...n) => {
  const s = v(), e = document.styleSheets[0];
  let o = "", i = [], a = [];
  const m = (c, l) => {
    let u = "";
    return Object.entries(c).forEach(([d, f]) => {
      if (typeof f == "object")
        if (d.startsWith("@"))
          a.push({
            media: d,
            selector: l,
            styles: f
          });
        else if (d.startsWith("&:")) {
          const $ = d.replace("&", l);
          i.push({
            selector: $,
            styles: f
          });
        } else
          i.push({
            selector: `${l} ${d}`,
            styles: f
          });
      else
        u += `${d.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${f}; `;
    }), u;
  };
  return typeof t == "object" && !Array.isArray(t) ? o = m(t, `.${s}`) : Array.isArray(t) && (o = t.reduce((c, l, u) => c + l + (n[u] || ""), "")), o && e.insertRule(`.${s} { ${o} }`, e.cssRules.length), i.forEach(({ selector: c, styles: l }) => {
    const u = m(l, c);
    if (u) {
      const d = `${c} { ${u} }`;
      e.insertRule(d, e.cssRules.length);
    }
  }), a.forEach(({ media: c, selector: l, styles: u }) => {
    const d = m(u, l);
    if (d) {
      const f = `${c} { ${l} { ${d} } }`;
      e.insertRule(f, e.cssRules.length);
    }
  }), s;
};
let N = [
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
const x = (t, n) => {
  const s = {
    noscrollbar: () => {
      t.classList.add("noscrollbar");
    },
    fillxy: () => {
      let e = r({
        width: "100%",
        height: window.innerHeight + "px"
      });
      t.classList.add(e);
    },
    fillx: () => {
      let e = r({
        width: "100%"
      });
      t.classList.add(e);
    },
    filly: () => {
      let e = r({
        height: window.innerHeight + "px"
      });
      t.classList.add(e);
    },
    scrollxy: () => {
      let e = r({
        overflow: "auto"
      });
      t.classList.add(e);
    },
    scrollx: () => {
      let e = r({
        overflowX: "auto"
      });
      t.classList.add(e);
    },
    scrolly: () => {
      let e = r({
        overflowY: "auto"
      });
      t.classList.add(e);
    },
    left: () => {
      let e = r({
        display: "flex",
        justifyContent: "flex-start"
      });
      t.classList.add(e);
    },
    right: () => {
      let e = r({
        display: "flex",
        justifyContent: "flex-end"
      });
      t.classList.add(e);
    },
    center: () => {
      let e = r({
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      });
      t.classList.add(e);
    },
    vcenter: () => {
      let e = r({
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      });
      t.classList.add(e);
    },
    bottom: () => {
      let e = r({
        display: "flex",
        alignItems: "flex-end"
      });
      t.classList.add(e);
    },
    top: () => {
      let e = r({
        display: "flex",
        alignItems: "flex-start"
      });
      t.classList.add(e);
    },
    horizontal: () => {
      let e = r({
        display: "flex",
        flexDirection: "row !important"
      });
      t.classList.add(e);
    },
    vertical: () => {
      let e = r({
        display: "flex",
        flexDirection: "column"
      });
      t.classList.add(e);
    }
  };
  n.toLowerCase().replace(/\s/g, "").split(",").forEach((e) => {
    N.includes(e) ? s[e]() : console.error(`Unknown option: ${e}`);
  });
};
function R(t, n, s) {
  s && x(t, s);
  let e = n.toLowerCase();
  if (e == "linear") {
    let o = r({
      display: "inline-flex",
      position: "relative !important",
      flexDirection: "column !important"
    });
    t.classList.add(o);
  } else if (e == "absolute") {
    let o = r({
      display: "flex"
    });
    t.classList.add(o);
  } else console.error("Unknown Layout ", t);
}
let _ = class extends p {
  constructor(t, n) {
    super(), this.element = document.createElement("div"), this.element.id = y(), this.element.type = "Layout", t && R(this.element, t, n);
  }
}, A = class extends p {
  constructor(t, n, s) {
    if (super(), this.element = document.createElement(t), this.element.id = y(), Object.entries(s).forEach(([e, o]) => {
      requestAnimationFrame(() => {
        this.element[e] = o;
      });
    }), n instanceof p)
      n.addChild(this);
    else {
      console.error("No Parent For Component To Attach To.");
      return;
    }
  }
};
const T = function(t = "linear", n = "fillxy, vcenter") {
  return new _(t, n);
}, z = function(t, n, s = {}) {
  return new A(t, n, s);
}, S = function(t) {
  return {
    _rootComponent: t,
    _plugins: [],
    /**
     * An Elements Id
     * The provided string is queried so that the
     * main component is appended to it.
     * @param {string} selector
     * @returns this
     */
    mount: function(s) {
      const e = document.querySelector(s);
      if (!e) {
        console.error(`No element found for selector "${s}"`);
        return;
      }
      document.body.style.margin = "0", document.body.style.width = "100%", e.innerHTML = "";
      const o = this._rootComponent;
      return e.appendChild(o.element), this;
    },
    /**
     *
     * @param {Function} plugin
     * @returns this
     */
    use(s) {
      return typeof s._install == "function" && (s._install(this), this._plugins.push(s)), this;
    }
  };
}, E = function(t = null) {
  let n = t, s = [];
  const e = function(o) {
    for (let i of s)
      i(n);
  };
  return {
    /**
     * set the signal's value
     * @param {any} val
     */
    set value(o) {
      n = o, e();
    },
    /**
     * returns the signals value
     * @returns internal_variable
     */
    get value() {
      return n;
    },
    /**
     * subscribe to the signal
     * @param {Function} fn
     */
    subscribe: (o) => {
      s.push(o);
    }
  };
}, F = function(t = {}) {
  let n = { ...t };
  const s = /* @__PURE__ */ new Set();
  return {
    /**
     * set the signal's value
     * @param {any} val
     */
    set(e, o) {
      n[e] = o, s.forEach((i) => i(n));
    },
    /**
     * returns the signals value
     * @returns internal_variable
     */
    get(e) {
      return n[e];
    },
    /**
     * subscribe to the signal
     * @param {Function} fn
     */
    subscribe(e) {
      return s.add(e), () => s.delete(e);
    }
  };
}, j = navigator.language || navigator.userLanguage, L = j.split("-")[0];
let g = {}, h;
const H = async function(t = L, n) {
  h = E(t);
  const s = await fetch(n);
  if (!s.ok) {
    console.log("Translation File Not Loaded");
    return;
  }
  const e = await s.json();
  g = { ...g, ...e };
}, I = function(t) {
  h.value = t;
};
let w = function(t, n) {
  if (!h || !h.value)
    return t;
  let e = (g[h.value] || g[L] || {})[t] || t;
  return n && Object.keys(n).forEach((o) => {
    e = e.replace(`{${o}}`, n[o]);
  }), e;
};
p.prototype.localizedText = async function(t, n) {
  if (!h || !h.value)
    return t;
  const s = await w(t, n);
  this.element.textContent = s, h.subscribe(async () => {
    const e = await w(t, n);
    this.element.textContent = e;
  });
};
const P = function(t) {
  return {
    routes: t,
    currentRoute: null,
    params: {},
    _init: function() {
      return console.table(this.routes), window.addEventListener("hashchange", this._handleHashChange.bind(this)), window.location.hash ? this._handleHashChange() : window.location.hash = "#/", this;
    },
    /**
     * @param {any} app
     */
    _install: function(s) {
      this._init(), s.router = this;
    },
    _render: function() {
      const s = document.querySelector("#app");
      if (!s) {
        console.error("App container not found.");
        return;
      }
      if (s.innerHTML = "", this.currentRoute && this.currentRoute.component) {
        const e = this.currentRoute.component;
        s.appendChild(e.element), typeof e.updateParams == "function" && e.updateParams(this.params);
      } else
        console.error("No valid component found for route.");
    },
    _handleHashChange: function() {
      const s = window.location.hash.slice(1) || "/", e = this._matchRoute(s);
      e ? (this.currentRoute = e.route, this.params = e.params, this._render()) : console.error(`Route not found: ${s}`);
    },
    _matchRoute(s) {
      for (const e of this.routes) {
        const { regex: o, keys: i } = this._pathToRegex(e.path), a = s.match(o);
        if (a) {
          const m = i.reduce((c, l, u) => (c[l] = a[u + 1], c), {});
          return { route: e, params: m };
        }
      }
      return null;
    },
    _pathToRegex(s) {
      const e = [], o = s.replace(/:([\w]+)/g, (i, a) => (e.push(a), "([^\\/]+)")).replace(/\//g, "\\/");
      return { regex: new RegExp(`^${o}$`), keys: e };
    },
    /**
     * Navigate to a specified path with parameters
     * @param {string} path
     * @param {object} params
     */
    navigate(s, e = {}) {
      const o = s.replace(/:([\w]+)/g, (i, a) => e[a] === void 0 ? (console.error(`Parameter "${a}" not provided for path: ${s}`), `:${a}`) : e[a]);
      window.location.hash = o;
    },
    back: function() {
      history.back();
    },
    forward: function() {
      history.forward();
    }
  };
}, O = function(t, n, s) {
  if (n === void 0 || s === void 0) {
    console.error("showIF not called, one of the elements is undefined");
    return;
  }
  t ? n.show() : n.hide(), t ? s.hide() : s.show();
}, D = (t, n, s) => {
  const e = [], o = () => e.forEach((i) => i());
  if (n.type === "Layout" && s.type === "Layout") {
    if (!s.hasChild(n)) {
      console.error(`FallBack is not a child of ${s}`);
      return;
    }
    ap.mount(n);
    const i = () => {
      n.show(), s.hide();
    }, a = () => {
      s.show(), n.hide();
    };
    i(), Promise.resolve(t()).then(() => {
      a(), o();
    }).catch(() => i());
  } else
    console.error("suspense must be used with both containers as a layout");
  return {
    /**
     * call a function after the new view is added
     * @param {Function} fn
     */
    effects: (i) => e.push(i)
  };
};
export {
  z as $component,
  S as $createApp,
  P as $hashRouter,
  T as $layout,
  H as $localize,
  I as $setLanguage,
  O as $showIF,
  E as $signal,
  F as $store,
  D as $suspense
};
//# sourceMappingURL=rosana.es.js.map
