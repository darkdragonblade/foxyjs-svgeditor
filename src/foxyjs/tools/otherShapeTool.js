import { ut, ct, Zi, ni, ai, Kt, pt, ja, to, fo, ie } from "../utils/common";
import ee from "../utils/ee";
import Ba from "../utils/Ba";
class OtherShapeTool {
    #stage;
    #pointerdownEvent;
    #zt = false;
    #types = [
        "frame",
        "ring",
        "pie",
        "crescent",
        "triangle",
        "n-gon",
        "star",
        "cog",
        "arrow",
        "cross",
        "spiral",
    ];
    #type = "triangle";
    constructor(stage) {
        this.#stage = stage;
    }
    useType = (type = "triangle") => {
        if (!this.#types.includes(type)) throw new Error("The type is not supported");
        this.#type = type;
    };
    enable = () => {
        let board = this.#stage.board;
        board.style.cursor = "crosshair";
        board.addEventListener(
            "pointerdown",
            (this.#pointerdownEvent = (t) => {
                this.#pointerdown(t);
            })
        );
    }
    disable = () => {
        this.#stage.board.removeEventListener("pointerdown", this.#pointerdownEvent);
    }
    #pointerdown = (sEvent) => {
        if (sEvent.buttons > 1 || !0 === this.#zt) return;
        let pointermoveEvent;
        let pointerupEvent;
        const board = this.#stage.board;
        const sPoint = new DOMPoint(sEvent.clientX, sEvent.clientY);
        board.addEventListener(
            "pointermove",
            (pointermoveEvent = (mEvent) => {
                const mPoint = new DOMPoint(mEvent.clientX, mEvent.clientY);
                if (Kt(sPoint, mPoint) < 3) return;
                board.removeEventListener("pointermove", pointermoveEvent);
                board.removeEventListener("pointerup", pointerupEvent);
                switch (this.#type) {
                    case "frame":
                        this.#frame(sEvent);
                        break;
                    case "ring":
                        this.#ring(sEvent);
                        break;
                    case "pie":
                        this.#pie(sEvent);
                        break;
                    case "crescent":
                        this.#crescent(sEvent);
                        break;
                    case "triangle":
                        this.#triangle(sEvent);
                        break;
                    case "n-gon":
                        this.#nGon(sEvent);
                        break;
                    case "star":
                        this.#star(sEvent);
                        break;
                    case "cog":
                        this.#cog(sEvent);
                        break;
                    case "arrow":
                        this.#arrow(sEvent);
                        break;
                    case "cross":
                        this.#cross(sEvent);
                        break;
                    case "spiral":
                        this.#spiral(sEvent);
                        break;
                }
            })
        );
        board.addEventListener(
            "pointerup",
            (pointerupEvent = () => {
                board.removeEventListener("pointermove", pointermoveEvent);
                board.removeEventListener("pointerup", pointerupEvent);
            })
        );
    }
    #frame = (t) => {
        let e;
        let n = this.#stage.board;
        let l = this.#stage.currentContainer || this.#stage.currentWorkspace;
        let { geometryPrecision: r, transformPrecision: a } = n;
        let i = "planar";
        const style = {
            fill: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-fill'),
            stroke: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke'),
            "stroke-width": getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke-width'),
        }
        this.#stage.undoManager.checkpoint("frame", "#other-shape-tool.frame");
        this.#stage.snapManager.snapStart(!1);
        let g = new DOMPoint(t["clientX"], t["clientY"]);
        let h = 1;
        let f = 1;
        let m = "planar" === i ? g["x"] : g["x"] - f / 2;
        let y = "planar" === i ? g["y"] : g["y"] - h / 2;
        let o = 10;
        let p = 0;
        let v = Zi("svg:path");
        to(v, { type: "frame", values: [m, y, f, h, o, o, p, p, p, p] }, r);
        l["append"](v);
        ja(v, style);
        this.#stage.selectedElements.clear();
        this.#stage.selectedElements.set(v);
        let c = ut(v)["inverse"]();
        let u = ct(v)["multiply"](c);
        v["setAttribute"]("transform", u["toString"]());
        this.#stage.ctrlKey &&
            ("polar" === i ? (i = "planar") : "planar" === i && (i = "polar"));
        window.addEventListener(
            "pointermove",
            (e = (t) => {
                let c = new DOMPoint(t["clientX"], t["clientY"]);
                c = this.#stage.snapManager.snapPoint(c);
                if ("planar" === i) {
                    let t = c["x"] - g["x"] || 1;
                    let e = c["y"] - g["y"] || 1;
                    if (((f = Math.abs(t)), (h = Math.abs(e)), this.#stage.shiftKey)) {
                        let t = Math.min(f, h);
                        f = t;
                        h = t;
                    }
                    m = t < 0 ? g["x"] - f : g["x"];
                    y = e < 0 ? g["y"] - h : g["y"];
                } else {
                    if ("polar" === i) {
                        let t = new DOMPoint(g["x"], g["y"]);
                        let e = new DOMPoint(c["x"], c["y"]);
                        let n = Kt(t, e);
                        let l = new DOMPoint(t["x"], t["y"] - n);
                        let r = l["matrixTransform"](
                            new DOMMatrix()
                            ["translate"](t["x"], t["y"])
                            ["rotate"](-45)
                            ["translate"](-t["x"], -t["y"])
                        );
                        let a = l["matrixTransform"](
                            new DOMMatrix()
                            ["translate"](t["x"], t["y"])
                            ["rotate"](45)
                            ["translate"](-t["x"], -t["y"])
                        );
                        let i = l["matrixTransform"](
                            new DOMMatrix()
                            ["translate"](t["x"], t["y"])
                            ["rotate"](135)
                            ["translate"](-t["x"], -t["y"])
                        );
                        let s = Kt(r, a);
                        m = g["x"] - s / 2;
                        y = g["y"] - s / 2;
                        f = s;
                        h = s;
                        let o = ni(t, i, e);
                        this.#stage.shiftKey && (o = ai(o, 45));
                        let p = new DOMMatrix();
                        p["translateSelf"](t["x"], t["y"]);
                        p["rotateSelf"](o);
                        p["translateSelf"](-t["x"], -t["y"]);
                        v["setAttribute"]("transform", u["multiply"](p)["toString"]());
                    }
                }
                to(v, { type: "frame", values: [m, y, f, h, o, o, p, p, p, p] }, r);
            })
        );
        const pointerup = () => {
            window.removeEventListener("pointermove", e);
            window.removeEventListener("pointerup", pointerup);
            this.#stage.snapManager.snapEnd();
        };
        window.addEventListener("pointerup", pointerup);
    }
    #ring = (s) => {
        let t;
        let e = this.#stage.board;
        let n = this.#stage.currentContainer || this.#stage.currentWorkspace;
        let l = "planar";
        const r = {
            fill: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-fill'),
            stroke: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke'),
            "stroke-width": getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke-width'),
        }
        let o = 0.6;
        const { geometryPrecision: a, transformPrecision: i } = e;
        this.#stage.undoManager.checkpoint("ring", "#other-shape-tool.ring");
        let p = 0;
        let c = 0;
        let g = 1;
        let h = 1;
        let f = o * g;
        let m = o * h;
        let y = Zi("svg:path");
        to(y, { type: "ring", values: [p, c, f, m, g, h] }, a);
        n["append"](y);
        ja(y, r);
        this.#stage.selectedElements.clear();
        this.#stage.selectedElements.set(y);
        let v = ut(y)["inverse"]();
        let u = ct(y)["multiplySelf"](v);
        y["setAttribute"]("transform", u["toString"]());
        this.#stage.ctrlKey &&
            ("polar" === l ? (l = "planar") : "planar" === l && (l = "polar"));
        window.addEventListener(
            "pointermove",
            (t = (i) => {
                if ("planar" === l) {
                    let t = i["clientX"] - s["clientX"] || 1;
                    let e = i["clientY"] - s["clientY"] || 1;
                    let n = Math.abs(t);
                    let l = Math.abs(e);
                    if (this.#stage.shiftKey) {
                        let t = Math.min(n, l);
                        n = t;
                        l = t;
                    }
                    let r = t < 0 ? s["clientX"] - n : s["clientX"];
                    let a = e < 0 ? s["clientY"] - l : s["clientY"];
                    p = r + n / 2;
                    c = a + l / 2;
                    g = n / 2;
                    h = l / 2;
                    f = o * g;
                    m = o * h;
                } else {
                    if ("polar" === l) {
                        let t = new DOMPoint(s["clientX"], s["clientY"]);
                        let e = new DOMPoint(t["x"], t["y"] - 100);
                        let n = new DOMPoint(i["clientX"], i["clientY"]);
                        let l = new ee(t, n);
                        let r = ni(t, e, n);
                        p = t["x"];
                        c = t["y"];
                        g = l["length"];
                        h = l["length"];
                        f = o * g;
                        m = o * h;
                        this.#stage.shiftKey && (r = ai(r, 45));
                        let a = new DOMMatrix();
                        a["translateSelf"](t["x"], t["y"]);
                        a["rotateSelf"](r);
                        a["translateSelf"](-t["x"], -t["y"]);
                        y["setAttribute"]("transform", u["multiply"](a)["toString"]());
                    }
                }
                to(y, { type: "ring", values: [p, c, f, m, g, h] }, a);
            })
        );
        const pointerup = () => {
            window.removeEventListener("pointermove", t);
            window.removeEventListener("pointerup", pointerup);
        };
        window.addEventListener("pointerup", pointerup);
    }
    #pie = (s) => {
        let t;
        let e = this.#stage.board;
        let n = this.#stage.currentContainer || this.#stage.currentWorkspace;
        let l = "planar";
        const r = {
            fill: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-fill'),
            stroke: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke'),
            "stroke-width": getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke-width'),
        }
        let { geometryPrecision: a, transformPrecision: i } = e;
        let o = 0;
        this.#stage.undoManager.checkpoint("pie", "#other-shape-tool.pie");
        let p = 0;
        let c = 0;
        let g = 200;
        let h = o * g;
        let f = 90;
        let m = Zi("svg:path");
        n["append"](m);
        ja(m, r);
        this.#stage.selectedElements.clear();
        this.#stage.selectedElements.set(m);
        let y = ut(m)["inverse"]();
        let v = ct(m)["multiplySelf"](y);
        m["setAttribute"]("transform", v["toString"]());
        this.#stage.ctrlKey &&
            ("polar" === l ? (l = "planar") : "planar" === l && (l = "polar"));
        window.addEventListener(
            "pointermove",
            (t = (r) => {
                if ("planar" === l) {
                    let t = r["clientX"] - s["clientX"] || 1;
                    let e = r["clientY"] - s["clientY"] || 1;
                    let a = Math.abs(t);
                    let i = Math.abs(e);
                    if (this.#stage.shiftKey) {
                        let t = Math.min(a, i);
                        a = t;
                        i = t;
                    }
                    let n = t < 0 ? s["clientX"] - a : s["clientX"];
                    let l = e < 0 ? s["clientY"] - i : s["clientY"];
                    if (
                        ((g = a / 2),
                            (h = o * g),
                            (p = n + a / 2),
                            (c = l + i / 2),
                            a === i)
                    )
                        m["setAttribute"]("transform", v["toString"]());
                    else {
                        let t = 1;
                        let e = i / a;
                        let n = -p * (t - 1);
                        let l = -c * (e - 1);
                        let r = DOMMatrix["fromMatrix"](v);
                        r["translateSelf"](n, l);
                        r["scaleSelf"](t, e);
                        m["setAttribute"]("transform", r["toString"]());
                    }
                } else {
                    if ("polar" === l) {
                        let t = new DOMPoint(s["clientX"], s["clientY"]);
                        let e = new DOMPoint(t["x"], t["y"] - 100);
                        let n = new DOMPoint(r["clientX"], r["clientY"]);
                        let l = new ee(t, n);
                        p = t["x"];
                        c = t["y"];
                        g = l["length"];
                        h = o * g;
                        f = ni(t, e, n);
                        f <= 0 && (f = 360 + f);
                    }
                }
                to(m, { type: "pie", values: [p, c, h, g, f, 360] }, a);
            })
        );
        const pointerup = () => {
            window.removeEventListener("pointermove", t);
            window.removeEventListener("pointerup", pointerup);
        };
        window.addEventListener("pointerup", pointerup);
    }
    #crescent = (o) => {
        let t;
        let e = this.#stage.board;
        let n = this.#stage.currentContainer || this.#stage.currentWorkspace;
        let l = "planar";
        const r = {
            fill: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-fill'),
            stroke: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke'),
            "stroke-width": getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke-width'),
        }
        let a = 300;
        let i = 0.7;
        let { geometryPrecision: p, transformPrecision: s } = e;
        let c = 0,
            g = 0,
            h = 200;
        this.#stage.undoManager.checkpoint(
            "#crescent",
            "#other-shape-tool.crescent"
        );
        let f = Zi("svg:path");
        n.append(f);
        ja(f, r);
        this.#stage.selectedElements.clear();
        this.#stage.selectedElements.set(f);
        let m = ut(f).inverse();
        let y = ct(f).multiplySelf(m);
        f.setAttribute("transform", y.toString());
        this.#stage.ctrlKey &&
            ("polar" === l ? (l = "planar") : "planar" === l && (l = "polar"));
        window.addEventListener(
            "pointermove",
            (t = (s) => {
                if ("planar" === l) {
                    let t = s.clientX - o.clientX || 1;
                    let e = s.clientY - o.clientY || 1;
                    let a = Math.abs(t);
                    let i = Math.abs(e);
                    if (this.#stage.shiftKey) {
                        let t = Math.min(a, i);
                        a = t;
                        i = t;
                    }
                    let n = t < 0 ? o["clientX"] - a : o["clientX"];
                    let l = e < 0 ? o["clientY"] - i : o["clientY"];
                    h = a / 2;
                    c = n + a / 2;
                    g = l + i / 2;
                    if (a === i) f.setAttribute("transform", y.toString());
                    else {
                        let t = 1;
                        let e = i / a;
                        let n = -c * (t - 1);
                        let l = -g * (e - 1);
                        let r = new DOMMatrix();
                        r.translateSelf(n, l);
                        r.scaleSelf(t, e);
                        f.setAttribute("transform", y.multiply(r).toString());
                    }
                } else {
                    if ("polar" === l) {
                        let t = new DOMPoint(o["clientX"], o["clientY"]);
                        let e = new DOMPoint(t["x"], t["y"] - 100);
                        let n = new DOMPoint(s["clientX"], s["clientY"]);
                        let l = new ee(t, n);
                        c = t["x"];
                        g = t["y"];
                        h = l.length;
                        let r = ni(t, e, n);
                        r -= 180;
                        this.#stage.shiftKey && (r = ai(r, 45));
                        let a = new DOMMatrix();
                        a.translateSelf(t["x"], t["y"]);
                        a.rotateSelf(r);
                        a.translateSelf(-t["x"], -t["y"]);
                        f.setAttribute("transform", y.multiply(a).toString());
                    }
                }
                to(f, { type: "crescent", values: [c, g, h, a, i] }, p);
            })
        );
        const pointerup = () => {
            window.removeEventListener("pointermove", t);
            window.removeEventListener("pointerup", pointerup);
        };
        window.addEventListener("pointerup", pointerup);
    }
    #triangle = (t) => {
        let e;
        let n;
        let l = this.#stage.board;
        let r = this.#stage.currentContainer || this.#stage.currentWorkspace;
        let { geometryPrecision: a, transformPrecision: i } = l;
        let s = "planar";
        const o = {
            fill: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-fill'),
            stroke: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke'),
            "stroke-width": getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke-width'),
        }
        this.#stage.undoManager.checkpoint(
            "#triangle",
            "#other-shape-tool.triangle"
        );
        this.#stage.snapManager.snapStart(!1);
        let p = new DOMPoint(t.clientX, t.clientY);
        p = this.#stage.snapManager.snapPoint(p);
        let c = 1;
        let g = 1;
        let h = "planar" === s ? p["x"] : p["x"] - g / 2;
        let f = "planar" === s ? p["y"] : p["y"] - c / 2;
        let m = 0.5;
        let y = 0;
        let v = Zi("svg:path");
        to(v, { type: "triangle", values: [h, f, g, c, m, y] }, a);
        r.append(v);
        ja(v, o);
        this.#stage.selectedElements.clear();
        this.#stage.selectedElements.set(v);
        let u = ut(v).inverse();
        let d = ct(v).multiply(u);
        v.setAttribute("transform", d.toString());
        this.#stage.ctrlKey &&
            ("polar" === s ? (s = "planar") : "planar" === s && (s = "polar"));
        window.addEventListener(
            "keydown",
            (n = (t) => {
                let e = Ba.fromEvent(t);
                if (e.matches("ArrowLeft")) {
                    t.preventDefault();
                    t.stopPropagation();
                    if (y > 0) {
                        y = ie(y - 0.04, 0, 0.5, 2);
                        to(v, { type: "triangle", values: [h, f, g, c, m, y] }, a);
                    }
                } else {
                    if (e.matches("ArrowRight")) {
                        t.preventDefault();
                        t.stopPropagation();
                        if (y < 0.5) {
                            y = ie(y + 0.04, 0, 0.5, 2);
                            to(v, { type: "triangle", values: [h, f, g, c, m, y] }, a);
                        }
                    }
                }
            })
        );
        window.addEventListener(
            "pointermove",
            (e = (t) => {
                let o = new DOMPoint(t.clientX, t.clientY);
                o = this.#stage.snapManager.snapPoint(o);
                if ("planar" === s) {
                    let t = o["x"] - p["x"] || 1;
                    let e = o["y"] - p["y"] || 1;
                    g = Math.abs(t);
                    c = Math.abs(e);
                    if (this.#stage.shiftKey) {
                        let t = Math.min(g, c);
                        g = t;
                        c = t;
                    }
                    h = t < 0 ? p["x"] - g : p["x"];
                    f = e < 0 ? p["y"] - c : p["y"];
                } else {
                    if ("polar" === s) {
                        let t = new DOMPoint(p["x"], p["y"]);
                        let e = new DOMPoint(o["x"], o["y"]);
                        let n = Kt(t, e);
                        let l = new DOMPoint(t["x"], t["y"] - n);
                        let r = l.matrixTransform(
                            new DOMMatrix()
                                .translate(t["x"], t["y"])
                                .rotate(120)
                                .translate(-t["x"], -t["y"])
                        );
                        let a = r.matrixTransform(
                            new DOMMatrix()
                                .translate(t["x"], t["y"])
                                .rotate(120)
                                .translate(-t["x"], -t["y"])
                        );
                        let i = ni(t, r, e);
                        g = r["x"] - a["x"] || 1;
                        c = r["y"] - l["y"] || 1;
                        h = a["x"];
                        f = l["y"];
                        this.#stage.shiftKey && (i = ai(i, 45));
                        let s = new DOMMatrix();
                        s.translateSelf(t["x"], t["y"]);
                        s.rotateSelf(i);
                        s.translateSelf(-t["x"], -t["y"]);
                        v.setAttribute("transform", d.multiply(s).toString());
                    }
                }
                to(v, { type: "triangle", values: [h, f, g, c, m, y] }, a);
            })
        );
        const pointerup = () => {
            window.removeEventListener("keydown", n);
            window.removeEventListener("pointermove", e);
            window.removeEventListener("pointerup", pointerup);
            this.#stage.snapManager.snapEnd();
        };
        window.addEventListener("pointerup", pointerup);
    }
    #nGon = (s) => {
        let t;
        let e;
        let n = this.#stage.board;
        let l = this.#stage.currentContainer || this.#stage.currentWorkspace;
        let r = "planar";
        const a = {
            fill: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-fill'),
            stroke: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke'),
            "stroke-width": getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke-width'),
        }
        let { geometryPrecision: o, transformPrecision: i } = n;
        let p = 0;
        let c = 0;
        let g = 0;
        let h = 0;
        let f = 5;
        let m = 0;
        this.#stage.undoManager.checkpoint("n-gon", "#other-shape-tool.n-gon");
        let y = Zi("svg:path");
        to(y, { type: "n-gon", values: [p, c, g, h, f, m] }, o);
        l.append(y);
        ja(y, a);
        this.#stage.selectedElements.clear();
        this.#stage.selectedElements.set(y);
        let v = ut(y).inverse();
        let u = ct(y).multiply(v);
        y.setAttribute("transform", u.toString());
        this.#stage.ctrlKey &&
            ("polar" === r ? (r = "planar") : "planar" === r && (r = "polar"));
        window.addEventListener(
            "keydown",
            (e = (t) => {
                let e = Ba.fromEvent(t);
                t.preventDefault();
                t.stopPropagation();
                if (e.matches("ArrowUp")) {
                    f += 1;
                    to(y, { type: "n-gon", values: [p, c, g, h, f, m] }, o);
                } else {
                    if (e.matches("ArrowDown")) {
                        if (f > 5) {
                            f -= 1;
                            to(y, { type: "n-gon", values: [p, c, g, h, f, m] }, o);
                        }
                    } else {
                        if (e.matches("ArrowLeft")) {
                            if (m > 0) {
                                m = ie(m - 0.04, 0, 0.5, 2);
                                to(y, { type: "n-gon", values: [p, c, g, h, f, m] }, o);
                            }
                        } else {
                            if (e.matches("ArrowRight")) {
                                if (m < 0.5) {
                                    m = ie(m + 0.04, 0, 0.5, 2);
                                    to(y, { type: "n-gon", values: [p, c, g, h, f, m] }, o);
                                }
                            }
                        }
                    }
                }
            })
        );
        window.addEventListener(
            "pointermove",
            (t = (i) => {
                if ("planar" === r) {
                    let t = i["clientX"] - s["clientX"] || 1;
                    let e = i["clientY"] - s["clientY"] || 1;
                    let n = Math.abs(t);
                    let l = Math.abs(e);
                    if (this.#stage.shiftKey) {
                        let t = Math.min(n, l);
                        n = t;
                        l = t;
                    }
                    let r = t < 0 ? s["clientX"] - n : s["clientX"];
                    let a = e < 0 ? s["clientY"] - l : s["clientY"];
                    g = n / 2;
                    h = l / 2;
                    p = r + g;
                    c = a + h;
                } else {
                    if ("polar" === r) {
                        let t = new DOMPoint(s["clientX"], s["clientY"]);
                        let e = fo(2, p, c, g, h, f);
                        let n = new DOMPoint(i["clientX"], i["clientY"]);
                        let l = new ee(t, n);
                        let r = ni(t, e, n);
                        p = t["x"];
                        c = t["y"];
                        g = l.length;
                        h = l.length;
                        this.#stage.shiftKey && (r = ai(r, 180 / f));
                        let a = new DOMMatrix();
                        a.translateSelf(t["x"], t["y"]);
                        a.rotateSelf(r);
                        a.translateSelf(-t["x"], -t["y"]);
                        y.setAttribute("transform", u.multiply(a).toString());
                    }
                }
                to(y, { type: "n-gon", values: [p, c, g, h, f, m] }, o);
            })
        );
        const pointerup = () => {
            window.removeEventListener("keydown", e);
            window.removeEventListener("pointermove", t);
            window.removeEventListener("pointerup", pointerup);
        };
        window.addEventListener("pointerup", pointerup);
    }
    #star = (s) => {
        let t;
        let e;
        let n = this.#stage.board;
        let l = this.#stage.currentContainer || this.#stage.currentWorkspace;
        let r = "planar";
        const a = {
            fill: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-fill'),
            stroke: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke'),
            "stroke-width": getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke-width'),
        }
        let { geometryPrecision: o, transformPrecision: i } = n;
        let p = 0;
        let c = 0;
        let g = 0;
        let h = 0;
        let f = 0.4;
        let m = 5;
        this.#stage.undoManager.checkpoint("star", "#other-shape-tool.star");
        let y = Zi("svg:path");
        to(y, { type: "star", values: [p, c, g, h, f, m] }, o);
        l.append(y);
        ja(y, a);
        this.#stage.selectedElements.clear();
        this.#stage.selectedElements.set(y);
        let v = ut(y).inverse();
        let u = ct(y).multiply(v);
        y.setAttribute("transform", u.toString());
        this.#stage.ctrlKey &&
            ("polar" === r ? (r = "planar") : "planar" === r && (r = "polar"));
        window.addEventListener(
            "keydown",
            (e = (t) => {
                let e = Ba.fromEvent(t);
                if (e.matches("ArrowUp")) {
                    t.preventDefault();
                    t.stopPropagation();
                    m += 1;
                    to(y, { type: "star", values: [p, c, g, h, f, m] }, o);
                } else {
                    if (e.matches("ArrowDown")) {
                        t.preventDefault();
                        t.stopPropagation();
                        if (m > 3) {
                            m -= 1;
                            to(y, { type: "star", values: [p, c, g, h, f, m] }, o);
                        }
                    }
                }
            })
        );
        window.addEventListener(
            "pointermove",
            (t = (i) => {
                if ("planar" === r) {
                    let t = i.clientX - s.clientX || 1;
                    let e = i.clientY - s.clientY || 1;
                    let n = Math.abs(t);
                    let l = Math.abs(e);
                    if (this.#stage.shiftKey) {
                        let t = Math.min(n, l);
                        n = t;
                        l = t;
                    }
                    let r = t < 0 ? s.clientX - n : s.clientX;
                    let a = e < 0 ? s.clientY - l : s.clientY;
                    g = n / 2;
                    h = l / 2;
                    p = r + g;
                    c = a + h;
                } else {
                    if ("polar" === r) {
                        let t = new DOMPoint(s.clientX, s.clientY);
                        let e = new DOMPoint(t.x, t.y - 100);
                        let n = new DOMPoint(i.clientX, i.clientY);
                        let l = new ee(t, n);
                        let r = ni(t, e, n);
                        p = t["x"];
                        c = t["y"];
                        g = l.length;
                        h = l.length;
                        this.#stage.shiftKey && (r = ai(r, 180 / m / 2));
                        let a = new DOMMatrix();
                        a.translateSelf(t["x"], t["y"]);
                        a.rotateSelf(r);
                        a.translateSelf(-t["x"], -t["y"]);
                        y.setAttribute("transform", u.multiply(a).toString());
                    }
                }
                to(y, { type: "star", values: [p, c, g, h, f, m] }, o);
            })
        );
        const pointerup = () => {
            window.removeEventListener("keydown", e);
            window.removeEventListener("pointermove", t);
            window.removeEventListener("pointerup", pointerup);
        };
        window.addEventListener("pointerup", pointerup);
    }
    #cog = (o) => {
        let t;
        let e = this.#stage.board;
        let n = this.#stage.currentContainer || this.#stage.currentWorkspace;
        let l = "planar";
        const r = {
            fill: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-fill'),
            stroke: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke'),
            "stroke-width": getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke-width'),
        }
        let { geometryPrecision: a, transformPrecision: i } = e;
        this.#stage.undoManager.checkpoint("cog", "#other-shape-tool.cog");
        let p = 0.3;
        let c = 0.65;
        let g = 1;
        let h = 0.38;
        let f = 8;
        let m = 0;
        let y = 0;
        let v = 0;
        let u = 0;
        let d = 0;
        let M = Zi("svg:path");
        n.append(M);
        ja(M, r);
        this.#stage.selectedElements.clear();
        this.#stage.selectedElements.set(M);
        let s = ut(M).inverse();
        let x = ct(M).multiplySelf(s);
        M.setAttribute("transform", x.toString());
        this.#stage.ctrlKey &&
            ("polar" === l ? (l = "planar") : "planar" === l && (l = "polar"));
        window.addEventListener(
            "pointermove",
            (t = (s) => {
                if ("planar" === l) {
                    let t = s.clientX - o.clientX || 1;
                    let e = s.clientY - o.clientY || 1;
                    let a = Math.abs(t);
                    let i = Math.abs(e);
                    if (this.#stage.shiftKey) {
                        let t = Math.min(a, i);
                        a = t;
                        i = t;
                    }
                    let n = t < 0 ? o.clientX - a : o.clientX;
                    let l = e < 0 ? o.clientY - i : o.clientY;
                    let r = a / 2;
                    m = n + a / 2;
                    y = l + i / 2;
                    v = r * p;
                    u = r * c;
                    d = r * g;
                    if (a === i) M.setAttribute("transform", x.toString());
                    else {
                        let t = 1;
                        let e = i / a;
                        let n = -m * (t - 1);
                        let l = -y * (e - 1);
                        let r = DOMMatrix.fromMatrix(x);
                        r.translateSelf(n, l);
                        r.scaleSelf(t, e);
                        M.setAttribute("transform", r.toString());
                    }
                } else {
                    if ("polar" === l) {
                        let t = new DOMPoint(o["clientX"], o["clientY"]);
                        let e = new DOMPoint(t["x"], t["y"] - 100);
                        let n = new DOMPoint(s["clientX"], s["clientY"]);
                        let l = new ee(t, n);
                        let r = ni(t, e, n);
                        let a = l.length;
                        m = t["x"];
                        y = t["y"];
                        v = a * p;
                        u = a * c;
                        d = a * g;
                        this.#stage.shiftKey && (r = ai(r, 45));
                        let i = new DOMMatrix();
                        i.translateSelf(t["x"], t["y"]);
                        i.rotateSelf(r);
                        i.translateSelf(-t["x"], -t["y"]);
                        M.setAttribute("transform", x.multiply(i).toString());
                    }
                }
                to(M, { type: "cog", values: [m, y, v, u, d, h, f] }, a);
            })
        );
        const pointerup = () => {
            window.removeEventListener("pointermove", t);
            window.removeEventListener("pointerup", pointerup);
        };
        window.addEventListener("pointerup", pointerup);
    }
    #arrow = (t) => {
        let e;
        let n = this.#stage.board;
        let l = this.#stage.currentContainer || this.#stage.currentWorkspace;
        let { geometryPrecision: r, transformPrecision: a } = n;
        let i = ut(this.#stage.currentWorkspace)["inverse"]();
        this.#stage.undoManager.checkpoint("arrow", "#other-shape-tool.arrow");
        this.#stage.snapManager.snapStart(!1);
        let s = new DOMPoint(t.clientX, t.clientY);
        s = this.#stage.snapManager.snapPoint(s);
        s = s.matrixTransform(i);
        let o = new DOMPoint(s["x"] + 100, s["y"]);
        const p = {
            fill: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-fill'),
            stroke: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke'),
            "stroke-width": getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke-width'),
        }
        let c = 10;
        let g = 40;
        let h = 40;
        let f = 0;
        let m = h;
        let y = g;
        let v = s["x"];
        let u = s["y"] - y / 2;
        let d = Zi("svg:path");
        let M = { type: "arrow", values: [v, u, m, y, c, h, f] };
        to(d, M, r);
        l.append(d);
        ja(d, p);
        this.#stage.selectedElements.clear();
        this.#stage.selectedElements.set(d);
        let x = ct(d).multiply(pt(this.#stage.currentWorkspace, d));
        d.setAttribute("transform", x.toString());
        window.addEventListener(
            "pointermove",
            (e = (t) => {
                let e = new DOMPoint(t["clientX"], t["clientY"]);
                e = this.#stage.snapManager.snapPoint(e);
                e = e.matrixTransform(i);
                m = Kt(s, e);
                m < h && (m = h);
                let n = ni(s, o, e);
                this.#stage.shiftKey && (n = ai(n, 45));
                let l = new DOMMatrix();
                l.translateSelf(s["x"], s["y"]);
                l.rotateSelf(n);
                l.translateSelf(-s["x"], -s["y"]);
                d.setAttribute("transform", x.multiply(l).toString());
                M = { type: "arrow", values: [v, u, m, y, c, h, f] };
                to(d, M, r);
            })
        );
        const pointerup = () => {
            window.removeEventListener("pointermove", e);
            window.removeEventListener("pointerup", pointerup);
            this.#stage.snapManager.snapEnd();
        };
        window.addEventListener("pointerup", pointerup);
    }
    #cross = (t) => {
        let e;
        let n = this.#stage.board;
        let l = this.#stage.currentContainer || this.#stage.currentWorkspace;
        let { geometryPrecision: r, transformPrecision: a } = n;
        let i = "planar";
        const s = {
            fill: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-fill'),
            stroke: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke'),
            "stroke-width": getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke-width'),
        }
        this.#stage.undoManager.checkpoint("cross", "#other-shape-tool.cross");
        this.#stage.snapManager.snapStart(!1);
        let g = new DOMPoint(t.clientX, t.clientY);
        g = this.#stage.snapManager.snapPoint(g);
        let h = g["x"];
        let f = g["y"];
        let m = 0;
        let y = 0;
        let o = 0;
        let p = 0;
        let v = 0.2;
        let u = 0.5;
        let d = Zi("svg:path");
        to(d, { type: "cross", values: [h, f, m, y, o, p, u] }, r);
        l.append(d);
        ja(d, s);
        this.#stage.selectedElements.clear();
        this.#stage.selectedElements.set(d);
        let c = ut(d).inverse();
        let M = ct(d).multiply(c);
        d.setAttribute("transform", M.toString());
        this.#stage.ctrlKey &&
            ("polar" === i ? (i = "planar") : "planar" === i && (i = "polar"));
        window.addEventListener(
            "pointermove",
            (e = (t) => {
                let c = new DOMPoint(t.clientX, t.clientY);
                c = this.#stage.snapManager.snapPoint(c);
                if ("planar" === i) {
                    let t = c["x"] - g["x"] || 1;
                    let e = c["y"] - g["y"] || 1;
                    if (((m = Math.abs(t)), (y = Math.abs(e)), this.#stage.shiftKey)) {
                        let t = Math.min(m, y);
                        m = t;
                        y = t;
                    }
                    h = t < 0 ? g["x"] - m : g["x"];
                    f = e < 0 ? g["y"] - y : g["y"];
                } else {
                    if ("polar" === i) {
                        let t = new DOMPoint(g["x"], g["y"]);
                        let e = new DOMPoint(c["x"], c["y"]);
                        let n = Kt(t, e);
                        let l = new DOMPoint(t["x"], t["y"] - n);
                        let r = l.matrixTransform(
                            new DOMMatrix()
                                .translate(t["x"], t["y"])
                                .rotate(-45)
                                .translate(-t["x"], -t["y"])
                        );
                        let a = l.matrixTransform(
                            new DOMMatrix()
                                .translate(t["x"], t["y"])
                                .rotate(45)
                                .translate(-t["x"], -t["y"])
                        );
                        let i = l.matrixTransform(
                            new DOMMatrix()
                                .translate(t["x"], t["y"])
                                .rotate(135)
                                .translate(-t["x"], -t["y"])
                        );
                        let s = Kt(r, a);
                        h = g["x"] - s / 2;
                        f = g["y"] - s / 2;
                        m = s;
                        y = s;
                        let o = ni(t, i, e);
                        this.#stage.shiftKey && (o = ai(o, 45));
                        let p = new DOMMatrix();
                        p.translateSelf(t["x"], t["y"]);
                        p.rotateSelf(o);
                        p.translateSelf(-t["x"], -t["y"]);
                        d.setAttribute("transform", M.multiply(p).toString());
                    }
                }
                o = y * v;
                p = m * v;
                to(d, { type: "cross", values: [h, f, m, y, o, p, u] }, r);
            })
        );
        const pointerup = () => {
            window.removeEventListener("pointermove", e);
            window.removeEventListener("pointerup", pointerup);
            this.#stage.snapManager.snapEnd();
        };
        window.addEventListener("pointerup", pointerup);
    }
    #spiral(o) {
        let t;
        let e = this.#stage.board;
        let n = this.#stage.currentContainer || this.#stage.currentWorkspace;
        let { geometryPrecision: p, transformPrecision: l } = e;
        let r = "planar";
        const a = {
            fill: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-fill'),
            stroke: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke'),
            "stroke-width": getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke-width'),
        }
        this.#stage.undoManager.checkpoint("spiral", "#other-shape-tool.spiral");
        this.#stage.snapManager.snapStart(!1);
        let i = new DOMPoint(o.clientX, o.clientY);
        i = this.#stage.snapManager.snapPoint(i);
        let c = 0;
        let g = 0;
        let h = 1080;
        let f = new DOMPoint(i["x"], i["y"] - 100).matrixTransform(
            new DOMMatrix()
                .translate(i["x"], i["y"])
                .rotate(h)
                .translate(-i["x"], -i["y"])
        );
        let m = i["x"];
        let y = i["y"];
        let v = 1;
        let u = c * v;
        let d = Zi("svg:path");
        to(d, { type: "spiral", values: [m, y, u, v, g, h] }, p);
        n.append(d);
        ja(d, a);
        this.#stage.selectedElements.clear();
        this.#stage.selectedElements.set(d);
        let s = ut(d).inverse();
        let M = ct(d).multiply(s);
        d.setAttribute("transform", M.toString());
        this.#stage.ctrlKey &&
            ("polar" === r ? (r = "planar") : "planar" === r && (r = "polar"));
        window.addEventListener(
            "pointermove",
            (t = (s) => {
                if ("planar" === r) {
                    let t = s.clientX - o.clientX || 1;
                    let e = s.clientY - o.clientY || 1;
                    let n = Math.abs(t);
                    let l = Math.abs(e);
                    let r = Math.min(n, l);
                    n = r;
                    l = r;
                    let a = t < 0 ? o.clientX - n : o.clientX;
                    let i = e < 0 ? o.clientY - l : o.clientY;
                    m = a + n / 2;
                    y = i + l / 2;
                    v = n / 2;
                    u = c * v;
                    to(d, { type: "spiral", values: [m, y, u, v, g, h] }, p);
                } else {
                    if ("polar" === r) {
                        let t = new DOMPoint(s.clientX, s.clientY);
                        t = this.#stage.snapManager.snapPoint(t);
                        let e = ni(i, f, t);
                        f = t;
                        h += e;
                        !1 === this.#stage.shiftKey && (v = Kt(i, t));
                        u = c * v;
                        to(d, { type: "spiral", values: [m, y, u, v, g, h] }, p);
                    }
                }
            })
        );
        const pointerup = () => {
            window.removeEventListener("pointermove", t);
            window.removeEventListener("pointerup", pointerup);
            this.#stage.snapManager.snapEnd();
        };
        window.addEventListener("pointerup", pointerup);
    }
}
export default OtherShapeTool;
