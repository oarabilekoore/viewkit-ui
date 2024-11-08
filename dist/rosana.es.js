const f = class {
  constructor() {
    this.element = null, this.elementClasses = [], this.eventListeners = [];
  }
  /**
   * Add a child element to this element.
   * @param {$uiControl} child - The child component to add.
   * @returns {this} - Returns the instance of the class for chaining.
   */
  addChild(e) {
    return e instanceof f && this.element ? this.element.appendChild(e.element) : console.error("Mounted Child Is Not A Rosana Component"), this;
  }
  /**
   * Set the alignment of child elements in the control.
   * @param {string} options - Alignment options.
   */
  set alignment(e) {
    e ? x(this.element, e) : console.log("Alignment Options Undefined");
  }
  /**
   * batch dom api setters and getters effeciently
   * @param {object} props
   * @returns this
   */
  batch(e) {
    return Object.entries(e).forEach(([n, s]) => {
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
  on(e, n) {
    var s;
    return (s = this.element) == null || s.addEventListener(e, n), this.eventListeners.push([e, n]), this;
  }
  css(e) {
    var s;
    const n = i(e);
    return (s = this.element) == null || s.classList.add(n), this.elementClasses.push(n), this;
  }
  /**
   * Remove a child element from this element.
   * @param {instanceOf<$uiControl>} child - The child component to remove.
   * @returns {this} - Returns the instance of the class for chaining.
   */
  destroyChild(e) {
    var n;
    return e instanceof f ? (e.eventListeners.forEach(([s, t]) => {
      var o;
      (o = e.element) == null || o.removeEventListener(s, t);
    }), (n = e.element) == null || n.remove()) : console.error("Child Is Not A Rosana Component"), this;
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
  set gone(e) {
    this.css({
      display: e ? "none !important" : "block",
      visibility: e ? "hidden" : "visible"
    });
  }
};
let $, b = 0;
function w() {
  return `rosana-id-${$++}`;
}
function v() {
  return `rosana-class-${b++}`;
}
const i = (e, ...n) => {
  const s = v(), t = document.styleSheets[0];
  let o = "", l = [], p = [];
  const g = (u, a) => {
    let c = "";
    return Object.entries(u).forEach(([r, h]) => {
      if (typeof h == "object")
        if (r.startsWith("@"))
          p.push({
            media: r,
            selector: a,
            styles: h
          });
        else if (r.startsWith("&:")) {
          const C = r.replace("&", a);
          l.push({
            selector: C,
            styles: h
          });
        } else
          l.push({
            selector: `${a} ${r}`,
            styles: h
          });
      else
        c += `${r.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${h}; `;
    }), c;
  };
  return typeof e == "object" && !Array.isArray(e) ? o = g(e, `.${s}`) : Array.isArray(e) && (o = e.reduce((u, a, c) => u + a + (n[c] || ""), "")), o && t.insertRule(`.${s} { ${o} }`, t.cssRules.length), l.forEach(({ selector: u, styles: a }) => {
    const c = g(a, u);
    if (c) {
      const r = `${u} { ${c} }`;
      t.insertRule(r, t.cssRules.length);
    }
  }), p.forEach(({ media: u, selector: a, styles: c }) => {
    const r = g(c, a);
    if (r) {
      const h = `${u} { ${a} { ${r} } }`;
      t.insertRule(h, t.cssRules.length);
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
const x = (e, n) => {
  const s = {
    noscrollbar: () => {
      e.classList.add("noscrollbar");
    },
    fillxy: () => {
      let t = i({
        width: "100%",
        height: window.innerHeight + "px"
      });
      e.classList.add(t);
    },
    fillx: () => {
      let t = i({
        width: "100%"
      });
      e.classList.add(t);
    },
    filly: () => {
      let t = i({
        height: window.innerHeight + "px"
      });
      e.classList.add(t);
    },
    scrollxy: () => {
      let t = i({
        overflow: "auto"
      });
      e.classList.add(t);
    },
    scrollx: () => {
      let t = i({
        overflowX: "auto"
      });
      e.classList.add(t);
    },
    scrolly: () => {
      let t = i({
        overflowY: "auto"
      });
      e.classList.add(t);
    },
    left: () => {
      let t = i({
        display: "flex",
        justifyContent: "flex-start"
      });
      e.classList.add(t);
    },
    right: () => {
      let t = i({
        display: "flex",
        justifyContent: "flex-end"
      });
      e.classList.add(t);
    },
    center: () => {
      let t = i({
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      });
      e.classList.add(t);
    },
    vcenter: () => {
      let t = i({
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      });
      e.classList.add(t);
    },
    bottom: () => {
      let t = i({
        display: "flex",
        alignItems: "flex-end"
      });
      e.classList.add(t);
    },
    top: () => {
      let t = i({
        display: "flex",
        alignItems: "flex-start"
      });
      e.classList.add(t);
    },
    horizontal: () => {
      let t = i({
        display: "flex",
        flexDirection: "row !important"
      });
      e.classList.add(t);
    },
    vertical: () => {
      let t = i({
        display: "flex",
        flexDirection: "column"
      });
      e.classList.add(t);
    }
  };
  n.toLowerCase().replace(/\s/g, "").split(",").forEach((t) => {
    N.includes(t) ? s[t]() : console.error(`Unknown option: ${t}`);
  });
};
function R(e, n, s) {
  s && x(e, s);
  let t = n.toLowerCase();
  if (t == "linear") {
    let o = i({
      display: "inline-flex",
      position: "relative !important",
      flexDirection: "column !important"
    });
    e.classList.add(o);
  } else if (t == "absolute") {
    let o = i({
      display: "flex"
    });
    e.classList.add(o);
  } else console.error("Unknown Layout ", e);
}
let _ = class extends f {
  constructor(e, n) {
    super(), this.element = document.createElement("div"), this.element.id = w(), this.element.type = "Layout", e && R(this.element, e, n);
  }
}, A = class extends f {
  constructor(e, n, s) {
    if (super(), this.element = document.createElement(e), this.element.id = w(), Object.entries(s).forEach(([t, o]) => {
      requestAnimationFrame(() => {
        this.element[t] = o;
      });
    }), n instanceof f)
      n.addChild(this);
    else {
      console.error("No Parent For Component To Attach To.");
      return;
    }
  }
};
const z = function(e = "linear", n = "fillxy, vcenter") {
  return new _(e, n);
}, T = function(e, n, s = {}) {
  return new A(e, n, s);
}, F = function(e) {
  return {
    _rootComponent: e,
    _plugins: [],
    /**
     * An Elements Id
     * The provided string is queried so that the
     * main component is appended to it.
     * @param {string} selector
     * @returns this
     */
    mount: function(s) {
      const t = document.querySelector(s);
      if (!t) {
        console.error(`No element found for selector "${s}"`);
        return;
      }
      document.body.style.margin = "0", document.body.style.width = "100%", t.innerHTML = "";
      const o = this._rootComponent;
      return t.appendChild(o.element), this;
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
}, j = function(e = null) {
  let n = e, s = [];
  const t = function(o) {
    for (let l of s)
      l(n);
  };
  return {
    /**
     * set the signal's value
     * @param {any} val
     */
    set value(o) {
      n = o, t();
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
}, H = function(e = {}) {
  let n = { ...e };
  const s = /* @__PURE__ */ new Set();
  return {
    /**
     * set the signal's value
     * @param {any} val
     */
    set(t, o) {
      n[t] = o, s.forEach((l) => l(n));
    },
    /**
     * returns the signals value
     * @returns internal_variable
     */
    get(t) {
      return n[t];
    },
    /**
     * subscribe to the signal
     * @param {Function} fn
     */
    subscribe(t) {
      return s.add(t), () => s.delete(t);
    }
  };
}, E = navigator.language || navigator.userLanguage, L = E.split("-")[0];
let m = {}, d;
const I = async function(e = L, n) {
  d = j(e);
  const s = await fetch(n);
  if (!s.ok) {
    console.log("Translation File Not Loaded");
    return;
  }
  const t = await s.json();
  m = { ...m, ...t };
}, S = function(e) {
  d.value = e;
};
let y = function(e, n) {
  if (!d || !d.value)
    return e;
  let t = (m[d.value] || m[L] || {})[e] || e;
  return n && Object.keys(n).forEach((o) => {
    t = t.replace(`{${o}}`, n[o]);
  }), t;
};
f.prototype.localizedText = async function(e, n) {
  if (!d || !d.value)
    return e;
  const s = await y(e, n);
  this.element.textContent = s, d.subscribe(async () => {
    const t = await y(e, n);
    this.element.textContent = t;
  });
};
const O = function(e) {
  return {
    routes: e,
    currentRoute: null,
    _init: function() {
      return window.location.hash ? this._handleHashChange() : window.location.hash = "#index", window.onhashchange = this._handleHashChange.bind(this), this;
    },
    /**
     * @param {any} app
     */
    _install: function(s) {
      this._init(), s.router = this;
    },
    _render: function() {
      const s = document.querySelector("#app");
      return s && (s.innerHTML = "", this.currentRoute && this.currentRoute.component ? s.appendChild(this.currentRoute.component.element) : console.error("No valid component found for route")), this;
    },
    _handleHashChange: function() {
      const s = window.location.hash.slice(1) || "/", t = this.routes.find((o) => o.path === s);
      t ? (this.currentRoute = t, this._render()) : console.error(`Route not found: ${s}`);
    },
    /**
     * which route to head to.
     * @param {string} path
     * @returns
     */
    navigate: function(s) {
      const t = this.routes.find((o) => o.path === s);
      return t ? (this.currentRoute = t, window.location.hash = s, this._render()) : console.error(`Route not found: ${s}`), this;
    },
    back: function() {
      history.back();
    },
    forward: function() {
      history.forward();
    }
  };
}, D = function(e, n, s) {
  if (n === void 0 || s === void 0) {
    console.error("showIF not called, one of the elements is undefined");
    return;
  }
  e ? n.show() : n.hide(), e ? s.hide() : s.show();
}, q = (e, n, s) => {
  const t = [], o = () => t.forEach((l) => l());
  if (n.type === "Layout" && s.type === "Layout") {
    if (!s.hasChild(n)) {
      console.error(`FallBack is not a child of ${s}`);
      return;
    }
    ap.mount(n);
    const l = () => {
      n.show(), s.hide();
    }, p = () => {
      s.show(), n.hide();
    };
    l(), Promise.resolve(e()).then(() => {
      p(), o();
    }).catch(() => l());
  } else
    console.error("suspense must be used with both containers as a layout");
  return {
    /**
     * call a function after the new view is added
     * @param {Function} fn
     */
    effects: (l) => t.push(l)
  };
};
export {
  T as $component,
  F as $createApp,
  O as $hashRouter,
  z as $layout,
  I as $localize,
  S as $setLanguage,
  D as $showIF,
  j as $signal,
  H as $store,
  q as $suspense
};
//# sourceMappingURL=rosana.es.js.map
