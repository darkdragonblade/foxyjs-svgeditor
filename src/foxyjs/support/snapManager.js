import { ut, Kt, di, ii, vi, Yi, xi } from "../utils/common";
// import nt from "../utils/nt";
class SnapManager {
    #stage;
    #groups = [];
    constructor(stage) {
        this.#stage = stage;
    }
    snappers = () => {
        return [...this.#groups];
    };
    snapStart = (l = !0) => {
        let d = this.#stage.board;
        this.#groups = [];
        if (this.#stage.gridManager.enabled) {
            let t = ut(this.#stage.canvas);
            let e = this.#stage.workspaces?.querySelector("foxy-grid");
            let n = 0;
            let i = 0;
            let s = 100;
            let l = 100;
            if (e) {
                n = Number(e.getAttribute("x"));
                i = Number(e.getAttribute("y"));
                s = Number(e.getAttribute("width"));
                l = Number(e.getAttribute("height"));
            }
            let o = d.getBoundingClientRect();
            let a = di(new DOMRect(n, i, s, l), t);
            n = a["x"];
            i = a["y"];
            s = a["width"];
            l = a["height"];
            let p = o["x"];
            let r = o["x"] + o["width"];
            let u = o["y"];
            let g = o["y"] + o["height"];
            let h = [];
            let f = [];
            for (let t = n; t <= r; t += s) t >= p && h.push(t);
            for (let t = n - s; t >= p; t -= s) t <= r && h.push(t);
            for (let t = i; t <= g; t += l) t >= u && f.push(t);
            for (let t = i - l; t >= u; t -= l) t <= g && f.push(t);
            for (let t of h)
                this.#groups.push({
                    type: "grid",
                    orientation: "vertical",
                    snapping: !1,
                    x: t,
                    grid: e,
                });
            for (let t of f)
                this.#groups.push({
                    type: "grid",
                    orientation: "horizontal",
                    snapping: !1,
                    y: t,
                    grid: e,
                });
        }
        if (this.#stage.manualManager.enabled) {
            let l = ut(this.#stage.canvas);
            let t = this.#stage.workspaces.querySelectorAll("foxy-guide");
            for (let s of t) {
                let t = parseFloat(s.getAttribute("angle"));
                let e = parseFloat(s.getAttribute("x"));
                let n = parseFloat(s.getAttribute("y"));
                let i = new DOMPoint(e, n).matrixTransform(l);
                0 === t
                    ? this.#groups.push({
                        type: "manual",
                        orientation: "vertical",
                        snapping: !1,
                        x: i.x,
                        guide: s,
                    })
                    : 90 === t
                        ? this.#groups.push({
                            type: "manual",
                            orientation: "horizontal",
                            snapping: !1,
                            y: i.y,
                            guide: s,
                        })
                        : this.#groups.push({
                            type: "manual",
                            orientation: "angular",
                            snapping: !1,
                            x: i.x,
                            y: i.y,
                            guide: s,
                        });
            }
        }
        if (this.#stage.smartManager.enabled) {
            // let t = ut(this.#stage.canvas);
            let e = Array.from(this.#stage.selectedElements.keys());
            let n = [];
            if (e.length > 0) {
                for (let t of e[0].parentElement.children)
                    this.#stage.isSelectableElement(t) &&
                        ((!1 !== l && !1 !== e.includes(t)) || n.push(t));
            } else {
                for (let t of this.#stage.currentWorkspace.children)
                    this.#stage.isSelectableElement(t) && n.push(t);
            }
            let i = n.map((t) => Yi(t));
            let s = this.#stage.currentWorkspace.getBoundingClientRect();
            i = i.filter((t) => xi(s, t));
            const o = document.querySelector("#background-outlines");
            i.push(o.getBoundingClientRect());
            for (let t of i) {
                this.#groups.push({
                    type: "smart",
                    orientation: "vertical",
                    snapping: !1,
                    x: t.x,
                    snappingBBox: t,
                    snappedBBox: null,
                    side: "left",
                });
                this.#groups.push({
                    type: "smart",
                    orientation: "vertical",
                    snapping: !1,
                    x: t.x + t.width,
                    snappingBBox: t,
                    side: "right",
                });
                this.#groups.push({
                    type: "smart",
                    orientation: "horizontal",
                    snapping: !1,
                    y: t.y,
                    snappingBBox: t,
                    snappedBBox: null,
                    side: "top",
                });
                this.#groups.push({
                    type: "smart",
                    orientation: "horizontal",
                    snapping: !1,
                    y: t.y + t.height,
                    snappingBBox: t,
                    snappedBBox: null,
                    side: "bottom",
                });
            }
        }
        this.#stage.board.dispatchEvent(new CustomEvent("snapperschange"));
    };
    snapEnd = () => {
        if (this.#groups.length > 0) {
            this.#groups = [];
            this.#stage.board.dispatchEvent(new CustomEvent("snapperschange"));
        }
    };
    snapBBox = (e) => {
        let n = new DOMRect(e.x, e.y, e.width, e.height);
        if (this.#groups.length > 0) {
            let i = Infinity;
            let s = Infinity;
            let l = null;
            let o = null;
            let a = null;
            let p = null;
            let t = [
                new DOMPoint(e.x, e.y),
                new DOMPoint(e.x + e.width, e.y),
                new DOMPoint(e.x + e.width, e.y + e.height),
                new DOMPoint(e.x, e.y + e.height),
            ];
            for (let n of t)
                for (let e of this.#groups)
                    if ("vertical" === e.orientation) {
                        let t = Math.abs(n.x - e.x);
                        if (t < i) {
                            i = t;
                            l = e;
                            a = e.x - n.x;
                        }
                    } else {
                        if ("horizontal" === e.orientation) {
                            let t = Math.abs(n.y - e.y);
                            if (t < s) {
                                s = t;
                                o = e;
                                p = e.y - n.y;
                            }
                        }
                    }
            for (let t of this.#groups) {
                t.snapping = !1;
                t.snappedBBox = null;
                t.snappedPoint = null;
            }
            if (i < 10) {
                n.x += Number(a);
                l.snapping = !0;
                l.snappedBBox = n;
            }
            if (s < 10) {
                n.y += Number(p);
                o.snapping = !0;
                o.snappedBBox = n;
            }
            this.#stage.board.dispatchEvent(new CustomEvent("snapperschange"));
        }
        return n;
    };
    snapPoint = (p) => {
        let t = new DOMPoint(p.x, p.y);
        if (this.#groups.length > 0) {
            let n = Infinity;
            let i = Infinity;
            let s = null;
            let l = null;
            let o = null;
            let a = null;
            for (let e of this.#groups)
                if ("vertical" === e.orientation) {
                    let t = Math.abs(p.x - e.x);
                    if (t < n) {
                        n = t;
                        s = e;
                        o = e.x - p.x;
                    }
                } else {
                    if ("horizontal" === e.orientation) {
                        let t = Math.abs(p.y - e.y);
                        if (t < i) {
                            i = t;
                            l = e;
                            a = e.y - p.y;
                        }
                    }
                }
            for (let t of this.#groups) {
                t.snapping = !1;
                t.snappedBBox = null;
                t.snappedPoint = null;
            }
            if (n < 10) {
                t.x += Number(o);
                s.snapping = !0;
                s.snappedPoint = t;
            }
            if (i < 10) {
                t.y += Number(a);
                l.snapping = !0;
                l.snappedPoint = t;
            }
            this.#stage.board.dispatchEvent(new CustomEvent("snapperschange"));
        }
        return t;
    };
    snapPointToAngleMultiple = (a, t, e = 22.5) => {
        let [p] = ii(a, t, e);
        if (this.#groups.length > 0) {
            let s = null;
            let l = null;
            let o = Infinity;
            for (let i of this.#groups) {
                let t, e;
                if ("vertical" === i.orientation) {
                    t = new DOMPoint(i.x, 0);
                    e = new DOMPoint(i.x, 100);
                } else {
                    t = new DOMPoint(0, i.y);
                    e = new DOMPoint(100, i.y);
                }
                let n = vi(a, p, t, e);
                if (n) {
                    let t = Kt(p, n);
                    if (t < o) {
                        s = i;
                        l = n;
                        o = t;
                    }
                }
            }
            if (o < 5) {
                p = l;
                for (let t of this.#groups) {
                    t.snapping = t === s;
                    t.snappedBBox = null;
                    t.snappedPoint = t === s ? p : null;
                }
            } else {
                for (let t of this.#groups) {
                    t.snapping = !1;
                    t.snappedBBox = null;
                    t.snappedPoint = null;
                }
            }
            this.#stage.board.dispatchEvent(new CustomEvent("snapperschange"));
        }
        return p;
    };
    isGuideSnapping = (e) => {
        for (let t of this.#groups) if (t.guide === e) return t.snapping;
        return !1;
    };
    isGridSnapping = (t) => { };
}
export default SnapManager;
