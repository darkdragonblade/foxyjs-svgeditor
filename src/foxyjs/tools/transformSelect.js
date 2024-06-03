import { g, ci, di, pi, xi, ct, ut, Kt, qt, Yi, te, ns } from "../utils/common";
import ee from "../utils/ee";
const Aa = Symbol();
class TransformSelect {
    #stage;
    #Q;
    #ue;
    #xe;
    #me;
    #disabled = false;
    constructor(stage) {
        this.#stage = stage;
    }
    enable = () => {
        this.#stage.rubberBand.enabled = true;
        this.#stage.board.style.cursor = "auto";
        this.#stage.workspaces.addEventListener(
            "contextmenu",
            (this.#xe = (e) => {
                this.#contextmenu(e);
            })
        );
        this.#stage.workspaces.addEventListener(
            "pointerdown",
            (this.#me = (e) => {
                this.#be(e);
            })
        );
    }
    disable = () => {
        this.#stage.rubberBand.enabled = false;
        this.#stage.workspaces.removeEventListener("contextmenu", this.#xe);
        this.#stage.workspaces.removeEventListener("pointerdown", this.#me);
    }
    #contextmenu = (e) => {
        let l = this.#stage.getHitWorkspaceElements(e.clientX, e.clientY);
        if (l.length > 0) {
            let e = l[l.length - 1];
            let t = this.#we(e);
            let s = this.#stage.selectedElements.has(e);
            for (let e of t) this.#stage.selectedElements.has(e) && (s = !0);
            !1 === s && this.#ve(e);
            this.#stage.board.dispatchEvent(new CustomEvent("nativecontextmenu"));
        } else this.#ye(e);
    }
    #be(a) {
        const {
            buttons: e,
            isPrimary: t,
            clientX: s,
            clientY: l,
            pointerType: i,
            target: n,
        } = a;
        if (e > 1 || !1 === t) return;
        let r;
        let o;
        let h = n;
        let c = new DOMPoint(s, l);
        let g = c;
        let m = "touch" === i ? 9 : 3;
        this.#disabled = false;
        window.addEventListener(
            "pointermove",
            (r = (s) => {
                if (s.pointerId !== a.pointerId) return;
                let e = new DOMPoint(s.clientX, s.clientY);
                let t = s.timeStamp - a.timeStamp;
                let l = Kt(c, e) > m || t > 80;
                let i = !1 === qt(g, e, null);
                g = e;
                if (!0 === l && !0 === i) {
                    window.removeEventListener("pointermove", r);
                    this.#disabled = true;
                    let e = new ee(s.clientX - a.clientX, s.clientY - a.clientY);
                    let t = Math.abs(e.x) > Math.abs(e.y) ? "horizontal" : "vertical";
                    this.#ke(a, s, t);
                }
            })
        );
        window.addEventListener(
            "pointerup",
            (o = (e) => {
                if (e.pointerId !== a.pointerId) return;
                window.removeEventListener("pointermove", r);
                window.removeEventListener("pointerup", o);
                let t = new DOMPoint(e.clientX, e.clientY);
                Kt(c, t) < m && this.#Ce(h, e);
            })
        );
    }
    #ke = (e, t, s) => {
        let l = this.#stage.getHitWorkspaceElements(t.clientX, t.clientY);
        l.length > 0 ? this.#Se(t, l[l.length - 1], s) : this.#Me(e);
    }
    #Pe = (e) => {
        let t = e.querySelector("textPath");
        let s = null;
        t?.hasAttribute("href") &&
            (s = this.#stage.workspaces.querySelector(t.href.baseVal));
        return s;
    }
    #Se = (a, t, n) => {
        this.#stage.undoManager.checkpoint("move", "#transform-tool");
        let s = this.#we(t);
        let l = !1;
        this.#stage.selectedElements.has(t) && (l = !0);
        for (let e of s) this.#stage.selectedElements.has(e) && (l = !0);
        if (!l) {
            this.#stage.transformTool.mode = "scale";
            if (0 === s.length) {
                this.#stage.currentContainer = void 0;
                this.#stage.selectedElements.clear(false);
                this.#stage.selectedElements.set(t);
            } else {
                let e = this.#De(t, this.#stage.currentContainer);
                for (
                    ;
                    t.parentNode !== e && t.parentNode !== this.#stage.currentWorkspace;

                )
                    t = t.parentNode;
                this.#stage.selectedElements.clear(false);
                this.#stage.selectedElements.set(t);
            }
        }
        if (this.#stage.altKey) {
            this.#stage.insertArtwork(
                this.#stage.extractArtworkWithSelectedElements(),
                "original"
            );
            t = Array.from(this.#stage.selectedElements.keys())[0];
        }
        const e = this.#stage.board;
        let i;
        let r;
        let c = [];
        for (let l of Array.from(this.#stage.selectedElements.keys())) {
            const o = l;
            if ("text" === o.localName) {
                let e = this.#Pe(l);
                if (e && this.#stage.selectedElements.has(e)) continue;
            }
            let e = ut(o);
            let t = e.inverse();
            let s = ct(o).multiplySelf(t);
            o[Aa] = { clientToUserTransform: e, initialClientTransform: s };
            c.push(l);
        }
        e.style.cursor = "move";
        this.#stage.snapManager.snapStart();
        window.addEventListener(
            "pointermove",
            (i = (e) => {
                if (e.pointerId !== a.pointerId) return;
                let o = e.clientX - a.clientX;
                let h = e.clientY - a.clientY;
                let t = this.#stage.shiftKey;
                t && ("vertical" === n ? (o = 0) : "horizontal" === n && (h = 0));
                for (let l of c) {
                    let { clientToUserTransform: e, initialClientTransform: t } = l[Aa];
                    let s = DOMMatrix.fromMatrix(t);
                    s.translateSelf(o, h);
                    s.multiplySelf(e);
                    l.setAttribute("transform", s.toString());
                }
                if (this.#stage.manualManager.enabled || this.#stage.smartManager.enabled || this.#stage.gridManager.enabled) {
                    let e = c.map((e) => Yi(e));
                    let n = ci(e);
                    let r = this.#stage.snapManager.snapBBox(n);
                    if (
                        !1 ===
                        ((e, t, s = null) =>
                            null !== s
                                ? te(e["x"], s) === te(t["x"], s) &&
                                te(e["y"], s) === te(t["y"], s) &&
                                te(e.width, s) === te(t.width, s) &&
                                te(e.height, s) === te(t.height, s)
                                : e["x"] === t["x"] &&
                                e["y"] === t["y"] &&
                                e.width === t.width &&
                                e.height)(n, r)
                    )
                        for (let a of c) {
                            let { clientToUserTransform: e, initialClientTransform: t } =
                                a[Aa];
                            let s = r["x"] - n["x"];
                            let l = r["y"] - n["y"];
                            let i = DOMMatrix.fromMatrix(t);
                            i.translateSelf(o + s, h + l);
                            i.multiplySelf(e);
                            a.setAttribute("transform", i.toString());
                        }
                }
            })
        );
        window.addEventListener(
            "pointerup",
            (r = () => {
                window.removeEventListener("pointermove", i);
                window.removeEventListener("pointerup", r);
                e.style.cursor = "auto";
                this.#stage.snapManager.snapEnd();
            })
        );
    }
    async #Me(e) {
        let t = "rect";
        let l = "intersect";
        let i = this.#stage.currentContainer || this.#stage.currentWorkspace;
        let a = ut(this.#stage.currentWorkspace).inverse();
        let n = [];
        if ("rect" === t) {
            let s = await this.#stage.rubberBand.grabSelection(e);
            for (let t of i.children)
                if ([...g, "svg", "g", "a", "use"].includes(t.localName)) {
                    let e = di(Yi(t), a);
                    !1 === (0 === e.width && 0 === e.height) &&
                        ("contain" === l
                            ? pi(s, e) && n.push(t)
                            : "intersect" === l && xi(s, e) && n.push(t));
                }
        }
        if (!this.#stage.shiftKey) this.#stage.selectedElements.clear(false);
        this.#stage.selectedElements.sets(n);
    }
    #Ce(e, t) {
        if (t.button > 0 || this.#disabled) return;
        let s = this.#stage.board.querySelector("#transform-hud");
        let l = this.#stage.getHitWorkspaceElements(t.clientX, t.clientY);
        if (l.length > 0) {
            let s = l[l.length - 1];
            if (this.#stage.pointerClickCount % 2 === 1) {

                this.#stage.isSelectableElement(s) && this.#ve(s);
            }
            else {
                if (this.#stage.pointerClickCount % 2 === 0) {
                    const i = this.#ze(s);
                    if (i) {
                        this.#stage.currentContainer = i;
                        this.#stage.selectedElements.clear();
                    } else {
                        if ("use" === s.localName) {
                            let e = s.href.baseVal.trim();
                            let t = null;
                            e.length > 1 &&
                                (t = this.#stage.workspaces.querySelector(
                                    "#" + CSS.escape(e.substring(1))
                                ));
                            if ("symbol" === t?.localName) {
                                let e = t;
                            } else {
                                this.#stage.transformTool.mode = "scale";
                                this.#stage.toggleTool("edit-tool");
                            }
                        } else {
                            if ("text" === s.localName) {
                                this.#stage.transformTool.mode = "scale";
                                this.#stage.toggleTool("text-tool");
                            } else {
                                this.#stage.transformTool.mode = "scale";
                            }
                        }
                    }
                }
            }
        } else this.#ye(t);
    }
    #ve = (l) => {
        let e = this.#stage.board;
        let t = this.#stage.ctrlKey;
        let s = this.#stage.shiftKey;
        let i = this.#we(l);
        let hasSelected = this.#stage.selectedElements.has(l);
        for (let e of i) this.#stage.selectedElements.has(e) && (hasSelected = true);

        if (t || s) {
            if (!t && s) {
                if (0 === i.length) {
                    this.#stage.currentContainer = void 0;
                    if (this.#stage.selectedElements.has(l)) {
                        this.#stage.selectedElements.delete(l);
                    } else {
                        this.#stage.selectedElements.set(l);
                    }
                } else {
                    if (this.#stage.currentContainer?.contains(l)) {
                        for (; l.parentNode !== this.#stage.currentContainer;)
                            l = l.parentNode;
                        if (this.#stage.selectedElements.has(l)) {
                            this.#stage.selectedElements.delete(l);
                        } else {
                            this.#stage.selectedElements.set(l);
                        }
                    } else {
                        let e = this.#De(l, this.#stage.currentContainer);
                        for (
                            ;
                            l.parentNode !== e &&
                            l.parentNode !== this.#stage.currentWorkspace;

                        )
                            l = l.parentNode;
                        this.#stage.currentContainer = e;
                        if (this.#stage.selectedElements.has(l)) {
                            this.#stage.selectedElements.delete(l);
                        } else {
                            this.#stage.selectedElements.set(l);
                        }
                    }
                }
            } else {
                if (t && !s) {
                    let t = null;
                    for (
                        let e = l.parentElement;
                        e !== this.#stage.currentWorkspace;
                        e = e.parentElement
                    )
                        if ("g" === e.localName || "a" === e.localName) {
                            t = e;
                            break;
                        }
                    this.#stage.currentContainer = t;
                    this.#stage.selectedElements.clear(false);
                    this.#stage.selectedElements.set(l);
                } else {
                    if (t && s) {
                        let t = this.#stage.currentContainer;
                        let s = Array.from(this.#stage.selectedElements.keys());
                        s = s.includes(l) ? s.filter((e) => e !== l) : [...s, l];
                        if (0 === s.length) t = void 0;
                        else {
                            for (
                                let e = s[0].parentElement;
                                e !== this.#stage.currentWorkspace;
                                e = e.parentElement
                            )
                                if ("g" === e.localName || "a" === e.localName) {
                                    t = e;
                                    break;
                                }
                        }
                        this.#stage.currentContainer = t;
                    }
                }
            }
        } else {
            if (hasSelected) {
                const canEdit = this.#stage.transformTool.canEdit;
                if ("scale" === this.#stage.transformTool.mode && canEdit) {
                    this.#stage.transformTool.mode = "rotate-and-skew";
                } else {
                    this.#stage.transformTool.mode = "scale";
                }
            } else {
                this.#stage.transformTool.mode = "scale";
                if (0 === i.length) {
                    this.#stage.currentContainer = void 0;
                    this.#stage.selectedElements.clear(false);
                    this.#stage.selectedElements.set(l);
                } else {
                    let t = this.#stage.currentContainer;
                    if (t?.contains(l)) {
                        for (; l.parentNode !== t;) l = l.parentNode;
                        this.#stage.selectedElements.clear(false);
                        this.#stage.selectedElements.set(l);
                    } else {
                        let e = this.#De(l, t);
                        for (
                            ;
                            l.parentNode !== e &&
                            l.parentNode !== this.#stage.currentWorkspace;
                        )
                            l = l.parentNode;
                        this.#stage.currentContainer = e;
                        this.#stage.selectedElements.clear(false);
                        this.#stage.selectedElements.set(l);
                    }
                }
            }
        }
    }
    #ye = (e) => {
        if (e.buttons > 1) return;
        if (!this.#stage.ctrlKey && !this.#stage.shiftKey) {
            2 === this.#stage.pointerClickCount &&
                (this.#stage.currentContainer = void 0);
            this.#stage.selectedElements.clear();
        }
    }
    #we = (e) => {
        let t = [];
        if (e !== this.#stage.currentWorkspace) {
            for (
                ;
                e.parentElement && e.parentElement !== this.#stage.currentWorkspace;
            ) {
                e = e.parentElement;
                ["g", "a"].includes(e.localName) && t.unshift(e);
            }
        }
        return t;
    }
    #ze(t) {
        let s = [];
        for (
            let e = t.parentElement;
            e !== this.#stage.currentWorkspace && e !== this.#stage.currentContainer;
            e = e.parentElement
        )
            ("g" !== e.localName && "a" !== e.localName) || s.push(e);
        return s.length > 0 ? s[s.length - 1] : null;
    }
    #De = (e, t) => {
        let s = ns(e, t);
        if (s) {
            for (; !1 === ["g", "a"].includes(s.localName);) s = s.parentNode;
        }
        return s;
    };
}
export default TransformSelect;
