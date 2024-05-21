(SVGPathElement.prototype.getPathData &&
    SVGPathElement.prototype.setPathData) ||
    (function () {
        var a = {
            Z: "Z",
            M: "M",
            L: "L",
            C: "C",
            Q: "Q",
            A: "A",
            H: "H",
            V: "V",
            S: "S",
            T: "T",
            z: "Z",
            m: "m",
            l: "l",
            c: "c",
            q: "q",
            a: "a",
            h: "h",
            v: "v",
            s: "s",
            t: "t",
        },
            n = function (e) {
                this._string = e;
                this._currentIndex = 0;
                this._endIndex = this._string.length;
                this._prevCommand = null;
                this._skipOptionalSpaces();
            },
            u = -1 !== window.navigator.userAgent.indexOf("MSIE ");
        n.prototype = {
            parseSegment: function () {
                var e = this._string[this._currentIndex],
                    t = a[e] ? a[e] : null;
                if (null === t) {
                    if (null === this._prevCommand) return null;
                    if (
                        null ===
                        (t =
                            ("+" === e || "-" === e || "." === e || (e >= "0" && e <= "9")) &&
                                "Z" !== this._prevCommand
                                ? "M" === this._prevCommand
                                    ? "L"
                                    : "m" === this._prevCommand
                                        ? "l"
                                        : this._prevCommand
                                : null)
                    )
                        return null;
                } else this._currentIndex += 1;
                this._prevCommand = t;
                var s = null,
                    r = t.toUpperCase();
                return (
                    "H" === r || "V" === r
                        ? (s = [this._parseNumber()])
                        : "M" === r || "L" === r || "T" === r
                            ? (s = [this._parseNumber(), this._parseNumber()])
                            : "S" === r || "Q" === r
                                ? (s = [
                                    this._parseNumber(),
                                    this._parseNumber(),
                                    this._parseNumber(),
                                    this._parseNumber(),
                                ])
                                : "C" === r
                                    ? (s = [
                                        this._parseNumber(),
                                        this._parseNumber(),
                                        this._parseNumber(),
                                        this._parseNumber(),
                                        this._parseNumber(),
                                        this._parseNumber(),
                                    ])
                                    : "A" === r
                                        ? (s = [
                                            this._parseNumber(),
                                            this._parseNumber(),
                                            this._parseNumber(),
                                            this._parseArcFlag(),
                                            this._parseArcFlag(),
                                            this._parseNumber(),
                                            this._parseNumber(),
                                        ])
                                        : "Z" === r && (this._skipOptionalSpaces(), (s = [])),
                    null === s || s.indexOf(null) >= 0 ? null : { type: t, values: s }
                );
            },
            hasMoreData: function () {
                return this._currentIndex < this._endIndex;
            },
            peekSegmentType: function () {
                var e = this._string[this._currentIndex];
                return a[e] ? a[e] : null;
            },
            initialCommandIsMoveTo: function () {
                if (!this.hasMoreData()) return !0;
                var e = this.peekSegmentType();
                return "M" === e || "m" === e;
            },
            _isCurrentSpace: function () {
                var e = this._string[this._currentIndex];
                return (
                    e <= " " &&
                    (" " === e || "\n" === e || "\t" === e || "\r" === e || "\f" === e)
                );
            },
            _skipOptionalSpaces: function () {
                for (; this._currentIndex < this._endIndex && this._isCurrentSpace();)
                    this._currentIndex += 1;
                return this._currentIndex < this._endIndex;
            },
            _skipOptionalSpacesOrDelimiter: function () {
                return (
                    !(
                        this._currentIndex < this._endIndex &&
                        !this._isCurrentSpace() &&
                        "," !== this._string[this._currentIndex]
                    ) &&
                    (this._skipOptionalSpaces() &&
                        this._currentIndex < this._endIndex &&
                        "," === this._string[this._currentIndex] &&
                        ((this._currentIndex += 1), this._skipOptionalSpaces()),
                        this._currentIndex < this._endIndex)
                );
            },
            _parseNumber: function () {
                var e = 0,
                    t = 0,
                    s = 1,
                    r = 0,
                    a = 1,
                    n = 1,
                    u = this._currentIndex;
                if (
                    (this._skipOptionalSpaces(),
                        this._currentIndex < this._endIndex &&
                            "+" === this._string[this._currentIndex]
                            ? (this._currentIndex += 1)
                            : this._currentIndex < this._endIndex &&
                            "-" === this._string[this._currentIndex] &&
                            ((this._currentIndex += 1), (a = -1)),
                        this._currentIndex === this._endIndex ||
                        ((this._string[this._currentIndex] < "0" ||
                            this._string[this._currentIndex] > "9") &&
                            "." !== this._string[this._currentIndex]))
                )
                    return null;
                for (
                    var i = this._currentIndex;
                    this._currentIndex < this._endIndex &&
                    this._string[this._currentIndex] >= "0" &&
                    this._string[this._currentIndex] <= "9";

                )
                    this._currentIndex += 1;
                if (this._currentIndex !== i)
                    for (var l = this._currentIndex - 1, h = 1; l >= i;) {
                        t += h * (this._string[l] - "0");
                        l -= 1;
                        h *= 10;
                    }
                if (
                    this._currentIndex < this._endIndex &&
                    "." === this._string[this._currentIndex]
                ) {
                    if (
                        ((this._currentIndex += 1),
                            this._currentIndex >= this._endIndex ||
                            this._string[this._currentIndex] < "0" ||
                            this._string[this._currentIndex] > "9")
                    )
                        return null;
                    for (
                        ;
                        this._currentIndex < this._endIndex &&
                        this._string[this._currentIndex] >= "0" &&
                        this._string[this._currentIndex] <= "9";

                    ) {
                        s *= 10;
                        r += (this._string.charAt(this._currentIndex) - "0") / s;
                        this._currentIndex += 1;
                    }
                }
                if (
                    this._currentIndex !== u &&
                    this._currentIndex + 1 < this._endIndex &&
                    ("e" === this._string[this._currentIndex] ||
                        "E" === this._string[this._currentIndex]) &&
                    "x" !== this._string[this._currentIndex + 1] &&
                    "m" !== this._string[this._currentIndex + 1]
                ) {
                    if (
                        ((this._currentIndex += 1),
                            "+" === this._string[this._currentIndex]
                                ? (this._currentIndex += 1)
                                : "-" === this._string[this._currentIndex] &&
                                ((this._currentIndex += 1), (n = -1)),
                            this._currentIndex >= this._endIndex ||
                            this._string[this._currentIndex] < "0" ||
                            this._string[this._currentIndex] > "9")
                    )
                        return null;
                    for (
                        ;
                        this._currentIndex < this._endIndex &&
                        this._string[this._currentIndex] >= "0" &&
                        this._string[this._currentIndex] <= "9";

                    ) {
                        e *= 10;
                        e += this._string[this._currentIndex] - "0";
                        this._currentIndex += 1;
                    }
                }
                var v = t + r;
                return (
                    (v *= a),
                    e && (v *= Math.pow(10, n * e)),
                    u === this._currentIndex
                        ? null
                        : (this._skipOptionalSpacesOrDelimiter(), v)
                );
            },
            _parseArcFlag: function () {
                if (this._currentIndex >= this._endIndex) return null;
                var e = null,
                    t = this._string[this._currentIndex];
                if (((this._currentIndex += 1), "0" === t)) e = 0;
                else {
                    if ("1" !== t) return null;
                    e = 1;
                }
                return this._skipOptionalSpacesOrDelimiter(), e;
            },
        };
        var r = function (e) {
            if (!e || 0 === e.length) return [];
            var t = new n(e),
                s = [];
            if (t.initialCommandIsMoveTo())
                for (; t.hasMoreData();) {
                    var r = t.parseSegment();
                    if (null === r) break;
                    s.push(r);
                }
            return s;
        },
            s = SVGPathElement.prototype.setAttribute,
            i = SVGPathElement.prototype.setAttributeNS,
            l = SVGPathElement.prototype.removeAttribute,
            h = SVGPathElement.prototype.removeAttributeNS,
            v = window.Symbol ? Symbol() : "__cachedPathData",
            p = window.Symbol ? Symbol() : "__cachedNormalizedPathData",
            R = function (e, t, s, r, a, n, u, k, i, l) {
                var h,
                    v,
                    p,
                    _,
                    o,
                    c = function (e, t, s) {
                        return {
                            x: e * Math.cos(s) - t * Math.sin(s),
                            y: e * Math.sin(s) + t * Math.cos(s),
                        };
                    },
                    d = ((h = u), (Math.PI * h) / 180),
                    y = [];
                if (l) {
                    v = l[0];
                    p = l[1];
                    _ = l[2];
                    o = l[3];
                } else {
                    var f = c(e, t, -d);
                    e = f.x;
                    t = f.y;
                    var x = c(s, r, -d),
                        I = (e - (s = x.x)) / 2,
                        m = (t - (r = x.y)) / 2,
                        g = (I * I) / (a * a) + (m * m) / (n * n);
                    if (g > 1) {
                        a *= g = Math.sqrt(g);
                        n *= g;
                    }
                    var b = a * a,
                        S = n * n,
                        T = b * S - b * m * m - S * I * I,
                        Z = b * m * m + S * I * I,
                        M = (k === i ? -1 : 1) * Math.sqrt(Math.abs(T / Z));
                    _ = (M * a * m) / n + (e + s) / 2;
                    o = (M * -n * I) / a + (t + r) / 2;
                    v = Math.asin(parseFloat(((t - o) / n).toFixed(9)));
                    p = Math.asin(parseFloat(((r - o) / n).toFixed(9)));
                    e < _ && (v = Math.PI - v);
                    s < _ && (p = Math.PI - p);
                    v < 0 && (v = 2 * Math.PI + v);
                    p < 0 && (p = 2 * Math.PI + p);
                    i && v > p && (v -= 2 * Math.PI);
                    !i && p > v && (p -= 2 * Math.PI);
                }
                var V = p - v;
                if (Math.abs(V) > (120 * Math.PI) / 180) {
                    var H = p;
                    var Q = s;
                    var z = r;
                    p =
                        i && p > v
                            ? v + ((120 * Math.PI) / 180) * 1
                            : v + ((120 * Math.PI) / 180) * -1;
                    s = _ + a * Math.cos(p);
                    r = o + n * Math.sin(p);
                    y = R(s, r, Q, z, a, n, u, 0, i, [p, H, _, o]);
                }
                V = p - v;
                var F = Math.cos(v),
                    q = Math.sin(v),
                    $ = Math.cos(p),
                    j = Math.sin(p),
                    A = Math.tan(V / 4),
                    P = (4 / 3) * a * A,
                    C = (4 / 3) * n * A,
                    w = [e, t],
                    E = [e + P * q, t - C * F],
                    N = [s + P * j, r - C * $],
                    G = [s, r];
                if (((E[0] = 2 * w[0] - E[0]), (E[1] = 2 * w[1] - E[1]), l))
                    return [E, N, G].concat(y);
                y = [E, N, G].concat(y);
                for (var D = [], O = 0; O < y.length; O += 3) {
                    a = c(y[O][0], y[O][1], d);
                    n = c(y[O + 1][0], y[O + 1][1], d);
                    var L = c(y[O + 2][0], y[O + 2][1], d);
                    D.push([a.x, a.y, n.x, n.y, L.x, L.y]);
                }
                return D;
            },
            _ = function (e) {
                return e.map(function (e) {
                    return { type: e.type, values: Array.prototype.slice.call(e.values) };
                });
            },
            o = function (e) {
                var y = [],
                    f = null,
                    x = null,
                    I = null,
                    m = null,
                    g = null,
                    b = null,
                    S = null;
                return (
                    e.forEach(function (e) {
                        if ("M" === e.type) {
                            var t = e.values[0],
                                s = e.values[1];
                            y.push({ type: "M", values: [t, s] });
                            b = t;
                            S = s;
                            m = t;
                            g = s;
                        } else if ("C" === e.type) {
                            var r = e.values[0],
                                a = e.values[1],
                                n = e.values[2],
                                u = e.values[3];
                            t = e.values[4];
                            s = e.values[5];
                            y.push({ type: "C", values: [r, a, n, u, t, s] });
                            x = n;
                            I = u;
                            m = t;
                            g = s;
                        } else if ("L" === e.type) {
                            t = e.values[0];
                            s = e.values[1];
                            y.push({ type: "L", values: [t, s] });
                            m = t;
                            g = s;
                        } else if ("H" === e.type) {
                            t = e.values[0];
                            y.push({ type: "L", values: [t, g] });
                            m = t;
                        } else if ("V" === e.type) {
                            s = e.values[0];
                            y.push({ type: "L", values: [m, s] });
                            g = s;
                        } else if ("S" === e.type) {
                            n = e.values[0];
                            u = e.values[1];
                            t = e.values[2];
                            s = e.values[3];
                            if ("C" === f || "S" === f) {
                                i = m + (m - x);
                                l = g + (g - I);
                            } else {
                                i = m;
                                l = g;
                            }
                            y.push({ type: "C", values: [i, l, n, u, t, s] });
                            x = n;
                            I = u;
                            m = t;
                            g = s;
                        } else if ("T" === e.type) {
                            t = e.values[0];
                            s = e.values[1];
                            if ("Q" === f || "T" === f) {
                                r = m + (m - x);
                                a = g + (g - I);
                            } else {
                                r = m;
                                a = g;
                            }
                            var i = m + (2 * (r - m)) / 3,
                                l = g + (2 * (a - g)) / 3,
                                h = t + (2 * (r - t)) / 3,
                                v = s + (2 * (a - s)) / 3;
                            y.push({ type: "C", values: [i, l, h, v, t, s] });
                            x = r;
                            I = a;
                            m = t;
                            g = s;
                        } else if ("Q" === e.type) {
                            r = e.values[0];
                            a = e.values[1];
                            t = e.values[2];
                            s = e.values[3];
                            i = m + (2 * (r - m)) / 3;
                            l = g + (2 * (a - g)) / 3;
                            h = t + (2 * (r - t)) / 3;
                            v = s + (2 * (a - s)) / 3;
                            y.push({ type: "C", values: [i, l, h, v, t, s] });
                            x = r;
                            I = a;
                            m = t;
                            g = s;
                        } else if ("A" === e.type) {
                            var p = Math.abs(e.values[0]),
                                _ = Math.abs(e.values[1]),
                                o = e.values[2],
                                c = e.values[3],
                                d = e.values[4];
                            t = e.values[5];
                            s = e.values[6];
                            if (0 === p || 0 === _) {
                                y.push({ type: "C", values: [m, g, t, s, t, s] });
                                m = t;
                                g = s;
                            } else if (m !== t || g !== s) {
                                R(m, g, t, s, p, _, o, c, d).forEach(function (e) {
                                    y.push({ type: "C", values: e });
                                });
                                m = t;
                                g = s;
                            }
                        } else {
                            if ("Z" === e.type) {
                                y.push(e);
                                m = b;
                                g = S;
                            }
                        }
                        f = e.type;
                    }),
                    y
                );
            };
        SVGPathElement.prototype.setAttribute = function (e, t) {
            if ("d" === e) {
                this[v] = null;
                this[p] = null;
            }
            s.call(this, e, t);
        };
        SVGPathElement.prototype.setAttributeNS = function (e, t, s) {
            if ("d" === t) {
                var r = "http://www.w3.org/2000/svg";
                if (e)
                    for (var a of this.ownerSVGElement.attributes)
                        a.name === `xmlns:${e}` && (r = a.value);
                if ("http://www.w3.org/2000/svg" === r) {
                    this[v] = null;
                    this[p] = null;
                }
            }
            i.call(this, e, t, s);
        };
        SVGPathElement.prototype.removeAttribute = function (e, t) {
            if ("d" === e) {
                this[v] = null;
                this[p] = null;
            }
            l.call(this, e);
        };
        SVGPathElement.prototype.removeAttributeNS = function (e, t) {
            if ("d" === t) {
                var s = "http://www.w3.org/2000/svg";
                if (e)
                    for (var r of this.ownerSVGElement.attributes)
                        r.name === `xmlns:${e}` && (s = r.value);
                if ("http://www.w3.org/2000/svg" === s) {
                    this[v] = null;
                    this[p] = null;
                }
            }
            h.call(this, e, t);
        };
        SVGPathElement.prototype.getPathData = function (e) {
            if (e && e.normalize) {
                if (this[p]) return _(this[p]);
                if (this[v]) {
                    s = _(this[v]);
                } else {
                    s = r(this.getAttribute("d") || "");
                    this[v] = _(s);
                }
                var t = o(
                    (function (e) {
                        var l = [],
                            h = null,
                            v = null,
                            p = null,
                            _ = null;
                        return (
                            e.forEach(function (e) {
                                var t = e.type;
                                if ("M" === t) {
                                    var s = e.values[0],
                                        r = e.values[1];
                                    l.push({ type: "M", values: [s, r] });
                                    p = s;
                                    _ = r;
                                    h = s;
                                    v = r;
                                } else if ("m" === t) {
                                    s = h + e.values[0];
                                    r = v + e.values[1];
                                    l.push({ type: "M", values: [s, r] });
                                    p = s;
                                    _ = r;
                                    h = s;
                                    v = r;
                                } else if ("L" === t) {
                                    s = e.values[0];
                                    r = e.values[1];
                                    l.push({ type: "L", values: [s, r] });
                                    h = s;
                                    v = r;
                                } else if ("l" === t) {
                                    s = h + e.values[0];
                                    r = v + e.values[1];
                                    l.push({ type: "L", values: [s, r] });
                                    h = s;
                                    v = r;
                                } else if ("C" === t) {
                                    var a = e.values[0],
                                        n = e.values[1],
                                        u = e.values[2],
                                        i = e.values[3];
                                    s = e.values[4];
                                    r = e.values[5];
                                    l.push({ type: "C", values: [a, n, u, i, s, r] });
                                    h = s;
                                    v = r;
                                } else
                                    "c" === t
                                        ? ((a = h + e.values[0]),
                                            (n = v + e.values[1]),
                                            (u = h + e.values[2]),
                                            (i = v + e.values[3]),
                                            (s = h + e.values[4]),
                                            (r = v + e.values[5]),
                                            l.push({ type: "C", values: [a, n, u, i, s, r] }),
                                            (h = s),
                                            (v = r))
                                        : "Q" === t
                                            ? ((a = e.values[0]),
                                                (n = e.values[1]),
                                                (s = e.values[2]),
                                                (r = e.values[3]),
                                                l.push({ type: "Q", values: [a, n, s, r] }),
                                                (h = s),
                                                (v = r))
                                            : "q" === t
                                                ? ((a = h + e.values[0]),
                                                    (n = v + e.values[1]),
                                                    (s = h + e.values[2]),
                                                    (r = v + e.values[3]),
                                                    l.push({ type: "Q", values: [a, n, s, r] }),
                                                    (h = s),
                                                    (v = r))
                                                : "A" === t
                                                    ? ((s = e.values[5]),
                                                        (r = e.values[6]),
                                                        l.push({
                                                            type: "A",
                                                            values: [
                                                                e.values[0],
                                                                e.values[1],
                                                                e.values[2],
                                                                e.values[3],
                                                                e.values[4],
                                                                s,
                                                                r,
                                                            ],
                                                        }),
                                                        (h = s),
                                                        (v = r))
                                                    : "a" === t
                                                        ? ((s = h + e.values[5]),
                                                            (r = v + e.values[6]),
                                                            l.push({
                                                                type: "A",
                                                                values: [
                                                                    e.values[0],
                                                                    e.values[1],
                                                                    e.values[2],
                                                                    e.values[3],
                                                                    e.values[4],
                                                                    s,
                                                                    r,
                                                                ],
                                                            }),
                                                            (h = s),
                                                            (v = r))
                                                        : "H" === t
                                                            ? ((s = e.values[0]),
                                                                l.push({ type: "H", values: [s] }),
                                                                (h = s))
                                                            : "h" === t
                                                                ? ((s = h + e.values[0]),
                                                                    l.push({ type: "H", values: [s] }),
                                                                    (h = s))
                                                                : "V" === t
                                                                    ? ((r = e.values[0]),
                                                                        l.push({ type: "V", values: [r] }),
                                                                        (v = r))
                                                                    : "v" === t
                                                                        ? ((r = v + e.values[0]),
                                                                            l.push({ type: "V", values: [r] }),
                                                                            (v = r))
                                                                        : "S" === t
                                                                            ? ((u = e.values[0]),
                                                                                (i = e.values[1]),
                                                                                (s = e.values[2]),
                                                                                (r = e.values[3]),
                                                                                l.push({ type: "S", values: [u, i, s, r] }),
                                                                                (h = s),
                                                                                (v = r))
                                                                            : "s" === t
                                                                                ? ((u = h + e.values[0]),
                                                                                    (i = v + e.values[1]),
                                                                                    (s = h + e.values[2]),
                                                                                    (r = v + e.values[3]),
                                                                                    l.push({ type: "S", values: [u, i, s, r] }),
                                                                                    (h = s),
                                                                                    (v = r))
                                                                                : "T" === t
                                                                                    ? ((s = e.values[0]),
                                                                                        (r = e.values[1]),
                                                                                        l.push({ type: "T", values: [s, r] }),
                                                                                        (h = s),
                                                                                        (v = r))
                                                                                    : "t" === t
                                                                                        ? ((s = h + e.values[0]),
                                                                                            (r = v + e.values[1]),
                                                                                            l.push({ type: "T", values: [s, r] }),
                                                                                            (h = s),
                                                                                            (v = r))
                                                                                        : ("Z" !== t && "z" !== t) ||
                                                                                        (l.push({ type: "Z", values: [] }), (h = p), (v = _));
                            }),
                            l
                        );
                    })(s)
                );
                return (this[p] = _(t)), t;
            }
            if (this[v]) return _(this[v]);
            var s = r(this.getAttribute("d") || "");
            return (this[v] = _(s)), s;
        };
        SVGPathElement.prototype.setPathData = function (e) {
            if (0 === e.length)
                u ? this.setAttribute("d", "") : this.removeAttribute("d");
            else {
                for (var t = "", s = 0, r = e.length; s < r; s += 1) {
                    var a = e[s];
                    s > 0 && (t += " ");
                    t += a.type;
                    a.values && a.values.length > 0 && (t += " " + a.values.join(" "));
                }
                this.setAttribute("d", t);
            }
        };
        SVGRectElement.prototype.getPathData = function (e) {
            var t = this.x.baseVal.value,
                s = this.y.baseVal.value,
                r = this.width.baseVal.value,
                a = this.height.baseVal.value,
                n = this.hasAttribute("rx")
                    ? this.rx.baseVal.value
                    : this.ry.baseVal.value,
                u = this.hasAttribute("ry")
                    ? this.ry.baseVal.value
                    : this.rx.baseVal.value;
            n > r / 2 && (n = r / 2);
            u > a / 2 && (u = a / 2);
            var i = [
                { type: "M", values: [t + n, s] },
                { type: "H", values: [t + r - n] },
                { type: "A", values: [n, u, 0, 0, 1, t + r, s + u] },
                { type: "V", values: [s + a - u] },
                { type: "A", values: [n, u, 0, 0, 1, t + r - n, s + a] },
                { type: "H", values: [t + n] },
                { type: "A", values: [n, u, 0, 0, 1, t, s + a - u] },
                { type: "V", values: [s + u] },
                { type: "A", values: [n, u, 0, 0, 1, t + n, s] },
                { type: "Z", values: [] },
            ];
            return (
                (i = i.filter(function (e) {
                    return "A" !== e.type || (0 !== e.values[0] && 0 !== e.values[1]);
                })),
                e && !0 === e.normalize && (i = o(i)),
                i
            );
        };
        SVGCircleElement.prototype.getPathData = function (e) {
            var t = this.cx.baseVal.value,
                s = this.cy.baseVal.value,
                r = this.r.baseVal.value,
                a = [
                    { type: "M", values: [t + r, s] },
                    { type: "A", values: [r, r, 0, 0, 1, t, s + r] },
                    { type: "A", values: [r, r, 0, 0, 1, t - r, s] },
                    { type: "A", values: [r, r, 0, 0, 1, t, s - r] },
                    { type: "A", values: [r, r, 0, 0, 1, t + r, s] },
                    { type: "Z", values: [] },
                ];
            return e && !0 === e.normalize && (a = o(a)), a;
        };
        SVGEllipseElement.prototype.getPathData = function (e) {
            var t = this.cx.baseVal.value,
                s = this.cy.baseVal.value,
                r = this.rx.baseVal.value,
                a = this.ry.baseVal.value,
                n = [
                    { type: "M", values: [t + r, s] },
                    { type: "A", values: [r, a, 0, 0, 1, t, s + a] },
                    { type: "A", values: [r, a, 0, 0, 1, t - r, s] },
                    { type: "A", values: [r, a, 0, 0, 1, t, s - a] },
                    { type: "A", values: [r, a, 0, 0, 1, t + r, s] },
                    { type: "Z", values: [] },
                ];
            return e && !0 === e.normalize && (n = o(n)), n;
        };
        SVGLineElement.prototype.getPathData = function () {
            return [
                { type: "M", values: [this.x1.baseVal.value, this.y1.baseVal.value] },
                { type: "L", values: [this.x2.baseVal.value, this.y2.baseVal.value] },
            ];
        };
        SVGPolylineElement.prototype.getPathData = function () {
            for (var e = [], t = 0; t < this.points.numberOfItems; t += 1) {
                var s = this.points.getItem(t);
                e.push({ type: 0 === t ? "M" : "L", values: [s.x, s.y] });
            }
            return e;
        };
        SVGPolygonElement.prototype.getPathData = function () {
            for (var e = [], t = 0; t < this.points.numberOfItems; t += 1) {
                var s = this.points.getItem(t);
                e.push({ type: 0 === t ? "M" : "L", values: [s.x, s.y] });
            }
            return e.push({ type: "Z", values: [] }), e;
        };
    })();
