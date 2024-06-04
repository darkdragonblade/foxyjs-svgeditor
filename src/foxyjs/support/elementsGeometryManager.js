import {
    ct,
    pt,
    Ct,
    Ot,
    Kt,
    kt,
    ut,
    ci,
    di,
    Wi,
    gt,
    ft,
    bt,
    te,
    Et,
    wt,
    ai,
} from "../utils/common";
class ElementsGeometryManager {
    #stage;
    #ec = false;
    #tc = false;
    constructor(stage) {
        this.#stage = stage;
    }
    coordsX = (coordsX, elements) => {
        const selectedObjectElements = elements || Array.from(this.#stage.selectedObjectElements.keys());
        let n = [];
        let f = "canvas";
        let m = "";
        let symbol = Symbol();
        for (let a of selectedObjectElements) {
            let t = pt(a, this.#stage.canvas);
            "viewport" === f && (t = gt(this.#stage.currentWorkspace).multiply(t));
            let e = t.inverse();
            let l = ct(a);
            let r = ft(m, "px");
            let s = Wi(a);
            a[symbol] = {
                userToDisplayTransform: t,
                displayToUserTransform: e,
                userTransform: l,
                unitTransform: r,
            };
            n.push(di(s, t));
        }
        let c = ci(n).x;
        this.#stage.undoManager.checkpoint("coords.x", "#geometry-panel");
        for (let o of selectedObjectElements) {
            let {
                userToDisplayTransform: t,
                displayToUserTransform: e,
                userTransform: l,
                unitTransform: r,
            } = o[symbol];
            let s = coordsX * r.a;
            let a = DOMMatrix.fromMatrix(l);
            a.multiplySelf(e);
            a.translateSelf(s - c, 0);
            a.multiplySelf(t);
            o.setAttribute("transform", a.toString());
        }
    };
    coordsY = (coordsY, elements) => {
        const selectedObjectElements = elements || Array.from(this.#stage.selectedObjectElements.keys());
        let n = [];
        let f = "canvas";
        let m = "";
        let symbol = Symbol();
        for (let a of selectedObjectElements) {
            let t = pt(a, this.#stage.canvas);
            "viewport" === f && (t = gt(this.#stage.currentWorkspace).multiply(t));
            let e = t.inverse();
            let l = ct(a);
            let r = ft(m, "px");
            let s = Wi(a);
            a[symbol] = {
                userToDisplayTransform: t,
                displayToUserTransform: e,
                userTransform: l,
                unitTransform: r,
            };
            n.push(di(s, t));
        }
        let c = ci(n).y;
        this.#stage.undoManager.checkpoint("coords.y", "#geometry-panel");
        for (let o of selectedObjectElements) {
            let {
                userToDisplayTransform: t,
                displayToUserTransform: e,
                userTransform: l,
                unitTransform: r,
            } = o[symbol];
            let s = coordsY * r.d;
            let a = DOMMatrix.fromMatrix(l);
            a.multiplySelf(e);
            a.translateSelf(0, s - c);
            a.multiplySelf(t);
            o.setAttribute("transform", a.toString());
        }
    };
    width = (y, elements, u = false) => {
        let h = elements || Array.from(this.#stage.selectedObjectElements.keys());
        let d = "canvas";
        let t = "";
        let g = ft(t, "px");
        this.#stage.undoManager.checkpoint("width", "#geometry-panel");
        if (1 === h.length) {
            let t = h[0];
            let e = Wi(t);
            let l = ct(t);
            let r = pt(t, this.#stage.canvas);
            "viewport" === d && (r = gt(this.#stage.currentWorkspace).multiply(r));
            let s = Kt(
                new DOMPoint(e.x, e.y).matrixTransform(r),
                new DOMPoint(e.x + e.width, e.y).matrixTransform(r)
            );
            let a = (y * g.a) / s;
            let o = 1;
            u && (o = a);
            let i = -e.x * (a - 1);
            let n = -e.y * (o - 1);
            let f = DOMMatrix.fromMatrix(l);
            f.translateSelf(i, n);
            f.scaleSelf(a, o);
            t.setAttribute("transform", f.toString());
        } else {
            let a = [];
            let f = Symbol();
            for (let s of h) {
                let t = ct(s);
                let e = pt(s, this.#stage.canvas);
                "viewport" === d && (e = gt(this.#stage.currentWorkspace).multiply(e));
                let l = e.inverse();
                let r = di(Wi(s), e);
                s[f] = {
                    userTransform: t,
                    userToDisplayTransform: e,
                    displayToUserTransform: l,
                };
                a.push(r);
            }
            let m = ci(a);
            let p = m.width;
            let c = y * g.a;
            for (let n of h) {
                let {
                    userTransform: t,
                    userToDisplayTransform: e,
                    displayToUserTransform: l,
                } = n[f];
                let r = c / p;
                let s = 1;
                u && (r = s);
                let a = -m.x * (r - 1);
                let o = -m.y * (s - 1);
                let i = DOMMatrix.fromMatrix(t);
                i.multiplySelf(l);
                i.translateSelf(a, o);
                i.scaleSelf(r, s);
                i.multiplySelf(e);
                n.setAttribute("transform", i.toString());
            }
        }
    };
    height = (y, elements, u = false) => {
        let h = elements || Array.from(this.#stage.selectedObjectElements.keys());
        let d = "canvas";
        let t = "";
        let g = ft(t, "px");
        this.#stage.undoManager.checkpoint("height", "#geometry-panel");
        if (1 === h.length) {
            let t = h[0];
            let e = Wi(t);
            let l = ct(t);
            let r = pt(t, this.#stage.canvas);
            "viewport" === d && (r = gt(this.#stage.currentWorkspace).multiply(r));
            let s = Kt(
                new DOMPoint(e.x, e.y).matrixTransform(r),
                new DOMPoint(e.x, e.y + e.height).matrixTransform(r)
            );
            let a = 1;
            let o = (y * g.d) / s;
            u && (a = o);
            let i = -e.x * (a - 1);
            let n = -e.y * (o - 1);
            let f = DOMMatrix.fromMatrix(l);
            f.translateSelf(i, n);
            f.scaleSelf(a, o);
            t.setAttribute("transform", f.toString());
        } else {
            let a = [];
            let f = Symbol();
            for (let s of h) {
                let t = ct(s);
                let e = pt(s, this.#stage.canvas);
                "viewport" === d && (e = gt(this.#stage.currentWorkspace).multiply(e));
                let l = e.inverse();
                let r = di(Wi(s), e);
                s[f] = {
                    userTransform: t,
                    userToDisplayTransform: e,
                    displayToUserTransform: l,
                };
                a.push(r);
            }
            let m = ci(a);
            let p = m.height;
            let c = y * g.d;
            for (let n of h) {
                let {
                    userTransform: t,
                    userToDisplayTransform: e,
                    displayToUserTransform: l,
                } = n[f];
                let r = 1;
                let s = c / p;
                u && (r = s);
                let a = -m.x * (r - 1);
                let o = -m.y * (s - 1);
                let i = DOMMatrix.fromMatrix(t);
                i.multiplySelf(l);
                i.translateSelf(a, o);
                i.scaleSelf(r, s);
                i.multiplySelf(e);
                n.setAttribute("transform", i.toString());
            }
        }
    };
    rotate = (t) => {
        let e = this.#stage;
        let l = Array.from(e.selectedObjectElements.keys());
        let r = l.length > 1 ? 0 : te(Ct(l[0]), 2);
        let a = kt(l),
            s = !1,
            o = Symbol();
        for (let r of l) {
            let t = ct(r);
            let e = ut(r);
            let l = e.inverse();
            r[o] = {
                clientToUserTransform: e,
                userToClientTransform: l,
                userTransform: t,
            };
        }
        this.#stage.transformTool.enabled &&
            (this.#stage.transformTool.mode = "rotate-and-skew");
        if (!1 === s) {
            s = !0;
            e.undoManager.checkpoint("rotation", "#geometry-panel");
        }
        let i = this.#stage.shiftKey ? ai(t, 15) : t - r;
        for (let s of l) {
            let {
                clientToUserTransform: t,
                userToClientTransform: e,
                userTransform: l,
            } = s[o];
            let r = DOMMatrix.fromMatrix(l);
            r.multiplySelf(e);
            r.translateSelf(a.x, a.y);
            r.rotateSelf(i);
            r.translateSelf(-a.x, -a.y);
            r.multiplySelf(t);
            s.setAttribute("transform", r.toString());
        }
        if (s) {
        }
    };
    get = (svgNode) => {
        let x = 0;
        let y = 0;
        let width = 0;
        let height = 0;
        let rotation = 0;
        const selectedObjectElements = Array.from(this.#stage.selectedObjectElements.keys());
        if (1 === selectedObjectElements.length || svgNode) {
            let t = "canvas";
            let e = "";
            let l = 1;
            let r = svgNode || selectedObjectElements[0];
            let s = Wi(r);
            let a = e ? " " + e : "";
            let o = 1 / Math.pow(10, l - 1);
            let i = pt(r, this.#stage.canvas);
            let n = ft("px", e);
            "viewport" === t && (i = gt(this.#stage.currentWorkspace).multiply(i));
            let f = [
                new DOMPoint(s["x"], s["y"]),
                new DOMPoint(s["x"] + s["width"], s["y"]),
                new DOMPoint(s["x"] + s["width"], s["y"] + s["height"]),
                new DOMPoint(s["x"], s["y"] + s["height"]),
            ];
            f = f.map((t) => t.matrixTransform(i));
            f = f.map((t) => t.matrixTransform(n));
            let m = bt(r);
            let p = Ot(m, s).matrixTransform(i);
            p = p.matrixTransform(n);
            let minX = Math.min(...f.map((t) => t["x"]));
            let minY = Math.min(...f.map((t) => t["y"]));
            let u = Kt(f[0], f[1]);
            let T = Kt(f[1], f[2]);
            let h = p["x"];
            let d = p["y"];
            let g = Ct(r);
            x = te(minX, l);
            y = te(minY, l);
            width = te(u, l);
            height = te(T, l);
            if (!this.#ec) {
            }
            if (!this.#tc) {
            }
            rotation = te(g, 1);
        } else if (selectedObjectElements.length > 1) {
            let t = "canvas";
            let e = "";
            let l = 1;
            let r = e ? " " + e : "";
            let s = 1 / Math.pow(10, l - 1);
            let a = ft("px", e);
            let o = new DOMMatrix();
            "viewport" === t && (o = gt(this.#stage.currentWorkspace));
            let i = selectedObjectElements.map((t) => {
                let e = pt(t, this.#stage.canvas);
                e = o.multiply(e);
                let l = Wi(t);
                l = di(l, e);
                l = di(l, a);
                return l;
            });
            let n = ut(this.#stage.canvas).inverse();
            let f = o.multiply(n);
            let m = ci(i);
            let p = kt(selectedObjectElements, false).matrixTransform(f);
            p = p.matrixTransform(a);
            let minX = m.x;
            let minY = m.y;
            let u = m.width;
            let T = m.height;
            let h = p.x;
            let d = p.y;
            x = te(minX, l);
            y = te(minY, l);
            width = te(u, l);
            height = te(T, l);
            if (!this.#ec) {
            }
            if (!this.#tc) {
            }
            rotation = 0;
        }
        return {
            x,
            y,
            width,
            height,
            rotation,
            isSelected: selectedObjectElements.length > 0,
        };
    }
}
export default ElementsGeometryManager;
