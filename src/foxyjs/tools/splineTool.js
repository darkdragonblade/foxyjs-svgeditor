import {
  ut,
  ct,
  pt,
  Kt,
  qt,
  Zi,
  Te,
  Pi,
  Wi,
  yi,
  pi,
  Ve,
  We,
  Je,
  Ae,
  Qe,
  ii,
  Ke,
  $e,
  te,
  He,
  pd,
  qe,
  Xe,
  Ye,
  Ze,
  ks,
} from "../utils/common";
import ee from "../utils/ee";
import Ba from "../utils/Ba";
const fd = 5;
const bd = 5;
const wd = Symbol();
const vd = Symbol();
const yd = Symbol();
const kd = Symbol();
class SplineTool {
  #stage;
  get mode() {
    return this.splineHud.hasAttribute("mode")
      ? this.splineHud.getAttribute("mode")
      : "edit";
  }
  set mode(e) {
    null === e
      ? this.splineHud.setAttribute("mode", "edit")
      : this.splineHud.setAttribute("mode", Pi(e));
  }
  get enabled() {
    return this.splineHud.hasAttribute("enabled");
  }
  set enabled(e) {
    e
      ? this.splineHud.setAttribute("enabled", "")
      : this.splineHud.removeAttribute("enabled");
  }
  get selectedNodes() {
    return [...this.Mi];
  }
  set selectedNodes(e) {
    this.Mi = e;
    this.Pi();
  }
  splineHud = document.querySelector("#spline-hud");
  l;
  zi;
  Oi = [];
  Mi = [];
  Ei = null;
  Ti = null;
  Ai = null;
  $i;
  Pi;
  Ii;
  Ui;
  C;
  T;
  D;
  Qe;
  et;
  ["#grippies"];
  ["#helper-lines"];
  ["#curve-grippies"];
  ["#primary-node-grippies"];
  ["#secondary-node-grippies"];
  constructor(stage) {
    this.#stage = stage;
    this.l = !1;
    this.zi = 0;
    this.Oi = [];
    this.Mi = [];
    this.Ei = null;
    this.Ti = null;
    this.Ai = null;
    this.$i = ks(this.Li, 1500, this);
    this.Pi = ks(this.Ri, 40, this);
    this.Ii = ks(this.Bi, 40, this);
    this.Ui = ks(this._i, 1500, this);
    this.splineHud.innerHTML = `
      <g uid="grippies" tabindex="-1">
        <g uid="helper-lines"></g>
        <g uid="curve-grippies"></g>
        <g uid="primary-node-grippies"></g>
        <g uid="secondary-node-grippies"></g>
      </g>`;
    this.splineHud.addEventListener("keydown", (e) => {
      this.je(e);
    });
    this.splineHud.addEventListener("pointerdown", (e) => {
      this.L(e);
    });
    this.splineHud.addEventListener("pointerup", (e) => {
      this.Ve(e);
    });
    this.splineHud.addEventListener("click", (e) => {

      Date.now() - this.zi < 300 && this.He(e);
      this.zi = Date.now();
    });
    this["#grippies"] = this.splineHud.querySelector('[uid="grippies"]');
    this["#helper-lines"] = this.splineHud.querySelector(
      '[uid="helper-lines"]'
    );
    this["#curve-grippies"] = this.splineHud.querySelector(
      '[uid="curve-grippies"]'
    );
    this["#primary-node-grippies"] = this.splineHud.querySelector(
      '[uid="primary-node-grippies"]'
    );
    this["#secondary-node-grippies"] = this.splineHud.querySelector(
      '[uid="secondary-node-grippies"]'
    );
  }
  enable = () => {
    this.enabled = true;
    this.#stage.board.addEventListener(
      "selectedelementschange",
      (this.C = () => {
        this.S();
      })
    );
    this.S();
  };
  disable = () => {
    this.enabled = false;
    this.l && this.M();
    for (let e of this["#grippies"].children) e.innerHTML = "";
    this.#stage.board.removeEventListener("selectedelementschange", this.C);
  };
  P = () => {
    this.l = !0;
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
    this.#stage.board.addEventListener(
      "undo",
      (this.Qe = () => {
        this.deselectAllNodes();
      })
    );
    this.#stage.board.addEventListener(
      "redo",
      (this.et = () => {
        this.deselectAllNodes();
      })
    );
  };
  M = () => {
    this.Oi = [];
    this.Mi = [];
    this.l = !1;
    this["#curve-grippies"].innerHTML = "";
    this["#primary-node-grippies"].innerHTML = "";
    this["#secondary-node-grippies"].innerHTML = "";
    this["#helper-lines"].innerHTML = "";
    this.#stage.board.removeEventListener("workspacemutation", this.T);
    this.#stage.board.removeEventListener("zoomchange", this.D);
    this.#stage.board.removeEventListener("undo", this.Qe);
    this.#stage.board.removeEventListener("redo", this.et);
    this.splineHud.dispatchEvent(new CustomEvent("selectednodeschange"));
  };
  rubberBandSelectionCallback = (s) => {
    let e = this.#stage.shiftKey;
    let l = [];
    if (s instanceof DOMRect) {
      let i = s;
      for (let t of this["#primary-node-grippies"].children) {
        let e = Wi(t);
        pi(i, e) && l.push(t);
      }
    } else
      for (let t of this["#primary-node-grippies"].children) {
        let e = new DOMPoint(
          t.firstElementChild.cx.baseVal.value,
          t.firstElementChild.cy.baseVal.value
        );
        !0 === yi(s, e) && l.push(t);
      }
    if (!1 === e) {
      this.Mi = [];
      for (let t of l) {
        let e = { spline: t[wd], index: t[yd] };
        this.Mi.push(e);
      }
    } else {
      if (!0 === e)
        for (let e of l) {
          let t = { spline: e[wd], index: e[yd] };
          void 0 ===
            this.Mi.find((e) => e.spline === t.spline && e.index === t.index) &&
            this.Mi["push"](t);
        }
    }
    this.Pi();
    this.$i();
    this.splineHud.dispatchEvent(new CustomEvent("selectednodeschange"));
    this.Mi.length > 0 && this["#grippies"].focus();
  };
  moveCallback = (t, l) => {
    let e = this.Oi.filter(
      (t) => this.Mi.filter((e) => e.spline === t).length > 0
    );
    for (let p of e) {
      let s = this.selectedNodes
        .filter((e) => e.spline === p)
        .map((e) => e.index);
      if (s.length > 0) {
        let e = pt(p, this.#stage.canvas).inverse();
        let r = new ee(t, l);
        let i = r.matrixTransform(e);
        if ("line" === p.localName) {
          let t = [
            new DOMPoint(p["x1"].baseVal.value, p["y1"].baseVal.value),
            new DOMPoint(p["x2"].baseVal.value, p["y2"].baseVal.value),
          ];
          for (let e of s)
            t[e] = new DOMPoint(t[e]["x"] + i["x"], t[e]["y"] + i["y"]);
          for (let e of t) {
            e["x"] = te(e["x"], this.#stage.geometryPrecision);
            e["y"] = te(e["y"], this.#stage.geometryPrecision);
          }
          p.setAttribute("x1", t[0]["x"]);
          p.setAttribute("y1", t[0]["y"]);
          p.setAttribute("x2", t[1]["x"]);
          p.setAttribute("y2", t[1]["y"]);
        } else {
          if ("polyline" === p.localName || "polygon" === p.localName) {
            let t = [...p.points].map((e) => DOMPoint.fromPoint(e));
            for (let e of s)
              t[e] = new DOMPoint(t[e]["x"] + r["x"], t[e]["y"] + r["y"]);
            for (let e of t) {
              e["x"] = te(e["x"], this.#stage.geometryPrecision);
              e["y"] = te(e["y"], this.#stage.geometryPrecision);
            }
            p.setAttribute(
              "points",
              t
                .map((e) => [e["x"], e["y"]])
                .flat()
                .join(" ")
            );
          } else {
            if ("path" === p.localName) {
              let a = Te(p);
              let o = structuredClone(a);
              for (let i of s) {
                let l = a[i];
                let e = a[i + 1];
                let n = o[i];
                let t = o[i + 1];
                if ("M" === l.type || "L" === l.type) {
                  l.values[0] = n.values[0] + r["x"];
                  l.values[1] = n.values[1] + r["y"];
                  if ("C" === e?.type) {
                    e.values[0] = t.values[0] + r["x"];
                    e.values[1] = t.values[1] + r["y"];
                  } else {
                    if ("Z" === e?.type) {
                      let e = Ve(l, a);
                      let t = e[0];
                      let i = e[1];
                      let s = Ve(n, o);
                      t.values[0] = l.values[0];
                      t.values[1] = l.values[1];
                      if ("C" === i?.type) {
                        i.values[0] = s[1].values[0] + r["x"];
                        i.values[1] = s[1].values[1] + r["y"];
                      }
                    }
                  }
                } else {
                  if ("R" === l.type) {
                    if (
                      ((l.values[0] = n.values[0] + r["x"]),
                        (l.values[1] = n.values[1] + r["y"]),
                        "Z" === e?.type)
                    ) {
                      let e = Ve(l, a);
                      let t = e[0];
                      Ve(n, o);
                      t.values[0] = l.values[0];
                      t.values[1] = l.values[1];
                    }
                  } else {
                    if ("U" === l.type) {
                      if ("Z" === e?.type) {
                        l.values[0] = n.values[0] + r["x"];
                        l.values[1] = n.values[1] + r["y"];
                      } else {
                        l.values[0] = n.values[0] + r["x"];
                        l.values[1] = n.values[1] + r["y"];
                        if ("Z" === e?.type) {
                          let e = Ve(l, a);
                          let t = e[0];
                          Ve(n, o);
                          t.values[0] = l.values[0];
                          t.values[1] = l.values[1];
                        }
                      }
                    } else {
                      if ("C" === l.type) {
                        l.values[2] = n.values[2] + r["x"];
                        l.values[3] = n.values[3] + r["y"];
                        l.values[4] = n.values[4] + r["x"];
                        l.values[5] = n.values[5] + r["y"];
                        if ("C" === e?.type) {
                          e.values[0] = t.values[0] + r["x"];
                          e.values[1] = t.values[1] + r["y"];
                        } else {
                          if ("Z" === e?.type) {
                            let e = Ve(l, a);
                            let t = e[0];
                            let i = e[1];
                            let s = Ve(n, o);
                            t.values[0] = l.values[4];
                            t.values[1] = l.values[5];
                            if ("C" === i.type) {
                              i.values[0] = s[1].values[0] + r["x"];
                              i.values[1] = s[1].values[1] + r["y"];
                            }
                          }
                        }
                      }
                    }
                  }
                }
                Ae(p, a, this.#stage.geometryPrecision);
              }
            }
          }
        }
      }
    }
    return e.length > 0;
  };
  S = () => {
    this.Oi = this.Fi();
    this.Mi = [];
    this.splineHud.dispatchEvent(new CustomEvent("selectednodeschange"));
    if (0 === this.Oi.length) {
      this.l && this.M();
    } else {
      this.l || this.P();
      this.Pi();
      this.$i();
    }
  };
  A = () => {
    this.Pi();
    this.$i();
  };
  O = () => {
    this.Ii();
    this.Ui();
  };
  je = (t) => {
    if (
      this.mode?.startsWith("edit") &&
      this["#primary-node-grippies"].querySelector("[data-selected]")
    ) {
      let e = Ba.fromEvent(t);
      t.preventDefault();
      t.stopPropagation();
      if (e.matches("Backspace") || e.matches("Delete")) {
        this.Gi("smooth");
      } else {
        if (e.matches("Shift", "Backspace") || e.matches("Shift", "Delete")) {
          this.Gi("sharp");
        }
      }
    }
  };
  L = (e) => {
    e.preventDefault();
    this["#grippies"].focus();
    e.target.closest(".primary-node-grippie")
      ? this.Ni(e)
      : e.target.matches(".secondary-node-grippie")
        ? this.ji(e)
        : e.target.matches(".curve-grippie path") && this.Vi(e);
  };
  Ve = (e) => {
    e.target.closest(".primary-node-grippie") && this.Hi(e);
  };
  He = (e) => {
    e.target.closest(".primary-node-grippie")
      ? this.Wi(e)
      : e.target.matches(".secondary-node-grippie")
        ? this.Yi(e)
        : e.target.matches(".curve-grippie > path") && this.qi(e);
  };
  Ni = (n) => {
    if (n.buttons > 1) return;
    let a = !1;
    let o = n.target.closest(".primary-node-grippie");
    let r = o[wd];
    let p = o[yd];
    let e = Te(r);
    let [i] = He(e, p);
    if (this.mode?.startsWith("edit")) {
      let i;
      let s = this.#stage.shiftKey;
      o.addEventListener(
        "pointerup",
        (i = () => {
          o.removeEventListener("pointerup", i);
          let e =
            void 0 !== this.Mi.find((e) => e.spline === r && e.index === p);
          let t = { spline: r, index: p };
          if (!1 === e) {
            !1 === s ? (this.Mi = [t]) : !0 === s && this.Mi.push(t);
            this.Pi();
          } else {
            if (!0 === s && !1 === a) {
              this.Mi = this.Mi.filter((e) => e.spline !== r || e.index !== p);
              this.Pi();
            }
          }
          this.splineHud.dispatchEvent(new CustomEvent("selectednodeschange"));
        })
      );
    }
    let u;
    let s;
    let d = new DOMPoint(n.clientX, n.clientY);
    let h = d;
    let l = new CustomEvent("nodepointerdown", {
      cancelable: !0,
      detail: {
        spline: r,
        index: p,
        subpathIndex: i,
        position: o.getAttribute("data-position"),
        selected: o.hasAttribute("data-selected"),
        pointerId: n.pointerId,
      },
    });
    this.splineHud.dispatchEvent(l);

    window.addEventListener(
      "pointermove",
      (u = (i) => {
        let e = new DOMPoint(i.clientX, i.clientY);
        let t = i.timeStamp - n.timeStamp;
        let s = Kt(d, e) > 3 || t > 80;
        let l = !1 === qt(h, e, null);
        h = e;
        if (this.mode?.startsWith("edit") && !0 === s && !0 === l) {
          window.removeEventListener("pointermove", u);
          let e = new ee(i.clientX - n.clientX, i.clientY - n.clientY);
          a = !0;
          let t = Math.abs(e.x) > Math.abs(e.y) ? "horizontal" : "vertical";
          new DOMPoint(i.clientX, i.clientY);
          if (void 0 === this.Mi.find((e) => e.spline === r && e.index === p)) {
            this.Mi = [{ spline: r, index: p }];
            this.Pi();
            this.splineHud.dispatchEvent(
              new CustomEvent("selectednodeschange")
            );
          }
          this.Xi(n, o, t);
        }
      })
    );
    window.addEventListener(
      "pointerup",
      (s = (t) => {
        window.removeEventListener("pointermove", u);
        window.removeEventListener("pointerup", s);
        if (!1 === a && !1 === l.defaultPrevented) {
          let e = new CustomEvent("nodeclick", {
            detail: {
              spline: r,
              index: p,
              subpathIndex: i,
              position: o.getAttribute("data-position"),
              selected: o.hasAttribute("data-selected"),
              pointerId: t.pointerId,
            },
          });
          this.splineHud.dispatchEvent(e);
        }
      })
    );
  };
  Hi = (e) => {
    const t = document
      .elementsFromPoint(e.clientX, e.clientY)[0]
      ?.closest(".primary-node-grippie");
    if (t) {
      const i = t[wd];
      const s = t[yd];
      const l = Te(i);
      const [n] = He(l, s);
      const a = new CustomEvent("nodepointerup", {
        detail: {
          spline: i,
          index: s,
          subpathIndex: n,
          position: t.getAttribute("data-position"),
          selected: t.hasAttribute("data-selected"),
          pointerId: e.pointerId,
        },
      });
      this.splineHud.dispatchEvent(a);
    }
  };
  Xi = (e, t, s) => {
    let i;
    let l;
    let p = Symbol();
    let u = Symbol();
    let a = Symbol();
    let n = Symbol();
    let o = Symbol();
    let r = this.Oi.filter(
      (t) => this.Mi.filter((e) => e.spline === t).length > 0
    );
    for (let t of r) {
      let e = this.Zi(t);
      t[n] = e;
      t[o] = e.inverse();
      if ("line" === t.localName)
        t[a] = [
          new DOMPoint(t["x1"].baseVal.value, t["y1"].baseVal.value),
          new DOMPoint(t["x2"].baseVal.value, t["y2"].baseVal.value),
        ];
      else {
        if ("polyline" === t.localName)
          t[a] = [...t.points].map((e) => DOMPoint.fromPoint(e));
        else {
          if ("polygon" === t.localName)
            t[a] = [...t.points].map((e) => DOMPoint.fromPoint(e));
          else {
            if ("path" === t.localName) {
              let e = Te(t);
              t[p] = e;
              t[u] = structuredClone(e);
            }
          }
        }
      }
    }
    this.#stage.undoManager.checkpoint("move-nodes", "#edit-tool");
    this.#stage.snapManager.snapStart(!0);
    this["Ei"] = t;
    let d = t[wd];
    let h = new DOMPoint(e.clientX, e.clientY);
    let v = t[kd].matrixTransform(d[n]);
    window.addEventListener(
      "pointermove",
      (i = (e) => {
        const t = new DOMPoint(e.clientX, e.clientY);
        this.#stage.shiftKey &&
          ("horizontal" === s ? (t.y = h.y) : "vertical" === s && (t.x = h.x));
        let i = this.#stage.snapManager.snapPoint(
          new DOMPoint(v.x + t.x - h.x, v.y + t.y - h.y)
        );
        let l = new ee(v, i);
        for (let s of r) {
          const n = this.Mi.filter((e) => e.spline === s).map((e) => e.index);
          let r = l.matrixTransform(s[o]);
          if ("line" === s.localName) {
            let t = [...s[a]];
            for (let e of n)
              t[e] = new DOMPoint(s[a][e].x + r.x, s[a][e].y + r.y);
            s.setAttribute("x1", t[0].x);
            s.setAttribute("y1", t[0].y);
            s.setAttribute("x2", t[1].x);
            s.setAttribute("y2", t[1].y);
          } else {
            if ("polyline" === s.localName || "polygon" === s.localName) {
              let t = [...s[a]];
              for (let e of n)
                t[e] = new DOMPoint(
                  s[a][e]["x"] + r["x"],
                  s[a][e]["y"] + r["y"]
                );
              s.setAttribute(
                "points",
                t
                  .map((e) => [e["x"], e["y"]])
                  .flat()
                  .join(" ")
              );
            } else {
              if ("path" === s.localName) {
                let a = s[p];
                let o = s[u];
                for (let i of n) {
                  let l = a[i];
                  let e = a[i + 1];
                  let n = o[i];
                  let t = o[i + 1];
                  if ("M" === l.type || "L" === l.type) {
                    l.values[0] = n.values[0] + r.x;
                    l.values[1] = n.values[1] + r.y;
                    if ("C" === e?.type) {
                      e.values[0] = t.values[0] + r.x;
                      e.values[1] = t.values[1] + r.y;
                    } else {
                      if ("Z" === e?.type) {
                        let e = Ve(l, a);
                        let t = e[0];
                        let i = e[1];
                        let s = Ve(n, o);
                        t.values[0] = l.values[0];
                        t.values[1] = l.values[1];
                        if ("C" === i?.type) {
                          i.values[0] = s[1].values[0] + r.x;
                          i.values[1] = s[1].values[1] + r.y;
                        }
                      }
                    }
                  } else {
                    if ("R" === l.type) {
                      l.values[0] = n.values[0] + r.x;
                      l.values[1] = n.values[1] + r.y;
                      if ("Z" === e?.type) {
                        let e = Ve(l, a);
                        let t = e[0];
                        Ve(n, o);
                        t.values[0] = l.values[0];
                        t.values[1] = l.values[1];
                      }
                    } else {
                      if ("U" === l.type) {
                        if ("Z" === e?.type) {
                          l.values[0] = n.values[0] + r.x;
                          l.values[1] = n.values[1] + r.y;
                        } else {
                          l.values[0] = n.values[0] + r.x;
                          l.values[1] = n.values[1] + r.y;
                          if ("Z" === e?.type) {
                            let e = Ve(l, a);
                            let t = e[0];
                            Ve(n, o);
                            t.values[0] = l.values[0];
                            t.values[1] = l.values[1];
                          }
                        }
                      } else {
                        if ("C" === l.type) {
                          l.values[2] = n.values[2] + r.x;
                          l.values[3] = n.values[3] + r.y;
                          l.values[4] = n.values[4] + r.x;
                          l.values[5] = n.values[5] + r.y;
                          if ("C" === e?.type) {
                            e.values[0] = t.values[0] + r.x;
                            e.values[1] = t.values[1] + r.y;
                          } else {
                            if ("Z" === e?.type) {
                              let e = Ve(l, a);
                              let t = e[0];
                              let i = e[1];
                              let s = Ve(n, o);
                              t.values[0] = l.values[4];
                              t.values[1] = l.values[5];
                              if ("C" === i.type) {
                                i.values[0] = s[1].values[0] + r["x"];
                                i.values[1] = s[1].values[1] + r["y"];
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                  Ae(s, a);
                }
              }
            }
          }
        }
      })
    );
    window.addEventListener(
      "pointerup",
      (l = () => {
        window.removeEventListener("pointermove", i);
        window.removeEventListener("pointerup", l);
        for (let t of r)
          if ("line" === t.localName) {
            t.setAttribute(
              "x1",
              te(t.x1.baseVal.value, this.#stage.geometryPrecision)
            );
            t.setAttribute(
              "y1",
              te(t.y1.baseVal.value, this.#stage.geometryPrecision)
            );
            t.setAttribute(
              "x2",
              te(t.x2.baseVal.value, this.#stage.geometryPrecision)
            );
            t.setAttribute(
              "y2",
              te(t.y2.baseVal.value, this.#stage.geometryPrecision)
            );
          } else {
            if ("polyline" === t.localName || "polygon" === t.localName) {
              let e = [...t.points].map((e) => [
                te(e.x, this.#stage.geometryPrecision),
                te(e.y, this.#stage.geometryPrecision),
              ]);
              t.setAttribute("points", e.flat().join(" "));
            } else {
              if ("path" === t.localName) {
                let e = t[p];
                Ae(t, e, this.#stage.geometryPrecision);
              }
            }
          }
        this.#stage.snapManager.snapEnd();
        this.Ei = null;
        this.Li();
      })
    );
  };
  Wi = (e) => {
    let o = e.target.closest(".primary-node-grippie");
    let r = o[wd];
    if (
      "polyline" === r.localName ||
      "polygon" === r.localName ||
      "path" === r.localName
    ) {
      let e = o[yd];
      let s = Te(r, !0);
      let t = s[e];
      let i = s[e + 1] || null;
      let l = s[e - 1] || null;
      let n = Ve(t, s);
      let a = !1;
      Ke(s);
      if ("M" === t.type) {
        if ("C" === i.type) {
          if (
            !1 === (i.values[0] === t.values[0] && i.values[1] === t.values[1])
          ) {
            i.values[0] = t.values[0];
            i.values[1] = t.values[1];
            a = !0;
          }
        }
      } else {
        if ("C" === t.type) {
          if (null === i || "M" === i.type) {
            if (
              !1 ===
              (t.values[2] === t.values[4] && t.values[3] === t.values[5])
            ) {
              t.values[2] = t.values[4];
              t.values[3] = t.values[5];
              a = !0;
            }
          } else {
            if ("Z" === i.type) {
              let e = n[1];
              "C" === e.type &&
                (!1 ===
                  (t.values[4] === e.values[0] &&
                    t.values[5] === e.values[1] &&
                    t.values[4] === t.values[2] &&
                    t.values[5] === t.values[3])
                  ? ((e.values[0] = t.values[4]),
                    (e.values[1] = t.values[5]),
                    (t.values[2] = t.values[4]),
                    (t.values[3] = t.values[5]))
                  : Ze(l, t, e),
                  (a = !0));
            } else {
              "C" === i.type &&
                (!1 ===
                  (i.values[0] === t.values[4] &&
                    i.values[1] === t.values[5] &&
                    t.values[2] === t.values[4] &&
                    t.values[3] === t.values[5])
                  ? ((t.values[2] = t.values[4]),
                    (t.values[3] = t.values[5]),
                    (i.values[0] = t.values[4]),
                    (i.values[1] = t.values[5]))
                  : Ze(l, t, i),
                  (a = !0));
            }
          }
        }
      }
      if (a) {
        this.#stage.undoManager.checkpoint(
          "#reset-control-points",
          "#edit-tool"
        );
        Qe(s);
        if ("polyline" === r.localName || "polygon" === r.localName) {
          let t = Zi("svg:path");
          for (let e of r.attributes)
            !1 === ["x1", "y1", "x2", "y2", "points"].includes(e.name) &&
              t.setAttribute(e.name, e.value);
          Ae(t, s, this.#stage.geometryPrecision);
          r.replaceWith(t);
          let e = Array.from(this.#stage.selectedElements.keys()).map((e) =>
            e === r ? t : e
          );
          let i = this.selectedNodes.map((e) =>
            e.spline === r ? { spline: t, index: e.index } : e
          );
          const p = window.structuredClone(e);
          this.#stage.selectedElements.sets(p);
          this.selectedNodes = i;
          r = t;
        } else Ae(r, s, this.#stage.geometryPrecision);
      }
    }
  };
  ji = (u) => {
    if (u.buttons <= 1) {
      let n;
      let a;
      let o = u.target;
      let r = new DOMPoint(u.clientX, u.clientY);
      let p = r;
      window.addEventListener(
        "pointermove",
        (n = (e) => {
          let t = new DOMPoint(e.clientX, e.clientY);
          let i = e.timeStamp - u.timeStamp;
          let s = Kt(r, t) > 3 || i > 80;
          let l = !1 === qt(p, t, null);
          p = t;
          if (!0 === s && !0 === l) {
            window.removeEventListener("pointermove", n);
            window.removeEventListener("pointerup", a);
            this.Ki(u, o);
          }
        })
      );
      window.addEventListener(
        "pointerup",
        (a = () => {
          window.removeEventListener("pointermove", n);
          window.removeEventListener("pointerup", a);
        })
      );
    }
  };
  Ki = (e, t) => {
    let i = t.getAttribute("data-index");
    let s = t[wd];
    let n = this.Zi(s);
    let a = n.inverse();
    this.#stage.undoManager.checkpoint("move-control-points", "#edit-tool");
    this.#stage.snapManager.snapStart(!0);
    let l = Te(s, !0);
    Ke(l);
    let o;
    let r;
    let p = t[yd];
    let u = l[p];
    let d = l[p - 1] || null;
    let h = l[p + 1] || null;
    let v = Ve(u, l);
    let c = We(u, l);
    let y = new DOMPoint(e.clientX, e.clientY).matrixTransform(a);
    let m = [...u.values];
    let f = null;
    let g = null;
    let x = null;
    f = "M" === d.type && c ? v[v.length - 2] : d;
    h && ("Z" === h.type ? (g = c ? v[1] : null) : "C" === h.type && (g = h));
    "1" === i
      ? "M" === f.type || "L" === f.type
        ? (x = new DOMPoint(f.values[0], f.values[1]))
        : "C" === f.type && (x = new DOMPoint(f.values[4], f.values[5]))
      : "2" === i && (x = new DOMPoint(u.values[4], u.values[5]));
    let w = "sharp";
    let M = x.matrixTransform(n);
    let b = new DOMPoint(y["x"], y["y"]);
    this.Ti = t;
    let P = () => {
      let e = this.#stage.ctrlKey;
      let t = this.#stage.shiftKey;
      !0 === e && !1 === t
        ? (w = "sharp")
        : !1 === e && !0 === t
          ? "1" === i
            ? (w = "C" === f?.type ? "smooth" : "sharp")
            : "2" === i && (w = "C" === g?.type ? "smooth" : "sharp")
          : !0 === e && !0 === t
            ? "1" === i
              ? (w = "C" === f?.type ? "symmetric-smooth" : "sharp")
              : "2" === i && (w = "C" === g?.type ? "symmetric-smooth" : "sharp")
            : !1 === e &&
            !1 === t &&
            ("1" === i ? (w = Ye(f, u)) : "2" === i && (w = Ye(u, g)));
    };
    let O = () => {
      if ("1" === i) {
        let l;
        if (this.#stage.shiftKey) l = b;
        else {
          let e = b["x"] - y["x"];
          let t = b["y"] - y["y"];
          l = new DOMPoint(m[0] + e, m[1] + t);
        }
        let e = l.matrixTransform(n);
        l = this.#stage.snapManager.snapPoint(e).matrixTransform(a);
        u.values[0] = l["x"];
        u.values[1] = l["y"];
        if ("smooth" === w) {
          let e = new DOMPoint(f.values[2], f.values[3]);
          let t = new ee(x, l);
          let i = new ee(x, e);
          let s = t.getOppositeVector();
          s.length = i.length;
          f.values[2] = x["x"] + s["x"];
          f.values[3] = x["y"] + s["y"];
        } else {
          if ("symmetric-smooth" === w) {
            let e = new ee(x, l);
            e = e.negate();
            f.values[2] = x["x"] + e["x"];
            f.values[3] = x["y"] + e["y"];
          }
        }
      } else {
        if ("2" === i) {
          let l;
          if (this.#stage.shiftKey) l = b;
          else {
            let e = b["x"] - y["x"];
            let t = b["y"] - y["y"];
            l = new DOMPoint(m[2] + e, m[3] + t);
          }
          {
            let e = l.matrixTransform(n);
            l = this.#stage.snapManager.snapPoint(e).matrixTransform(a);
          }
          u.values[2] = l["x"];
          u.values[3] = l["y"];
          if ("smooth" === w) {
            let e = new DOMPoint(g.values[0], g.values[1]);
            let t = new ee(x, l);
            let i = new ee(x, e);
            let s = t.getOppositeVector();
            s.length = i.length;
            g.values[0] = x["x"] + s["x"];
            g.values[1] = x["y"] + s["y"];
          } else {
            if ("symmetric-smooth" === w) {
              let e = new ee(x, l);
              e = e.negate();
              g.values[0] = x["x"] + e["x"];
              g.values[1] = x["y"] + e["y"];
            }
          }
        }
      }
      Ae(s, l);
    };
    window.addEventListener(
      "pointermove",
      (o = (e) => {
        let t = new DOMPoint(e.clientX, e.clientY);
        if (this.#stage.shiftKey) {
          let [e] = ii(M, t, 22.5);
          t = e;
        }
        b = t.matrixTransform(a);
        O();
      })
    );
    window.addEventListener(
      "pointerup",
      (r = () => {
        window.removeEventListener("pointermove", o);
        window.removeEventListener("pointerup", r);
        Qe(l);
        Ae(s, l, this.#stage.geometryPrecision);
        this.Ti = null;
        this.#stage.snapManager.snapEnd();
      })
    );
    P();
  };
  Yi = (e) => {
    let t = e.target;
    let i = t.getAttribute("data-index");
    let s = t[wd];
    let l = t[yd];
    let n = Te(s, !0);
    let a = n[l];
    let o = n[l - 1] || null;
    "1" === i
      ? "C" === o.type
        ? ((a.values[0] = o.values[4]), (a.values[1] = o.values[5]))
        : ("M" !== o.type && "L" !== o.type) ||
        ((a.values[0] = o.values[0]), (a.values[1] = o.values[1]))
      : "2" === i && ((a.values[2] = a.values[4]), (a.values[3] = a.values[5]));
    this.#stage.undoManager.checkpoint("reset-control-point", "#edit-tool");
    Qe(n);
    Ae(s, n, this.#stage.geometryPrecision);
  };
  Vi = (d) => {
    if (d.buttons <= 1) {
      let n;
      let a;
      let o = new DOMPoint(d.clientX, d.clientY);
      let r = o;
      let e = d.target.closest(".curve-grippie");
      let p = d.target;
      let t = p.closest(".curve-grippie")[wd];
      let i = [...e.children].indexOf(p);
      let u = !1;
      window.addEventListener(
        "pointermove",
        (n = (e) => {
          let t = new DOMPoint(e.clientX, e.clientY);
          let i = e.timeStamp - d.timeStamp;
          let s = Kt(o, t) > 3 || i > 80;
          let l = !1 === qt(r, t, null);
          r = t;
          if (!0 === s && !0 === l) {
            window.removeEventListener("pointermove", n);
            window.removeEventListener("pointerup", a);
            this.Qi(e, p);
            u = !0;
          }
        })
      );
      window.addEventListener(
        "pointerup",
        (a = () => {
          window.removeEventListener("pointermove", n);
          window.removeEventListener("pointerup", a);
          !1 === u && this.Ji(t, i);

        })
      );
    }
  };
  Qi = (t, i) => {
    let e;
    let s;
    let l = i.closest(".curve-grippie");
    let r = l[wd],
      p = Te(r, !0);
    let n = [...l.children].indexOf(i);
    let u = p[n];
    let a = p[n - 1];
    let o = p[n + 1];
    let d = Ve(u, p);
    let h = We(u, p);
    let v = null;
    let c = null;
    let y = !1;
    let m = !1;
    let f = null;
    let g = null;
    let x = null;
    let w = null;
    let M = null;
    let b = this.Zi(r).inverse();
    this.#stage.undoManager.checkpoint("move-control-points", "edit-tool");
    this.Ai = l;
    this["#curve-grippies"].style.display = "none";
    if (
      "line" === r.localName ||
      "polyline" === r.localName ||
      "polygon" === r.localName
    ) {
      let t = Zi("svg:path");
      for (let e of r.attributes)
        !1 === ["x1", "y1", "x2", "y2", "points"].includes(e.name) &&
          t.setAttribute(e.name, e.value);
      Ae(t, p);
      r.replaceWith(t);
      let e = Array.from(this.#stage.selectedElements.keys()).map((e) =>
        e === r ? t : e
      );
      let i = this.selectedNodes.map((e) =>
        e.spline === r ? { spline: t, index: e.index } : e
      );
      this.#stage.selectedElements.sets(e);
      this.selectedNodes = i;
      r = t;
    }
    Ke(p);
    v = "M" === a.type && h ? d[d.length - 2] : a;
    o && ("Z" === o.type ? (c = h ? d[1] : null) : "C" === o.type && (c = o));
    {
      let e = new DOMPoint(t.clientX, t.clientY).matrixTransform(b);
      x = new DOMPoint(e["x"], e["y"]);
      w = Je(i, e)[0];
      M = new ee(e, w);
      "M" === v.type || "L" === v.type
        ? (f = new DOMPoint(v.values[0], v.values[1]))
        : "C" === v.type && (f = new DOMPoint(v.values[4], v.values[5]));
      "M" === u.type || "L" === u.type
        ? (g = new DOMPoint(u.values[0], u.values[1]))
        : "C" === u.type && (g = new DOMPoint(u.values[4], u.values[5]));
    }
    const P = () => {
      let e = this.#stage.ctrlKey;
      let t = this.#stage.shiftKey;
      !0 === e && !1 === t
        ? ((y = !1), (m = !1))
        : !1 === e && !0 === t
          ? ((y = "C" === v?.["type"] && "smooth"),
            (m = "C" === c?.["type"] && "smooth"))
          : !0 === e && !0 === t
            ? ((y = "C" === v?.["type"] && "symmetric-smooth"),
              (m = "C" === c?.["type"] && "symmetric-smooth"))
            : !1 === e && !1 === t && ((y = Ye(v, u)), (m = Ye(u, c)));
    };
    const O = () => {
      let e = new DOMPoint(u.values[0], u.values[1]);
      let t = new DOMPoint(u.values[2], u.values[3]);
      let i = pd(w, f, e, t, g);
      let s = 1;
      if (
        (i <= 1 / 6
          ? (s = 0)
          : i <= 0.5
            ? (s = Math.pow((6 * i - 1) / 2, 3) / 2)
            : i <= 5 / 6 &&
            (s = (1 - Math.pow((6 * (1 - i) - 1) / 2, 3)) / 2 + 0.5),
          -1 === i)
      )
        return;
      let l = (1 - s) / (3 * i * (1 - i) * (1 - i));
      let n = s / (3 * i * i * (1 - i));
      let a = x["x"] - w["x"];
      let o = x["y"] - w["y"];
      u.values[0] = u.values[0] + l * a;
      u.values[1] = u.values[1] + l * o;
      u.values[2] = u.values[2] + n * a;
      u.values[3] = u.values[3] + n * o;
      "smooth" === y ? qe(u, v, !1) : "symmetric-smooth" === y && qe(u, v, !0);
      "smooth" === m ? Xe(u, c, !1) : "symmetric-smooth" === m && Xe(u, c, !0);
      w = x;
      Ae(r, p);
    };
    window.addEventListener(
      "pointermove",
      (e = (e) => {
        x = new DOMPoint(e.clientX, e.clientY).matrixTransform(b);
        x["x"] += M["x"];
        x["y"] += M["y"];
        O();
      })
    );
    window.addEventListener(
      "pointerup",
      (s = () => {
        window.removeEventListener("pointermove", e);
        window.removeEventListener("pointerup", s);
        Qe(p);
        Ae(r, p, this.#stage.geometryPrecision);
        this.Ai = null;
        this["#curve-grippies"].style.display = "";
        this.Li();

      })
    );
    P();
  };
  Ji = (e, t) => {
    let i = Te(e, !0);
    let s = t - 1;
    let l = i[t];
    let n = i[s];
    let a = Ve(l, i);
    let o = We(l, i);
    n
      ? o && "M" === n.type
        ? "polygon" === e.localName
          ? (this.Mi = [
            { spline: e, index: t },
            { spline: e, index: 0 },
          ])
          : "path" === e.localName &&
          (this.Mi = [
            { spline: e, index: t },
            { spline: e, index: a.length - 2 },
          ])
        : (this.Mi = [
          { spline: e, index: t },
          { spline: e, index: s },
        ])
      : (this.Mi = [{ spline: e, index: t }]),
      this.Pi();
    this.splineHud.dispatchEvent(new CustomEvent("selectednodeschange"));
  };
  qi = (e) => {
    let t = e.target.closest(".curve-grippie");
    let i = e.target;
    let s = t[wd];
    let l = this.Zi(s).inverse();
    let o = null;
    let r = null;
    let n = new DOMPoint(e.clientX, e.clientY).matrixTransform(l);
    let [p] = Je(i, n);
    let u = Te(s, !0);
    let d = [...t.children].indexOf(i);
    let h = u[d];
    if ("L" === h.type) {
      let e = new DOMPoint(h.values[0], h.values[1]);
      o = { type: "L", values: [p["x"], p["y"]] };
      r = { type: "L", values: [e["x"], e["y"]] };
    } else {
      if ("C" === h.type) {
        let e,
          t = u[d - 1] || null;
        "M" === t.type || "L" === t.type
          ? (e = new DOMPoint(t.values[0], t.values[1]))
          : "C" === t.type && (e = new DOMPoint(t.values[4], t.values[5]));
        let i = new DOMPoint(h.values[4], h.values[5]);
        let s = new DOMPoint(h.values[0], h.values[1]);
        let l = new DOMPoint(h.values[2], h.values[3]);
        let n = pd(p, e, s, l, i);
        let a = ((e, t, i, s, l) => {
          let n = (t["x"] - e["x"]) * l + e["x"];
          let a = (t["y"] - e["y"]) * l + e["y"];
          let o = (i["x"] - t["x"]) * l + t["x"];
          let r = (i["y"] - t["y"]) * l + t["y"];
          let p = (s["x"] - i["x"]) * l + i["x"];
          let u = (s["y"] - i["y"]) * l + i["y"];
          let d = (o - n) * l + n;
          let h = (r - a) * l + a;
          let v = (p - o) * l + o;
          let c = (u - r) * l + r;
          let y = (v - d) * l + d;
          let m = (c - h) * l + h;
          return [
            [
              new DOMPoint(e["x"], e["y"]),
              new DOMPoint(n, a),
              new DOMPoint(d, h),
              new DOMPoint(y, m),
            ],
            [
              new DOMPoint(y, m),
              new DOMPoint(v, c),
              new DOMPoint(p, u),
              new DOMPoint(s["x"], s["y"]),
            ],
          ];
        })(e, s, l, i, n);
        if (-1 === n) return;
        o = {
          type: "C",
          values: [
            a[0][1]["x"],
            a[0][1]["y"],
            a[0][2]["x"],
            a[0][2]["y"],
            a[0][3]["x"],
            a[0][3]["y"],
          ],
        };
        r = {
          type: "C",
          values: [
            a[1][1]["x"],
            a[1][1]["y"],
            a[1][2]["x"],
            a[1][2]["y"],
            a[1][3]["x"],
            a[1][3]["y"],
          ],
        };
      }
    }
    this.#stage.undoManager.checkpoint("add-node", "#edit-tool");
    u = [...u.slice(0, d), o, r, ...u.slice(d + 1)];
    if ("line" === s.localName) {
      let t = Zi("svg:polyline");
      for (let e of s.attributes)
        !1 === ["x1", "y1", "x2", "y2"].includes(e.name) &&
          t.setAttribute(e.name, e.value);
      let e = u
        .map((e) => e.values)
        .flat()
        .map((e) => te(e, this.#stage.geometryPrecision));
      t.setAttribute("points", e.join(" "));
      s.replaceWith(t);
      Array.from(this.#stage.selectedElements.keys()).forEach((e) => {
        this.#stage.selectedElements.set(e === s ? t : e);
      });
      s = t;
    } else {
      if ("polyline" === s.localName || "polygon" === s.localName) {
        let e = u
          .map((e) => e.values)
          .flat()
          .map((e) => te(e, this.#stage.geometryPrecision));
        s.setAttribute("points", e.join(" "));
      } else Ae(s, u, this.#stage.geometryPrecision);
    }
    this.Mi = [{ spline: s, index: d }];
    this.Ri();
    this.splineHud.dispatchEvent(new CustomEvent("selectednodeschange"));
  };
  Li = () => {
    if (this.Ai || this.Ei || this.Ti) return;
    let r = document.createDocumentFragment();
    for (let t of this.Oi) {
      let e = this.es(t);
      let i = Te(t, !0);
      let s = Zi("svg:g");
      s[wd] = t;
      s.setAttribute("class", "curve-grippie");
      s.setAttribute("transform", e.toString());
      r.append(s);
      let l = 0;
      let n = 0;
      let a = 0;
      let o = 0;
      for (let t of i) {
        let e = Zi("svg:path");
        "M" === t["type"]
          ? (Ae(e, [t]), (l = t.values[0]), (n = t.values[1]), (a = l), (o = n))
          : "C" === t["type"]
            ? (Ae(e, [{ type: "M", values: [l, n] }, t]),
              (l = t.values[4]),
              (n = t.values[5]))
            : "L" === t["type"]
              ? (Ae(e, [{ type: "M", values: [l, n] }, t]),
                (l = t.values[0]),
                (n = t.values[1]))
              : "Z" === t["type"] &&
              (Ae(e, [
                { type: "M", values: [l, n] },
                { type: "L", values: [a, o] },
              ]),
                (l = a),
                (n = o)),
          s.append(e);
      }
    }
    this["#curve-grippies"].innerHTML = "";
    this["#curve-grippies"].append(r);
    this._i();
  };
  Ri = () => {
    const u = fd / this.#stage.scale;
    const d = 0.3 * u;
    const y = [];
    const m = [];
    const f = [];
    const g = (e, t, i, s, l, n, a = "normal") => {
      const o = Zi("svg:g");
      o.setAttribute("class", "primary-node-grippie");
      o.setAttribute("data-position", e);
      o.setAttribute("data-subpath-type", a);
      o[wd] = t;
      o[yd] = i;
      o[kd] = s;
      let r = s.matrixTransform(l);
      let p =
        '<circle class="outer-circle" cx="' +
        r.x +
        '" cy="' +
        r.y +
        '" r="' +
        u +
        '"></circle>';
      ("start" !== e && "end" !== e) ||
        (p +=
          '<circle class="inner-circle" cx="' +
          r.x +
          '" cy="' +
          r.y +
          '" r="' +
          d +
          '"></circle>');
      o.innerHTML = p;
      n && o.setAttribute("data-selected", "");
      return o;
    };
    const x = (e, t, i, s) => {
      let l = Zi("svg:circle");
      l.setAttribute("class", "secondary-node-grippie");
      l.setAttribute("data-index", i);
      l.setAttribute("cx", s.x);
      l.setAttribute("cy", s.y);
      l.setAttribute("r", bd / this.#stage.scale);
      l[wd] = e;
      l[yd] = t;
      return l;
    };
    const w = (e, t = !1) => {
      let i = Zi(t ? "svg:polygon" : "svg:polyline");
      i.setAttribute("class", "helper-line");
      i.setAttribute(
        "points",
        e
          .map((e) => [e.x, e.y])
          .flat()
          .join(" ")
      );
      return i;
    };
    for (let c of this.Oi) {
      let v = this.es(c);
      if ("line" === c.localName)
        for (let s of [0, 1]) {
          let e = this.Mi.find((e) => e.spline === c && e.index === s);
          let t = new DOMPoint(
            c["x" + (s + 1)].baseVal.value,
            c["y" + (s + 1)].baseVal.value
          );
          let i = g(0 === s ? "start" : "end", c, s, t, v, e);
          y.push(i);
        }
      else {
        if ("polyline" === c.localName)
          for (let l = 0; l < c.points.length; l += 1) {
            let e = this.Mi.find((e) => e.spline === c && e.index === l);
            let t = DOMPoint.fromPoint(c.points[l]);
            let i = "mid";
            0 === l ? (i = "start") : l === c.points.length - 1 && (i = "end");
            let s = g(i, c, l, t, v, e);
            y.push(s);
          }
        else {
          if ("polygon" === c.localName)
            for (let s = 0; s < c.points.length; s += 1) {
              let e = this.Mi.find((e) => e.spline === c && e.index === s);
              let t = DOMPoint.fromPoint(c.points[s]);
              let i = g("mid", c, s, t, v, e);
              y.push(i);
            }
          else {
            if ("path" === c.localName) {
              let e = Te(c);
              let h = -1;
              for (let d of $e(e))
                if ("R" === d[1]?.type) {
                  let a = "Z" === d[d.length - 1].type;
                  let o = -1;
                  for (let n of d) {
                    o += 1;
                    h += 1;
                    let e;
                    let t = this.Mi.find(
                      (e) => e.spline === c && e.index === h
                    );
                    let i = d[o + 1] || null;
                    let s = "mid";
                    if ("M" === n.type) {
                      if (!1 === a) {
                        e = new DOMPoint(n.values[0], n.values[1]);
                        s = "start";
                      } else {
                        if ("R" !== i.type) continue;
                        e = new DOMPoint(n.values[0], n.values[1]);
                      }
                    } else {
                      if ("R" !== n.type) continue;
                      e = new DOMPoint(n.values[0], n.values[1]);
                      !1 === a && null === i && (s = "end");
                    }
                    let l = g(s, c, h, e, v, t, "rom");
                    y.push(l);
                  }
                } else {
                  if ("U" === d[1]?.type) {
                    let a = "Z" === d[d.length - 1].type;
                    let i = [];
                    for (let t of d)
                      if ("Z" !== t.type) {
                        let e = new DOMPoint(...t.values).matrixTransform(v);
                        i.push(e);
                      }
                    let e = w(i, a);
                    f.push(e);
                    let o = -1;
                    for (let n of d) {
                      o += 1;
                      h += 1;
                      let e;
                      let t = this.Mi.find(
                        (e) => e.spline === c && e.index === h
                      );
                      let i = d[o + 1] || null;
                      let s = "mid";
                      if ("M" === n.type) {
                        if (!1 === a) {
                          e = new DOMPoint(n.values[0], n.values[1]);
                          s = "start";
                        } else {
                          if ("U" !== i.type) continue;
                          e = new DOMPoint(n.values[0], n.values[1]);
                        }
                      } else {
                        if ("U" !== n.type) continue;
                        e = new DOMPoint(n.values[0], n.values[1]);
                        !1 === a && null === i && (s = "end");
                      }
                      let l = g(s, c, h, e, v, t, "basis");
                      y.push(l);
                    }
                  } else {
                    if ("N" === d[1]?.type) {
                    } else {
                      let l = "Z" === d[d.length - 1].type;
                      let n = -1;
                      let p = d[1];
                      let u = e.indexOf(p);
                      for (let r of d) {
                        n += 1;
                        h += 1;
                        let e;
                        let t = this.Mi.find(
                          (e) => e.spline === c && e.index === h
                        );
                        let i = "mid";
                        let o = d[n + 1] || null;
                        if ("M" === r.type) {
                          if (!1 !== l) continue;
                          e = new DOMPoint(r.values[0], r.values[1]);
                          i = "start";
                        } else {
                          if ("L" === r.type) {
                            e = new DOMPoint(r.values[0], r.values[1]);
                            !1 === l && null === o && (i = "end");
                          } else {
                            if ("C" !== r.type) continue;
                            e = new DOMPoint(r.values[4], r.values[5]);
                            !1 === l && null === o && (i = "end");
                          }
                        }
                        let s = g(i, c, h, e, v, t);
                        y.push(s);
                        if (t) {
                          let l;
                          let s = null;
                          let n = null;
                          "M" === r.type || "L" === r.type
                            ? (l = new DOMPoint(r.values[0], r.values[1]))
                            : "C" === r.type &&
                            (l = new DOMPoint(r.values[4], r.values[5]));
                          "C" === r.type &&
                            (s = new DOMPoint(r.values[2], r.values[3]));
                          o &&
                            ("C" === o.type
                              ? (n = new DOMPoint(o.values[0], o.values[1]))
                              : "Z" === o.type &&
                              "C" === p.type &&
                              (n = new DOMPoint(p.values[0], p.values[1])));
                          let a = [];
                          if (s && !1 === qt(l, s)) {
                            let e = l.matrixTransform(v);
                            let t = s.matrixTransform(v);
                            let i = x(c, h, "2", t);
                            m.push(i);
                            a.push(t, e);
                          }
                          if (n && !1 === qt(l, n)) {
                            let e = l.matrixTransform(v);
                            let t = n.matrixTransform(v);
                            let i = "Z" === o.type ? u : h + 1;
                            let s = x(c, i, "1", t);
                            m.push(s);
                            a.push(e, t);
                          }
                          if (a.length > 1) {
                            let e = w(a);
                            f.push(e);
                          }
                        }
                      }
                    }
                  }
                }
            }
          }
        }
      }
    }
    const t = document.createDocumentFragment();
    const i = document.createDocumentFragment();
    const s = document.createDocumentFragment();
    for (let e of y) !1 === e.hasAttribute("data-selected") && t.append(e);
    for (let e of y) !0 === e.hasAttribute("data-selected") && t.append(e);
    for (let e of m) i.append(e);
    for (let e of f) s.append(e);
    this["#primary-node-grippies"].innerHTML = "";
    this["#primary-node-grippies"].append(t);
    this["#secondary-node-grippies"].innerHTML = "";
    this["#secondary-node-grippies"].append(i);
    this["#helper-lines"].innerHTML = "";
    this["#helper-lines"].append(s);
  };
  Bi = () => {
    let t = fd / this.#stage.scale;
    let i = 0.3 * t;
    for (let e of this["#primary-node-grippies"].children) {
      e.children[0].setAttribute("r", t.toString());
      e.children[1] && e.children[1].setAttribute("r", i.toString());
    }
    for (let e of this["#secondary-node-grippies"].children)
      e.setAttribute("r", (bd / this.#stage.scale).toString());
  };
  _i = () => {
    for (let s of this["#curve-grippies"].children) {
      let e = s[wd];
      let t = getComputedStyle(e);
      let i =
        parseFloat(t.getPropertyValue("stroke-width")) * this.#stage.scale;
      i < 10 && (i = 10);
      s.style.setProperty("stroke-width", i.toString());
    }
  };
  Di = () => {
    let l = [];
    for (let s of this.Oi)
      if ("polygon" === s.localName || "polyline" === s.localName) {
        for (let e = 0; e < s.points.length; e += 1)
          l.push({ spline: s, index: e });
      } else {
        if ("line" === s.localName) {
          l.push({ spline: s, index: 0 });
          l.push({ spline: s, index: 1 });
        } else {
          if ("path" === s.localName) {
            let i = Te(s, !0);
            for (let t = 0; t < i.length; t += 1) {
              let e = i[t];
              (["C", "L", "R", "U", "N"].includes(e.type) ||
                ("M" === e.type && !1 === We(e, i))) &&
                l.push({ spline: s, index: t });
            }
          }
        }
      }
    this.Mi = l;
    this.Ri();
    this.splineHud.dispatchEvent(new CustomEvent("selectednodeschange"));
  };
  deselectAllNodes = () => {
    this.Mi = [];
    this.Pi();
    this.splineHud.dispatchEvent(new CustomEvent("selectednodeschange"));
  };
  Gi = (e = "smooth") => {
    this.splineHud.dispatchEvent(new CustomEvent("selectednodeschange"));
  };
  Fi = () => {
    let i = [];
    let l = [];
    let s = (e) => {
      for (let t of e)
        if ("path" === t.localName) {
          if (t.hasAttribute("d") && !t.hasAttribute("data-fx-shape")) {
            t[vd] = null;
            i.push(t);
          }
        } else {
          if (
            "polyline" === t.localName ||
            "polygon" === t.localName ||
            "line" === t.localName
          ) {
            t[vd] = null;
            i.push(t);
          } else {
            if ("text" === t.localName) {
              let s = t;
              let e = [...t.children].find((e) => "textPath" === e.localName);
              if (e) {
                let i = e.getAttribute("href");
                if (i) {
                  let e = i.trim().substring(1);
                  let t = this.#stage.workspaces.querySelector(
                    "#" + CSS.escape(e)
                  );
                  if (
                    t?.hasAttribute("d") &&
                    !t.hasAttribute("data-fx-shape")
                  ) {
                    t[vd] = s;
                    l.push(t);
                  }
                }
              }
            } else["g", "a"].includes(t.localName) && s(t.children);
          }
        }
    };
    s(Array.from(this.#stage.selectedElements.keys()));
    i = i.filter((e) => !1 === l.includes(e));
    return [...i, ...l];
  };
  Zi = (t) => {
    let i = null;
    let s = t[vd];
    if (s) {
      let e = ct(t);
      i = t.closest("defs")
        ? ut(s).multiply(e)
        : ut(s.parentElement).multiply(e);
    } else i = ut(t);
    return i;
  };
  es = (i) => {
    let s = null;
    let l = i[vd];
    if (l) {
      let e;
      e = i.closest("defs")
        ? pt(l, this.splineHud)
        : pt(l.parentElement, this.splineHud);
      let t = ct(i);
      s = e.multiply(t);
    } else s = pt(i, this.splineHud);
    return s;
  };
}
export default SplineTool;
