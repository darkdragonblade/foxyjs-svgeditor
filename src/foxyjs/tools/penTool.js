import {
    ut,
    Kt,
    Te,
    $e,
    Zi,
    pt,
    ja,
    Ie,
    Ae,
    Re,
    te,
    Mt,
} from "../utils/common";
import Ba from "../utils/Ba";
class PenTool {
    get enabled() {
        return this.#stage.freehandHud.hud.hasAttribute("enabled");
    }
    set enabled(e) {
        e
            ? this.#stage.freehandHud.hud.setAttribute("enabled", "")
            : this.#stage.freehandHud.hud.removeAttribute("enabled");
    }
    #stage;
    #Q;
    #Xe;
    #Ze;
    #disabled = false;
    constructor(stage) {
        this.#stage = stage;
    }
    enable = () => {
        this.enabled = true;
        this.#stage.board.style.cursor = "crosshair";
        this.#stage.splineTool.mode = "edit";
        this.#stage.workspaces.addEventListener(
            "pointerdown",
            (this.#Xe = (event) => {
                this.#paint(event);
            })
        );
        this.#stage.splineTool.splineHud.addEventListener(
            "nodeclick",
            (this.#Ze = (event) => {
                this.#Qe(event);
            })
        );
    };
    disable = () => {
        this.enabled = false;
        this.#stage.workspaces.removeEventListener("pointerdown", this.#Xe);
        this.#stage.splineTool.splineHud.removeEventListener("nodeclick", this.#Ze);
        this.release();
    };
    release = () => {
        this.#stage.splineTool.mode = "edit";
        this.#stage.cubicBezierSegHud.hide();
        this.#stage.cubicBezierSegHud.hud.dispatchEvent(new CustomEvent("release"));
    };
    #paint = (event) => {
        const { clientX, clientY, buttons } = event;
        if (buttons > 1) return;
        if (!this.#disabled) {
            this.#disabled = true;
            this.#painting(new DOMPoint(clientX, clientY));
        }
    };
    #Qe = (e) => {
        let t = e.detail;
        if (!this.#disabled && "mid" !== t.position) {
            this.#disabled = true;
            this.#painting(t);
        }
    };
    #painting = (c) => {
        let e;
        let t;
        let s;
        let i;
        let a;
        let l;
        let u;
        let o = this.#stage.currentContainer || this.#stage.currentWorkspace;
        const d = {
            fill: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-fill'),
            stroke: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke'),
            "stroke-width": getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke-width'),
        }
        let g = null;
        let h = [];
        let p = -1;
        let b = !1;
        let v = [];
        let n = new DOMPoint();
        this.#stage.splineTool.mode = "draw";
        if (c instanceof DOMPoint) {
            let e = c;
            this.#stage.cubicBezierSegHud.show(o, e, "end");
        } else {
            let e = c;
            let t = Te(e.spline);
            g = e.spline;
            b = "start" === e.position;
            h = $e(t);
            p = e.subpathIndex;
            let s = h[p];
            let i = ut(g, !0);
            let a = new DOMPoint(
                s.at(b ? 0 : -1).values.at(-2),
                s.at(b ? 0 : -1).values.at(-1)
            );
            ["R", "U"].includes(s[1]?.type) && (s = Re(s, !1));
            let l = a.matrixTransform(i);
            this.#stage.cubicBezierSegHud.show(g, l, e.position, s);
        }
        this.#stage.workspaces.addEventListener(
            "pointerup",
            (t = (event) => {
                if (event.button > 0) return;
                let t = new DOMPoint(event.clientX, event.clientY);
                null === g
                    ? c instanceof DOMPoint && Kt(c, t) >= 4 && r()
                    : Kt(n, t) < 4
                        ? S()
                        : r();
                n = t;
            })
        );
        this.#stage.splineTool.splineHud.addEventListener(
            "nodepointerup",
            (s = (e) => {
                let t = e.detail;
                if (null === g) {
                    m(t);
                    S();
                }
            })
        );
        this.#stage.splineTool.splineHud.addEventListener(
            "nodeclick",
            (i = (e) => {
                let t = e.detail;
                e.preventDefault();
                t.spline === g
                    ? t.subpathIndex === p
                        ? ((("start" === t.position && !1 === b) ||
                            ("end" === t.position && !0 === b)) &&
                            H(),
                            S())
                        : (y(t), S())
                    : (m(t), S());
            })
        );
        this.#stage.board.addEventListener(
            "redo",
            (a = () => {
                if (!1 === g?.isConnected) {
                    let e = v.find((e) => !0 === e.isConnected);
                    g = e || null;
                }
                if (null === g) {
                    h = [];
                    p = 0;
                    this.#stage.splineTool.selectedNodes = [];
                    S();
                } else {
                    let e = Te(g);
                    h = $e(e);
                    void 0 === h[p] && (p = 0);
                    let t = h.flat().indexOf(h[p].at(b ? 0 : -1));
                    let s = ut(g, !0);
                    let i = new DOMPoint(
                        h[p].at(b ? 0 : -1).values.at(-2),
                        h[p].at(b ? 0 : -1).values.at(-1)
                    ).matrixTransform(s);
                    this.#stage.splineTool.selectedNodes = [{ spline: g, index: t }];
                    this.#stage.cubicBezierSegHud.show(g, i, b ? "start" : "end", h[p]);
                }
            })
        );
        this.#stage.board.addEventListener(
            "keydown",
            (l = (e) => {
                let t = Ba.fromEvent(e);
                if (t.matches("Enter")) {
                    S();
                } else {
                    if (t.matches("Enter", "Shift")) {
                        h[p]?.length > 0 && "line" !== g.localName && H();
                        S();
                    } else {
                        if (t.matches("Escape")) {
                            e.preventDefault();
                            S();
                        }
                    }
                }
            })
        );
        this.#stage.cubicBezierSegHud.hud.addEventListener(
            "release",
            (u = () => {
                S();
            })
        );
        const r = () => {
            this.#stage.undoManager.checkpoint(
                "cubic-bezier",
                "#spline-tool.cubic-bezier"
            );
            if (null === g) {
                h = [
                    [
                        {
                            type: "M",
                            values: [
                                this.#stage.cubicBezierSegHud["x1"],
                                this.#stage.cubicBezierSegHud["y1"],
                            ],
                        },
                    ],
                ];
                p = 0;
                g = Zi("svg:path");
                o.append(g);
                ja(g, d);
            }
            ["R", "U"].includes(h[p][1]?.type) && (h[p] = Re(h[p], !1));
            !1 === b
                ? this.#stage.cubicBezierSegHud.curved
                    ? (h[p] = [
                        ...h[p],
                        {
                            type: "C",
                            values: [
                                this.#stage.cubicBezierSegHud["cx1"],
                                this.#stage.cubicBezierSegHud["cy1"],
                                this.#stage.cubicBezierSegHud["cx2"],
                                this.#stage.cubicBezierSegHud["cy2"],
                                this.#stage.cubicBezierSegHud["x2"],
                                this.#stage.cubicBezierSegHud["y2"],
                            ],
                        },
                    ])
                    : (h[p] = [
                        ...h[p],
                        {
                            type: "L",
                            values: [
                                this.#stage.cubicBezierSegHud["x2"],
                                this.#stage.cubicBezierSegHud["y2"],
                            ],
                        },
                    ])
                : this.#stage.cubicBezierSegHud.curved
                    ? (h[p] = [
                        {
                            type: "M",
                            values: [
                                this.#stage.cubicBezierSegHud["x1"],
                                this.#stage.cubicBezierSegHud["y1"],
                            ],
                        },
                        {
                            type: "C",
                            values: [
                                this.#stage.cubicBezierSegHud["cx1"],
                                this.#stage.cubicBezierSegHud["cy1"],
                                this.#stage.cubicBezierSegHud["cx2"],
                                this.#stage.cubicBezierSegHud["cy2"],
                                this.#stage.cubicBezierSegHud["x2"],
                                this.#stage.cubicBezierSegHud["y2"],
                            ],
                        },
                        ...h[p].slice(1),
                    ])
                    : (h[p] = [
                        {
                            type: "M",
                            values: [
                                this.#stage.cubicBezierSegHud["x1"],
                                this.#stage.cubicBezierSegHud["y1"],
                            ],
                        },
                        {
                            type: "L",
                            values: [
                                this.#stage.cubicBezierSegHud["x2"],
                                this.#stage.cubicBezierSegHud["y2"],
                            ],
                        },
                        ...h[p].slice(1),
                    ]);
            h[p] = Re(h[p]);
            let e = [].concat(...h);
            if ("line" === g.localName || "polyline" === g.localName) {
                let t = Zi("svg:path");
                for (let e of g.attributes)
                    !1 === ["x1", "y1", "x2", "y2", "points"].includes(e.name) &&
                        t.setAttribute(e.name, e.value);
                Ae(t, e, this.#stage.geometryPrecision);
                g.replaceWith(t);
                v.push(g, t);
                const l = structuredClone(
                    Array.from(this.#stage.selectedElements.keys())
                );
                this.#stage.selectedElements.clear();
                l.forEach((e) => {
                    this.#stage.selectedElements.set(e === g ? t : e);
                });
                g = t;
            } else "path" === g.localName && Ae(g, e, this.#stage.geometryPrecision);
            if (
                null === g.closest("defs") &&
                !Array.from(this.#stage.selectedElements.keys()).find(
                    (e) => e === g || e.contains(g)
                )
            ) {
                this.#stage.selectedElements.set(g);
            }
            let t = h.flat().indexOf(h[p].at(b ? 0 : -1));
            let s = ut(g, !0);
            let i = h[p];
            let a = new DOMPoint(
                i.at(b ? 0 : -1).values.at(-2),
                i.at(b ? 0 : -1).values.at(-1)
            ).matrixTransform(s);
            this.#stage.cubicBezierSegHud.show(g, a, b ? "start" : "end", i);
            this.#stage.splineTool.selectedNodes = [{ spline: g, index: t }];
        };
        const y = (e) => {
            this.#stage.undoManager.checkpoint(
                "cubic-bezier",
                "#spline-tool.cubic-bezier"
            );
            let t = h[p];
            let s = h[e.subpathIndex];
            h = h.filter((e) => e !== s);
            p = h.indexOf(t);
            ["R", "U"].includes(s[1]?.type) && (s = Re(s, !1));
            ((!0 === b && "start" === e.position) ||
                (!1 === b && "end" === e.position)) &&
                (s = Ie(s));
            !1 === b
                ? this.#stage.cubicBezierSegHud.curved
                    ? (h[p] = [
                        ...t,
                        {
                            type: "C",
                            values: [
                                this.#stage.cubicBezierSegHud["cx1"],
                                this.#stage.cubicBezierSegHud["cy1"],
                                this.#stage.cubicBezierSegHud["cx2"],
                                this.#stage.cubicBezierSegHud["cy2"],
                                s[0]["values"][0],
                                s[0]["values"][1],
                            ],
                        },
                        ...s.slice(1),
                    ])
                    : (h[p] = [
                        ...t,
                        { type: "L", values: [s[0].values[0], s[0].values[1]] },
                        ...s.slice(1),
                    ])
                : this.#stage.cubicBezierSegHud.curved
                    ? (h[p] = [
                        ...s,
                        ...Ie(
                            Re([
                                {
                                    type: "M",
                                    values: [
                                        this.#stage.cubicBezierSegHud["x2"],
                                        this.#stage.cubicBezierSegHud["y2"],
                                    ],
                                },
                                {
                                    type: "C",
                                    values: [
                                        this.#stage.cubicBezierSegHud["cx1"],
                                        this.#stage.cubicBezierSegHud["cy2"],
                                        this.#stage.cubicBezierSegHud["cx2"],
                                        this.#stage.cubicBezierSegHud["cy2"],
                                        this.#stage.cubicBezierSegHud["x1"],
                                        this.#stage.cubicBezierSegHud["y1"],
                                    ],
                                },
                            ])
                        ).slice(1),
                        ...h[p].slice(1),
                    ])
                    : (h[p] = [
                        ...s,
                        {
                            type: "L",
                            values: [
                                this.#stage.cubicBezierSegHud["x2"],
                                this.#stage.cubicBezierSegHud["y2"],
                            ],
                        },
                        ...h[p].slice(1),
                    ]);
            h[p] = Re(h[p]);
            let i = [].concat(...h);
            if ("path" === g.localName) Ae(g, i, this.#stage.geometryPrecision);
            else {
                let e = i
                    .map((e) => e.values)
                    .flat()
                    .map((e) => te(e, this.#stage.geometryPrecision));
                g.setAttribute("points", e.join(" "));
            }
            this.#stage.splineTool.selectedNodes = [];
        };
        const m = (e) => {
            this.#stage.undoManager.checkpoint(
                "cubic-bezier",
                "#spline-tool.cubic-bezier"
            );
            let t = g
                ? g.ownerSVGElement.querySelector(
                    'textPath[href="#' + CSS.escape(g.id) + '"]'
                )
                : null;
            let s = e.spline;
            let i = this.#stage.workspaces.querySelector(
                'textPath[href="#' + CSS.escape(s.id) + '"]'
            );
            let a = $e(Te(s));
            let l = pt(s, g || o, !0);
            if (null === g) {
                h = [
                    [
                        {
                            type: "M",
                            values: [
                                this.#stage.cubicBezierSegHud["x1"],
                                this.#stage.cubicBezierSegHud["y1"],
                            ],
                        },
                    ],
                ];
                p = 0;
                g = Zi("svg:path");
                o.append(g);
                ja(g, d);
            }
            let c = a[e.subpathIndex];
            a = a.filter((e) => e !== c);
            ["R", "U"].includes(c[1]?.type) && (c = Re(c, !1));
            "end" === e.position && (c = Ie(c));
            c = Mt(c, l);
            b && (h[p] = Ie(h[p]));
            this.#stage.cubicBezierSegHud.curved
                ? h[p].push(
                    {
                        type: "C",
                        values: [
                            this.#stage.cubicBezierSegHud["cx1"],
                            this.#stage.cubicBezierSegHud["cy1"],
                            this.#stage.cubicBezierSegHud["cx2"],
                            this.#stage.cubicBezierSegHud["cy2"],
                            c[0]["values"][0],
                            c[0]["values"][1],
                        ],
                    },
                    ...c.slice(1)
                )
                : h[p].push(
                    { type: "L", values: [c[0].values[0], c[0].values[1]] },
                    ...c.slice(1)
                );
            i && "end" === e.position && (h[p] = Ie(h[p]));
            h[p] = Re(h[p]);
            let u = [].concat(...h);
            if ("line" === g.localName || "polyline" === g.localName) {
                let t = Zi("svg:path");
                for (let e of g.attributes)
                    !1 === ["x1", "y1", "x2", "y2", "points"].includes(e.name) &&
                        t.setAttribute(e.name, e.value);
                Ae(t, u, this.#stage.geometryPrecision);
                g.replaceWith(t);
                v.push(g, t);
                const r = structuredClone(
                    Array.from(this.#stage.selectedElements.keys())
                );
                this.#stage.selectedElements.clear();
                r.forEach((e) => {
                    this.#stage.selectedElements.set(e === g ? t : e);
                });
                g = t;
            } else "path" === g.localName && Ae(g, u, this.#stage.geometryPrecision);
            if (0 === a.length) s.remove();
            else {
                let e = [].concat(...a);
                Ae(s, e, this.#stage.geometryPrecision);
            }
            if (!t && i && !1 === s.isConnected) {
                let e = this.#stage.generateUniqueID(g.localName + "-");
                g.setAttribute("id", e);
                i.setAttribute("href", "#" + e);
                i.closest("text").removeAttribute("transform");
            }
            let n = window.structuredClone(
                Array.from(this.#stage.selectedElements.keys())
            );
            !1 === s.isConnected && (n = n.filter((e) => e !== s));
            null === g.closest("defs") &&
                void 0 === n.find((e) => e === g || e.contains(g)) &&
                n.push(g);
            this.#stage.selectedElements.sets(n);
        };
        const H = () => {
            this.#stage.undoManager.checkpoint(
                "cubic-bezier",
                "#spline-tool.cubic-bezier"
            );
            let t = h[p];
            if (!1 === b)
                this.#stage.cubicBezierSegHud.curved
                    ? t.push(
                        {
                            type: "C",
                            values: [
                                this.#stage.cubicBezierSegHud["cx1"],
                                this.#stage.cubicBezierSegHud["cy1"],
                                this.#stage.cubicBezierSegHud["cx2"],
                                this.#stage.cubicBezierSegHud["cy2"],
                                t[0].values[0],
                                t[0].values[1],
                            ],
                        },
                        { type: "Z", values: [] }
                    )
                    : t["push"](
                        { type: "L", values: [t[0].values[0], t[0].values[1]] },
                        { type: "Z", values: [] }
                    );
            else {
                let e = new DOMPoint(t.at(-1).values.at(-2), t.at(-1).values.at(-1));
                this.#stage.cubicBezierSegHud.curved
                    ? t.push(
                        ...Ie(
                            Re([
                                {
                                    type: "M",
                                    values: [
                                        this.#stage.cubicBezierSegHud.x2,
                                        this.#stage.cubicBezierSegHud.y2,
                                    ],
                                },
                                {
                                    type: "C",
                                    values: [
                                        this.#stage.cubicBezierSegHud.cx1,
                                        this.#stage.cubicBezierSegHud.cy1,
                                        this.#stage.cubicBezierSegHud["cx2"],
                                        this.#stage.cubicBezierSegHud["cy2"],
                                        e["x"],
                                        e["y"],
                                    ],
                                },
                            ])
                        )["slice"](1),
                        { type: "Z", values: [] }
                    )
                    : t["push"](
                        {
                            type: "L",
                            values: [
                                this.#stage.cubicBezierSegHud.x2,
                                this.#stage.cubicBezierSegHud.y2,
                            ],
                        },
                        { type: "Z", values: [] }
                    );
            }
            h[p] = Re(h[p]);
            let e = [].concat(...h);
            if ("line" === g.localName) {
                let t = Zi("svg:path");
                for (let e of g.attributes)
                    !1 === ["x1", "y1", "x2", "y2"].includes(e.name) &&
                        t.setAttribute(e.name, e.value);
                Ae(t, e, this.#stage.geometryPrecision);
                g.replaceWith(t);
                v.push(g, t);
                const s = structuredClone(
                    Array.from(this.#stage.selectedElements.keys())
                );
                this.#stage.selectedElements.clear();
                s.forEach((e) => {
                    this.#stage.selectedElements.set(e === g ? t : e);
                });
                g = t;
            } else {
                if ("polyline" === g.localName) {
                    let t = Zi("svg:path");
                    for (let e of g.attributes)
                        !1 === ["points"].includes(e.name) &&
                            t.setAttribute(e.name, e.value);
                    Ae(t, e, this.#stage.geometryPrecision);
                    g.replaceWith(t);
                    const s = structuredClone(
                        Array.from(this.#stage.selectedElements.keys())
                    );
                    this.#stage.selectedElements.clear();
                    s.forEach((e) => {
                        this.#stage.selectedElements.set(e === g ? t : e);
                    });
                    g = t;
                } else
                    "path" === g.localName && Ae(g, e, this.#stage.geometryPrecision);
            }
            this.#stage.splineTool.selectedNodes = [];
        };
        const S = () => {
            this.#stage.workspaces.removeEventListener("pointerdown", e);
            this.#stage.workspaces.removeEventListener("pointerup", t);
            this.#stage.splineTool.splineHud.removeEventListener("nodepointerup", s);
            this.#stage.splineTool.splineHud.removeEventListener("nodeclick", i);
            this.#stage.board.removeEventListener("redo", a);
            this.#stage.board.removeEventListener("keydown", l);
            this.#stage.cubicBezierSegHud.hud.removeEventListener("release", u);
            this.#stage.splineTool.mode = "edit";
            this.#stage.cubicBezierSegHud.hide();
            this.#disabled = false;
        };
    }
}
export default PenTool;
