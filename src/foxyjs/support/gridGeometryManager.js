import { ks, ft, gt, di, te, hi } from "../utils/common";
class GridGeometryManager {
    #stage;
    #ie;
    #td;
    #kh;
    #id = !1;
    #sd = !1;
    #Ya = !1;
    #nd = !1;
    constructor(stage) {
        this.#stage = stage;
    }
    t = () => {
        this.#Z();
    };
    o = () => { };
    #od = () => {
        let t;
        let e;
        let i = this.#stage.maybeCreateGridForCurrentWorkspace();
    };
    #ad = () => {
        let t;
        let e;
        let i = this.#stage.maybeCreateGridForCurrentWorkspace();
    };
    #ld = () => {
        let t;
        let e;
        let i = this.#stage.maybeCreateGridForCurrentWorkspace();
    };
    #rd = () => {
        let t;
        let e;
        let i = this.#stage.maybeCreateGridForCurrentWorkspace();
    };
    #ed = () => { };
    get = () => {
        return this.#Z();
    };
    #Z = () => {
        if (
            !1 === this.#id &&
            !1 === this.#sd &&
            !1 === this.#Ya &&
            !1 === this.#nd
        ) {
            if (this.#stage.gridManager.enabled && this.#stage.gridManager.selected) {
                let e = this.#stage.currentWorkspace.querySelector(
                    ":scope > defs > foxy-grid"
                );
                let { displayUnit: t, displaySpace: i, displayPrecision: s } = this.zn;
                let r = t ? " " + t : "";
                let a = 1 / Math.pow(10, s - 1);
                let h = ft("px", t);
                let l = new DOMMatrix();
                "viewport" === i && (l = gt(this.#stage.currentWorkspace).multiply(l));
                let d = new DOMRect(0, 0, 100, 100);
                for (let t of ["x", "y", "width", "height"])
                    e?.hasAttribute(t) &&
                        (d[t] = window.CSSUnitValue.parse(e.getAttribute(t)).value);
                d = di(d, l);
                d = di(d, h);
                d = hi(d, s);
                this["#x-input"].value = d["x"];
                this["#x-input"]["suffix"] = r;
                this["#x-input"]["step"] = a;
                this["#y-input"].value = d["y"];
                this["#y-input"]["suffix"] = r;
                this["#y-input"]["step"] = a;
                this["#width-input"].value = d["width"];
                this["#width-input"]["suffix"] = r;
                this["#width-input"]["step"] = a;
                this["#height-input"].value = d["height"];
                this["#height-input"]["suffix"] = r;
                this["#height-input"]["step"] = a;
            }
        }
    };
}
export default GridGeometryManager;
