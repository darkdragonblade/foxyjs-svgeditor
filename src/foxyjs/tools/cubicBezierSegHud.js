import ee from "../utils/ee";
import { ut, pt } from "../utils/common";
class CubicBezierSegHud {
  #stage;
  get x1() {
    return this.jt;
  }
  get y1() {
    return this.Vt;
  }
  get x2() {
    return this.Ht;
  }
  get y2() {
    return this.Wt;
  }
  get cx1() {
    return this.Qt;
  }
  get cy1() {
    return this.Jt;
  }
  get cx2() {
    return this.ei;
  }
  get cy2() {
    return this.ti;
  }
  get curved() {
    return (
      this.Qt !== this.jt ||
      this.Jt !== this.Vt ||
      this.ei !== this.Ht ||
      this.ti !== this.Wt
    );
  }
  Xt;
  Zt;
  D;
  Kt;
  Ft;
  Gt;
  jt;
  Vt;
  Qt;
  Jt;
  Ht;
  Wt;
  ei;
  ti;
  hud = document.querySelector("#cubic-bezier-seg-hud");
  ["#container"];
  ["#outline"];
  ["#control-point-1-grippie"];
  ["#control-point-2-grippie"];
  ["#control-line-1"];
  ["#control-line-2"];
  constructor(t) {
    this.#stage = t;
    this.jt = 0;
    this.Vt = 0;
    this.Ht = 0;
    this.Wt = 0;
    this.Qt = 0;
    this.Jt = 0;
    this.ei = 0;
    this.ti = 0;
    this.hud.innerHTML = `
      <g uid="container">
        <path uid="outline" d="M 0 0 C 0 0 0 0 0 0"></path>
    
        <line uid="control-line-1"></line>
        <line uid="control-line-2"></line>
    
        <circle uid="control-point-1-grippie"></circle>
        <circle uid="control-point-2-grippie"></circle>
      </g>`;
    this["#container"] = this.hud.querySelector('[uid="container"]');
    this["#outline"] = this.hud.querySelector('[uid="outline"]');
    this["#control-point-1-grippie"] = this.hud.querySelector(
      '[uid="control-point-1-grippie"]'
    );
    this["#control-point-2-grippie"] = this.hud.querySelector(
      '[uid="control-point-2-grippie"]'
    );
    this["#control-line-1"] = this.hud.querySelector('[uid="control-line-1"]');
    this["#control-line-2"] = this.hud.querySelector('[uid="control-line-2"]');
  }
  show = (t, e, n = "end", i = null) => {
    this.hud.hasAttribute("drawing") && this.hide();
    this.hud.setAttribute("drawing", "");
    this.#stage.snapManager.snapStart(!0);
    let o;
    let l;
    let s;
    let r = "none";
    let h = () => {
      o = ut(t, !0);
      s = pt(t, this.#stage.canvas, !0);
      l = o.inverse();
    };
    h();
    let a = "mouse";
    let u = !1;
    let p = null;
    let c = null;
    let d = null;
    let g = e.matrixTransform(l);
    null === i && (i = [{ type: "M", values: [g.x, g.y] }]);
    let v = i[0];
    let y = v;
    let f = null;
    let m = !1;
    let w = null;
    let b = null;
    let x = !1;
    if ("end" === n) {
      y = i[i.length - 1];
      f =
        "C" === y.type
          ? new DOMPoint(y.values[2], y.values[3])
          : "M" === y.type || "L" === y.type
            ? new DOMPoint(y.values[0], y.values[1])
            : null;
      m =
        "C" === y.type &&
        (y.values[2] !== y.values[4] || y.values[3] !== y.values[5]);
    } else {
      if ("start" === n) {
        v = i[0];
        w = i[1];
        b =
          "C" === w.type
            ? new DOMPoint(w.values[0], w.values[1])
            : "M" === w.type || "L" === w.type
              ? new DOMPoint(v.values[0], v.values[1])
              : null;
        x =
          "C" === w.type &&
          w.values[0] !== v.values[0] &&
          w.values[1] !== v.values[1];
      }
    }
    const V = () => {
      let t = this.#stage.ctrlKey;
      let e = this.#stage.shiftKey;
      r = t && e ? "paraxialPolygon" : !t && e ? "polygon" : "none";
      "end" === n
        ? m || "none" !== r || (r = "polygon")
        : "start" === n && (x || "none" !== r || (r = "polygon"));
    };
    const M = () => {
      if (!1 === u) {
        if ("end" === n) {
          if ("L" === y.type || "M" === y.type) {
            this.jt = y.values[0];
            this.Vt = y.values[1];
          } else {
            if ("C" === y.type) {
              this.jt = y.values[4];
              this.Vt = y.values[5];
            }
          }
          let t = this.#stage.snapManager
            .snapPoint(this.#stage.pointerClientPoint)
            .matrixTransform(l);
          this.Ht = t.x;
          this.Wt = t.y;
        } else {
          if ("start" === n) {
            let t = this.#stage.snapManager
              .snapPoint(this.#stage.pointerClientPoint)
              .matrixTransform(l);
            this.jt = t.x;
            this.Vt = t.y;
            this.Ht = v.values[0];
            this.Wt = v.values[1];
          }
        }
        if ("none" === r) {
          let t;
          new ee(
            new DOMPoint(this.jt, this.Vt),
            new DOMPoint(this.Ht, this.Wt)
          );
          if ("end" === n) {
            t = new ee(new DOMPoint(this.jt, this.Vt), f);
          } else {
            if ("start" === n) {
              t = new ee(new DOMPoint(this.Ht, this.Wt), b);
            }
          }
          t = t.negate();
          if ("end" === n) {
            this.Qt = this.jt + t.x;
            this.Jt = this.Vt + t.y;
            this.ei = this.Ht;
            this.ti = this.Wt;
          } else {
            if ("start" === n) {
              this.ei = this.Ht + t.x;
              this.ti = this.Wt + t.y;
              this.Qt = this.jt;
              this.Jt = this.Vt;
            }
          }
        } else {
          if ("polygon" === r) {
            this.Qt = this.jt;
            this.Jt = this.Vt;
            this.ei = this.Ht;
            this.ti = this.Wt;
          } else {
            if ("paraxialPolygon" === r) {
              let e = new DOMPoint(this.jt, this.Vt).matrixTransform(o);
              let i = new DOMPoint(this.Ht, this.Wt).matrixTransform(o);
              let s = this.#stage.snapManager;
              if ("end" === n) {
                let t = s.snapPointToAngleMultiple(e, i, 15).matrixTransform(l);
                this.Ht = t.x;
                this.Wt = t.y;
              } else {
                if ("start" === n) {
                  let t = s
                    .snapPointToAngleMultiple(i, e, 15)
                    .matrixTransform(l);
                  this.jt = t.x;
                  this.Vt = t.y;
                }
              }
              this.Qt = this.jt;
              this.Jt = this.Vt;
              this.ei = this.Ht;
              this.ti = this.Wt;
            }
          }
        }
      } else {
        if (!0 === u) {
          let t = this.#stage.pointerClientPoint.matrixTransform(l);
          let e = new ee(p, t).negate();
          if ("end" === n) {
            this.ei = d.x + e.x;
            this.ti = d.y + e.y;
          } else {
            if ("start" === n) {
              this.Qt = c.x + e.x;
              this.Jt = c.y + e.y;
            }
          }
        }
      }
    };
    const P = () => {
      if ("touch" === a && !1 === u && i.length > 1) {
        this["#container"].style.visibility = "hidden";
      } else {
        this["#container"].style.visibility = "visible";
        this["#container"].setAttribute("transform", s.toString());
        this["#outline"].setPathData([
          { type: "M", values: [this.jt, this.Vt] },
          {
            type: "C",
            values: [this.Qt, this.Jt, this.ei, this.ti, this.Ht, this.Wt],
          },
        ]);
        this["#control-point-1-grippie"].cx.baseVal.value = this.Qt;
        this["#control-point-1-grippie"].cy.baseVal.value = this.Jt;
        this["#control-point-1-grippie"].r.baseVal.value =
          3 / this.#stage.scale;
        this["#control-point-2-grippie"].cx.baseVal.value = this.ei;
        this["#control-point-2-grippie"].cy.baseVal.value = this.ti;
        this["#control-point-2-grippie"].r.baseVal.value =
          3 / this.#stage.scale;
        this["#control-line-1"].x1.baseVal.value = this.jt;
        this["#control-line-1"].y1.baseVal.value = this.Vt;
        this["#control-line-1"].x2.baseVal.value = this.Qt;
        this["#control-line-1"].y2.baseVal.value = this.Jt;
        this["#control-line-2"].x1.baseVal.value = this.Ht;
        this["#control-line-2"].y1.baseVal.value = this.Wt;
        this["#control-line-2"].x2.baseVal.value = this.ei;
        this["#control-line-2"].y2.baseVal.value = this.ti;
      }
    };
    this.#stage.workspaces.addEventListener(
      "pointerdown",
      (this.Xt = (t) => {
        M();
        P();
        a = t.pointerType;
        u = !0;
        p = new DOMPoint(t.clientX, t.clientY).matrixTransform(l);
        c = new DOMPoint(this.Qt, this.Jt);
        d = new DOMPoint(this.ei, this.ti);
      })
    );
    this.#stage.splineTool.splineHud.addEventListener(
      "pointerdown",
      (this.Zt = (t) => {
        u = !0;
        a = t.pointerType;
        p = new DOMPoint(t.clientX, t.clientY).matrixTransform(l);
        c = new DOMPoint(this.Qt, this.Jt);
        d = new DOMPoint(this.ei, this.ti);
      })
    );
    window.addEventListener(
      "pointermove",
      (this.Ft = (t) => {
        a = t.pointerType;
        M();
        P();
      })
    );
    window.addEventListener(
      "pointerup",
      (this.Gt = (t) => {
        u = !1;
        a = t.pointerType;
        M();
        P();
      })
    );
    this.#stage.board.addEventListener(
      "zoomchange",
      (this.D = () => {
        h();
        M();
        P();
      })
    );
    this.#stage.board.addEventListener(
      "contextmenu",
      (this.Kt = (t) => {
        t.preventDefault();
      })
    );
    h();
    V();
    M();
    P();
  };
  hide = () => {
    if (this.hud.hasAttribute("drawing")) {
      this.hud.removeAttribute("drawing");
      this.#stage.snapManager.snapEnd();
      this.#stage.workspaces.removeEventListener("pointerdown", this.Xt);
      this.#stage.splineTool.splineHud.removeEventListener(
        "pointerdown",
        this.Zt
      );
      window.removeEventListener("pointermove", this.Ft);
      window.removeEventListener("pointerup", this.Gt);
      this.#stage.board.removeEventListener("zoomchange", this.D);
      this.#stage.board.removeEventListener("contextmenu", this.Kt);
    }
  };
}
export default CubicBezierSegHud;
