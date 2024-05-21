import { ut, Xt, te, fs, fi, qt, ni, ai, Kt, ks } from "../utils/common";
const Zh = Symbol();
const Kh = 4;
const Qh = !1;
class ManualManager {
  #stage;
  #manualGuidesHud = document.querySelector("#manual-guides-hud");
  #reprs;
  fi = [];
  bi;
  hi;
  wi;
  T;
  ui;
  D;
  ki;
  C;
  Si;
  get enabled() {
    return this.#manualGuidesHud.hasAttribute("enabled");
  }
  set enabled(val) {
    val
      ? this.#manualGuidesHud.setAttribute("enabled", "")
      : this.#manualGuidesHud.removeAttribute("enabled");
  }
  constructor(e) {
    this.#stage = e;
    this.fi = [];
    this.bi = !1;
    this.hi = this.Lt;
    this.wi = this.vi;
    this.#manualGuidesHud.innerHTML = `<g uid="reprs"></g>`;
    this.#reprs = this.#manualGuidesHud.querySelector('[uid="reprs"]');
    this.#manualGuidesHud.addEventListener("pointerdown", (e) => this.L(e));
  }
  enabledCallback = () => {
    console.warn('enable instead of');
    this.enable();
  }
  enable = () => {
    this.enabled = true;
    this.#stage.board.addEventListener(
      "workspacemutation",
      (this.T = () => {
        this.hi();
      })
    );
    this.#stage.board.addEventListener(
      "artworkchange",
      (this.ui = () => {
        this.hi();
      })
    );
    this.#stage.board.addEventListener(
      "zoomchange",
      (this.D = () => {
        this.B();
      })
    );
    this.#stage.board.addEventListener(
      "selectedelementschange",
      (this.C = () => {
        this.yi();
      })
    );
    this.#stage.rulerManager.rulers.addEventListener(
      "pointerdown",
      (this.ki = (e) => {
        this.Ci(e);
      })
    );
    this.#stage.board.addEventListener(
      "snapperschange",
      (this.Si = () => {
        this.wi();
      })
    );
    this.Lt();
  };
  disabledCallback = () => {
    console.warn('disable instead of');
    this.disable();
  }
  disable = () => {
    this.enabled = false;
    this.#stage.board.removeEventListener("workspacemutation", this.T);
    this.#stage.board.removeEventListener("artworkchange", this.ui);
    this.#stage.board.removeEventListener("zoomchange", this.D);
    this.#stage.board.removeEventListener("selectedelementschange", this.C);
    this.#stage.rulerManager.rulers.removeEventListener("pointerdown", this.ki);
    this.#stage.board.removeEventListener("snapperschange", this.Si);
  };
  requestImmidiateUpdate = () => {
    this.Lt();
  };
  L = (a) => {
    const { buttons: e } = a;
    const t = a.target;
    if (e > 1) return;
    let l;
    let o;
    let u = t.closest("g.repr");
    let d = u[Zh];
    let c = ut(this.#stage.canvas).inverse();
    let h = new DOMPoint(a.clientX, a.clientY);
    let g = h.matrixTransform(c);
    let m = h;
    let p = this.#stage.ctrlKey && Qh ? "rotate" : "translate";
    let v = this.#stage.geometryPrecision;
    this.bi = !0;
    u.setAttribute("data-dragging", "");
    if (t.closest(".grippie")) {
      this.#stage.selectedElements.clear();
      this.#stage.selectedElements.set(d);
      this.#stage.selectedTextRange = void 0;
      this.#stage.currentContainer = void 0;
    }
    let f = parseFloat(d.getAttribute("x"));
    let b = parseFloat(d.getAttribute("y"));
    let y = parseFloat(d.getAttribute("angle"));
    let x = f;
    let w = b;
    let L = y;
    window.addEventListener(
      "pointermove",
      (l = (e) => {
        let t = new DOMPoint(e.clientX, e.clientY);
        let i = t.matrixTransform(c);
        let r = e.timeStamp - a.timeStamp;
        let s = Kt(h, t) > 3 || r > 80;
        let n = !1 === qt(m, t, null);
        if (((m = t), !0 === s && !0 === n)) {
          if ("translate" === p) {
            let e = i["x"] - g["x"];
            let t = i["y"] - g["y"];
            x = f + e;
            w = b + t;
            u.setAttribute(
              "transform",
              "translate(" + x + " " + w + ") rotate(" + y + ")"
            );
          } else {
            if ("rotate" === p) {
              let e = new DOMPoint(f, b);
              let t = ni(e, g, i);
              L = y + t;
              this.#stage.shiftKey && (L = ai(L, 15));
              u.setAttribute(
                "transform",
                "translate(" + f + " " + b + ") rotate(" + L + ")"
              );
            }
          }
        }
      })
    );
    window.addEventListener(
      "pointerup",
      (o = (e) => {
        window.removeEventListener("pointermove", l);
        window.removeEventListener("pointerup", o);
        this.bi = !1;
        u.removeAttribute("data-dragging");
        let t = u.querySelector(".inner-line");
        let i = ut(t);
        let r = new DOMPoint(t["x1"].baseVal.value, t["y1"].baseVal.value);
        r = r.matrixTransform(i);
        let s = new DOMPoint(t["x2"].baseVal.value, t["y2"].baseVal.value);
        s = s.matrixTransform(i);
        let n = this.#stage.board.getBoundingClientRect();
        let a = fi(r, s, n);
        r = Xt(r, 8);
        s = Xt(s, 8);
        if (a && this.isPointOverBoard(e.clientX, e.clientY)) {
          x = te(x, v);
          w = te(w, v);
          L = te(L, v);
          (x === f && w === b && L === y) ||
            this.#stage.undoManager.checkpoint("move", "#transform-tool");
          d.setAttribute("x", x);
          d.setAttribute("y", w);
          d.setAttribute("angle", L);
        } else {
          this.#stage.commands.delete();
        }
      })
    );
  };
  Ci = (e) => {
    if (e.buttons > 1) return;
    let l;
    let o;
    const u = this.#stage.board;
    const t = this.#stage.rulerManager.getRulerTypeFromPoint(e.x, e.y);
    let d = this.#stage.geometryPrecision;
    const c = ut(this.#stage.canvas).inverse();
    let h = 0;
    let i = 99999;
    let g = -i;
    let m = -i;
    "vertical" === t
      ? (h = 0)
      : "horizontal" === t
        ? (h = 90)
        : "corner" === t && (h = 45);
    let p = fs`
          <g class="repr" transform="translate(${g}, ${m}) rotate(${h})" data-selected>
            <line class="outer-line" x1="0" y1="${-i}" x2="0" y2="${i}"></line>
            <line class="inner-line" x1="0" y1="${-i}" x2="0" y2="${i}"></line>
            <circle class="grippie" cx="0" cy="0" r="${Kh / this.#stage.canvas?.getMatrix().a
      }"></rect>
          </g>
        `;
    this.#reprs.append(p);
    window.addEventListener(
      "pointermove",
      (l = (e) => {
        let t = new DOMPoint(e.clientX, e.clientY).matrixTransform(c);
        g = t["x"];
        m = t["y"];
        p.setAttribute(
          "transform",
          "translate(" + g + " " + m + ") rotate(" + h + ")"
        );
      })
    );
    window.addEventListener(
      "pointerup",
      (o = (i) => {
        window.removeEventListener("pointermove", l);
        window.removeEventListener("pointerup", o);
        let e = p.querySelector(".inner-line");
        let t = ut(e);
        let r = new DOMPoint(e.x1.baseVal.value, e.y1.baseVal.value);
        r = r.matrixTransform(t);
        r = Xt(r, 8);
        let s = new DOMPoint(e.x2.baseVal.value, e.y2.baseVal.value);
        s = s.matrixTransform(t);
        s = Xt(s, 8);
        let n = u.getBoundingClientRect();
        let a = fi(r, s, n);
        p.remove();
        if (
          a &&
          !0 === this.isPointOverBoard(i.clientX, i.clientY) &&
          !this.isPointOverRuler(i.clientX, i.clientY)
        ) {
          let e = new DOMPoint(i.clientX, i.clientY).matrixTransform(c);
          g = te(e["x"], d);
          m = te(e["y"], d);
          let t = fs`<foxy-guide x="${g}" y="${m}" angle="${h}"></foxy-guide>`;
          this.#stage.selectedElements.clear();
          this.#stage.selectedElements.set(t);
          this.#stage.selectedTextRange = void 0;
          this.#stage.currentContainer = void 0;
          this.#stage.undoManager.checkpoint("guide", "#object-guide");
          this.#stage.workspaces.querySelector("defs")?.append(t);
        }
      })
    );
  };
  Lt = () => {
    if (this.bi) return;
    let a = this.#stage.workspaces.querySelectorAll("foxy-guide");
    let l = !1;
    if (a.length !== this.#reprs.childElementCount) l = !0;
    else
      for (let n = 0; n < a.length; n += 1) {
        let e = a[n];
        let t = this.#reprs.children[n];
        let i = t.transform.baseVal[0].matrix.e;
        let r = t.transform.baseVal[0].matrix.f;
        let s = t.transform.baseVal[1].angle;
        if (
          parseFloat(e.getAttribute("x")) !== i ||
          parseFloat(e.getAttribute("y")) !== r ||
          parseFloat(e.getAttribute("angle")) !== s
        ) {
          l = !0;
          break;
        }
      }
    if (l) {
      let i = "";
      for (let t of a) {
        let e = 99999;
        i +=
          ' <g class="repr" transform="translate(' +
          parseFloat(t.getAttribute("x")) +
          ", " +
          parseFloat(t.getAttribute("y")) +
          ") rotate(" +
          parseFloat(t.getAttribute("angle")) +
          ')" data-snapping="' +
          this.#stage.snapManager.isGuideSnapping(t) +
          '"> <line class="outer-line" x1="0" y1="' +
          -e +
          '" x2="0" y2="' +
          e +
          '"></line> <line class="inner-line" x1="0" y1="' +
          -e +
          '" x2="0" y2="' +
          e +
          '"></line>\n            <circle class="grippie" cx="0" cy="0"></rect>\n          </g>\n        ';
      }
      this.#reprs.innerHTML = i;
      const t = this.#reprs.children;
      for (let e = 0; e < a.length; e += 1) {
        t[e][Zh] = a[e];
      }
    }
    this.B();
    this.yi();
  };
  B = () => {
    for (let e of this.#reprs.querySelectorAll(".grippie"))
      e.setAttribute("r", (Kh / this.#stage.scale).toString());
  };
  yi = () => {
    for (let e of this.#reprs.children) {
      const t = e;
      this.#stage.selectedElements.has(t[Zh])
        ? e.setAttribute("data-selected", "")
        : e.removeAttribute("data-selected");
    }
  };
  vi = () => {
    for (let t of this.#reprs.children) {
      const i = t;
      let e = this.#stage.snapManager.isGuideSnapping(i[Zh]);
      t.setAttribute("data-snapping", e);
    }
  };
  isPointOverBoard = (e, t) => {
    const i = document.querySelector("#horizontal-ruler");
    const r = i?.getBoundingClientRect();
    const s = document.querySelector("#vertical-ruler");
    const n = s?.getBoundingClientRect();
    if (e >= r.x && e <= r.right && t >= r.y && t <= r.bottom) {
      return false;
    }
    if (e >= n.x && e <= n.right && t >= n.y && t <= n.bottom) {
      return false;
    }
    return true;
  };
  isPointOverRuler = (e, t) => {
    return document.elementFromPoint(e, t).closest(".ruler");
  };
}
export default ManualManager;
