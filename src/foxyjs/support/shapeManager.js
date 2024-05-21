import {
    Te,
    pt,
    x,
    Ae,
    Ol,
    El,
    Tl,
    Al,
    $l,
    Ll,
    unite,
    subtract,
    intersect,
    exclude,
} from "../utils/common";
class ShapeManager {
    #stage;
    constructor(stage) {
        this.#stage = stage;
    }
    booleanOperations = async (type) => {
        if (!this.#vy(type)) return;
        this.#stage.undoManager.checkpoint("boolean-operations" + type, null);
        let { geometryPrecision: i, transformPrecision: e } = this.#stage;
        if (
            "image" === Array.from(this.#stage.selectedElements.keys())[0].localName
        ) {
            return;
        } else {
            let [s, ...t] = Array.from(this.#stage.selectedElements.keys());
            let l = [];
            for (let t of Array.from(this.#stage.selectedElements.keys())) {
                let e;
                if ("rect" === t.localName) {
                    e = Ol(t, this.#stage.geometryPrecision);
                } else {
                    if ("circle" === t.localName) {
                        e = El(t);
                    } else {
                        if ("ellipse" === t.localName) {
                            e = Tl(t);
                        } else {
                            if ("line" === t.localName) {
                                e = Al(t);
                            } else {
                                if ("polyline" === t.localName) {
                                    e = $l(t);
                                } else {
                                    if ("polygon" === t.localName) {
                                        e = Ll(t);
                                    } else {
                                        if ("path" === t.localName) {
                                            e = t.cloneNode();
                                            e.hasAttribute("data-fx-shape") &&
                                                e.removeAttribute("data-fx-shape");
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                const o = pt(t, s.parentElement).toString();
                e.setAttribute("transform", o);
                Ae(e, Te(e));
                l.push(e);
            }
            let [r, ...e] = l;
            for (let l of e) {
                let e = Te(r, !1);
                let t = Te(l, !1);
                let s = [];
                switch (type) {
                    case "unite":
                        s = unite(e, t, i);
                        break;
                    case "subtract":
                        s = subtract(e, t, i);
                        break;
                    case "intersect":
                        s = intersect(e, t, i);
                        break;
                    case "exclude":
                        s = exclude(e, t, i);
                        break;
                    default:
                }
                Ae(r, s);
            }
            if (r.hasAttribute("d")) {
                s.replaceWith(r);
                r.removeAttribute("data-bx-origin");
            } else {
                s.remove();
            }
            for (let e of t) e.remove();
            this.#stage.selectedElements.clear();
            r.hasAttribute("d") && this.#stage.selectedElements.set(r);
        }
    };
    #vy(type) {
        return this.#uk(type) || this.#xk(type);
    }
    #uk(type) {
        if (this.#stage.selectedElements.size < 2) return !1;
        for (let el of Array.from(this.#stage.selectedElements.keys()))
            if (!1 === x.includes(el.localName)) return !1;
        return !0;
    }
    #xk(type) {
        const [t, ...s] = Array.from(this.#stage.selectedElements.keys());
        return (
            ("subtract" === type || "intersect" === type) &&
            !(!t || "image" !== t.localName) &&
            1 === s.length &&
            !1 !== x.includes(s[0].localName)
        );
    }
}
export default ShapeManager;
