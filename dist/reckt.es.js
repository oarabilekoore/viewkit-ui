class f {
  constructor() {
    this.element = null, this.elementClasses = [], this.eventListeners = [];
  }
  /**
   * Add a child element to this element.
   * @param {roseComponent} child - The child component to add.
   * @returns {this} - Returns the instance of the class for chaining.
   */
  addChild(n) {
    return n instanceof f && this.element ? this.element.appendChild(n.element) : console.error("Mounted Child Is Not A Reckt Component"), this;
  }
  batch(n) {
    return Object.entries(n).forEach(([t, e]) => {
      requestAnimationFrame(() => {
        this.element && (this.element[t] = e);
      });
    }), this;
  }
  /**
   * Add an event listener to the element.
   * @param {string} event - The event type.
   * @param {Function} handler - The event handler function.
   * @returns {this} - Returns the instance of the class for chaining.
   */
  on(n, t) {
    var e;
    return (e = this.element) == null || e.addEventListener(n, t), this.eventListeners.push([n, t]), this;
  }
  css(n) {
    var e;
    const t = r(n);
    return (e = this.element) == null || e.classList.add(t), this.elementClasses.push(t), this;
  }
  /**
   * Remove a child element from this element.
   * @param {instanceOf<$uiControl>} child - The child component to remove.
   * @returns {this} - Returns the instance of the class for chaining.
   */
  destroyChild(n) {
    var t;
    return n instanceof f ? (n.eventListeners.forEach(([e, i]) => {
      var l;
      (l = n.element) == null || l.removeEventListener(e, i);
    }), (t = n.element) == null || t.remove()) : console.error("Child Is Not A Reckt Component"), this;
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
  set gone(n) {
    this.css({
      display: n ? "none !important" : "block",
      visibility: n ? "hidden" : "visible"
    });
  }
  childrenMargins() {
  }
}
let b = 0, $ = 0;
function w() {
  return `rekct-id-${b++}`;
}
function v() {
  return `rekct-class-${$++}`;
}
const r = (s, ...n) => {
  const t = v(), e = document.styleSheets[0] || document.head.appendChild(document.createElement("style")).sheet;
  let i = "", l = [], p = [];
  const m = (u, o) => {
    let a = "";
    return Object.entries(u).forEach(([c, h]) => {
      if (typeof h == "object")
        if (c.startsWith("@"))
          p.push({
            media: c,
            selector: o,
            styles: h
          });
        else if (c.startsWith("&:")) {
          const L = c.replace("&", o);
          l.push({
            selector: L,
            styles: h
          });
        } else
          l.push({
            selector: `${o} ${c}`,
            styles: h
          });
      else
        a += `${c.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${h}; `;
    }), a;
  };
  return typeof s == "object" && !Array.isArray(s) ? i = m(s, `.${t}`) : Array.isArray(s) && (i = s.reduce((u, o, a) => u + o + (n[a] || ""), "")), i && e.insertRule(`.${t} { ${i} }`, e.cssRules.length), l.forEach(({ selector: u, styles: o }) => {
    const a = m(o, u);
    if (a) {
      const c = `${u} { ${a} }`;
      e.insertRule(c, e.cssRules.length);
    }
  }), p.forEach(({ media: u, selector: o, styles: a }) => {
    const c = m(a, o);
    if (c) {
      const h = `${u} { ${o} { ${c} } }`;
      e.insertRule(h, e.cssRules.length);
    }
  }), t;
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
const R = (s, n) => {
  const t = {
    noscrollbar: () => {
      s.classList.add("noscrollbar");
    },
    fillxy: () => {
      let e = r({
        width: "100%",
        height: window.innerHeight + "px"
      });
      s.classList.add(e);
    },
    fillx: () => {
      let e = r({
        width: "100%"
      });
      s.classList.add(e);
    },
    filly: () => {
      let e = r({
        height: window.innerHeight + "px"
      });
      s.classList.add(e);
    },
    scrollxy: () => {
      let e = r({
        overflow: "auto"
      });
      s.classList.add(e);
    },
    scrollx: () => {
      let e = r({
        overflowX: "auto"
      });
      s.classList.add(e);
    },
    scrolly: () => {
      let e = r({
        overflowY: "auto"
      });
      s.classList.add(e);
    },
    left: () => {
      let e = r({
        display: "flex",
        justifyContent: "flex-start"
      });
      s.classList.add(e);
    },
    right: () => {
      let e = r({
        display: "flex",
        justifyContent: "flex-end"
      });
      s.classList.add(e);
    },
    center: () => {
      let e = r({
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      });
      s.classList.add(e);
    },
    vcenter: () => {
      let e = r({
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      });
      s.classList.add(e);
    },
    bottom: () => {
      let e = r({
        display: "flex",
        alignItems: "flex-end"
      });
      s.classList.add(e);
    },
    top: () => {
      let e = r({
        display: "flex",
        alignItems: "flex-start"
      });
      s.classList.add(e);
    },
    horizontal: () => {
      let e = r({
        display: "flex",
        flexDirection: "row !important"
      });
      s.classList.add(e);
    },
    vertical: () => {
      let e = r({
        display: "flex",
        flexDirection: "column"
      });
      s.classList.add(e);
    }
  };
  n.toLowerCase().replace(/\s/g, "").split(",").forEach((e) => {
    N.includes(e) ? t[e]() : console.error(`Unknown option: ${e}`);
  });
};
function E(s, n, t) {
  t && R(s, t);
  let e = n.toLowerCase();
  if (e == "linear") {
    let i = r({
      display: "inline-flex",
      position: "relative !important",
      flexDirection: "column !important"
    });
    s.classList.add(i);
  } else if (e == "absolute") {
    let i = r({
      display: "flex"
    });
    s.classList.add(i);
  } else console.error("Unknown Layout ", s);
}
let _ = class extends f {
  constructor(s, n) {
    super(), this.element = document.createElement("div"), this.element.id = w(), this.element.type = "Layout", s && E(this.element, s, n);
  }
}, A = class extends f {
  constructor(s, n, t) {
    if (super(), this.element = document.createElement(s), this.element.id = w(), Object.entries(t).forEach(([e, i]) => {
      requestAnimationFrame(() => {
        this.element[e] = i;
      });
    }), n instanceof f)
      n.addChild(this);
    else {
      console.error("No Parent For Component To Attach To.");
      return;
    }
  }
};
const T = function(s = "linear", n = "fillxy, vcenter") {
  return new _(s, n);
}, H = function(s, n, t = {}) {
  return new A(s, n, t);
}, I = function(s) {
  return {
    _rootComponent: s,
    _plugins: [],
    /**
     * An Elements Id
     * The provided string is queried so that the
     * main component is appended to it.
     * @param {string} selector
     * @returns this
     */
    mount: function(t) {
      const e = document.querySelector(t);
      if (!e) {
        console.error(`No element found for selector "${t}"`);
        return;
      }
      document.body.style.margin = "0", document.body.style.width = "100%", e.innerHTML = "";
      const i = this._rootComponent;
      return e.appendChild(i.element), this;
    },
    /**
     *
     * @param {Function} plugin
     * @returns this
     */
    use(t) {
      return typeof t._install == "function" && (t._install(this), this._plugins.push(t)), this;
    }
  };
}, j = function(s = null) {
  let n = s, t = [];
  const e = function(i) {
    for (let l of t)
      l(n);
  };
  return {
    /**
     * set the signal's value
     * @param {any} val
     */
    set value(i) {
      n = i, e();
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
    subscribe: (i) => {
      t.push(i);
    }
  };
}, F = function(s = {}) {
  let n = { ...s };
  const t = /* @__PURE__ */ new Set();
  return {
    /**
     * set the signal's value
     * @param {any} val
     */
    set(e, i) {
      n[e] = i, t.forEach((l) => l(n));
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
      return t.add(e), () => t.delete(e);
    }
  };
}, z = navigator.language || navigator.userLanguage, x = z.split("-")[0];
let y = {}, d;
const O = async function(s = x, n) {
  d = j(s);
  const t = await fetch(n);
  if (!t.ok) {
    console.log("Translation File Not Loaded");
    return;
  }
  const e = await t.json();
  y = { ...y, ...e };
}, D = function(s) {
  d.value = s;
};
let g = function(s, n) {
  if (!d || !d.value)
    return s;
  let e = (y[d.value] || y[x] || {})[s] || s;
  return n && Object.keys(n).forEach((i) => {
    e = e.replace(`{${i}}`, n[i]);
  }), e;
};
f.prototype.localizedText = async function(s, n) {
  if (!d || !d.value)
    return s;
  const t = await g(s, n);
  this.element.textContent = t, d.subscribe(async () => {
    const e = await g(s, n);
    this.element.textContent = e;
  });
};
const q = function(s) {
  return {
    routes: s,
    currentRoute: null,
    _init: function() {
      return window.location.hash ? this._handleHashChange() : window.location.hash = "#index", window.onhashchange = this._handleHashChange.bind(this), this;
    },
    /**
     * @param {any} app
     */
    _install: function(t) {
      this._init(), t.router = this;
    },
    _render: function() {
      const t = document.querySelector("#app");
      return t && (t.innerHTML = "", this.currentRoute && this.currentRoute.component ? t.appendChild(this.currentRoute.component.element) : console.error("No valid component found for route")), this;
    },
    _handleHashChange: function() {
      const t = window.location.hash.slice(1) || "/", e = this.routes.find((i) => i.path === t);
      e ? (this.currentRoute = e, this._render()) : console.error(`Route not found: ${t}`);
    },
    /**
     * which route to head to.
     * @param {string} path
     * @returns
     */
    navigate: function(t) {
      const e = this.routes.find((i) => i.path === t);
      return e ? (this.currentRoute = e, window.location.hash = t, this._render()) : console.error(`Route not found: ${t}`), this;
    },
    back: function() {
      history.back();
    },
    forward: function() {
      history.forward();
    }
  };
}, C = function(s) {
  console.log(s);
}, M = function(s, n, t) {
  if (n === void 0 || t === void 0) {
    C("showIF not called, one of the elements is undefined");
    return;
  }
  s ? n.show() : n.hide(), s ? t.hide() : t.show();
}, P = (s, n, t) => {
  const e = [], i = () => e.forEach((l) => l());
  if (t.type === "Layout") {
    if (!t.hasChild(n)) {
      C(`FallBack is not a child of ${t}`);
      return;
    }
    const l = n.id, p = Object.keys(t.children).map(Number).map((o) => o + 1), m = () => {
      p.forEach((o) => {
        if (o !== l) {
          const a = document.getElementById("reckt-id-" + o);
          a && (a.style.display = "none");
        }
      });
    }, u = () => {
      n.hide(), p.forEach((o) => {
        if (o !== l) {
          const a = document.getElementById("reckt-id-" + o);
          a && (a.style.display = "block");
        }
      });
    };
    m(), Promise.resolve(s()).then(() => {
      u(), i();
    }).catch(() => m());
  } else
    n.show(), t.hide(), Promise.resolve(s()).then(() => {
      n.hide(), t.show(), i();
    }).catch(() => {
      n.show(), t.hide();
    });
  return {
    /**
     * call a function after the new view is added
     * @param {Function} fn
     */
    effects: (l) => e.push(l)
  };
};
export {
  H as $component,
  I as $createApp,
  q as $hashRouter,
  T as $layout,
  O as $localize,
  D as $setLanguage,
  M as $showIF,
  j as $signal,
  F as $store,
  P as $suspense
};
//# sourceMappingURL=reckt.es.js.map
