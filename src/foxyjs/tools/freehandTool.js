import {
    ut,
    Zi,
    Kt,
    Mt,
    pt,
    Ae,
    $e,
    il,
    Te,
    Re,
    Ie,
    ja,
    me,
    te,
    ti,
    L,
} from "../utils/common";
class FreehandTool {
    get enabled() {
        return this.#stage.freehandHud.hud.hasAttribute("enabled");
    }
    set enabled(e) {
        e
            ? this.#stage.freehandHud.hud.setAttribute("enabled", "")
            : this.#stage.freehandHud.hud.removeAttribute("enabled");
    }
    #stage;
    #K;
    #ue;
    #Q;
    #ee;
    #Xe;
    #tt;
    #it = 0.5;
    constructor(e) {
        this.#stage = e;
    }
    enable = () => {
        this.enabled = true;
        this.#it = 0.5;
        this.#stage.splineTool.mode = "draw-freehand";
        this.#stage.board.style.cursor = "crosshair";
        this.#stage.workspaces.addEventListener(
            "pointerdown",
            (this.#Xe = (e) => {
                this.#be(e);
            })
        );
        this.#stage.splineTool.splineHud.addEventListener(
            "nodepointerdown",
            (this.#tt = (e) => {
                this.#st(e);
            })
        );
    };
    disable = () => {
        this.enabled = false;
        this.#stage.splineTool.mode = "edit";
        this.#stage.workspaces.removeEventListener("pointerdown", this.#Xe);
        this.#stage.splineTool.splineHud.removeEventListener(
            "nodepointerdown",
            this.#tt
        );
        this.#stage.freehandHud.hide();
    };
    #he({ key: e, value: t }) {
        "smoothing" === e
            ? null !== t && (this.#it = t)
            : "viewPathNodes" === e && (this.#stage.splineTool.enabled = t);
    }
    #be(e) {
        if (e.buttons > 1) return;
        let s;
        let a;
        const l = new DOMPoint(e.clientX, e.clientY);
        this.#stage.workspaces.addEventListener(
            "pointermove",
            (s = (e) => {
                const t = new DOMPoint(e.clientX, e.clientY);
                if (Kt(l, t) >= 3) {
                    this.#stage.workspaces.removeEventListener("pointermove", s);
                    this.#stage.workspaces.removeEventListener("pointerup", a);
                    this.#Je(l);
                }
            })
        );
        this.#stage.workspaces.addEventListener(
            "pointerup",
            (a = () => {
                this.#stage.workspaces.removeEventListener("pointermove", s);
                this.#stage.workspaces.removeEventListener("pointerup", a);
            })
        );
    }
    #st(e) {
        this.#Je(e.detail);
    }
    #Je(s) {
        let e;
        let t;
        let d = this.#stage.currentContainer || this.#stage.currentWorkspace;
        const c = {
            fill: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-fill'),
            stroke: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke'),
            "stroke-width": getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke-width'),
        }
        let p = null;
        let g = [];
        let v = -1;
        let f = [];
        let y = !1;
        let a = new DOMPoint();
        if (s instanceof DOMPoint) {
            this.#stage.freehandHud.show(d, s);
        } else {
            const h = s;
            p = h.spline;
            const u = Te(p, !1);
            g = $e(u);
            v = h.subpathIndex;
            "start" === h.position && (y = !0);
            const m = new DOMPoint(
                g[v].at("start" === h.position ? 0 : -1).values.at(-2),
                g[v].at("start" === h.position ? 0 : -1).values.at(-1)
            ).matrixTransform(ut(p, !0));
            this.#stage.freehandHud.show(p, m);
        }
        this.#stage.splineTool.splineHud.addEventListener(
            "nodepointerup",
            (t = (e) => {
                let t = e.detail;
                t.spline === p
                    ? t.subpathIndex === v
                        ? ((("start" === t.position && !1 === y) ||
                            ("end" === t.position && !0 === y)) &&
                            o(),
                            r())
                        : (i(t), r())
                    : (n(t), r());
            })
        );
        this.#stage.board.addEventListener(
            "pointerup",
            (e = (e) => {
                let t = new DOMPoint(e.clientX, e.clientY);
                if (null === p && s instanceof DOMPoint) {
                    Kt(s, t) >= 4 && l();
                    r();
                } else {
                    Kt(a, t) < 4 || l();
                    r();
                }
                a = t;
            })
        );
        const l = () => {
            this.#stage.undoManager.checkpoint("freehand", "#freehand-tool");
            let s = this.#stage.freehandHud.points;
            if (null === p) {
                g = [[{ type: "M", values: [s[0]["x"], s[0]["y"]] }]];
                v = 0;
                p = Zi("svg:path");
                d.append(p);
                ja(p, c);
            }
            ["R", "U"].includes(g[v][1]?.type) && (g[v] = Re(g[v], !1));
            if (!1 === y) {
                if (1 === s.length || 2 === s.length)
                    g[v].push({
                        type: "L",
                        values: [s[s.length - 1]["x"], s[s.length - 1]["y"]],
                    });
                else {
                    if (s.length >= 3) {
                        let t = il(s, (6 * this.#it) / this.#stage.scale);
                        for (let e of t)
                            g[v].push({
                                type: "C",
                                values: [
                                    e[1]["x"],
                                    e[1]["y"],
                                    e[2]["x"],
                                    e[2]["y"],
                                    e[3]["x"],
                                    e[3]["y"],
                                ],
                            });
                    }
                }
            } else {
                if (!0 === y) {
                    s = [...s.reverse()];
                    if (1 === s.length || 2 === s.length)
                        g[v] = [
                            { type: "M", values: [s[0]["x"], s[0]["y"]] },
                            { type: "L", values: [g[v][0].values[0], g[v][0].values[1]] },
                            ...g[v].slice(1),
                        ];
                    else {
                        if (s.length >= 3) {
                            let e = il(s, (6 * this.#it) / this.#stage.scale);
                            g[v] = [
                                { type: "M", values: [s[0]["x"], s[0]["y"]] },
                                ...e["map"]((e) => ({
                                    type: "C",
                                    values: [
                                        e[1]["x"],
                                        e[1]["y"],
                                        e[2]["x"],
                                        e[2]["y"],
                                        e[3]["x"],
                                        e[3]["y"],
                                    ],
                                })),
                                ...g[v].slice(1),
                            ];
                        }
                    }
                }
            }
            let e = [].concat(...g);
            if ("line" === p.localName || "polyline" === p.localName) {
                let t = Zi("svg:path");
                for (let e of p.attributes)
                    !1 === ["x1", "y1", "x2", "y2", "points"].includes(e.name) &&
                        t.setAttribute(e.name, e.value);
                Ae(t, e, this.#stage.geometryPrecision);
                p.replaceWith(t);
                f.push(p);
                p = t;
            } else "path" === p.localName && Ae(p, e, this.#stage.geometryPrecision);
            const t = [...Array.from(this.#stage.selectedElements.keys())].filter(
                (e) => !1 === f.includes(e)
            );
            null === p.closest("defs") &&
                void 0 ===
                Array.from(this.#stage.selectedElements.keys()).find(
                    (e) => e === p || e.contains(p)
                ) &&
                t.push(p);
            if (!1 === me(Array.from(this.#stage.selectedElements.keys()), t)) {
                this.#stage.selectedElements.set(p);
            }
        };
        const i = (e) => {
            this.#stage.undoManager.checkpoint("freehand", "#freehand-tool");
            let a = this.#stage.freehandHud.points;
            {
                let t = g[v];
                let s = g[e.subpathIndex];
                g = g.filter((e) => e !== s);
                v = g.indexOf(t);
                ["R", "U"].includes(g[v][1]?.type) && (g[v] = Re(g[v], !1));
                ((!0 === y && "start" === e.position) ||
                    (!1 === y && "end" === e.position)) &&
                    (s = Ie(s));
                if (!1 === y) {
                    if (
                        ((a[0] = new DOMPoint(
                            t.at(-1).values.at(-2),
                            t.at(-1).values.at(-1)
                        )),
                            (a[a.length - 1] = new DOMPoint(
                                s.at(0).values.at(-2),
                                s.at(0).values.at(-1)
                            )),
                            1 === a.length || 2 === a.length)
                    )
                        g[v] = [
                            ...t,
                            { type: "L", values: [s[0].values.at(-2), s[0].values.at(-1)] },
                            ...s.slice(1),
                        ];
                    else {
                        if (a.length >= 3) {
                            let e = il(a, (6 * this.#it) / this.#stage.scale);
                            g[v] = [
                                ...t,
                                ...e.map((e) => ({
                                    type: "C",
                                    values: [
                                        e[1]["x"],
                                        e[1]["y"],
                                        e[2]["x"],
                                        e[2]["y"],
                                        e[3]["x"],
                                        e[3]["y"],
                                    ],
                                })),
                                ...s.slice(1),
                            ];
                        }
                    }
                } else {
                    if (!0 === y) {
                        a = [...a.reverse()];
                        a[0] = new DOMPoint(s.at(-1).values.at(-2), s.at(-1).values.at(-1));
                        a[a.length - 1] = new DOMPoint(
                            t.at(0).values.at(-2),
                            t.at(0).values.at(-1)
                        );
                        if (1 === a.length || 2 === a.length)
                            g[v] = [
                                ...s,
                                { type: "L", values: [t[0].values.at(-2), t[0].values.at(-1)] },
                                ...t.slice(1),
                            ];
                        else {
                            if (a.length >= 3) {
                                let e = il(a, (6 * this.#it) / this.#stage.scale);
                                g[v] = [
                                    ...s,
                                    ...e.map((e) => ({
                                        type: "C",
                                        values: [
                                            e[1]["x"],
                                            e[1]["y"],
                                            e[2]["x"],
                                            e[2]["y"],
                                            e[3]["x"],
                                            e[3]["y"],
                                        ],
                                    })),
                                    ...t.slice(1),
                                ];
                            }
                        }
                    }
                }
            }
            let t = [].concat(...g);
            "path" === p.localName
                ? Ae(p, t, this.#stage.geometryPrecision)
                : p.setAttribute(
                    "points",
                    t
                        .map((e) => e["values"])
                        .flat()
                        .join(" ")
                );
            this.#stage.splineTool.selectedNodes = [];
        };
        const n = (e) => {
            this.#stage.undoManager.checkpoint("freehand", "freehand-tool");
            let t = this.#stage.freehandHud.points;
            let s = p
                ? p.ownerSVGElement.querySelector(
                    'textPath[href="#' + CSS.escape(p.id) + '"]'
                )
                : null;
            let a = e.spline;
            let l = this.#stage.workspaces.querySelector(
                'textPath[href="#' + CSS.escape(a.id) + '"]'
            );
            let i = $e(Te(a));
            let n = pt(a, p || d, !0);
            if (null === p) {
                g = [[{ type: "M", values: [t[0].x, t[0].y] }]];
                v = 0;
                p = Zi("svg:path");
                d.append(p);
                ja(p, c);
            }
            let o = i[e.subpathIndex];
            i = i.filter((e) => e !== o);
            ["R", "U"].includes(o[1]?.type) && (o = Re(o, !1));
            "end" === e.position && (o = Ie(o));
            o = Mt(o, n);
            y && (g[v] = Ie(g[v]));
            let r = g[v];
            t[0] = new DOMPoint(r.at(-1).values.at(-2), r.at(-1).values.at(-1));
            t[t.length - 1] = new DOMPoint(
                o.at(0).values.at(-2),
                o.at(0).values.at(-1)
            );
            if (1 === t.length || 2 === t.length)
                g[v] = [
                    ...r,
                    { type: "L", values: [o[0].values.at(-2), o[0].values.at(-1)] },
                    ...o.slice(1),
                ];
            else {
                if (t.length >= 3) {
                    let e = il(t, (6 * this.#it) / this.#stage.scale);
                    g[v] = [
                        ...r,
                        ...e.map((e) => ({
                            type: "C",
                            values: [
                                e[1]["x"],
                                e[1]["y"],
                                e[2]["x"],
                                e[2]["y"],
                                e[3]["x"],
                                e[3]["y"],
                            ],
                        })),
                        ...o.slice(1),
                    ];
                }
            }
            l && "end" === e.position && (g[v] = Ie(g[v]));
            g[v] = Re(g[v]);
            for (let e of g[v])
                e.values = e.values.map((e) => te(e, this.#stage.geometryPrecision));
            let h = [].concat(...g);
            if ("line" === p.localName || "polyline" === p.localName) {
                let t = Zi("svg:path");
                for (let e of p.attributes)
                    !1 === ["x1", "y1", "x2", "y2", "points"].includes(e.name) &&
                        t.setAttribute(e.name, e.value);
                Ae(t, h, this.#stage.geometryPrecision);
                p.replaceWith(t);
                f.push(p);
                p = t;
            } else "path" === p.localName && Ae(p, h, this.#stage.geometryPrecision);
            if (0 === i.length) a.remove();
            else {
                let e = [].concat(...i);
                Ae(a, e, this.#stage.geometryPrecision);
            }
            if (!s && l && !1 === a.isConnected) {
                let e = this.#stage.generateUniqueID(p.localName + "-");
                p.setAttribute("id", e);
                l.setAttribute("href", "#" + e);
                l.closest("text").removeAttribute("transform");
            }
            let u = [...Array.from(this.#stage.selectedElements.keys())].filter(
                (e) => !1 === f.includes(e)
            );
            null === p.closest("defs") &&
                void 0 === u.find((e) => e === p || e.contains(p)) &&
                u.push(p);
            !1 === a.isConnected && (u = u.filter((e) => e !== a));
            if (!1 === me(Array.from(this.#stage.selectedElements.keys()), u)) {
                this.#stage.selectedElements.clear(false);
                this.#stage.selectedElements.sets(u);
            }
            this.#stage.splineTool.selectedNodes = [];
        };
        const o = () => {
            this.#stage.undoManager.checkpoint("freehand", "#freehand-tool");
            const t = this.#stage.freehandHud.points;
            let s = g[v];
            if (!1 === y) {
                t[0] = new DOMPoint(s.at(-1).values.at(-2), s.at(-1).values.at(-1));
                t[t.length - 1] = new DOMPoint(
                    s.at(0).values.at(-2),
                    s.at(0).values.at(-1)
                );
                if (1 === t.length || 2 === t.length)
                    s.push(
                        { type: "L", values: [s[0].values.at(-2), s[0].values.at(-1)] },
                        { type: "Z", values: [] }
                    );
                else {
                    if (t.length >= 3) {
                        let e = il(t, (6 * this.#it) / this.#stage.scale);
                        s.push(
                            ...e.map((e) => ({
                                type: "C",
                                values: [e[1].x, e[1].y, e[2].x, e[2].y, e[3].x, e[3].y],
                            })),
                            { type: "Z", values: [] }
                        );
                    }
                }
            } else {
                if (1 === t.length || 2 === t.length)
                    s.push(
                        { type: "L", values: [s[0].values.at(-2), s[0].values.at(-1)] },
                        { type: "Z", values: [] }
                    );
                else {
                    if (t.length >= 3) {
                        let e = il(t, (6 * this.#it) / this.#stage.scale);
                        s.push(
                            ...Ie(
                                Re([
                                    {
                                        type: "M",
                                        values: [s[0].values.at(-2), s[0].values.at(-1)],
                                    },
                                    ...e["map"]((e) => ({
                                        type: "C",
                                        values: [
                                            e[1]["x"],
                                            e[1]["y"],
                                            e[2]["x"],
                                            e[2]["y"],
                                            e[3]["x"],
                                            e[3]["y"],
                                        ],
                                    })),
                                ])
                            )["slice"](1),
                            { type: "Z", values: [] }
                        );
                    }
                }
            }
            g[v] = Re(g[v]);
            for (let e of g[v])
                e.values = e.values.map((e) => te(e, this.#stage.geometryPrecision));
            let e = [].concat(...g);
            if ("line" === p.localName) {
                let t = Zi("svg:path");
                for (let e of p.attributes)
                    !1 === ["x1", "y1", "x2", "y2"].includes(e.name) &&
                        t.setAttribute(e.name, e.value);
                Ae(t, e, this.#stage.geometryPrecision);
                p.replaceWith(t);
                const a = structuredClone(
                    Array.from(this.#stage.selectedElements.keys())
                );
                this.#stage.selectedElements.clear(false);
                a.forEach((e) => {
                    this.#stage.selectedElements.set(e === p ? t : e);
                });
                p = t;
            } else {
                if ("polyline" === p.localName) {
                    let t = Zi("svg:path");
                    for (let e of p.attributes)
                        !1 === ["points"].includes(e.name) &&
                            t.setAttribute(e.name, e.value);
                    Ae(t, e, this.#stage.geometryPrecision);
                    p.replaceWith(t);
                    const a = structuredClone(
                        Array.from(this.#stage.selectedElements.keys())
                    );
                    this.#stage.selectedElements.clear(false);
                    a.forEach((e) => {
                        this.#stage.selectedElements.set(e === p ? t : e);
                    });
                    p = t;
                } else
                    "path" === p.localName && Ae(p, e, this.#stage.geometryPrecision);
            }
            this.#stage.splineTool.selectedNodes = [];
        };
        const r = () => {
            this.#stage.board.removeEventListener("pointerup", e);
            this.#stage.splineTool.splineHud.removeEventListener(
                "nodepointerdown",
                undefined
            );
            this.#stage.splineTool.splineHud.removeEventListener("nodepointerup", t);
            this.#stage.board.removeEventListener("redo", undefined);
            this.#stage.freehandHud.clear();
            this.#stage.freehandHud.hide();
        };
    }
}
export default FreehandTool;
