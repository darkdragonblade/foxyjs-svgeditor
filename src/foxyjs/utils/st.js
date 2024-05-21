import { G } from "./common";
import cssParser from "./css-parser";
class st {
    get ["align"]() {
        return this.#x;
    }
    set ["align"](e) {
        this.#x = e;
    }
    get ["meetOrSlice"]() {
        return this.#m;
    }
    set ["meetOrSlice"](e) {
        this.#m = e;
    }
    get ["type"]() {
        return "<preserve-aspect-ratio>";
    }
    #x;
    #m;
    constructor(e = "xMidYMid", t = "meet") {
        this.#x = e;
        this.#m = t;
    }
    static fromString = (e, t = !1) => {
        let r = [...cssParser["tokenize"](e), new cssParser["EOFToken"]()];
        let n = new it(r);
        n["read"]();
        "WHITESPACE" === n["currentToken"]["tokenType"] && n["read"]();
        if ("IDENT" !== n["currentToken"]["tokenType"]) {
            if (t) throw new DOMException("Expected IDENT token.", "SyntaxError");
            return null;
        }
        let i = n["currentToken"]["value"];
        if (!1 === G["includes"](i)) {
            if (t)
                throw new DOMException(
                    'Unknown align value "' + i + '".',
                    "SyntaxError"
                );
            return null;
        }
        n["read"]();
        "WHITESPACE" === n["currentToken"]["tokenType"] && n["read"]();
        if ("EOF" === n["currentToken"]["tokenType"]) return new st(i, "meet");
        if ("IDENT" !== n["currentToken"]["tokenType"]) {
            if (t) throw new DOMException("Expected IDENT token.", "SyntaxError");
            return null;
        }
        let o = n["currentToken"]["value"];
        if ("meet" !== o && "slice" !== o) {
            if (t)
                throw new DOMException(
                    'Unknown meetOrSlice value "' + o + '".',
                    "SyntaxError"
                );
            return null;
        }
        n["read"]();
        "WHITESPACE" === n["currentToken"]["tokenType"] && n["read"]();
        if ("EOF" === n["currentToken"]["tokenType"]) return new st(i, o);
    };
    toString = () => {
        return "meet" === this["meetOrSlice"]
            ? "" + this["align"]
            : this["align"] + " " + this["meetOrSlice"];
    };
}
export default st;
