import { w, Ti, $i, Ri, Wn, Hn, Yn } from "../utils/common";
class StyleManager {
    #stage;
    constructor(stage) {
        this.#stage = stage;
    }
    set = (property, value) => {
        this.#stage.undoManager.checkpoint("style", `${property}-panel`);
        const e = this.#Ra();
        const s = e.filter((e) => "text" === e.localName);
        const a = this.#stage.selectedTextRange;
        let n = [];
        for (let e of s) Ti(e, a);
        for (let s of e)
            if ("text" === s.localName && s.querySelector("tspan")) {
                let e = s.querySelectorAll("tspan");
                let t = $i(a, s);
                let l = t.length > 0 && !a.collapsed ? t : e;
                n.push(...l);
            } else n.push(s);
        for (let e of n) {
            e.style.setProperty(property, value);
        }
    };
    get = (property) => {
        return this.#Z(property);
    };
    #Ra = () => {
        let l = [];
        const s = (t) => {
            for (let e of t)
                w.includes(e.localName) || "use" === e.localName
                    ? l.push(e)
                    : ("g" !== e.localName && "a" !== e.localName) || s(e.children);
        };
        s(Array.from(this.#stage.selectedObjectElements.keys()));
        return l;
    };
    #Z = (l = "fill") => {
        let s = [];
        let a = [];
        let n = null;
        let i = null;
        let e = null;
        let r = this.#stage.selectedTextRange;
        for (let e of this.#Ra())
            if ("text" === e.localName) {
                let t = Ri(e);
                if (r.intersectsNode(e)) {
                    "backward" === r.direction && t.reverse();
                    for (let e of t)
                        r.intersectsNode(e) &&
                            !1 === a.includes(e.parentElement) &&
                            a.push(e.parentElement);
                } else {
                    for (let e of t)
                        !1 === a.includes(e.parentElement) && a.push(e.parentElement);
                }
            } else a.push(e);
        a.length > 0 && (n = a[0]);
        if (s.length > 0) {
            let t = s[0].closest("linearGradient, radialGradient");
            let e = a.find((e) => Wn(e, l) === t);
            e && (n = e);
        }
        if (n) {
            i = Hn(n, l);
            e = Wn(n, l);
        }
        if (n) {
            let e = i;
            let t = Yn(a, l);
        } else {
        }
        if ("linearGradient" === i || "radialGradient" === i) {
        } else {
        }
        if ("pattern" === i) {
        } else {
        }
        if ("solid" === i) {
        } else {
        }
        if (false) {
        }
        if ("linearGradient" === i || "radialGradient" === i) {
        } else {
        }
        if (n) {
        } else {
        }
    };
}
export default StyleManager;
