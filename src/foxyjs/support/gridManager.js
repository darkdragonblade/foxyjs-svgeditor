import { ut, di, Kt, qt, fs, te, ks } from "../utils/common";
class GridManager {
  #stage;
  #hud = document.querySelector("#grid-hud");
  get hud() {
    return this.#hud;
  }
  #verticalLines;
  #horizontalLines;
  #cellRect;
  #originGrippie;
  #resizeGrippie;
  hi;
  di;
  T;
  ui;
  D;
  Dt;
  qe;
  ci;
  pi;
  #foxyGrid = void 0;
  get enabled() {
    return this.#hud.hasAttribute("enabled");
  }
  set enabled(val) {
    val
      ? this.#hud.setAttribute("enabled", "")
      : this.#hud.removeAttribute("enabled");
    val ? this.#hud.style.display = "block" : this.#hud.style.display = "none";
  }
  set selected(val) {
    val
      ? this.#hud.setAttribute("selected", "")
      : this.#hud.removeAttribute("selected");
    this.#hud.dispatchEvent(new CustomEvent("selectedchange"));
  }
  constructor(stage) {
    this.#stage = stage;
    this.#hud.tabIndex = -1;
    this.hi = ks(this.Lt, 500, this);
    this.di = ks(this.Lt, 1e3, this);
    this.ci = !1;
    this.pi = !1;
    this.#hud.innerHTML = `
        <g uid="main">
          <g uid="lines">
            <g uid="horizontal-lines" class="lines"></g>
            <g uid="vertical-lines" class="lines"></g>
          </g>
          <rect uid="cell-rect"></rect>

          <g uid="grippies">
            <circle uid="origin-grippie" class="grippie" r="10" cx="0" cy="0"></circle>
            <rect uid="resize-grippie" class="grippie" width="10" height="10" x="0" y="0"></rect>
          </g>
        </g>
      `;
    this.#verticalLines = this.#hud.querySelector('[uid="vertical-lines"]');
    this.#horizontalLines = this.#hud.querySelector('[uid="horizontal-lines"]');
    this.#cellRect = this.#hud.querySelector('[uid="cell-rect"]');
    this.#originGrippie = this.#hud.querySelector('[uid="origin-grippie"]');
    this.#resizeGrippie = this.#hud.querySelector('[uid="resize-grippie"]');
    this.#hud.addEventListener("pointerdown", (t) => this.L(t));
    this.#hud.addEventListener("focus", () => this.Lt());
    this.#hud.addEventListener("blur", () => this.Lt());
  }
  enabledCallback = () => {
    console.warn('enable instead of');
    this.enable();
  }
  enable = () => {
    this.enabled = true;
    this.#hud.tabIndex = 0;
    this.Lt();
    this.#stage.board.addEventListener(
      "workspacemutation",
      (this.T = (e) => {
        if (this.ci || this.pi) this.Lt();
        else {
          for (let t of e.detail) {
            "foxy-grid" === t.target.localName && this.hi();
          }
        }
      })
    );
    this.#stage.board.addEventListener(
      "artworkchange",
      (this.ui = () => {
        this.di();
      })
    );
    this.#stage.board.addEventListener(
      "zoomchange",
      (this.D = () => {
        this.hi();
        this.xi();
      })
    );
    this.#stage.workspaces.addEventListener(
      "pointerdown",
      (this.qe = () => {
        this.Xe();
      })
    );
    this.#stage.board.querySelector("#huds")?.addEventListener(
      "pointerdown",
      (this.Dt = (t) => {
        this.Ke(t);

      })
    );
  };
  disabledCallback = () => {
    console.warn('disable instead of');
    this.disable();
  }
  disable = () => {
    this.enabled = false;
    this.#hud.tabIndex = -1;
    this.#stage.board.removeEventListener("workspacemutation", this.T);
    this.#stage.board.removeEventListener("artworkchange", this.ui);
    this.#stage.board.removeEventListener("zoomchange", this.D);
    this.#stage.workspaces.removeEventListener("pointerdown", this.qe);
    this.#stage.board
      .querySelector("#huds")
      ?.removeEventListener("pointerdown", this.Dt);

  };
  Xe = () => {
    this.selected = false;
  };
  Ke = (event) => {
    const { target } = event;
    target !== this.#hud && !1 === this.#hud.contains(target) && (this.selected = false);
  };
  L = (e) => {
    let i;
    let s;
    let r = e.target;
    let t = new DOMPoint(e.clientX, e.clientY);
    let n = t;
    this.selected = true;
    this.#stage.selectedElements.clear();
    this.#stage.selectedTextRange = void 0;
    this.#stage.currentContainer = void 0;
    r.addEventListener(
      "pointermove",
      (i = (t) => {
        r.removeEventListener("pointermove", i);
        r.removeEventListener("pointerup", s);
        if (r === this.#originGrippie || r === this.#cellRect) {
          this.mi(e);
        } else {
          r === this.#resizeGrippie && this.gi(e);
        }
      })
    );
    r.addEventListener(
      "pointerup",
      (s = () => {
        r.removeEventListener("pointermove", i);
        r.removeEventListener("pointerup", s);
      })
    );
  };
  mi = (t) => {
    this.#stage.undoManager.checkpoint("move", "#transform-tool");
    let e;
    let i;
    let r = (this.#foxyGrid = this.#stage.maybeCreateGridForCurrentWorkspace());
    let n = ut(this.#stage.canvas).inverse();
    let o = new DOMPoint(t["clientX"], t["clientY"]).matrixTransform(n);
    let h = Number(r.getAttribute("x"));
    let l = Number(r.getAttribute("y"));
    this.ci = !0;
    window.addEventListener(
      "pointermove",
      (e = (t) => {
        let e = new DOMPoint(t["clientX"], t["clientY"]).matrixTransform(n);
        let i = h + (e["x"] - o["x"]);
        let s = l + (e["y"] - o["y"]);
        i = te(i, this.#stage.geometryPrecision);
        s = te(s, this.#stage.geometryPrecision);
        r.setAttribute("x", i.toString());
        r.setAttribute("y", s.toString());
      })
    );
    window.addEventListener(
      "pointerup",
      (i = () => {
        window.removeEventListener("pointermove", e);
        window.removeEventListener("pointerup", i);
        this.ci = !1;
      })
    );
  };
  gi = (t) => {
    this.#stage.undoManager.checkpoint("resize", "#transform-tool");
    let e;
    let i;
    let r = (this.#foxyGrid = this.#stage.maybeCreateGridForCurrentWorkspace());
    let n = ut(this.#stage.canvas).inverse();
    let o = new DOMPoint(t["clientX"], t["clientY"]).matrixTransform(n);
    let h = r ? Number(r.getAttribute("width")) : 100;
    let l = r ? Number(r.getAttribute("height")) : 100;
    const s = this.#stage.scale;
    let d = 8 / s;
    this.pi = !0;
    window.addEventListener(
      "pointermove",
      (e = (t) => {
        let e = new DOMPoint(t["clientX"], t["clientY"]).matrixTransform(n);
        let i = h + (e["x"] - o["x"]);
        let s = l + (e["y"] - o["y"]);
        i < d && (i = d);
        s < d && (s = d);
        t.shiftKey && (s = i);
        i = te(i, this.#stage.geometryPrecision);
        s = te(s, this.#stage.geometryPrecision);
        r.setAttribute("width", i.toString());
        r.setAttribute("height", s.toString());
      })
    );
    window.addEventListener(
      "pointerup",
      (i = () => {
        window.removeEventListener("pointermove", e);
        window.removeEventListener("pointerup", i);
        this.pi = !1;
      })
    );
  };
  Lt = () => {
    let t = this.#foxyGrid;
    let e = ut(this.#stage.canvas).inverse();
    let i = di(this.#stage.board.getBoundingClientRect(), e);
    let s = t ? Number(t.getAttribute("x")) : 0;
    let r = t ? Number(t.getAttribute("y")) : 0;
    let n = t ? Number(t.getAttribute("width")) : 100;
    let o = t ? Number(t.getAttribute("height")) : 100;
    let h = i["x"] - i.width / 2;
    let l = i["x"] + i.width + i.width / 2;
    let d = i["y"] - i.height / 2;
    let a = i["y"] + i.height + i.height / 2;
    let c = "";
    for (let t = s; t <= l; t += n)
      t >= h &&
        (c +=
          '<line class="line" x1="' +
          t +
          '" y1="-99999" x2="' +
          t +
          '" y2="99999"></line>');
    for (let t = s - n; t >= h; t -= n)
      t <= l &&
        (c +=
          '<line class="line" x1="' +
          t +
          '" y1="-99999" x2="' +
          t +
          '" y2="99999"></line>');
    this.#verticalLines.innerHTML = c;
    let u = "";
    for (let t = r; t <= a; t += o)
      t >= d &&
        (u +=
          '<line class="line" y1="' +
          t +
          '" x1="-99999" y2="' +
          t +
          '" x2="99999"></line>');
    for (let t = r - o; t >= d; t -= o)
      t <= a &&
        (u +=
          '<line class="line" y1="' +
          t +
          '" x1="-99999" y2="' +
          t +
          '" x2="99999"></line>');
    this.#horizontalLines.innerHTML = u;
    this.#cellRect.setAttribute("x", s.toString());
    this.#cellRect.setAttribute("y", r.toString());
    this.#cellRect.setAttribute("width", n.toString());
    this.#cellRect.setAttribute("height", o.toString());
    this.xi();
  };
  xi = () => {
    const t = this.#foxyGrid;
    const e = t ? Number(t.getAttribute("x")) : 0;
    const i = t ? Number(t.getAttribute("y")) : 0;
    const s = t ? Number(t.getAttribute("width")) : 100;
    const r = t ? Number(t.getAttribute("height")) : 100;
    const n = this.#stage.scale;
    this.#originGrippie.setAttribute("cx", e.toString());
    this.#originGrippie.setAttribute("cy", i.toString());
    this.#originGrippie.setAttribute("r", (4 / n).toString());
    this.#resizeGrippie.setAttribute("width", (8 / n).toString());
    this.#resizeGrippie.setAttribute("height", (8 / n).toString());
    this.#resizeGrippie.setAttribute("x", (e + s - 5 / n).toString());
    this.#resizeGrippie.setAttribute("y", (i + r - 5 / n).toString());
  };
  requestImmidiateUpdate = () => {
    this.Lt();
  };
}
export default GridManager;
