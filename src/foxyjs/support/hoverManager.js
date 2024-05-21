import { ns, pt, Wi, Ne, ks } from "../utils/common";
class HoverManager {
  #stage;
  #outlineHud = document.querySelector("#outline-hud");
  #outline;
  fs;
  bs;
  Tt;
  Nt;
  T;
  vs;
  C;
  ys;
  Cs;
  get context() {
    return this.#outlineHud.getAttribute("context") || "transform";
  }
  set context(t) {
    this.#outlineHud.setAttribute("context", t);
  }
  set enabled(t) {
    t
      ? this.#outlineHud.setAttribute("enabled", "")
      : this.#outlineHud.removeAttribute("enabled");
  }
  get enabled() {
    return this.#outlineHud.hasAttribute("enabled");
  }
  constructor(t) {
    this.#stage = t;
    this.fs = null;
    this.bs = ks(this.Lt, 30, this);
    this.Tt = ks(this.Lt, 200, this);
    this.#outlineHud.innerHTML = `<path uid="outline"></path>`;
    this.#outline = this.#outlineHud.querySelector('[uid="outline"]');
  }
  enable = () => {
    this.enabled = true;
    this.#stage.board.addEventListener(
      "modkeyschange",
      (this.Nt = () => {
        this.bs();
      })
    );
    this.#stage.board.addEventListener(
      "workspacemutation",
      (this.T = () => {
        this.bs();
      })
    );
    this.#stage.board.addEventListener(
      "currentcontainerchange",
      (this.vs = () => {
        this.bs();
      })
    );
    this.#stage.board.addEventListener(
      "selectedelementschange",
      (this.C = () => {
        this.S();
      })
    );
    this.#stage.workspaces.addEventListener(
      "pointerover",
      (this.ys = (t) => {
        this.ks(t);
      })
    );
    this.#stage.workspaces.addEventListener(
      "pointerout",
      (this.Cs = () => {
        this.Ss();
      })
    );
    this.Lt();
  };
  disable = () => {
    this.enabled = false;
    this.#outline.removeAttribute("d");
    this.#stage.board.removeEventListener("modkeyschange", this.Nt);
    this.#stage.board.removeEventListener("workspacemutation", this.T);
    this.#stage.board.removeEventListener("currentcontainerchange", this.vs);
    this.#stage.board.removeEventListener("selectedelementschange", this.C);
    this.#stage.workspaces.removeEventListener("pointerover", this.ys);
    this.#stage.workspaces.removeEventListener("pointerout", this.Cs);
  };
  S = () => {
    this.Lt();
  };
  ks = (t) => {
    this.fs = t.target;
    this.bs();
  };
  Ss = () => {
    this.fs = null;
    this.Tt();
  };
  Lt = () => {
    let i = this.Ms();
    if (i) {
      let t = i.localName;
      let e = null;
      let s = null;
      "path" === t
        ? (e = i.getAttribute("d"))
        : ("rect" !== t &&
          "circle" !== t &&
          "ellipse" !== t &&
          "line" !== t &&
          "polyline" !== t &&
          "polygon" !== t) ||
        (e = Ne(i.getPathData()));
      if (null === e) {
        let t = Wi(i);
        e =
          "\n          M " +
          t["x"] +
          " " +
          t["y"] +
          "\n          L " +
          (t["x"] + t.width) +
          " " +
          t["y"] +
          "\n          L " +
          (t["x"] + t.width) +
          " " +
          (t["y"] + t.height) +
          "\n          L " +
          t["x"] +
          " " +
          (t["y"] + t.height) +
          "\n          L " +
          t["x"] +
          " " +
          t["y"] +
          "\n        ";
      }
      null === s && (s = pt(i, this.#outlineHud).toString());
      e
        ? this.#outline.setAttribute("d", e)
        : this.#outline.removeAttribute("d");
      s
        ? this.#outline.setAttribute("transform", s)
        : this.#outline.removeAttribute("transform");
    } else this.#outline.removeAttribute("d");
  };
  Ms = () => {
    let t = this.#stage.ctrlKey;
    let e = this.#stage.shiftKey;
    let i = this.#stage;
    let n = this.fs;
    let r = null;
    let o = null;
    "transform" === this.context
      ? t || e
        ? !t && e
          ? (r = "normal-multi")
          : t && !e
            ? (r = "direct")
            : t && e && (r = "direct-multi")
        : (r = "normal")
      : "edit" === this.context
        ? (r = "direct")
        : "edit-text" === this.context && (r = "direct-text");
    if (n && i.isSelectableElement(n)) {
      let e = this.Ps(n);
      let t = i.selectedElements.has(n);
      let s = t;
      for (let t of e) i.selectedElements.has(t) && (s = !0);
      if ("normal" === r) {
        if (!1 === s) {
          if (0 === e.length) o = n;
          else {
            let e = i.currentContainer;
            let s = n;
            if (e?.contains(s)) {
              for (; s.parentNode !== e;) s = s.parentNode;
            } else {
              let t = this.Ds(s, e);
              for (
                ;
                s.parentNode !== t && s.parentNode !== i.currentWorkspace;

              )
                s = s.parentNode;
            }
            o = s;
          }
        }
      } else {
        if ("normal-multi" === r) {
          if (0 === e.length) o = n;
          else {
            let e = n;
            if (i.currentContainer?.contains(e)) {
              for (; e.parentNode !== i.currentContainer;) e = e.parentNode;
            } else {
              let t = this.Ds(e, i.currentContainer);
              for (
                ;
                e.parentNode !== t && e.parentNode !== i.currentWorkspace;

              )
                e = e.parentNode;
            }
            o = e;
          }
        } else
          "direct" === r
            ? !1 === t && (o = n)
            : "direct-multi" === r
              ? (o = n)
              : "direct-text" === r &&
              !1 === t &&
              n.closest("text") &&
              (o = n.closest("text"));
      }
    }
    return o;
  };
  Ps = (t) => {
    let e = [];
    if (t !== this.#stage.currentWorkspace) {
      for (
        ;
        t.parentElement && t.parentElement !== this.#stage.currentWorkspace;

      ) {
        t = t.parentElement;
        ["g", "a"].includes(t.localName) && e.unshift(t);
      }
    }
    return e;
  };
  Ds = (t, e) => {
    let s = ns(t, e);
    if (s) {
      for (; !1 === ["g", "a"].includes(s.localName);) s = s.parentNode;
    }
    return s;
  };
}
export default HoverManager;
