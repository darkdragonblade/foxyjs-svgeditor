import ee from "../utils/ee";
import {
  ut,
  ct,
  qt,
  di,
  pt,
  te,
  Wi,
  xi,
  hi,
  Xt,
  Md,
  Kt,
  b,
  ks,
} from "../utils/common";
import nt from "../utils/nt";
const { abs: Dd } = Math;
const zd = Symbol();
const Od = Symbol();
const Ed = Symbol();
const Td = Symbol();
class ViewTool {
  #stage;
  #hud = document.querySelector("#view-hud");
  Tt;
  v;
  k;
  ts;
  ss;
  ns;
  os;
  ls;
  rs;
  C;
  D;
  T;
  get enabled() {
    return true;
  }
  set enabeld(t) { }

  set transparency(val) {
    val ? this.#stage.canvas.setAttribute("transparent", "") : this.#stage.canvas.removeAttribute("transparent");
  }

  get transparency() {
    return this.#stage.canvas.hasAttribute("transparent")
  }

  constructor(t) {
    this.#stage = t;
    this.ts = !1;
    this.Tt = ks(this.Lt, 200, this);
    this.#hud.innerHTML = `<style>
    #view-hud .grippie[data-position="center"] {
      fill: rgba(0, 0, 0, 0);
      shape-rendering: crispEdges;
    }
    #view-hud .grippie[data-position="center"] {
      cursor: -webkit-grab;
    }
    #view-hud .grippie[data-position="center"]:active {
      cursor: -webkit-grabbing;
    }

    #view-hud .grippie[data-position="left"],
    #view-hud .grippie[data-position="right"],
    #view-hud .grippie[data-position="top"],
    #view-hud .grippie[data-position="bottom"] {
      stroke: red;
      vector-effect: non-scaling-stroke;
      stroke-width: 8;
      opacity: 0;
    }

    #view-hud .grippie[data-position="top-left"] rect,
    #view-hud .grippie[data-position="top-right"] rect,
    #view-hud .grippie[data-position="bottom-left"] rect,
    #view-hud .grippie[data-position="bottom-right"] rect {
      fill: transparent;
    }

    #view-hud .grippie[data-position="top-left"] path,
    #view-hud .grippie[data-position="top-right"] path,
    #view-hud .grippie[data-position="bottom-left"] path,
    #view-hud .grippie[data-position="bottom-right"] path {
      fill: white;
      stroke: rgb(88, 88, 88);
      stroke-width: 1;
      vector-effect: non-scaling-stroke;
    }
    #view-hud .subhud[data-selected] .grippie[data-position="top-left"] path,
    #view-hud .subhud[data-selected] .grippie[data-position="top-right"] path,
    #view-hud .subhud[data-selected] .grippie[data-position="bottom-left"] path,
    #view-hud .subhud[data-selected] .grippie[data-position="bottom-right"] path {
      fill: rgb(176, 214, 255);
      stroke: rgb(2, 81, 165);
    }

    #view-hud .grippie[data-position="left"],
    #view-hud .grippie[data-position="right"] {
      cursor: ew-resize;
    }
    #view-hud .grippie[data-position="top"],
    #view-hud .grippie[data-position="bottom"] {
      cursor: ns-resize;
    }
    #view-hud .grippie[data-position="top-left"] {
      cursor: nwse-resize;
    }
    #view-hud .grippie[data-position="top-right"] {
      cursor: nesw-resize;
    }
    #view-hud .grippie[data-position="bottom-left"] {
      cursor: nesw-resize;
    }
    #view-hud .grippie[data-position="bottom-right"] {
      cursor: nwse-resize;
    }

    #view-hud .grippie[data-position="ref"] {
      display: none;
      cursor: default;
    }
    #view-hud .subhud[data-selected] .grippie[data-position="ref"] {
      display: initial;
    }
    #view-hud .grippie[data-position="ref"] path {
      fill: white;
      stroke: rgb(88, 88, 88);
      stroke-width: 1;
      vector-effect: non-scaling-stroke;
    }
    #view-hud .subhud[data-selected] .grippie[data-position="ref"] path {
      fill: rgb(176, 214, 255);
      stroke: rgb(2, 81, 165);
    }
    #view-hud .grippie[data-position="ref"] rect {
      fill: transparent;
    }

    #view-hud .label {
      pointer-events: none;
      font-weight: 700;
      fill: #636363;
    }
  </style>

  <defs>
    <g uid="subhud-template" class="subhud">
      <rect class="grippie" data-position="center"></rect>

      <line class="grippie" data-position="left"></line>
      <line class="grippie" data-position="right"></line>
      <line class="grippie" data-position="top"></line>
      <line class="grippie" data-position="bottom"></line>

      <g class="grippie" data-position="top-left">
        <rect width="30" height="30"></rect>
        <path d="M 15 15 h 15 v -5 h -20 v 20 h 5 z"/>
      </g>

      <g class="grippie" data-position="top-right">
        <rect width="30" height="30"></rect>
        <path d="M 0 15 h 15 v 15 h 5 v -20 h -20 z"/>
      </g>

      <g class="grippie" data-position="bottom-left">
        <rect width="30" height="30"></rect>
        <path d="M 15 15 h 15 v 5 h -20 v -20 h 5 z"/>
      </g>

      <g class="grippie" data-position="bottom-right">
        <rect width="30" height="30"></rect>
        <path d="M 15 15 v -15 h 5 v 20 h -20 v -5 z"/>
      </g>

      <g class="grippie" data-position="ref">
        <rect width="24" height="24"></rect>
        <path d="M 24 10 L 24 14 L 14 14 L 14 24 L 10 24 L 10 14 L 0 14 L 0 10 L 10 10 L 10 0 L 14 0 L 14 10 Z"/>
      </g>

      <text class="label">Default view</text>
    </g>
  </defs>

  <g uid="subhuds"></g>`;
    this.#hud.addEventListener("pointerdown", (t) => {
      this.L(t);
    });
    this.#hud.addEventListener("dblclick", (t) => {
      this.He(t);
    });
  }
  enable = () => {
    this.ts = !1;
    this.ss = !1;
    this.ns = !1;
    this.os = !1;
    this.ls = !1;
    this.#stage.board.addEventListener(
      "selectedelementschange",
      (this.C = () => {
        this.ds();
      })
    );
    this.#stage.board.addEventListener(
      "zoomchange",
      (this.D = () => {
        this.O();
      })
    );
    this.#stage.board.addEventListener(
      "workspacemutation",
      (this.T = () => {
        this.A();
      })
    );
    this.I();
    this.ds();
  };
  disable = () => {
    this.#stage.board.removeEventListener("selectedelementschange", this.C);
    this.#stage.board.removeEventListener("zoomchange", this.D);
    this.#stage.board.removeEventListener("workspacemutation", this.T);
  };
  moveCallback = (t, e) => { };
  hs = (t) => {
    let { key: e, value: i } = t.detail;
    if ("bx-viewsettings:showIds" === e) {
      this.ts = this.V.getConfig("bx-viewsettings:showIds", !1);
      this.I();
    } else {
      "bx-viewsettings:moveObjects" === e &&
        (this.ss = this.v.getConfig("bx-viewsettings:moveObjects", !1));
    }
  };
  A = () => {
    this.ns || this.os || this.ls ? this.cs() : this.I();
  };
  O = () => {
    this.cs();
  };
  L = (t) => {
    t.buttons <= 1 && t.target.closest(".grippie") && this.U(t);
  };
  U = (r) => {
    let a;
    let t;
    let e = this.k;
    let p = r.target.closest(".grippie");
    let i = p.closest(".subhud")[zd];
    let n = new DOMPoint(r.clientX, r.clientY);
    let d = n;
    e.selectedElements = "view" === i.localName ? [i] : [];
    window.addEventListener(
      "pointermove",
      (a = (s) => {
        let t = new DOMPoint(s.clientX, s.clientY);
        let e = s.timeStamp - r.timeStamp;
        let i = Kt(n, t) > 3 || e > 80;
        let o = !1 === qt(d, t, null);
        d = t;
        if (!0 === i && !0 === o) {
          window.removeEventListener("pointermove", a);
          let t = new ee(s.clientX - r.clientX, s.clientY - r.clientY);
          let e = Dd(t.x) > Dd(t.y) ? "horizontal" : "vertical";
          let i = p.getAttribute("data-position");
          "center" === i
            ? this.ps(r, p, e)
            : "ref" === i
              ? this.us(r, p, e)
              : this.xs(r, p, e);
        }
      })
    );
    window.addEventListener(
      "pointerup",
      (t = () => {
        window.removeEventListener("pointermove", a);
        window.removeEventListener("pointerup", t);
      })
    );
  };
  He = (t) => {
    t.target.closest('.grippie[data-position="ref"]') && this.gs();
  };
  ps = (t, e, i) => { };
  xs = (t, e, i) => { };
  us = (t, e, i) => { };
  gs = () => {
    let t = this.#stage.board;
    let a = this.#stage.currentWorkspace;
    let { geometryPrecision: p } = t;
    this.#stage.undoManager.checkpoint("reset", "#view-tool");
    if (a.hasAttribute("viewBox")) {
      let {
        x: t,
        y: e,
        width: i,
        height: s,
      } = nt.fromString(a.getAttribute("viewBox"));
      let o = te(t + i / 2, p);
      let r = te(e + s / 2, p);
      a.setAttribute("refX", o.toString());
      a.setAttribute("refY", r.toString());
    } else {
      a.removeAttribute("refX");
      a.removeAttribute("refY");
    }
  };
  I = () => {
    const { currentWorkspace } = this.#stage;
    this.ds();
    this.cs();
  };
  ds = () => { };
  cs = (t = null) => { };
}
export default ViewTool;
