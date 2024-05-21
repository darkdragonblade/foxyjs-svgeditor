class Xs {
    ["cursor"] = 0;
    ["line"] = 1;
    ["column"] = 1;
    ["text"] = "";
    #ce = { cursor: 0, line: 1, column: 1 };
    constructor(e) {
        this["text"] = e;
    }
    ["read"](e = 1) {
        let s = "",
            r = this["cursor"];
        for (let t = 0; t < e; t += 1) {
            let e = this["text"][r + t];
            if (void 0 === e) break;
            s += e;
            this["cursor"] += 1;
            if ("\n" === e) {
                this["line"] += 1;
                this["column"] = 1;
            } else {
                this["column"] += 1;
            }
        }
        return "" === s ? null : s;
    }
    ["peek"](e = 1) {
        let s = "";
        for (let t = 0; t < e; t += 1) {
            let e = this["text"][this["cursor"] + t];
            if (void 0 === e) break;
            s += e;
        }
        return "" === s ? null : s;
    }
    ["eatSpaces"]() {
        let e = "";
        for (; " " === this["peek"]();) e += this["read"]();
        return e;
    }
    ["eatWhitespace"]() {
        let e = "";
        for (; " " === this["peek"]() || "\n" === this["peek"]();)
            e += this["read"]();
        return e;
    }
    ["storePosition"]() {
        let { cursor: e, line: t, column: s } = this;
        this.#ce = { cursor: e, line: t, column: s };
    }
    ["restorePosition"]() {
        this["cursor"] = this.#ce["cursor"];
        this["line"] = this.#ce["line"];
        this["column"] = this.#ce["column"];
    }
}
export default Xs;
