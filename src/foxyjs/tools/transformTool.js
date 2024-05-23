import {
  sleep,
  g,
  ai,
  ci,
  di,
  ni,
  Et,
  Wi,
  ct,
  St,
  Ct,
  kt,
  Pt,
  ut,
  pt,
  Kt,
  qt,
  Yi,
  Oo,
  te,
  ns,
  os,
  ks,
  vc,
} from "../utils/common";
import ee from "../utils/ee";
let { abs: Rd, atan: Id, min: Bd, max: Ud } = Math;
let { parseFloat: _d } = Number;
let Fd = 12;
let Nd = 12;
let jd = 10;
let Vd = Symbol();
let Hd = Symbol();
let Wd = Symbol();
let Yd = Symbol();
class TransformTool {
  #stage;
  #transformHud = document.querySelector("#transform-hud");
  get transformHud() {
    return this.#transformHud;
  }
  ["#scale-grippies"];
  ["#rotate-grippies"];
  ["#skew-grippies"];
  ["#origin-grippie"];
  #grippies;
  canEdit = true;
  Os = false;
  Ls = false;
  Es;
  Ts;
  As;
  $s = !1;
  C;
  T;
  D;
  Rs;
  Is;
  ri;
  constructor(stage) {
    this.#stage = stage;
    this.Es = {};
    this.Ts = {};
    this.As = {};
    this.$s = !1;
    this.Os = !1;
    this.Ls = !1;
    this.ri = "scale";
    this.Rs = ks(this.xi, 25, this);
    this.Is = ks(this.xi, 250, this);
    this.#transformHud.innerHTML = `
      <g uid="grippies">
        <g uid="scale-grippies">
          <rect class="grippie" data-position="top"></rect>
          <rect class="grippie" data-position="left"></rect>
          <rect class="grippie" data-position="bottom"></rect>
          <rect class="grippie" data-position="right"></rect>
          <rect class="grippie" data-position="top-left"></rect>
          <rect class="grippie" data-position="top-right"></rect>
          <rect class="grippie" data-position="bottom-left"></rect>
          <rect class="grippie" data-position="bottom-right"></rect>
        </g>
    
        <g uid="rotate-grippies">
          <rect class="grippie" rx="999" data-position="top-left"></rect>
          <rect class="grippie" rx="999" data-position="top-right"></rect>
          <rect class="grippie" rx="999" data-position="bottom-left"></rect>
          <rect class="grippie" rx="999" data-position="bottom-right"></rect>
        </g>
    
        <g uid="skew-grippies">
          <rect class="grippie" data-position="top"></rect>
          <rect class="grippie" data-position="left"></rect>
          <rect class="grippie" data-position="bottom"></rect>
          <rect class="grippie" data-position="right"></rect>
        </g>
      </g>`;
    this["#scale-grippies"] = document.querySelector('[uid="scale-grippies"]');
    this["#rotate-grippies"] = document.querySelector('[uid="rotate-grippies"]');
    this["#skew-grippies"] = document.querySelector('[uid="skew-grippies"]');
    this.#grippies = this.#transformHud.querySelector('[uid="grippies"]');
    for (let t of this["#scale-grippies"].children) {
      const e = t;
      this.Es[e.getAttribute("data-position")] = e;
    }
    for (let t of this["#rotate-grippies"].children) {
      const e = t;
      this.As[e.getAttribute("data-position")] = t;
    }
    for (let t of this["#skew-grippies"].children) {
      const e = t;
      this.Ts[e.getAttribute("data-position")] = t;
    }
    this.#transformHud.addEventListener("pointerdown", (t) => {
      this.pointerdown(t);
    });
    this.#transformHud.addEventListener("dblclick", (t) => {
      this.He(t);
    });
  }
  get mode() {
    return this.ri;
  }
  set mode(t) {
    this.ri = t;
    this.zs();
  }
  get isScaling() {
    return this.Os;
  }
  get enabled() {
    return this.transformHud.hasAttribute("enabled");
  }
  set enabled(t) {
    t
      ? this.transformHud.setAttribute("enabled", "")
      : this.transformHud.removeAttribute("enabled");
  }
  enable = () => {
    this.enabled = true;
    this.#stage.board.addEventListener(
      "selectedelementschange",
      (this.C = () => {
        this.S();
      })
    );
    this.#stage.board.addEventListener(
      "workspacemutation",
      (this.T = () => {
        this.A();
      })
    );
    this.#stage.board.addEventListener(
      "zoomchange",
      (this.D = () => {
        this.O();
      })
    );
    this.S();
    this.O();
  };
  disable = () => {
    this.enabled = false;
    this.#stage.board.removeEventListener("selectedelementschange", this.C);
    this.#stage.board.removeEventListener("workspacemutation", this.T);
    this.#stage.board.removeEventListener("zoomchange", this.D);
  };
  forceUpdate = () => {
    this.xi();
  };
  zs = () => {
    if (this.mode === "scale") {
      this["#scale-grippies"].style.setProperty("visibility", "visible");
      this["#rotate-grippies"].style.setProperty("visibility", "hidden");
      this["#skew-grippies"].style.setProperty("visibility", "hidden");
    } else {
      if ("rotate-and-skew" === this.mode) {
        this["#scale-grippies"].style.setProperty("visibility", "hidden");
        this["#rotate-grippies"].style.setProperty("visibility", "visible");
        this["#skew-grippies"].style.setProperty("visibility", "visible");
      }
    }
    this.xi();
  };
  S = () => {
    if (0 === this.#stage.selectedObjectElements.size) {
      this.#grippies.style.setProperty("display", "none");
    } else {
      this.#grippies.style.setProperty("display", "block");
    }
    this.xi();
  };
  A = () => {
    if (this.#stage.selectedElements.size > 100) {
      this.Is();
    } else {
      this.Rs();
    }
  };
  O = () => {
    this.Rs();
  };
  pointerdown = (e) => {
    let i;
    let t;
    let s = e.target;
    let r = new DOMPoint(e.clientX, e.clientY);
    let l = r;

    s.addEventListener(
      "pointermove",
      (i = (t) => {

        // let n = new DOMPoint(t.clientX, t.clientY);
        // let time = t.timeStamp - e.timeStamp;
        // let a = Kt(n, l) > 2 || time > 80;

        // if (a) {
        s.removeEventListener("pointermove", i);
        this.Bs(e, t);
        // }

      })
    );
    window.addEventListener(
      "pointerup",
      (t = () => {
        s.removeEventListener("pointermove", i);
        window.removeEventListener("pointerup", t);
      })
    );
  };
  He = (t) => {
    let e = t.target.parentElement;
    e === this["#rotate-grippies"]
      ? this.Us()
      : e === this["#skew-grippies"]
        ? this._s()
        : e === this["#origin-grippie"] && this.Fs();
  };
  Bs = (e, i) => {

    let t = i.target.parentElement;
    if (t === this["#scale-grippies"]) {
      let t = i.target;
      this.Gs(e, t);
    } else {
      if (t === this["#rotate-grippies"]) {
        this.Ns(e);
      } else {
        if (t === this["#skew-grippies"]) {
          let t = i.target;
          this.js(e, t);
        }
      }
    }
  };
  Gs = (u, t) => {
    if (u.buttons > 1) return;

    let i;
    let e;
    let h = Array.from(this.#stage.selectedObjectElements.keys());
    let b = t.getAttribute("data-position");
    let s = new DOMPoint(
      t.x.baseVal.value + t.width.baseVal.value / 2,
      t.y.baseVal.value + t.height.baseVal.value / 2
    ).matrixTransform(ut(t));
    let x = new DOMPoint(u.clientX, u.clientY);
    let v = new ee(x, s);
    let r = !0;
    let l = !0;
    let a = !0;
    let M = !1;
    this.Os = !0;
    this.#stage.undoManager.checkpoint("scale", "#transform-tool");
    this.#stage.snapManager.snapStart();
    h = h.filter((t) => {
      if ("text" === t.localName) {
        const e = this.Hs(t);
        if (e && this.#stage.selectedObjectElements.has(e)) return !1;
      }
      return !0;
    });
    for (let a of h)
      if (!0 === r) {
        let t = ut(a);

        let { scaleX: e, scaleY: i } = Oo(t);

        let s = "left" === b || "right" === b ? e : i;
        let r = getComputedStyle(a);
        a[Vd] = a.style.getPropertyValue("stroke-width");
        a[Hd] = a.style.getPropertyValue("vector-effect");
        let l = Rd(s) * _d(r.getPropertyValue("stroke-width"));
        a.style.setProperty("stroke-width", l);
        a.style.setProperty("vector-effect", "non-scaling-stroke");
      }
    if (this["Ws"](h)) {
      let [t, ...e] = h;
      let w = Symbol();
      this["Ls"] = !0;
      pt(t, this.#transformHud);
      for (let l of h) {
        let t = ut(l).inverse();
        let e = ct(l);
        let s = h.filter((t) => t !== l);
        let r = [Wi(l)];
        for (let i of s) {
          let t = pt(i, l);
          let e = di(Wi(i), t);
          r.push(e);
        }
        let i = ci(r);
        l[w] = { clientToUserTransform: t, userTransform: e, bbox: i };
      }

      window.addEventListener(
        "pointermove",
        (i = (u) => {

          for (let y of h) {
            let { clientToUserTransform: t, userTransform: e, bbox: i } = y[w];
            let s = x.matrixTransform(t);
            let r = new DOMPoint(u.clientX, u.clientY);
            let l = this.#stage.snapManager.snapPoint(r);
            if (!1 === qt(r, l)) {
              r = l;
              r["x"] -= v["x"];
              r["y"] -= v["y"];
            }
            let a = r.matrixTransform(t);
            let h = a["x"] - s["x"];
            let o = a["y"] - s["y"];
            let {
              centerX: n,
              centerY: d,
              scaleX: g,
              scaleY: p,
            } = this.Ys(h, o, i, b, M);
            let f = -n * (Number(g) - 1);
            let c = -d * (Number(p) - 1);
            let m = DOMMatrix.fromMatrix(e);
            m.translateSelf(f, c);
            m.scaleSelf(g, p);
            y.setAttribute("transform", m);
          }
        })
      );
    } else {
      let t = Array.from(this.#stage.selectedObjectElements.keys()).map((t) =>
        Yi(t)
      );
      let y = ci(t);
      for (let s of h) {
        let t = ut(s);
        let e = t.inverse();
        let i = ct(s);
        s[Wd] = {
          clientToUserTransform: t,
          userToClientTransform: e,
          userTransform: i,
        };
      }
      window.addEventListener(
        "pointermove",
        (i = (m) => {
          for (let c of h) {
            let t = new DOMPoint(u.clientX, u.clientY);
            let e = new DOMPoint(m.clientX, m.clientY);
            {
              let t = this.#stage.snapManager.snapPoint(e);
              if (!1 === qt(e, t)) {
                e = t;
                e["x"] -= v["x"];
                e["y"] -= v["y"];
              }
            }
            let i = e["x"] - t["x"];
            let s = e["y"] - t["y"];
            let {
              clientToUserTransform: r,
              userToClientTransform: l,
              userTransform: a,
            } = c[Wd];
            let {
              centerX: h,
              centerY: o,
              scaleX: n,
              scaleY: d,
            } = this["Ys"](i, s, y, b, M);
            let g = -h * (Number(n) - 1);
            let p = -o * (Number(d) - 1);
            let f = DOMMatrix.fromMatrix(a);
            f.multiplySelf(l);
            f.translateSelf(g, p);
            f.scaleSelf(n, d);
            f.multiplySelf(r);
            c.setAttribute("transform", f.toString());
          }
        })
      );
    }
    window.addEventListener(
      "pointerup",
      (e = () => {
        window.removeEventListener("pointermove", i);
        window.removeEventListener("pointerup", e);
        for (let t of h) {
          if (!0 === r) {
            t.style.setProperty("stroke-width", t[Vd]);
            t.style.setProperty("vector-effect", t[Hd]);
          }
        }
        this.#stage.snapManager.snapEnd();
        this.Os = !1;
        this.Ls = !1;
      })
    );
  };
  Ns = (i) => {
    if (i.buttons > 1) return;
    let d = [...Array.from(this.#stage.selectedObjectElements.keys())];
    this.#stage.undoManager.checkpoint("rotate", "#transform-tool");
    d = d.filter((e) => {
      if ("text" === e.localName) {
        let t = this.Hs(e);
        if (t && this.#stage.selectedObjectElements.has(t)) return !1;
      }
      return !0;
    });
    this.Ws(d) && (this.Ls = !0);
    if (1 === d.length) {
      let t;
      let e;
      let r = d[0];
      let l = Ct(r);
      let a = new DOMPoint(i.clientX, i.clientY);
      let h = kt([r]);
      this.$s = !0;
      window.addEventListener(
        "pointermove",
        (t = (t) => {
          let e = new DOMPoint(t.clientX, t.clientY);
          let i = ni(h, a, e);
          let s = l + i;
          this.#stage.shiftKey && (s = ai(s, 15));
          St(r, s);
        })
      );
      window.addEventListener(
        "pointerup",
        (e = () => {
          window.removeEventListener("pointermove", t);
          window.removeEventListener("pointerup", e);
          this.$s = !1;
          this.Ls = !1;
        })
      );
    } else {
      let t;
      let e;
      let o = kt(d);
      let n = new DOMPoint(i["clientX"], i["clientY"]);
      for (let s of d) {
        let t = ct(s);
        let e = ut(s);
        let i = e.inverse();
        s[Wd] = {
          clientToUserTransform: e,
          userToClientTransform: i,
          userTransform: t,
        };
      }
      this.$s = !0;
      window.addEventListener(
        "pointermove",
        (t = (h) => {
          for (let a of d) {
            let {
              clientToUserTransform: t,
              userToClientTransform: e,
              userTransform: i,
            } = a[Wd];
            let s = new DOMPoint(h["clientX"], h["clientY"]);
            let r = ni(o, n, s);
            this.#stage.shiftKey && (r = ai(r, 15));
            let l = DOMMatrix.fromMatrix(i);
            l.multiplySelf(e);
            l.translateSelf(o["x"], o["y"]);
            l.rotateSelf(r);
            l.translateSelf(-o["x"], -o["y"]);
            l.multiplySelf(t);
            a.setAttribute("transform", l);
          }
        })
      );
      window.addEventListener(
        "pointerup",
        (e = () => {
          window.removeEventListener("pointermove", t);
          window.removeEventListener("pointerup", e);
          this.$s = !1;
          this.Ls = !1;
        })
      );
    }
  };
  js = (i, t) => {
    if (i.buttons > 1) return;
    let l;
    let e;
    let p;
    let f = [...Array.from(this.#stage.selectedObjectElements.keys())];
    let s = t.getAttribute("data-position");
    p = "top" === s || "bottom" === s ? "horizontal" : "vertical";
    this.#stage.undoManager.checkpoint("skew", "#transform-tool");
    f = f.filter((e) => {
      if ("text" === e.localName) {
        let t = this.Hs(e);
        if (t && this.#stage.selectedObjectElements.has(t)) return !1;
      }
      return !0;
    });
    for (let a of f) {
      a[Vd] = a.style.getPropertyValue("stroke-width");
      a[Hd] = a.style.getPropertyValue("vector-effect");
      let t = ut(a);
      let { scaleX: e, scaleY: i } = Oo(t);
      let s = (e + i) / 2;
      let r = getComputedStyle(a);
      let l = Rd(s) * _d(r.getPropertyValue("stroke-width"));
      a.style.setProperty("stroke-width", l);
      a.style.setProperty("vector-effect", "non-scaling-stroke");
    }
    if (this.Ws(f)) {
      let [s, ...t] = f;
      let e = Wi(s);
      let r = [];
      let n = Symbol();
      for (let i of t) {
        let t = pt(i, s);
        let e = di(Wi(i), t);
        r.push(e);
      }
      ci([e, ...r]);
      pt(s, this.transformHud);
      let d = new DOMPoint(i.clientX, i.clientY);
      let g = kt(f);
      for (let i of f) {
        let t = ut(i).inverse();
        let e = ct(i);
        i[n] = { clientToUserTransform: t, userTransform: e };
      }
      window.addEventListener(
        "pointermove",
        (l = (o) => {
          for (let h of f) {
            let { clientToUserTransform: t, userTransform: e } = h[n];
            let i = d.matrixTransform(t);
            let s = g.matrixTransform(t);
            let r = new DOMPoint(o.clientX, o.clientY).matrixTransform(t);
            let l = ni(s, i, r);
            let a = DOMMatrix.fromMatrix(e);
            a =
              "horizontal" === p
                ? Pt(a, -l, 0, s["x"], s["y"])
                : Pt(a, 0, l, s["x"], s["y"]);
            h.setAttribute("transform", a.toString());
          }
        })
      );
    } else {
      let o = new DOMPoint(i.clientX, i.clientY);
      let n = kt(f);
      for (let s of f) {
        let t = ut(s);
        let e = t.inverse();
        let i = ct(s);
        s[Wd] = {
          clientToUserTransform: t,
          userToClientTransform: e,
          userTransform: i,
        };
      }
      window.addEventListener(
        "pointermove",
        (l = (h) => {
          for (let a of f) {
            let {
              clientToUserTransform: t,
              userToClientTransform: e,
              userTransform: i,
            } = a[Wd];
            let s = new DOMPoint(h.clientX, h.clientY);
            let r = ni(n, o, s);
            let l = DOMMatrix.fromMatrix(i);
            l.multiplySelf(e);
            l =
              "horizontal" === p
                ? Pt(l, -r, 0, n["x"], n["y"])
                : Pt(l, 0, r, n["x"], n["y"]);
            l.multiplySelf(t);
            a.setAttribute("transform", l.toString());
          }
        })
      );
    }
    window.addEventListener(
      "pointerup",
      (e = () => {
        window.removeEventListener("pointermove", l);
        window.removeEventListener("pointerup", e);
        for (let t of f) {
          t.style.setProperty("stroke-width", t[Vd]);
          t.style.setProperty("vector-effect", t[Hd]);
        }
      })
    );
  };
  Vs = (t) => {
    if (t.buttons > 1) return;
  };
  Us = () => {
    this.#stage.undoManager.checkpoint("remove-transform", "#transform-tool");
    for (let t of Array.from(this.#stage.selectedElements.keys()))
      t.removeAttribute("transform");
  };
  _s = () => {
    this.#stage.undoManager.checkpoint("remove-transform", "#transform-tool");
    for (let t of Array.from(this.#stage.selectedElements.keys()))
      t.removeAttribute("transform");
  };
  Fs = () => {
    this.#stage.undoManager.checkpoint(
      "#move-transform-origin",
      "#transform-tool"
    );
    for (let t of Array.from(this.#stage.selectedElements.keys()))
      t.removeAttribute("transform");
  };
  xi = () => {
    if ("scale" === this.mode) {
      this.qs();
    } else if ("rotate-and-skew" === this.mode) {
      this.Xs();
      this.Zs();
      !1 === this.$s && this.Ks();
    }
  };
  qs = () => {
    const h = Array.from(this.#stage.selectedObjectElements.keys());
    if (h.length > 0) {
      const size = getComputedStyle(document.documentElement).getPropertyValue('--fx-scale-grippies-size');
      let i = size / this.#stage.scale;
      let l;
      let a = this.Es;
      for (let t of this["#scale-grippies"].children) {
        const e = t;
        e.width.baseVal.value = i;
        e.height.baseVal.value = i;
      }
      if (this.Ls || this.Ws(h)) {
        let [s, ...t] = h;
        let e = Wi(s);
        let r = [];
        for (let i of t) {
          let t = pt(i, s);
          let e = di(Wi(i), t);
          r.push(e);
        }
        l = ci([e, ...r]);
        const o = pt(s, this.#transformHud);
        const n = new DOMPoint(l.x + l.width / 2, l.y).matrixTransform(o);
        a["top"].x.baseVal.value = n.x - i / 2;
        a["top"].y.baseVal.value = n.y - i / 2;
        const d = new DOMPoint(
          l.x + l.width / 2,
          l.y + l.height
        ).matrixTransform(o);
        a["bottom"].x.baseVal.value = d.x - i / 2;
        a["bottom"].y.baseVal.value = d.y - i / 2;
        const g = new DOMPoint(l.x, l.y + l.height / 2).matrixTransform(o);
        a["left"].x.baseVal.value = g.x - i / 2;
        a["left"].y.baseVal.value = g.y - i / 2;
        const p = new DOMPoint(
          l.x + l.width,
          l.y + l.height / 2
        ).matrixTransform(o);
        a["right"].x.baseVal.value = p.x - i / 2;
        a["right"].y.baseVal.value = p.y - i / 2;
        const f = new DOMPoint(l.x, l.y).matrixTransform(o);
        a["top-left"].x.baseVal.value = f.x - i / 2;
        a["top-left"].y.baseVal.value = f.y - i / 2;
        const c = new DOMPoint(l.x + l.width, l.y).matrixTransform(o);
        a["top-right"].x.baseVal.value = c.x - i / 2;
        a["top-right"].y.baseVal.value = c.y - i / 2;
        const m = new DOMPoint(l.x, l.y + l.height).matrixTransform(o);
        a["bottom-left"].x.baseVal.value = m.x - i / 2;
        a["bottom-left"].y.baseVal.value = m.y - i / 2;
        const y = new DOMPoint(l.x + l.width, l.y + l.height).matrixTransform(
          o
        );
        a["bottom-right"].x.baseVal.value = y.x - i / 2;
        a["bottom-right"].y.baseVal.value = y.y - i / 2;
      } else {
        let t = ut(this.#transformHud).inverse();
        let e = h.map((t) => Yi(t));
        l = ci(e);
        l = di(l, t);
        a["top"].x.baseVal.value = l.x + l.width / 2 - i / 2;
        a["top"].y.baseVal.value = l.y - i / 2;
        a["bottom"].x.baseVal.value = l.x + l.width / 2 - i / 2;
        a["bottom"].y.baseVal.value = l.y + l.height - i / 2;
        a["left"].x.baseVal.value = l.x - i / 2;
        a["left"].y.baseVal.value = l.y + l.height / 2 - i / 2;
        a["right"].x.baseVal.value = l.x + l.width - i / 2;
        a["right"].y.baseVal.value = l.y + l.height / 2 - i / 2;
        a["top-left"].x.baseVal.value = l.x - i / 2;
        a["top-left"].y.baseVal.value = l.y - i / 2;
        a["top-right"].x.baseVal.value = l.x + l.width - i / 2;
        a["top-right"].y.baseVal.value = l.y - i / 2;
        a["bottom-left"].x.baseVal.value = l.x - i / 2;
        a["bottom-left"].y.baseVal.value = l.y + l.height - i / 2;
        a["bottom-right"].x.baseVal.value = l.x + l.width - i / 2;
        a["bottom-right"].y.baseVal.value = l.y + l.height - i / 2;
      }
      a["top"].style.visibility = 0 === l.height ? "hidden" : null;
      a["bottom"].style.visibility = 0 === l.height ? "hidden" : null;
      a["left"].style.visibility = 0 === l.width ? "hidden" : null;
      a["right"].style.visibility = 0 === l.width ? "hidden" : null;
      a["top-left"].style.visibility =
        0 === l.width || 0 === l.height ? "hidden" : null;
      a["top-right"].style.visibility =
        0 === l.width || 0 === l.height ? "hidden" : null;
      a["bottom-left"].style.visibility =
        0 === l.width || 0 === l.height ? "hidden" : null;
      a["bottom-right"].style.visibility =
        0 === l.width || 0 === l.height ? "hidden" : null;
    }
  };
  Xs = () => {
    let p = Array.from(this.#stage.selectedObjectElements.keys());
    if (p.length > 0) {
      const size = getComputedStyle(document.documentElement).getPropertyValue('--fx-rotate-grippies-size');
      let n = size / this.#stage.scale;
      let d;
      let g = this.As;
      for (let t of this["#rotate-grippies"].children) {
        const e = t;
        e.width.baseVal.value = n;
        e.height.baseVal.value = n;
      }
      if (this.Ls || this.Ws(p)) {
        let [s, ...t] = p;
        let e = Wi(s);
        let r = [];
        for (let i of t) {
          let t = pt(i, s);
          let e = di(Wi(i), t);
          r.push(e);
        }
        d = ci([e, ...r]);
        let i = pt(s, this.#transformHud);
        let l = new DOMPoint(d.x, d.y).matrixTransform(i);
        g["top-left"].x.baseVal.value = l.x - n / 2;
        g["top-left"].y.baseVal.value = l.y - n / 2;
        let a = new DOMPoint(d.x + d.width, d.y).matrixTransform(i);
        g["top-right"].x.baseVal.value = a.x - n / 2;
        g["top-right"].y.baseVal.value = a.y - n / 2;
        let h = new DOMPoint(d.x, d.y + d.height).matrixTransform(i);
        g["bottom-left"].x.baseVal.value = h.x - n / 2;
        g["bottom-left"].y.baseVal.value = h.y - n / 2;
        let o = new DOMPoint(d.x + d.width, d.y + d.height).matrixTransform(i);
        g["bottom-right"].x.baseVal.value = o.x - n / 2;
        g["bottom-right"].y.baseVal.value = o.y - n / 2;
      } else {
        let t = ut(this.#transformHud).inverse();
        let e = p.map((t) => Yi(t));
        d = ci(e);
        d = di(d, t);
        g["top-left"].x.baseVal.value = d.x - n / 2;
        g["top-left"].y.baseVal.value = d.y - n / 2;
        g["top-right"].x.baseVal.value = d.x + d.width - n / 2;
        g["top-right"].y.baseVal.value = d.y - n / 2;
        g["bottom-left"].x.baseVal.value = d.x - n / 2;
        g["bottom-left"].y.baseVal.value = d.y + d.height - n / 2;
        g["bottom-right"].x.baseVal.value = d.x + d.width - n / 2;
        g["bottom-right"].y.baseVal.value = d.y + d.height - n / 2;
      }
      g["bottom-left"].style.visibility =
        0 === d.width || 0 === d.height ? "hidden" : null;
      g["bottom-right"].style.visibility =
        0 === d.width || 0 === d.height ? "hidden" : null;
    }
  };
  Zs = () => {
    let p = Array.from(this.#stage.selectedObjectElements.keys());
    if (p.length > 0) {
      const size = getComputedStyle(document.documentElement).getPropertyValue('--fx-skew-grippies-size');
      let n = size / this.#stage.scale;
      let d;
      let g = this.Ts;
      for (let t of this["#skew-grippies"].children) {
        const e = t;
        e.width.baseVal.value = n;
        e.height.baseVal.value = n;
      }
      if (this.Ls || this.Ws(p)) {
        let [s, ...t] = p;
        let e = Wi(s);
        let r = [];
        for (let i of t) {
          let t = pt(i, s);
          let e = di(Wi(i), t);
          r.push(e);
        }
        d = ci([e, ...r]);
        let i = pt(s, this.#transformHud);
        let l = new DOMPoint(d.x + d.width / 2, d.y).matrixTransform(i);
        g.top.x.baseVal.value = l.x - n / 2;
        g.top.y.baseVal.value = l.y - n / 2;
        let a = new DOMPoint(d.x + d.width / 2, d.y + d.height).matrixTransform(
          i
        );
        g.bottom.x.baseVal.value = a.x - n / 2;
        g.bottom.y.baseVal.value = a.y - n / 2;
        let h = new DOMPoint(d.x, d.y + d.height / 2).matrixTransform(i);
        g.left.x.baseVal.value = h.x - n / 2;
        g.left.y.baseVal.value = h.y - n / 2;
        let o = new DOMPoint(d.x + d.width, d.y + d.height / 2).matrixTransform(
          i
        );
        g.right.x.baseVal.value = o.x - n / 2;
        g.right.y.baseVal.value = o.y - n / 2;
      } else {
        let t = ut(this.#transformHud).inverse();
        let e = p.map((t) => Yi(t));
        d = ci(e);
        d = di(d, t);
        g.top.x.baseVal.value = d.x + d.width / 2 - n / 2;
        g.top.y.baseVal.value = d.y - n / 2;
        g.bottom.x.baseVal.value = d.x + d.width / 2 - n / 2;
        g.bottom.y.baseVal.value = d.y + d.height - n / 2;
        g.left.x.baseVal.value = d.x - n / 2;
        g.left.y.baseVal.value = d.y + d.height / 2 - n / 2;
        g.right.x.baseVal.value = d.x + d.width - n / 2;
        g.right.y.baseVal.value = d.y + d.height / 2 - n / 2;
      }
      g.top.style.visibility =
        0 === d.width || 0 === d.height ? "hidden" : null;
      g.bottom.style.visibility =
        0 === d.width || 0 === d.height ? "hidden" : null;
      g.left.style.visibility =
        0 === d.width || 0 === d.height ? "hidden" : null;
      g.right.style.visibility =
        0 === d.width || 0 === d.height ? "hidden" : null;
    }
  };
  Ks = () => {
    if (this.#stage.selectedObjectElements.size >= 1) {
    }
  };
  blink = async () => {
    this.#grippies.style.setProperty("display", "none");
    await sleep(200);
    this.#stage.selectedObjectElements.size > 0 &&
      this.#grippies.style.setProperty("display", "block");
  };
  Hs = (t) => {
    let e = t.querySelector("textPath");
    let i = null;
    e?.hasAttribute("href") &&
      (i = this.#stage.workspaces.querySelector(e.href.baseVal));
    return i;
  };
  Ws = (s) => {
    if (s.length > 1) {
      let [e, ...i] = s;
      for (let t of i) if (t.parentElement !== e.parentElement) return !1;
      let t = ct(e);
      let r = te(Math.atan(t["c"] / t["d"]), 2);
      let l = te(Math.atan(-t["b"] / t["a"]), 2);
      for (let s of i) {
        let t = ct(s);
        let e = te(Math.atan(t["c"] / t["d"]), 2);
        let i = te(Math.atan(-t["b"] / t["a"]), 2);
        if (!1 === Object.is(e, r) || !1 === Object.is(i, l)) return !1;
      }
    }
    return !0;
  };
  Ys = (t, e, i, s, r) => {
    let l;
    let a;
    let h;
    let o;
    let n;
    const d = this.#stage.ctrlKey;
    const g = this.#stage.shiftKey;
    return (
      !1 === r
        ? d || g
          ? !d && g
            ? (n = "B")
            : d && !g
              ? (n = "C")
              : d && g && (n = "D")
          : (n = "A")
        : !0 === r &&
        (d || g
          ? !d && g
            ? (n = "A")
            : d && !g
              ? (n = "D")
              : d && g && (n = "C")
          : (n = "B")),
      "top" === s
        ? "A" === n
          ? ((l = i["x"] + i["width"] / 2),
            (a = i["y"] + i["height"]),
            (h = 1),
            (o = (i["height"] - e) / i["height"]))
          : "B" === n
            ? ((l = i["x"] + i["width"] / 2),
              (a = i["y"] + i["height"]),
              (o = (i["height"] - e) / i["height"]),
              (h = o))
            : "C" === n
              ? ((l = i["x"] + i["width"] / 2),
                (a = i["y"] + i["height"] / 2),
                (h = 1),
                (o =
                  (i["height"] - i["height"] / 2 - e) /
                  (i["height"] - i["height"] / 2)))
              : "D" === n &&
              ((l = i["x"] + i["width"] / 2),
                (a = i["y"] + i["height"] / 2),
                (o =
                  (i["height"] - i["height"] / 2 - e) /
                  (i["height"] - i["height"] / 2)),
                (h = o))
        : "bottom" === s
          ? "A" === n
            ? ((l = i["x"] + i["width"] / 2),
              (a = i["y"]),
              (h = 1),
              (o = (i["height"] + e) / i["height"]))
            : "B" === n
              ? ((l = i["x"] + i["width"] / 2),
                (a = i["y"]),
                (o = (i["height"] + e) / i["height"]),
                (h = o))
              : "C" === n
                ? ((l = i["x"] + i["width"] / 2),
                  (a = i["y"] + i["height"] / 2),
                  (h = 1),
                  (o =
                    (i["height"] - i["height"] / 2 + e) /
                    (i["height"] - i["height"] / 2)))
                : "D" === n &&
                ((l = i["x"] + i["width"] / 2),
                  (a = i["y"] + i["height"] / 2),
                  (o =
                    (i["height"] - i["height"] / 2 + e) /
                    (i["height"] - i["height"] / 2)),
                  (h = o))
          : "left" === s
            ? "A" === n
              ? ((l = i["x"] + i["width"]),
                (a = i["y"] + i["height"] / 2),
                (h = (i["width"] - t) / i["width"]),
                (o = 1))
              : "B" === n
                ? ((l = i["x"] + i["width"]),
                  (a = i["y"] + i["height"] / 2),
                  (h = (i["width"] - t) / i["width"]),
                  (o = h))
                : "C" === n
                  ? ((l = i["x"] + i["width"] / 2),
                    (a = i["y"] + i["height"] / 2),
                    (h =
                      (i["width"] - i["width"] / 2 - t) /
                      (i["width"] - i["width"] / 2)),
                    (o = 1))
                  : "D" === n &&
                  ((l = i["x"] + i["width"] / 2),
                    (a = i["y"] + i["height"] / 2),
                    (h =
                      (i["width"] - i["width"] / 2 - t) /
                      (i["width"] - i["width"] / 2)),
                    (o = h))
            : "right" === s &&
            ("A" === n
              ? ((l = i["x"]),
                (a = i["y"] + i["height"] / 2),
                (h = (i["width"] + t) / i["width"]),
                (o = 1))
              : "B" === n
                ? ((l = i["x"]),
                  (a = i["y"] + i["height"] / 2),
                  (h = (i["width"] + t) / i["width"]),
                  (o = h))
                : "C" === n
                  ? ((l = i["x"] + i["width"] / 2),
                    (a = i["y"] + i["height"] / 2),
                    (h =
                      (i["width"] - i["width"] / 2 + t) /
                      (i["width"] - i["width"] / 2)),
                    (o = 1))
                  : "D" === n &&
                  ((l = i["x"] + i["width"] / 2),
                    (a = i["y"] + i["height"] / 2),
                    (h = o =
                      (i["width"] - i["width"] / 2 + t) /
                      (i["width"] - i["width"] / 2)))),
      "top-left" === s
        ? "A" === n
          ? ((l = i["x"] + i["width"]),
            (a = i["y"] + i["height"]),
            (h = (i["width"] - t) / i["width"]),
            (o = (i["height"] - e) / i["height"]))
          : "B" === n
            ? ((l = i["x"] + i["width"]),
              (a = i["y"] + i["height"]),
              (h = (i["width"] - t) / i["width"]),
              (o = (i["height"] - e) / i["height"]),
              (h = o = Math.min(h, o)))
            : "C" === n
              ? ((l = i["x"] + i["width"] / 2),
                (a = i["y"] + i["height"] / 2),
                (h =
                  (i["width"] - i["width"] / 2 - t) /
                  (i["width"] - i["width"] / 2)),
                (o =
                  (i["height"] - i["height"] / 2 - e) /
                  (i["height"] - i["height"] / 2)))
              : "D" === n &&
              ((l = i["x"] + i["width"] / 2),
                (a = i["y"] + i["height"] / 2),
                (h =
                  (i["width"] - i["width"] / 2 - t) /
                  (i["width"] - i["width"] / 2)),
                (o =
                  (i["height"] - i["height"] / 2 - e) /
                  (i["height"] - i["height"] / 2)),
                h >= 0 && o >= 0
                  ? (h = o = Math.min(h, o))
                  : h <= 0 && o <= 0
                    ? (h = o = Math.max(h, o))
                    : Math.abs(h) >= Math.abs(o)
                      ? (h = -o)
                      : (o = -h))
        : "top-right" === s
          ? "A" === n
            ? ((l = i["x"]),
              (a = i["y"] + i["height"]),
              (h = (i["width"] + t) / i["width"]),
              (o = (i["height"] - e) / i["height"]))
            : "B" === n
              ? ((l = i["x"]),
                (a = i["y"] + i["height"]),
                (h = (i["width"] + t) / i["width"]),
                (o = (i["height"] - e) / i["height"]),
                (h = o = Math.min(h, o)))
              : "C" === n
                ? ((l = i["x"] + i["width"] / 2),
                  (a = i["y"] + i["height"] / 2),
                  (h =
                    (i["width"] - i["width"] / 2 + t) /
                    (i["width"] - i["width"] / 2)),
                  (o =
                    (i["height"] - i["height"] / 2 - e) /
                    (i["height"] - i["height"] / 2)))
                : "D" === n &&
                ((l = i["x"] + i["width"] / 2),
                  (a = i["y"] + i["height"] / 2),
                  (h =
                    (i["width"] - i["width"] / 2 + t) /
                    (i["width"] - i["width"] / 2)),
                  (o =
                    (i["height"] - i["height"] / 2 - e) /
                    (i["height"] - i["height"] / 2)),
                  h >= 0 && o >= 0
                    ? (h = o = Math.min(h, o))
                    : h <= 0 && o <= 0
                      ? (h = o = Math.max(h, o))
                      : Math.abs(h) >= Math.abs(o)
                        ? (h = -o)
                        : (o = -h))
          : "bottom-left" === s
            ? "A" === n
              ? ((l = i["x"] + i["width"]),
                (a = i["y"]),
                (h = (i["width"] - t) / i["width"]),
                (o = (i["height"] + e) / i["height"]))
              : "B" === n
                ? ((l = i["x"] + i["width"]),
                  (a = i["y"]),
                  (h = (i["width"] - t) / i["width"]),
                  (o = (i["height"] + e) / i["height"]),
                  (h = o = Math.min(h, o)))
                : "C" === n
                  ? ((l = i["x"] + i["width"] / 2),
                    (a = i["y"] + i["height"] / 2),
                    (h =
                      (i["width"] - i["width"] / 2 - t) /
                      (i["width"] - i["width"] / 2)),
                    (o =
                      (i["height"] - i["height"] / 2 + e) /
                      (i["height"] - i["height"] / 2)))
                  : "D" === n &&
                  ((l = i["x"] + i["width"] / 2),
                    (a = i["y"] + i["height"] / 2),
                    (h =
                      (i["width"] - i["width"] / 2 - t) /
                      (i["width"] - i["width"] / 2)),
                    (o =
                      (i["height"] - i["height"] / 2 + e) /
                      (i["height"] - i["height"] / 2)),
                    h >= 0 && o >= 0
                      ? (h = o = Math.min(h, o))
                      : h <= 0 && o <= 0
                        ? (h = o = Math.max(h, o))
                        : Math.abs(h) >= Math.abs(o)
                          ? (h = -o)
                          : (o = -h))
            : "bottom-right" === s &&
            ("A" === n
              ? ((l = i["x"]),
                (a = i["y"]),
                (h = (i["width"] + t) / i["width"]),
                (o = (i["height"] + e) / i["height"]))
              : "B" === n
                ? ((l = i["x"]),
                  (a = i["y"]),
                  (h = (i["width"] + t) / i["width"]),
                  (o = (i["height"] + e) / i["height"]),
                  (h = o = Math.min(h, o)))
                : "C" === n
                  ? ((l = i["x"] + i["width"] / 2),
                    (a = i["y"] + i["height"] / 2),
                    (h =
                      (i["width"] - i["width"] / 2 + t) /
                      (i["width"] - i["width"] / 2)),
                    (o =
                      (i["height"] - i["height"] / 2 + e) /
                      (i["height"] - i["height"] / 2)))
                  : "D" === n &&
                  ((l = i["x"] + i["width"] / 2),
                    (a = i["y"] + i["height"] / 2),
                    (h =
                      (i["width"] - i["width"] / 2 + t) /
                      (i["width"] - i["width"] / 2)),
                    (o =
                      (i["height"] - i["height"] / 2 + e) /
                      (i["height"] - i["height"] / 2)),
                    h >= 0 && o >= 0
                      ? (h = o = Math.min(h, o))
                      : h <= 0 && o <= 0
                        ? (h = o = Math.max(h, o))
                        : Math.abs(h) >= Math.abs(o)
                          ? (h = -o)
                          : (o = -h))),
      { centerX: l, centerY: a, scaleX: h, scaleY: o }
    );
  };
}
export default TransformTool;
