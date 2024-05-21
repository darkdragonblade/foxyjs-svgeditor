import CSSParser from "./css-parser";
import it from "./it";
class An {
    get value() {
        return this.#pe;
    }
    set value(e) {
        this.#pe = e;
    }
    get origin() {
        return new URL(this.#pe).origin;
    }
    get type() {
        return "<url>";
    }
    #pe;
    constructor(e = "") {
        this.#pe = e;
    }
    static fromString = (e, r = !1) => {
        let n = [...CSSParser.tokenize(e), new CSSParser["EOFToken"]()];
        let t = new it(n);
        t.read();
        "WHITESPACE" === t.currentToken.tokenType && t.read();
        if ("URL" === t.currentToken.tokenType) {
            let e = t.currentToken.value;
            t.read();
            "WHITESPACE" === t.currentToken.tokenType && t.read();
            if ("EOF" === t.currentToken.tokenType) return new An(e);
            if (r) throw new DOMException("Expected EOF token.", "SyntaxError");
            return null;
        }
        if (
            "FUNCTION" === t.currentToken.tokenType &&
            "url" === t.currentToken.value
        ) {
            t.read();
            "WHITESPACE" === t.currentToken.tokenType && t.read();
            if ("STRING" === t.currentToken.tokenType) {
                let e = t.currentToken.value;
                t.read();
                "WHITESPACE" === t.currentToken.tokenType && t.read();
                if (")" === t.currentToken.tokenType) {
                    t.read();
                    "WHITESPACE" === t.currentToken.tokenType && t.read();
                    if ("EOF" === t.currentToken.tokenType) return new An(e["trim"]());
                    if (r) throw new DOMException("Expected EOF token.", "SyntaxError");
                    return null;
                }
                if (r) throw new DOMException('Expected ")" token.', "SyntaxError");
                return null;
            }
            if (r) throw new DOMException("Expected STRING token.", "SyntaxError");
            return null;
        }
        if (r)
            throw new DOMException("Expected URL or FUNCTION token.", "SyntaxError");
        return null;
    };
    toString = () => {
        return "url(" + this.value + ")";
    };
}
export default An;
