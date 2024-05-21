const ne = new Set([
    "Z",
    "M",
    "L",
    "C",
    "Q",
    "A",
    "H",
    "V",
    "S",
    "T",
    "z",
    "m",
    "l",
    "c",
    "q",
    "a",
    "h",
    "v",
    "s",
    "t",
    "R",
    "U",
    "N",
]);
class oe {
    #e;
    #t;
    #i;
    #s;
    parse = (t) => {
        let i = [];
        if (
            t?.length > 0 &&
            ((this.#e = t),
                (this.#t = 0),
                (this.#i = this.#e.length),
                (this.#s = null),
                this.#n(),
                this.#o())
        )
            for (; this.#a();) {
                let t = this.#l();
                if (null === t) break;
                i.push(t);
            }
        return i;
    };
    #l = () => {
        let t = this.#e[this.#t];
        let i = ne.has(t) ? t : null;
        if (null === i) {
            if (null === this.#s) return null;
            if (
                ((i =
                    ("+" === t || "-" === t || "." === t || (t >= "0" && t <= "9")) &&
                        "Z" !== this.#s
                        ? "M" === this.#s
                            ? "L"
                            : "m" === this.#s
                                ? "l"
                                : this.#s
                        : null),
                    null === i)
            )
                return null;
        } else this.#t += 1;
        this.#s = i;
        let s = null;
        let h = i.toUpperCase();
        return (
            "H" === h || "V" === h
                ? (s = [this.#r()])
                : "M" === h || "L" === h || "T" === h || "R" === h || "U" === h
                    ? (s = [this.#r(), this.#r()])
                    : "S" === h || "Q" === h
                        ? (s = [this.#r(), this.#r(), this.#r(), this.#r()])
                        : "C" === h
                            ? (s = [
                                this.#r(),
                                this.#r(),
                                this.#r(),
                                this.#r(),
                                this.#r(),
                                this.#r(),
                            ])
                            : "A" === h
                                ? (s = [
                                    this.#r(),
                                    this.#r(),
                                    this.#r(),
                                    this.#h(),
                                    this.#h(),
                                    this.#r(),
                                    this.#r(),
                                ])
                                : "Z" === h && (this.#n(), (s = [])),
            null === s || s.indexOf(null) >= 0 ? null : { type: i, values: s }
        );
    };
    #a = () => {
        return this.#t < this.#i;
    };
    #d = () => {
        let t = this.#e[this.#t];
        return ne.has(t) ? t : null;
    };
    #o = () => {
        if (!this.#a()) return !0;
        let t = this.#d();
        return "M" === t || "m" === t;
    };
    #c = () => {
        let t = this.#e[this.#t];
        return (
            t <= " " &&
            (" " === t || "\n" === t || "\t" === t || "\r" === t || "\f" === t)
        );
    };
    #n = () => {
        for (; this.#t < this.#i && this.#c();) this.#t += 1;
        return this.#t < this.#i;
    };
    #p() {
        return (
            !(this.#t < this.#i && !this.#c() && "," !== this.#e[this.#t]) &&
            (this.#n() &&
                this.#t < this.#i &&
                "," === this.#e[this.#t] &&
                ((this.#t += 1), this.#n()),
                this.#t < this.#i)
        );
    }
    #r = () => {
        let t = 0;
        let s = 0;
        let i = 1;
        let h = 0;
        let e = 1;
        let l = 1;
        let r = this.#t;
        if (
            (this.#n(),
                this.#t < this.#i && "+" === this.#e[this.#t]
                    ? (this.#t += 1)
                    : this.#t < this.#i &&
                    "-" === this.#e[this.#t] &&
                    ((this.#t += 1), (e = -1)),
                this.#t === this.#i ||
                ((this.#e[this.#t] < "0" || this.#e[this.#t] > "9") &&
                    "." !== this.#e[this.#t]))
        )
            return null;
        let n = this.#t;
        for (
            ;
            this.#t < this.#i && this.#e[this.#t] >= "0" && this.#e[this.#t] <= "9";

        )
            this.#t += 1;
        if (this.#t !== n) {
            let t = this.#t - 1;
            let i = 1;
            for (; t >= n;) {
                s += i * (this.#e[t] - 0);
                t -= 1;
                i *= 10;
            }
        }
        if (this.#t < this.#i && "." === this.#e[this.#t]) {
            this.#t += 1;
            if (
                this.#t >= this.#i ||
                this.#e[this.#t] < "0" ||
                this.#e[this.#t] > "9"
            )
                return null;
            for (
                ;
                this.#t < this.#i && this.#e[this.#t] >= "0" && this.#e[this.#t] <= "9";

            ) {
                i *= 10;
                h += (this.#e.charAt(this.#t) - 0) / i;
                this.#t += 1;
            }
        }
        if (
            this.#t !== r &&
            this.#t + 1 < this.#i &&
            ("e" === this.#e[this.#t] || "E" === this.#e[this.#t]) &&
            "x" !== this.#e[this.#t + 1] &&
            "m" !== this.#e[this.#t + 1]
        ) {
            if (
                ((this.#t += 1),
                    "+" === this.#e[this.#t]
                        ? (this.#t += 1)
                        : "-" === this.#e[this.#t] && ((this.#t += 1), (l = -1)),
                    this.#t >= this.#i || this.#e[this.#t] < "0" || this.#e[this.#t] > "9")
            )
                return null;
            for (
                ;
                this.#t < this.#i && this.#e[this.#t] >= "0" && this.#e[this.#t] <= "9";

            ) {
                t *= 10;
                t += this.#e[this.#t] - 0;
                this.#t += 1;
            }
        }
        let u = s + h;
        return (
            (u *= e),
            t && (u *= Math.pow(10, l * t)),
            r === this.#t ? null : (this.#p(), u)
        );
    };
    #h = () => {
        if (this.#t >= this.#i) return null;
        let t = null;
        let i = this.#e[this.#t];
        this.#t += 1;
        if (0 === i) t = 0;
        else {
            if ("1" !== i) return null;
            t = 1;
        }
        this.#p();
        return t;
    };
}
export default oe;
