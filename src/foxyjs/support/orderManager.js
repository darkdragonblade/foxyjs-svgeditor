import { as, cs, ds, xi, Qi, g, Yi } from "../utils/common";
class OrderManager {
    #stage;
    constructor(stage) {
        this.#stage = stage;
    }
    raise = () => {
        this.#stage.undoManager.checkpoint("raise", null);
        for (let e of as(Array.from(this.#stage.selectedObjectElements.keys())))
            for (let t of cs(e)) {
                let r = [...t[0].parentElement.children]
                    .filter((r) => {
                        if (t.includes(r)) return !1;
                        if (!1 === [...g, "svg", "g", "a", "use"].includes(r.localName))
                            return !1;
                        for (let e of t) if (ds(r, e)) return !0;
                        return !1;
                    })
                    .find((e) => Number(Qi(e)) > Number(Qi(t[t.length - 1])));
                if (r) {
                    for (let e of t.reverse()) r.after(e);
                }
            }
    };
    raiseToFront = () => {
        this.#stage.undoManager.checkpoint("raise-to-front", null);
        for (let e of as(Array.from(this.#stage.selectedObjectElements.keys())))
            for (let t of cs(e)) {
                let e = [...t[0].parentElement.children].filter((r) => {
                    if (t.includes(r)) return !1;
                    if (!1 === [...g, "svg", "g", "a", "use"].includes(r.localName))
                        return !1;
                    for (let e of t) if (ds(r, e)) return !0;
                    return !1;
                });
                let r = e[e.length - 1];
                if (r) {
                    for (let e of t.reverse()) r.after(e);
                }
            }
    };
    canRaise = () => {
        let e = as(Array.from(this.#stage.selectedObjectElements.keys()));
        let l = Symbol();
        for (let r of e) {
            let e = cs(r);
            for (let t of e) {
                if (
                    [...t[0].parentElement.children]
                        .filter((r) => {
                            if (r.transform) {
                                if (t.includes(r)) return !1;
                                if (!1 === [...g, "svg", "g", "a", "use"].includes(r.localName))
                                    return !1;
                                for (let e of t)
                                    if (
                                        e.transform &&
                                        (e[l] || (e[l] = Yi(e)),
                                            r[l] || (r[l] = Yi(r)),
                                            xi(e[l], r[l]))
                                    )
                                        return !0;
                                return !1;
                            }
                            return !1;
                        })
                        .find((e) => Number(Qi(e)) > Number(Qi(t[t.length - 1])))
                )
                    return !0;
            }
        }
        return !1;
    };
    lower = () => {
        this.#stage.undoManager.checkpoint("lower", null);
        for (let e of as(Array.from(this.#stage.selectedObjectElements.keys())))
            for (let t of cs(e)) {
                let r = [...t[0].parentElement.children]
                    .filter((r) => {
                        if (t.includes(r)) return !1;
                        if (!1 === [...g, "svg", "g", "a", "use"].includes(r.localName))
                            return !1;
                        for (let e of t) if (ds(r, e)) return !0;
                        return !1;
                    })
                    .reverse()
                    .find((e) => Number(Qi(e)) < Number(Qi(t[0])));
                if (r) {
                    for (let e of t) r.before(e);
                }
            }
    };
    lowerToBack = () => {
        this.#stage.undoManager.checkpoint("lower-to-back", null);
        for (let e of as(Array.from(this.#stage.selectedObjectElements.keys())))
            for (let t of cs(e)) {
                let r = [...t[0].parentElement.children].filter((r) => {
                    if (t.includes(r)) return !1;
                    if (!1 === [...g, "svg", "g", "a", "use"].includes(r.localName))
                        return !1;
                    for (let e of t) if (ds(r, e)) return !0;
                    return !1;
                })[0];
                if (r) {
                    for (let e of t) r.before(e);
                }
            }
    };
    canLower = () => {
        let e = as(Array.from(this.#stage.selectedElements.keys()));
        let l = Symbol();
        for (let r of e) {
            let e = cs(r);
            for (let t of e) {
                if (
                    [...t[0].parentElement.children]
                        .filter((r) => {
                            if (r.transform) {
                                if (t.includes(r)) return !1;
                                if (!1 === [...g, "svg", "g", "a", "use"].includes(r.localName))
                                    return !1;
                                for (let e of t)
                                    if (
                                        e.transform &&
                                        (e[l] || (e[l] = Yi(e)),
                                            r[l] || (r[l] = Yi(r)),
                                            xi(e[l], r[l]))
                                    )
                                        return !0;
                                return !1;
                            }
                            return !1;
                        })
                        .find((e) => Number(Qi(e)) < Number(Qi(t[0])))
                )
                    return true;
            }
        }
        return false;
    };
}
export default OrderManager;
