import { Zi, As } from "./common";
class Ba {
    #_e = !1;
    #Fe = !1;
    #Ge = !1;
    #Ne = !1;
    #je = null;
    constructor(...e) {
        for (let t of e)
            "Control" === t
                ? (this["ctrl"] = !0)
                : "Alt" === t
                    ? (this["alt"] = !0)
                    : "Shift" === t
                        ? (this["shift"] = !0)
                        : "Meta" === t
                            ? (this["meta"] = !0)
                            : (this["key"] = t);
    }
    static ["fromEvent"](e) {
        let s = new Ba();
        s["ctrl"] = As ? e["metaKey"] : e["ctrlKey"];
        s["alt"] = e["altKey"];
        s["shift"] = e["shiftKey"];
        s["meta"] = As ? e["ctrlKey"] : e["metaKey"];
        s["key"] = null;
        if (e instanceof KeyboardEvent) {
            let t = e["key"];
            " " === t && (t = "Space");
            t &&
                "Control" !== t &&
                "Alt" !== t &&
                "Shift" !== t &&
                "Meta" !== t &&
                (1 === t["length"] ? (s["key"] = t["toUpperCase"]()) : (s["key"] = t));
        }
        return s;
    }
    static ["fromElement"](t) {
        let e = new Ba();
        e["ctrl"] = t["modKeys"]["includes"]("Control");
        e["alt"] = t["modKeys"]["includes"]("Alt");
        e["shift"] = t["modKeys"]["includes"]("Shift");
        e["meta"] = t["modKeys"]["includes"]("Meta");
        e["key"] = t["normalKey"];
        return e;
    }
    static ["fromString"](t) {
        return new Ba(...t["split"]("+")["filter"]((t) => "" !== t));
    }
    get ["ctrl"]() {
        return this.#_e;
    }
    set ["ctrl"](t) {
        this.#_e = t;
    }
    get ["alt"]() {
        return this.#Fe;
    }
    set ["alt"](t) {
        this.#Fe = t;
    }
    get ["shift"]() {
        return this.#Ge;
    }
    set ["shift"](t) {
        this.#Ge = t;
    }
    get ["meta"]() {
        return this.#Ne;
    }
    set ["meta"](t) {
        this.#Ne = t;
    }
    get ["key"]() {
        return this.#je;
    }
    set ["key"](t) {
        this.#je = t;
    }
    ["matches"](...e) {
        let s = !1;
        let i = !1;
        let h = !1;
        let l = !1;
        let r = null;
        for (let t of e)
            "Control" === t
                ? (s = !0)
                : "Alt" === t
                    ? (i = !0)
                    : "Shift" === t
                        ? (h = !0)
                        : "Meta" === t
                            ? (l = !0)
                            : (r = t);
        return (
            s === this["ctrl"] &&
            i === this["alt"] &&
            l === this["meta"] &&
            h === this["shift"] &&
            r === this["key"]
        );
    }
    ["includes"](t) {
        return "Control" === t
            ? this["ctrl"]
            : "Alt" === t
                ? this["alt"]
                : "Shift" === t
                    ? this["shift"]
                    : "Meta" === t
                        ? this["meta"]
                        : this["key"] === t;
    }
    ["compare"](t) {
        return (
            this["ctrl"] === t["ctrl"] &&
            this["alt"] === t["alt"] &&
            this["shift"] === t["shift"] &&
            this["meta"] === t["meta"] &&
            this["key"] === t["key"]
        );
    }
    ["isVoid"]() {
        return (
            !1 === this["ctrl"] &&
            !1 === this["alt"] &&
            !1 === this["shift"] &&
            !1 === this["meta"] &&
            null === this["key"]
        );
    }
    ["toDisplayString"]() {
        let s = "";
        if (As) {
            this["meta"] && (s += "^");
            this["alt"] && (s += "⌥");
            this["shift"] && (s += "⇧");
            this["ctrl"] && (s += "⌘");
            let t = {
                ArrowUp: "↑",
                ArrowDown: "↓",
                ArrowLeft: "←",
                ArrowRight: "→",
                Backspace: "⌦",
                Tab: "⇥",
            };
            null !== this["key"] && (s += t[this["key"]] || this["key"]);
        } else {
            let t = [];
            this["ctrl"] && t["push"]("Ctrl");
            this["alt"] && t["push"]("Alt");
            this["shift"] && t["push"]("Shift");
            this["meta"] && t["push"]("Meta");
            let e = {
                ArrowUp: "Up",
                ArrowDown: "Down",
                ArrowLeft: "Left",
                ArrowRight: "Right",
            };
            null !== this["key"] && t["push"](e[this["key"]] || this["key"]);
            s = t["join"]("+");
        }
        return s;
    }
    ["toJSON"]() {
        return this["toString"]();
    }
    ["toElement"]() {
        let t = Zi("x-shortcut");
        let e = [];
        this["ctrl"] && e["push"]("Control");
        this["alt"] && e["push"]("Alt");
        this["shift"] && e["push"]("Shift");
        this["meta"] && e["push"]("Meta");
        null !== this["key"] && e["push"]("key");
        t["value"] = e;
        return t;
    }
    ["toString"]() {
        let t = [];
        this["ctrl"] && t["push"]("Control");
        this["alt"] && t["push"]("Alt");
        this["shift"] && t["push"]("Shift");
        this["meta"] && t["push"]("Meta");
        null !== this["key"] && t["push"](this["key"]);
        return t["join"]("+");
    }
}
export default Ba;
