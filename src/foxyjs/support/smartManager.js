import { ut, fs, ks } from "../utils/common";
class SmartManager {
  #stage;
  #smartGuidesHud = document.querySelector("#smart-guides-hud");
  #reprs;
  Si;
  hi;
  get enabled() {
    return this.#smartGuidesHud.hasAttribute("enabled");
  }
  set enabled(val) {
    val
      ? this.#smartGuidesHud.setAttribute("enabled", "")
      : this.#smartGuidesHud.removeAttribute("enabled");
  }
  constructor(t) {
    this.#stage = t;
    this.hi = ks(this.Lt, 100, this);
    this.#smartGuidesHud.innerHTML = `<g uid="reprs"></g>`;
    this.#reprs = this.#smartGuidesHud.querySelector('[uid="reprs"]');
  }
  enabledCallback = () => {
    console.warn('enable instead of');
    this.enable();
  }
  enable = () => {
    this.enabled = true;
    this.#stage.board.addEventListener(
      "snapperschange",
      (this.Si = () => {
        this.hi();
      })
    );
  };
  disabledCallback = () => {
    console.warn('disable instead of');
    this.disable();
  }
  disable = () => {
    this.enabled = false;
    this.#stage.board.removeEventListener("snapperschange", this.Si);
  };
  Lt = () => {
    const t = this.#stage.snapManager
      .snappers()
      .filter((t) => "smart" === t.type && t.snapping);
    const n = ut(this.#stage.currentWorkspace).inverse();
    this.#reprs.innerHTML = "";
    for (let s of t) {
      let t;
      let e;
      if ("vertical" === s.orientation) {
        if (s.snappedBBox) {
          t = new DOMPoint(s.x, Math.min(s.snappingBBox.y, s.snappedBBox.y));
          e = new DOMPoint(
            s.x,
            Math.max(s.snappingBBox.bottom, s.snappedBBox.bottom)
          );
        } else {
          if (s.snappedPoint) {
            t = new DOMPoint(s.x, Math.min(s.snappingBBox.y, s.snappedPoint.y));
            e = new DOMPoint(
              s.x,
              Math.max(s.snappingBBox.bottom, s.snappedPoint.y)
            );
          }
        }
      }
      if ("horizontal" === s.orientation) {
        if (s.snappedBBox) {
          t = new DOMPoint(Math.min(s.snappingBBox.x, s.snappedBBox.x), s.y);
          e = new DOMPoint(
            Math.max(s.snappingBBox.right, s.snappedBBox.right),
            s.y
          );
        } else {
          if (s.snappedPoint) {
            t = new DOMPoint(Math.min(s.snappingBBox.x, s.snappedPoint.x), s.y);
            e = new DOMPoint(
              Math.max(s.snappingBBox.right, s.snappedPoint.x),
              s.y
            );
          }
        }
      }
      const { x: i, y: a } = t.matrixTransform(n);
      const { x: r, y: o } = e.matrixTransform(n);
      const p = fs`<line class="repr" x1="${i}" y1="${a}" x2="${r}" y2="${o}"></line>`;
      this.#reprs.append(p);
    }
  };
}
export default SmartManager;
