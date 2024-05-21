import { ut, te, Zi, di, fs, ks } from "../utils/common";
class RulerManager {
  #v = `<div id="rulers-main"> <div id="horizontal-ruler" class="ruler" part="ruler horizontal-ruler" data-type="horizontal"></div> <div id="vertical-ruler" class="ruler" part="ruler vertical-ruler" data-type="vertical"></div> <div id="corner-ruler" class="ruler" part="ruler corner-ruler" data-type="corner"></div> </div>`;
  #stage;
  #K;
  #Q;
  #C;
  #J;
  #ee;
  #te;
  #ie;
  #se = "canvas";
  #ne = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000];
  #re;
  #de;
  #rulers;
  #horizontalRuler;
  #verticalRuler;
  set enabled(val) {
    val
      ? this.rulers.style.setProperty("display", "block")
      : this.rulers.style.setProperty("display", "none");
  }
  get enabled() {
    return this.rulers.style.display === "block";
  }
  get rulers() {
    return this.#rulers;
  }
  constructor(e) {
    this.#stage = e;
    this.#rulers = document.createElement("div");
    this.#rulers.id = "rulers";
    this.#stage.svg.after(this.#rulers);
    this.#rulers.append(fs`${this.#v}`);
    this.#horizontalRuler = this.#rulers.querySelector("#horizontal-ruler");
    this.#verticalRuler = this.#rulers.querySelector("#vertical-ruler");
    this.#re = ks(this.#Z, 20, this);
    this.#de = ks(this.#Z, 500, this);
  }
  getRulerTypeFromPoint = (e, t) => {
    let r = document.elementFromPoint(e, t);
    let i = r ? r.closest(".ruler") : null;
    return i ? i.getAttribute("data-type") : null;
  };
  enabledCallback = () => {
    console.warn('enable instead of');
    this.enable();
  }
  enable = () => {
    this.enabled = true;
    this.#re();
    window.addEventListener(
      "resize",
      (this.#J = () => {
        this.#re();
      })
    );
    this.#stage.board.addEventListener(
      "zoomchange",
      (this.#te = () => {
        this.#re();
      })
    );
    this.#stage.board.addEventListener(
      "workspacemutation",
      (this.#ie = () => {
        this.#de();
      })
    );
    this.#Z();
  };
  disabledCallback = () => {
    console.warn('disable instead of');
    this.disable();
  }
  disable = () => {
    this.enabled = false;
    window.removeEventListener("resize", this.#J);
    this.#stage.board.removeEventListener("zoomchange", this.#te);
    this.#stage.board.removeEventListener("workspacemutation", this.#ie);
  }
  #Z = () => {
    let t = this.#stage.board;
    let a = this.#stage.scale;
    let e = this.#se;
    let h = 0;
    let d = 0;
    let r = ut(this.#stage.canvas);
    if (0 !== r["a"] * r["d"] - r["b"] * r["c"]) {
      let e = di(t.getBoundingClientRect(), r.inverse());
      h = e["x"];
      d = e["y"];
    }
    if ("canvas" === e) {
      let r = 1;
      let i = 50 / a;
      if (a > 0 == !1) return;
      for (let t = 0; t < this.#ne.length; t += 1) {
        let e = this.#ne[t];
        r = e;
        if (i <= e) break;
      }
      let l = [];
      let s = this.#rulers.clientWidth;
      for (let t = te(h, 0); t < Infinity; t += 1)
        if (r >= 1 && t % r === 0) {
          let e = (t - h) * a;
          if (e > s) break;
          l.push([e, t]);
        }
      for (; this.#horizontalRuler.children.length < l.length;) {
        let e = Zi("div");
        e.part.add("tick");
        this.#horizontalRuler.append(e);
      }
      for (let i = 0; i < l.length; i += 1) {
        let [e, t] = l[i];
        let r = this.#horizontalRuler.children[i];
        r.style.display = "";
        r.style.transform = "translateX(" + e + "px)";
        r.textContent = t;
      }
      const u = this.#horizontalRuler.children;
      const c = u.length;
      for (let e = l.length; e < c; e += 1) {
        u[e].style.display = "none";
      }
      let o = [];
      let n = this.#rulers.clientHeight;
      for (let t = te(d, 0); t < Infinity; t += 1)
        if (t % r === 0) {
          let e = (t - d) * a;
          if (e > n) break;
          o.push([e, t]);
        }
      for (; this.#verticalRuler.children.length < o.length;) {
        let e = Zi("div");
        e.part.add("tick");
        this.#verticalRuler.append(e);
      }
      for (let i = 0; i < o.length; i += 1) {
        let [e, t] = o[i];
        let r = this.#verticalRuler.children[i];
        r.style.display = "";
        r.style.transform = "translateY(" + e + "px)";
        r.textContent = t;
      }
      const p = this.#verticalRuler.children;
      const v = p.length;
      for (let e = o.length; e < v; e += 1) {
        p[e].style.display = "none";
      }
    }
  };
}
export default RulerManager;
