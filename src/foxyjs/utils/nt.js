import it from "./it";
import CSSParser from "./css-parser";
class nt {
    get type() {
        return "<view-box>";
    }
    get x() {
        return this.#g;
    }
    set x(e) {
        this.#g = e;
    }
    get y() {
        return this.#f;
    }
    set y(e) {
        this.#f = e;
    }
    get width() {
        return this.#b;
    }
    set width(e) {
        this.#b = e;
    }
    get height() {
        return this.#w;
    }
    set height(e) {
        this.#w = e;
    }
    #g;
    #f;
    #b;
    #w;
    constructor(e = 0, t = 0, n = 0, r = 0) {
        this.x = e;
        this.y = t;
        this.width = n;
        this.height = r;
    }
    static fromRect = (e) => {
        return new nt(e.x, e.y, e.width, e.height);
    };
    static fromString(e, t = !1) {
        let n;
        let r;
        let o;
        let T;
        let k = [...CSSParser["tokenize"](e), new CSSParser["EOFToken"]()];
        let u = new it(k);
        u.read();
        "WHITESPACE" === u.currentToken.tokenType && u.read();
        if ("NUMBER" !== u.currentToken.tokenType) {
            if (t)
                throw new DOMException(
                    "Unexpected " + u.currentToken.tokenType + " token.",
                    "SyntaxError"
                );
            return null;
        }
        n = u.currentToken.value;
        u.read();
        if (
            "WHITESPACE" !== u.currentToken.tokenType &&
            "," !== u.currentToken.tokenType
        ) {
            if (t)
                throw new DOMException(
                    "Unexpected " + u.currentToken.tokenType + " token.",
                    "SyntaxError"
                );
            return null;
        }
        "WHITESPACE" === u.currentToken.tokenType && u.read();
        "," === u.currentToken.tokenType && u.read();
        "WHITESPACE" === u.currentToken.tokenType && u.read();
        if ("NUMBER" !== u.currentToken.tokenType) {
            if (t)
                throw new DOMException(
                    "Unexpected " + u.currentToken.tokenType + " token.",
                    "SyntaxError"
                );
            return null;
        }
        r = u.currentToken.value;
        u.read();
        if (
            "WHITESPACE" !== u.currentToken.tokenType &&
            "," !== u.currentToken.tokenType
        ) {
            if (t)
                throw new DOMException(
                    "Unexpected " + u.currentToken.tokenType + " token.",
                    "SyntaxError"
                );
            return null;
        }
        "WHITESPACE" === u.currentToken.tokenType && u.read();
        "," === u.currentToken.tokenType && u.read();
        "WHITESPACE" === u.currentToken.tokenType && u.read();
        if (!"NUMBER" === u.currentToken.tokenType && u.currentToken.value >= 0) {
            if (t)
                throw new DOMException(
                    "Unexpected " + u.currentToken.tokenType + " token.",
                    "SyntaxError"
                );
            return null;
        }
        o = u.currentToken.value;
        u.read();
        if (
            "WHITESPACE" !== u.currentToken.tokenType &&
            "," !== u.currentToken.tokenType
        ) {
            if (t)
                throw new DOMException(
                    "Unexpected " + u.currentToken.tokenType + " token.",
                    "SyntaxError"
                );
            return null;
        }
        "WHITESPACE" === u.currentToken.tokenType && u.read();
        "," === u.currentToken.tokenType && u.read();
        "WHITESPACE" === u.currentToken.tokenType && u.read();
        if (!"NUMBER" === u.currentToken.tokenType && u.currentToken.value >= 0) {
            if (t)
                throw new DOMException(
                    "Unexpected " + u.currentToken.tokenType + " token.",
                    "SyntaxError"
                );
            return null;
        }
        T = u.currentToken.value;
        u.read();
        "WHITESPACE" === u.currentToken.tokenType && u.read();
        if ("EOF" === u.currentToken.tokenType) return new nt(n, r, o, T);
        if (t)
            throw new DOMException(
                "Unexpected " + u.currentToken.tokenType + " token.",
                "SyntaxError"
            );
        return null;
    }
    toString = () => {
        return this.x + " " + this.y + " " + this.width + " " + this.height;
    };
    toRect = () => {
        return new DOMRect(this.x, this.y, this.width, this.height);
    };
}
export default nt;
