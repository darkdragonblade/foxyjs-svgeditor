import it from "./it";
import CSSParser from "./css-parser";
class Cl {
    get items() {
        return this.#vt;
    }
    set items(e) {
        this.#vt = [...e];
    }
    get type() {
        return "<font-family>";
    }
    #vt;
    constructor(e = []) {
        this.#vt = [...e];
    }
    static fromString = (e, r = !1) => {
        let t = [...CSSParser.tokenize(e), new CSSParser.EOFToken()];
        let n = new it(t);
        let o = [];
        n.read();
        "WHITESPACE" === n.currentToken.tokenType && n.read();
        if (
            "STRING" !== n.currentToken.tokenType &&
            "IDENT" !== n.currentToken.tokenType
        ) {
            if (r)
                throw new DOMException(
                    "Expected STRING or IDENT token.",
                    "SyntaxError"
                );
            return null;
        }
        for (o.push(n.currentToken.value); ;) {
            let e = !1;
            if (
                (n.read(),
                    "WHITESPACE" === n.currentToken.tokenType && n.read(),
                    "," === n.currentToken.tokenType && ((e = !0), n.read()),
                    "WHITESPACE" === n.currentToken.tokenType && n.read(),
                    "STRING" !== n.currentToken.tokenType &&
                    "IDENT" !== n.currentToken.tokenType)
            ) {
                if ("EOF" === n.currentToken.tokenType) {
                    if (e) {
                        if (r)
                            throw new DOMException(
                                "Unexpected trailing comma.",
                                "SyntaxError"
                            );
                        return null;
                    }
                    return new Cl(o);
                }
                if (r)
                    throw new DOMException(
                        'Unexpected token "' + n.currentToken.tokenType + '".',
                        "SyntaxError"
                    );
                return null;
            }
            if (!e) {
                if (r)
                    throw new DOMException(
                        "Unexpected STRING or IDENT token.",
                        "SyntaxError"
                    );
                return null;
            }
            o.push(n.currentToken.value);
        }
    };
    toString = () => { };
}
export default Cl;
