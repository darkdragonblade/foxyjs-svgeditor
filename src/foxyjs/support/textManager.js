import {
    $i,
    Ri,
    Ti,
    Ai,
    be,
    Fi,
    Gi,
    te,
    _i,
    Ml,
    Pl,
    pt,
    Oo,
    dc,
} from "../utils/common";
import Cl from "../utils/Cl";
class TextManager {
    #stage;
    constructor(stage) {
        this.#stage = stage;
    }
    canEdit = () => {
        return this.#jy();
    };
    bold = () => {
        this.#Hy();
    };
    isBold = () => {
        return this.#Vy();
    };
    italic = () => {
        this.#Yy();
    };
    isItalic = () => {
        return this.#Wy();
    };
    decreaseFontSize = () => {
        this.#qy("decrease");
    };
    increaseFontSize = () => {
        this.#qy("increase");
    };
    underline = () => {
        this.#Zy("underline");
    };
    isUnderline = () => {
        return this.#Xy("underline");
    };
    lineThrough = () => {
        this.#Zy("line-through");
    };
    isLineThrough = () => {
        return this.#Xy("lineThrough");
    };
    overline = () => {
        this.#Zy("overline");
    };
    isOverline = () => {
        return this.#Xy("overline");
    };
    decreaseLetterSpacing = () => {
        this.#tk("decrease");
    };
    increaseLetterSpacing = () => {
        this.#tk("increase");
    };
    resetLetterSpacing = () => {
        this.#tk("reset");
    };
    canResetLetterSpacing = () => {
        return this.#ik();
    };
    decreaseWordSpacing = () => {
        this.#sk("decrease");
    };
    increaseWordSpacing = () => {
        this.#sk("increase");
    };
    resetWordSpacing = () => {
        this.#sk("reset");
    };
    canResetWordSpacing = () => {
        return this.#nk();
    };
    decreaseLineSpacing = () => {
        this.#ok("decrease");
    };
    increaseLineSpacing = () => {
        this.#ok("increase");
    };
    resetLineSpacing = () => {
        this.#ok("reset");
    };
    canResetLineSpacing = () => {
        return this.#ak();
    };
    #Hy = (e = null) => {
        const t = this.#stage.selectedTextRange;
        const s = this.#vh();
        const [n] = this.#vh(!0);
        const l = n[0];
        const o = Ml(getComputedStyle(l).getPropertyValue("font-weight"));
        const i = "400" === Pl(o, ["400", "700"]) ? "700" : "400";
        this.#stage.undoManager.checkpoint("font-weight.named-" + i, e);
        for (let e of s) {
            Ti(e, t);
            const r = e.querySelectorAll("tspan");
            const a = $i(t, e);
            const c = a.length > 0 && !t.collapsed ? a : r;
            for (let e of c) e.style.setProperty("font-weight", i);
            Ai(e, t);
        }
    };
    #Yy(e = null) {
        const t = this.#stage.selectedTextRange;
        const s = this.#vh();
        const [n] = this.#vh(!0);
        const l =
            "normal" === n[0].computedStyleMap().get("font-style").value
                ? "italic"
                : "normal";
        this.#stage.undoManager.checkpoint("font-style." + l, e);
        for (let e of s) {
            Ti(e, t);
            const o = e.querySelectorAll("tspan");
            const i = $i(t, e);
            const r = i.length > 0 && !t.collapsed ? i : o;
            for (let e of r) e.attributeStyleMap.set("font-style", l);
            Ai(e, t);
        }
    }
    #Vy = () => {
        const [e] = this.#vh(!0);
        if (e.length > 0) {
            const t = e[0];
            const s = Ml(getComputedStyle(t).getPropertyValue("font-weight"));
            return "700" === Pl(s, ["400", "700"]);
        }
        return !1;
    };
    #Wy = () => {
        const [e] = this.#vh(!0);
        if (e.length > 0) {
            const t = e[0].computedStyleMap().get("font-style").value;
            return "italic" === t || "oblique" === t;
        }
        return !1;
    };
    #Xy(e = "underline") {
        const [t, s] = this.#vh(!0);
        const [n] = s;
        if (n)
            return getComputedStyle(n)
                .getPropertyValue("text-decoration")
                .includes(e);
        return !1;
    }
    #qy = (t = "increase", e = null) => {
        this.#stage.undoManager.checkpoint("font-size" + t, e);
        const s = this.#vh();
        const n = this.#stage.selectedTextRange;
        for (let e of s) {
            Ti(e, n);
            const l = e.querySelectorAll("tspan");
            const o = $i(n, e);
            const i = o.length > 0 && !n.collapsed ? o : l;
            for (let e of i.length > 0 ? i : l) {
                const r = e.computedStyleMap().get("font-size").value;
                "decrease" === t
                    ? e.attributeStyleMap.set("font-size", CSS.px(r - 1))
                    : "increase" === t &&
                    e.attributeStyleMap.set("font-size", CSS.px(r + 1));
            }
            Ai(e, n);
        }
    };
    #Zy = (l = "underline", e = null) => {
        const t = this.#stage.selectedTextRange;
        const s = this.#vh();
        this.#vh(!0);
        let n = "#text-decoration." + l;
        let o = null;
        this.#stage.undoManager.checkpoint(n, e);
        for (let e of s) {
            Ti(e, t);
            const i = [];
            if (t && e.contains(t["commonAncestorContainer"])) {
                const r = e.querySelectorAll("tspan");
                const a = $i(t, e);
                const c = t.collapsed ? r : a;
                i.push(...c);
            } else i.push(e);
            for (let n of i) {
                const h = getComputedStyle(n).getPropertyValue("text-decoration");
                let e = h.includes("underline");
                let t = h.includes("line-through");
                let s = h.includes("overline");
                null === o && (o = { underline: e, "line-through": t, overline: s });
                "underline" === l
                    ? (e = !o[l])
                    : "line-through" === l
                        ? (t = !o[l])
                        : "overline" === l && (s = !o[l]);
                const p = [];
                e && p.push("underline");
                t && p.push("line-through");
                s && p.push("overline");
                0 === p.length
                    ? n.style.removeProperty("text-decoration")
                    : n.style.setProperty("text-decoration", p.join(" "));
            }
            Ai(e, t);
        }
        !0 === o[l] && (n = "#text-decoration.remove-" + l);
    };
    #ek = async (e = null) => { };
    #tk = (t = "increase", e = null) => {
        this.#stage.undoManager.checkpoint("letter-spacing" + t, e);
        const s = this.#vh();
        const n = this.#stage.selectedTextRange;
        for (let e of s) {
            Ti(e, n);
            const l = e.querySelectorAll("tspan");
            const o = $i(n, e);
            const i = o.length > 0 && !n.collapsed ? o : l;
            for (let e of i.length > 0 ? i : l) {
                const r = e.computedStyleMap().get("letter-spacing");
                const a = r ? r.value : 0;
                "decrease" === t
                    ? e.style.setProperty("letter-spacing", CSS.px(a - 1))
                    : "increase" === t
                        ? e.style.setProperty("letter-spacing", CSS.px(a + 1))
                        : "reset" === t && e.style.setProperty("letter-spacing", CSS.px(0));
            }
            Ai(e, this.#stage.selectedTextRange);
        }
    };
    #sk = (n = "increase", e = null) => {
        this.#stage.undoManager.checkpoint("word-spacing" + n, e);
        const t = this.#vh();
        const s = this.#stage.selectedTextRange;
        for (let e of t) {
            Ti(e, s);
            const l = e.querySelectorAll("tspan");
            const o = $i(s, e);
            const i = o.length > 0 && !s.collapsed ? o : l;
            for (let s of i.length > 0 ? i : l) {
                let e = s.computedStyleMap().get("word-spacing");
                let t = e ? e.value : 0;
                "decrease" === n
                    ? s.style.setProperty("word-spacing", CSS.px(t - 1))
                    : "increase" === n
                        ? s.style.setProperty("word-spacing", CSS.px(t + 1))
                        : "reset" === n && s.style.setProperty("word-spacing", CSS.px(0));
            }
            Ai(e, this.#stage.selectedTextRange);
        }
    };
    #ok = (s = "increase", e = null) => {
        this.#stage.undoManager.checkpoint("line-spacing" + s, e);
        const t = this.#vh();
        t.filter((e) => Fi(e));
        for (let e of t)
            for (let t of e.querySelectorAll("tspan"))
                if (_i(t)) {
                    let e = t.dy.baseVal[0].valueInSpecifiedUnits;
                    "decrease" === s
                        ? t.setAttribute(
                            "dy",
                            te(e - 0.1, this.#stage.geometryPrecision) + "em"
                        )
                        : "increase" === s
                            ? t.setAttribute(
                                "dy",
                                te(e + 0.1, this.#stage.geometryPrecision) + "em"
                            )
                            : "reset" === s && t.setAttribute("dy", "1em");
                }
    };
    #ik = () => {
        const [e] = this.#vh(!0);
        const t = e
            .map((e) => e.computedStyleMap().get("letter-spacing"))
            .map((e) => (e ? e.value : 0));
        return t.length > 0 && !1 === be(t, 0);
    };
    #nk = () => {
        const [e] = this.#vh(!0);
        const t = e
            .map((e) => e.computedStyleMap().get("word-spacing"))
            .map((e) => (e ? e.value : 0));
        return t.length > 0 && !1 === be(t, 0);
    };
    #ak = () => {
        const e = this.#vh();
        e.filter((e) => Fi(e));
        const s = [];
        for (let t of e)
            for (let e of t.querySelectorAll("tspan"))
                _i(e) && s.push(e.dy.baseVal[0].valueInSpecifiedUnits);
        return s.length > 0 && !1 === be(s, 1);
    };
    #jy = () => {
        return Array.from(this.#stage.selectedElements.keys()).find((e) => {
            e.localName === "text" || e.querySelector("text");
        });
    };
    #vh = (e = !1) => {
        const s = [];
        const n = (t) => {
            for (let e of t)
                "text" === e.localName
                    ? s.push(e)
                    : ("g" !== e.localName && "a" !== e.localName) || n(e.children);
        };
        n(Array.from(this.#stage.selectedElements.keys()));
        if (!1 === e) return s;
        {
            const l = [];
            const o = [];
            const i = this.#stage.selectedTextRange;
            for (let e of s) {
                let s = Ri(e);
                if (i?.intersectsNode(e)) {
                    "backward" === i.direction && s.reverse();
                    for (let t of s)
                        if (i.intersectsNode(t)) {
                            let e = t.closest("tspan, text");
                            l.includes(t.parentElement) || l.push(t.parentElement);
                            o.includes(e) || o.push(e);
                        }
                } else {
                    for (let e of s)
                        l.includes(e.parentElement) || l.push(e.parentElement);
                    o.push(e);
                }
            }
            return [l, o];
        }
    };
    #ph = (e) => { };
    #transform = () => { };
    anchor = (e) => {
        this.#uh(e);
    };
    #uh = (t = "start") => {
        this.#stage.undoManager.checkpoint("text-anchor" + t, null);
        for (let e of this.#vh()) {
            if (!1 === (null !== e.querySelector("textPath"))) {
                e.style.setProperty("text-anchor", t);
                dc("text-anchor", e);
            }
        }
    };
    fontSize = (e) => {
        this.#dh(e);
    };
    #dh = (t = 13) => {
        const s = Symbol();
        const n = Symbol();
        const l = this.#vh();
        const o = this.#stage.selectedTextRange;
        this.#stage.undoManager.checkpoint("font-size", null);
        for (let e of l) {
            Ti(e, o);
            const i = e.querySelectorAll("tspan");
            const r = $i(o, e);
            const a = r.length > 0 && !o.collapsed ? r : i;
            e[s] = a;
            e[n] = Oo(pt(e, this.#stage.currentWorkspace).inverse()).scaleY;
            const c = e[s];
            const h = e[n];
            const p = t * h;
            if (c.length > 0) {
                for (let e of c) e.style.setProperty("font-size", p);
            } else e.style.setProperty("font-size", p);
        }
    };
    letterSpacing = (e) => {
        this.#gh(e);
    };
    #gh = (s = 0) => {
        const t = this.#vh();
        const n = this.#stage.selectedTextRange;
        const l = Symbol();
        this.#stage.undoManager.checkpoint("letter-spacing", null);
        for (let e of t) {
            Ti(e, n);
            const o = e.querySelectorAll("tspan");
            const i = $i(n, e);
            const r = i.length > 0 && !n.collapsed ? i : o;
            e[l] = r;
            let t = e[l];
            if (t.length > 0) {
                for (let e of t) e.style.setProperty("letter-spacing", s);
            } else e.style.setProperty("letter-spacing", s);
        }
    };
    wordSpacing = (e) => {
        this.#fh(e);
    };
    #fh = (t = 0) => {
        const s = this.#vh();
        const n = this.#stage.selectedTextRange;
        const l = Symbol();
        this.#stage.undoManager.checkpoint("word-spacing", null);
        for (let e of s) {
            Ti(e, n);
            const o = e.querySelectorAll("tspan");
            const i = $i(n, e);
            const r = i.length > 0 && !n.collapsed ? i : o;
            e[l] = r;
            const a = e[l];
            if (a.length > 0) {
                for (let e of a) e.style.setProperty("word-spacing", t);
            } else e.style.setProperty("word-spacing", t);
        }
    };
    lineSpacing = (e) => {
        this.#bh(e);
    };
    #bh = (s = 0) => {
        let e = this.#vh();
        let n = Symbol();
        this.#stage.undoManager.checkpoint("line-spacing", null);
        for (let t of e) {
            t[n] = [];
            for (let e of t.querySelectorAll("tspan")) _i(e) && t[n].push(e);
        }
        for (let t of e) for (let e of t[n]) e.setAttribute("dy", s + 1 + "em");
    };
    get() {
        let fontFamily = "System";
        let t = false;
        let s = 28;
        let n = false;
        let l = false;
        let o = false;
        let i = false;
        let r = false;
        let a = false;
        let c = false;
        let h = false;
        let p = false;
        let g = false;
        let u = false;
        let d;
        let f = false;
        let y = 0;
        let S = false;
        let m = 0;
        let v = false;
        let x = 0;
        let k = false;
        let P = [];
        let M = [];
        let T = this.#vh();
        let b = Symbol();
        let A = this.#stage.selectedTextRange;

        for (let e of T) {
            let s = Ri(e);
            if (A?.intersectsNode(e)) {
                "backward" === A.direction && s.reverse();
                for (let t of s)
                    if (A.intersectsNode(t)) {
                        let e = t.closest("tspan, text");
                        P.includes(t.parentElement) || P.push(t.parentElement);
                        M.includes(e) || M.push(e);
                    }
            } else {
                for (let e of s) P.includes(e.parentElement) || P.push(e.parentElement);
                M.push(e);
            }
        }
        for (let e of new Set([...P, ...M])) e[b] = getComputedStyle(e);
        let [w, ...$] = P;
        if (w) {
            const z = w[b];
            const L = Cl.fromString(z.getPropertyValue("font-family"))?.items[0];
            const F = window.CSSUnitValue.parse(
                z.getPropertyValue("font-size")
            ).value;
            z.getPropertyValue("font-variant");
            const E = z.getPropertyValue("font-style");
            const X = Ml(z.getPropertyValue("font-weight"));
            const Y = Pl(X, ["400", "700"]);
            const _ = pt(w.closest("text"), this.#stage.currentWorkspace);
            const { scaleY: j } = Oo(_);
            const B = te(F * Math.abs(j), 2);
            t = !1;
            // e = '"' + L + '"';
            fontFamily = L;
            n = !1;
            s = B;
            o = !1;
            l = Number(Y) >= 700;
            r = !1;
            i = "italic" === E;
        } else {
            t = !0;
            fontFamily = "System";
            n = !0;
            s = 13;
            o = !0;
            l = !1;
            r = !0;
            i = !1;
        }
        let [q, ...N] = M;
        if (q) {
            let e = q[b].getPropertyValue("text-decoration");
            c = !1;
            p = !1;
            u = !1;
            a = e.includes("underline");
            h = e.includes("line-through");
            g = e.includes("overline");
        } else {
            c = !0;
            p = !0;
            u = !0;
            a = !1;
            h = !1;
            g = !1;
        }
        let [C, ...W] = T;
        let Z = T.filter((e) => null !== e.querySelector("textPath"));
        if (C && Z.length < T.length) {
            let e = getComputedStyle(C).getPropertyValue("text-anchor");
            f = !1;
            d = e;
        } else {
            d = null;
            f = !0;
        }
        let [R, ...O] = P;
        if (R) {
            let e = R[b].getPropertyValue("letter-spacing");
            let t = R[b].getPropertyValue("word-spacing");
            e = "normal" === e ? 0 : parseFloat(e);
            t = "normal" === t ? 0 : parseFloat(t);
            y = te(e, 2);
            S = !1;
            m = te(t, 2);
            v = !1;
        } else {
            y = 0;
            S = !0;
            m = 0;
            v = !0;
        }
        let U = T.filter((e) => Fi(e));
        let [V, ...I] = U;
        if (V) {
            let e = Gi(V);
            x = e;
            k = !1;
        } else {
            x = 0;
            k = !0;
        }
        return {
            fontFamily,
            disFontFamily: t,
            fontSize: s,
            disFontSize: n,
            isBold: l,
            disBold: o,
            isItalic: i,
            disItalic: r,
            isUnderline: a,
            disUnderline: c,
            isLineThrough: h,
            disLineThrough: p,
            isOverline: g,
            disOverline: u,
            anchor: d,
            disAnchor: f,
            letterSpacing: y,
            disLetterSpacing: S,
            wordSpacing: m,
            disWordSpacing: v,
            lineSpacing: x,
            disLineSpacing: k,
        };
    }
}
export default TextManager;
