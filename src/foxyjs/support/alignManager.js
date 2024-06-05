import { ct, ut, ci, Yi } from "../utils/common";
class AlignManager {
    #stage;
    constructor(stage) {
        this.#stage = stage;
    }
    canAlign = () => {
        return this.#stage.selectedObjectElements.size > 0;
    };
    align = (type, target, elements) => {
        const nodes = elements || Array.from(this.#stage.selectedObjectElements.keys());
        const targetRect = target || document.querySelector("#background-outlines");
        this.#align(nodes, targetRect?.getBoundingClientRect(), type);
    };
    #align = (i, n, x, e = !0) => {
        if (!1 === e)
            for (let y of i) {
                let e = ct(y);
                let t = ut(y);
                let i = t.inverse();
                let h = Yi(y);
                let l = 0;
                let s = 0;
                let o = 1;
                let d = 1;
                let f = 0;
                let g = 0;
                if ("move-left-inside" === x) l = n["x"] - h["x"];
                else {
                    if ("move-left-outside" === x) l = n["x"] - h["x"] - h.width;
                    else {
                        if ("move-right-inside" === x)
                            l = n["x"] + n.width - h["x"] - h.width;
                        else {
                            if ("move-right-outside" === x) l = n["x"] + n.width - h["x"];
                            else {
                                if ("move-top-inside" === x) s = n["y"] - h["y"];
                                else {
                                    if ("move-top-outside" === x) s = n["y"] - h["y"] - h.height;
                                    else {
                                        if ("move-bottom-inside" === x)
                                            s = n["y"] + n.height - h["y"] - h.height;
                                        else {
                                            if ("move-bottom-outside" === x)
                                                s = n["y"] + n.height - h["y"];
                                            else {
                                                if ("center" === x) {
                                                    l = n["x"] - h["x"] + n.width / 2 - h.width / 2;
                                                    s = n["y"] - h["y"] + n.height / 2 - h.height / 2;
                                                } else {
                                                    if ("horizontal-center" === x)
                                                        l = n["x"] - h["x"] + n.width / 2 - h.width / 2;
                                                    else {
                                                        if ("vertical-center" === x)
                                                            s = n["y"] - h["y"] + n.height / 2 - h.height / 2;
                                                        else {
                                                            if ("stretch" === x) {
                                                                o = n.width / h.width;
                                                                d = n.height / h.height;
                                                                l = n["x"] - h["x"] * o;
                                                                s = n["y"] - h["y"] * d;
                                                            } else {
                                                                if ("horizontal-stretch" === x) {
                                                                    o = n.width / h.width;
                                                                    l = n["x"] - h["x"] * o;
                                                                } else {
                                                                    if ("vertical-stretch" === x) {
                                                                        d = n.height / h.height;
                                                                        s = n["y"] - h["y"] * d;
                                                                    } else {
                                                                        if ("fit" === x) {
                                                                            let e = Math.min(
                                                                                n.width / h.width,
                                                                                n.height / h.height
                                                                            );
                                                                            o = e;
                                                                            d = e;
                                                                            l =
                                                                                n["x"] -
                                                                                h["x"] +
                                                                                n.width / 2 -
                                                                                h.width / 2;
                                                                            s =
                                                                                n["y"] -
                                                                                h["y"] +
                                                                                n.height / 2 -
                                                                                h.height / 2;
                                                                            f = h["x"] + h.width / 2;
                                                                            g = h["y"] + h.height / 2;
                                                                        } else {
                                                                            if ("horizontal-fit" === x) {
                                                                                o = n.width / h.width;
                                                                                d = o;
                                                                                l = n["x"] - h["x"];
                                                                                f = h["x"];
                                                                                g = h["y"];
                                                                            } else {
                                                                                d = n.height / h.height;
                                                                                o = d;
                                                                                s = n["y"] - h["y"];
                                                                                f = h["x"];
                                                                                g = h["y"];
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                let r = e.multiply(i);
                r.translateSelf(l, s);
                r.scaleSelf(o, d, 1, f, g);
                r.multiplySelf(t);
                y.setAttribute("transform", r.toString());
            }
        else {
            if (!0 === e) {
                let e = i.map((e) => Yi(e));
                let t = ci(e);
                let s = 0;
                let o = 0;
                let d = 1;
                let f = 1;
                let g = 0;
                let r = 0;
                if ("move-left-inside" === x) s = n["x"] - t["x"];
                else {
                    if ("move-left-outside" === x) s = n["x"] - t["x"] - t.width;
                    else {
                        if ("move-right-inside" === x)
                            s = n["x"] + n.width - t["x"] - t.width;
                        else {
                            if ("move-right-outside" === x) s = n["x"] + n.width - t["x"];
                            else {
                                if ("move-top-inside" === x) o = n["y"] - t["y"];
                                else {
                                    if ("move-top-outside" === x) o = n["y"] - t["y"] - t.height;
                                    else {
                                        if ("move-bottom-inside" === x)
                                            o = n["y"] + n.height - t["y"] - t.height;
                                        else {
                                            if ("move-bottom-outside" === x)
                                                o = n["y"] + n.height - t["y"];
                                            else {
                                                if ("center" === x) {
                                                    s = n["x"] - t["x"] + n.width / 2 - t.width / 2;
                                                    o = n["y"] - t["y"] + n.height / 2 - t.height / 2;
                                                } else {
                                                    if ("horizontal-center" === x)
                                                        s = n["x"] - t["x"] + n.width / 2 - t.width / 2;
                                                    else {
                                                        if ("vertical-center" === x)
                                                            o = n["y"] - t["y"] + n.height / 2 - t.height / 2;
                                                        else {
                                                            if ("stretch" === x) {
                                                                d = n.width / t.width;
                                                                f = n.height / t.height;
                                                                s = n["x"] - t["x"] * d;
                                                                o = n["y"] - t["y"] * f;
                                                            } else {
                                                                if ("horizontal-stretch" === x) {
                                                                    d = n.width / t.width;
                                                                    s = n["x"] - t["x"] * d;
                                                                } else {
                                                                    if ("vertical-stretch" === x) {
                                                                        f = n.height / t.height;
                                                                        o = n["y"] - t["y"] * f;
                                                                    } else {
                                                                        if ("fit" === x) {
                                                                            let e = Math.min(
                                                                                n.width / t.width,
                                                                                n.height / t.height
                                                                            );
                                                                            d = e;
                                                                            f = e;
                                                                            s =
                                                                                n["x"] -
                                                                                t["x"] +
                                                                                n.width / 2 -
                                                                                t.width / 2;
                                                                            o =
                                                                                n["y"] -
                                                                                t["y"] +
                                                                                n.height / 2 -
                                                                                t.height / 2;
                                                                            g = t["x"] + t.width / 2;
                                                                            r = t["y"] + t.height / 2;
                                                                        } else {
                                                                            if ("horizontal-fit" === x) {
                                                                                d = n.width / t.width;
                                                                                f = d;
                                                                                s = n["x"] - t["x"];
                                                                                g = t["x"];
                                                                                r = t["y"];
                                                                            } else {
                                                                                if ("vertical-fit" === x) {
                                                                                    f = n.height / t.height;
                                                                                    d = f;
                                                                                    o = n["y"] - t["y"];
                                                                                    g = t["x"];
                                                                                    r = t["y"];
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                for (let l of i) {
                    let e = ct(l);
                    let t = ut(l);
                    let i = t.inverse();
                    let h = e.multiply(i);
                    h.translateSelf(s, o);
                    h.scaleSelf(d, f, 1, g, r);
                    h.multiplySelf(t);
                    l.setAttribute("transform", h.toString());
                }
            }
        }
    };
}
export default AlignManager;
