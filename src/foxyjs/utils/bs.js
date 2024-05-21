import { gn, S, P, m, w, L, R, fc } from "./common";
class bc {
    #Zt;
    constructor(t) {
        this.#Zt = t;
    }
    ["collect"](r = fc) {
        for (let [t, e] of Object["entries"](fc)) void 0 === r[t] && (r[t] = e);
        let a = this.#pi();
        let n = {
            gradients: [],
            patterns: [],
            markers: [],
            symbols: [],
            filters: [],
            fonts: [],
            clipPaths: [],
            masks: [],
        };
        if ("all" === r["colors"] || "unpinned" === r["colors"]) {
            let s = [
                ...this.#Zt["querySelectorAll"]("linearGradient, radialGradient"),
            ];
            s = s["filter"]((t) => !0 === gn(t));
            for (let t of s) {
                let l = a["paintServers"]["has"](t["id"]);
                let i =
                    "unpinned" === r["colors"] && t["hasAttribute"]("data-bx-pinned");
                if (!1 === l && !1 === i) {
                    let e = this.#ui(t, s);
                    for (let t of e)
                        if (
                            ((l = a["paintServers"]["has"](t["id"])),
                                (i =
                                    "unpinned" === r["colors"] &&
                                    t["hasAttribute"]("data-bx-pinned")),
                                l || i)
                        )
                            break;
                    if (!1 === l) {
                        n["gradients"]["push"](t);
                        t["remove"]();
                    }
                }
            }
        }
        if ("all" === r["gradients"] || "unpinned" === r["gradients"]) {
            let s = [
                ...this.#Zt["querySelectorAll"]("linearGradient, radialGradient"),
            ];
            s = s["filter"]((t) => !1 === gn(t));
            for (let t of s) {
                let l = a["paintServers"]["has"](t["id"]),
                    i =
                        "unpinned" === r["gradients"] &&
                        t["hasAttribute"]("data-bx-pinned");
                if (!1 === l && !1 === i) {
                    let e = this.#ui(t, s);
                    for (let t of e)
                        if (
                            ((l = a["paintServers"]["has"](t["id"])),
                                (i =
                                    "unpinned" === r["gradients"] &&
                                    t["hasAttribute"]("data-bx-pinned")),
                                l || i)
                        )
                            break;
                    if (!1 === l && !1 === i) {
                        n["gradients"]["push"](t);
                        t["remove"]();
                    }
                }
            }
        }
        if ("all" === r["patterns"] || "unpinned" === r["patterns"]) {
            let s = [...this.#Zt["querySelectorAll"]("pattern")];
            for (let t of s) {
                let l = a["paintServers"]["has"](t["id"]);
                let i =
                    "unpinned" === r["patterns"] && t["hasAttribute"]("data-bx-pinned");
                if (!1 === l && !1 === i) {
                    let e = this.#xi(t, s);
                    for (let t of e)
                        if (
                            ((l = a["paintServers"]["has"](t["id"])),
                                (i =
                                    "unpinned" === r["patterns"] &&
                                    t["hasAttribute"]("data-bx-pinned")),
                                l || i)
                        )
                            break;
                    if (!1 === l && !1 === i) {
                        n["patterns"]["push"](t);
                        t["remove"]();
                    }
                }
            }
        }
        if ("all" === r["markers"] || "unpinned" === r["markers"]) {
            let t = [...this.#Zt["querySelectorAll"]("marker")];
            for (let l of t) {
                {
                    let t = a["markers"]["has"](l["id"]);
                    let e =
                        "unpinned" === r["markers"] && l["hasAttribute"]("data-bx-pinned");
                    if (!1 === t && !1 === e) {
                        n["markers"]["push"](l);
                        l["remove"]();
                    }
                }
            }
        }
        if ("all" === r["filters"] || "unpinned" === r["filters"]) {
            let t = this.#Zt["querySelectorAll"]("filter");
            for (let l of t) {
                let t = a["filters"]["has"](l["id"]);
                let e =
                    "unpinned" === r["filters"] && l["hasAttribute"]("data-bx-pinned");
                if (!1 === t && !1 === e) {
                    n["filters"]["push"](l);
                    l["remove"]();
                }
            }
        }
        if ("all" === r["clipPaths"] || "unpinned" === r["clipPaths"]) {
            let t = this.#Zt["querySelectorAll"]("clipPath, clippath");
            for (let l of t) {
                let t = a["clipPaths"]["has"](l["id"]);
                let e =
                    "unpinned" === r["clipPaths"] && l["hasAttribute"]("data-bx-pinned");
                if (!1 === t && !1 === e) {
                    n["clipPaths"]["push"](l);
                    l["remove"]();
                }
            }
        }
        if ("all" === r["masks"] || "unpinned" === r["masks"]) {
            let t = this.#Zt["querySelectorAll"]("mask");
            for (let l of t) {
                let t = a["masks"]["has"](l["id"]);
                let e =
                    "unpinned" === r["masks"] && l["hasAttribute"]("data-bx-pinned");
                if (!1 === t && !1 === e) {
                    n["masks"]["push"](l);
                    l["remove"]();
                }
            }
        }
        if ("all" === r["symbols"] || "unpinned" === r["symbols"]) {
            let t = this.#Zt["querySelectorAll"]("symbol");
            for (let l of t) {
                let t = a["symbols"]["has"](l["id"]);
                let e =
                    "unpinned" === r["symbols"] && l["hasAttribute"]("data-bx-pinned");
                if (!1 === t && !1 === e) {
                    n["symbols"]["push"](l);
                    l["remove"]();
                }
            }
        }
        if ("all" === r["fonts"] || "unpinned" === r["fonts"]) {
            let s = this.#mi();
            let t = [...this.#Zt["querySelectorAll"]("style[data-bx-fonts]")];
            for (let i of t) {
                let t = i["getAttribute"]("data-bx-fonts");
                let e = s["has"](t);
                let l =
                    "unpinned" === r["fonts"] && i["hasAttribute"]("data-bx-pinned");
                if (!1 === e && !1 === l) {
                    n["fonts"]["push"](t);
                    i["remove"]();
                }
            }
        }
        (n["gradients"]["length"] > 0 ||
            n["patterns"]["length"] > 0 ||
            n["markers"]["length"] > 0 ||
            n["filters"]["length"] > 0 ||
            n["clipPaths"]["length"] > 0 ||
            n["masks"]["length"] > 0 ||
            n["symbols"]["length"] > 0 ||
            n["fonts"]["length"] > 0) &&
            this["collect"](r);
    }
    #pi() {
        let t = document.createNodeIterator(this.#Zt, NodeFilter.SHOW_ELEMENT);
        let e = null;
        let r = {
            paintServers: new Set(),
            markers: new Set(),
            filters: new Set(),
            clipPaths: new Set(),
            masks: new Set(),
            symbols: new Set(),
            fontFamilies: new Set(),
        };
        for (; (e = t["nextNode"]());) {
            let s = getComputedStyle(e);
            if (w["includes"](e["localName"])) {
                let { fill: e, stroke: l } = s;
                if (e?.["startsWith"]("url(")) {
                    let t = e["substring"](6, e["length"] - 2);
                    r["paintServers"]["add"](t);
                }
                if (l?.["startsWith"]("url(")) {
                    let t = l["substring"](6, l["length"] - 2);
                    r["paintServers"]["add"](t);
                }
            }
            if (R["includes"](e["localName"])) {
                let { markerStart: e, markerMid: l, markerEnd: i } = s;
                if (e?.["startsWith"]("url(")) {
                    let t = e["substring"](6, e["length"] - 2);
                    r["markers"]["add"](t);
                }
                if (l?.["startsWith"]("url(")) {
                    let t = l["substring"](6, l["length"] - 2);
                    r["markers"]["add"](t);
                }
                if (i?.["startsWith"]("url(")) {
                    let t = i["substring"](6, i["length"] - 2);
                    r["markers"]["add"](t);
                }
            }
            if (L["includes"](e["localName"])) {
                let { filter: t } = s;
                if (t) {
                    for (let e of t["split"](" "))
                        if (e["startsWith"]("url(")) {
                            let t = e["substring"](6, e["length"] - 2);
                            r["filters"]["add"](t);
                        }
                }
            }
            if (S["includes"](e["localName"])) {
                let { clipPath: e } = s;
                if (e?.["startsWith"]("url(")) {
                    let t = e["substring"](6, e["length"] - 2);
                    r["clipPaths"]["add"](t);
                }
            }
            if (P["includes"](e["localName"])) {
                let { mask: e } = s;
                if (e?.["startsWith"]("url(")) {
                    let t = e["substring"](6, e["length"] - 2);
                    r["masks"]["add"](t);
                }
            }
            if ("use" === e["localName"] && "#" === e["href"]["baseVal"][0]) {
                let t = e["href"]["baseVal"]["substring"](1);
                r["symbols"]["add"](t);
            }
            if (m["includes"](e["localName"]) || "a" === e["localName"]) {
                let { fontFamily: t } = s;
                t && r["fontFamilies"]["add"](t);
            }
        }
        return r;
    }
    #mi() { }
    #ui(t, l) {
        let i = [];
        let s = (e) => {
            for (let t of l["filter"]((t) => t["href"]["baseVal"] === "#" + e["id"]))
                if (!1 === i["includes"](t)) {
                    i["push"](t);
                    s(t);
                }
        };
        s(t);
        return i;
    }
    #xi(t, l) {
        let i = [];
        let s = (e) => {
            for (let t of l["filter"]((t) => t["href"]["baseVal"] === "#" + e["id"]))
                if (!1 === i["includes"](t)) {
                    i["push"](t);
                    s(t);
                }
        };
        s(t);
        return i;
    }
}
export default bc;
