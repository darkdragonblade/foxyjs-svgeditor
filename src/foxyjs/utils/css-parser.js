let t = {};
const func = function (t) {
    var e = function (t, e, o) {
        return t >= e && t <= o
    };
    function o(t) {
        return e(t, 48, 57)
    }
    function r(t) {
        return o(t) || e(t, 65, 70) || e(t, 97, 102)
    }
    function n(t) {
        return function (t) {
            return e(t, 65, 90)
        }(t) || function (t) {
            return e(t, 97, 122)
        }(t)
    }
    function i(t) {
        return n(t) || function (t) {
            return t >= 128
        }(t) || 95 == t
    }
    function u(t) {
        return i(t) || o(t) || 45 == t
    }
    function p(t) {
        return e(t, 0, 8) || 11 == t || e(t, 14, 31) || 127 == t
    }
    function a(t) {
        return 10 == t
    }
    function c(t) {
        return a(t) || 9 == t || 32 == t
    }
    var s = function (t) {
        this.message = t
    };
    function f(t) {
        if (t <= 65535)
            return String.fromCharCode(t);
        t -= Math.pow(2, 16);
        var e = Math.floor(t / Math.pow(2, 10)) + 55296
            , o = t % Math.pow(2, 10) + 56320;
        return String.fromCharCode(e) + String.fromCharCode(o)
    }
    function l(t) {
        t = function (t) {
            for (var o = [], r = 0; r < t.length; r++) {
                var n = t.charCodeAt(r);
                if (13 == n && 10 == t.charCodeAt(r + 1) && (n = 10,
                    r++),
                    13 != n && 12 != n || (n = 10),
                    0 == n && (n = 65533),
                    e(n, 55296, 56319) && e(t.charCodeAt(r + 1), 56320, 57343)) {
                    var i = n - 55296
                        , u = t.charCodeAt(r + 1) - 56320;
                    n = Math.pow(2, 16) + i * Math.pow(2, 10) + u,
                        r++
                }
                o.push(n)
            }
            return o
        }(t);
        for (var n, s = -1, l = [], y = 0, O = 0, U = 0, V = {
            line: y,
            column: O
        }, Y = function (e) {
            return e >= t.length ? -1 : t[e]
        }, z = function (t) {
            if (void 0 === t && (t = 1),
                t > 3)
                throw "Spec Error: no more than three codepoints of lookahead.";
            return Y(s + t)
        }, $ = function (t) {
            return void 0 === t && (t = 1),
                a(n = Y(s += t)) ? (y += 1,
                    U = O,
                    O = 0) : O += t,
                !0
        }, X = function () {
            return s -= 1,
                a(n) ? (y -= 1,
                    O = U) : O -= 1,
                V.line = y,
                V.column = O,
                !0
        }, Z = function (t) {
            return void 0 === t && (t = n),
                -1 == t
        }, _ = function () {
            return console.log("Parse error at index " + s + ", processing codepoint 0x" + n.toString(16) + "."),
                !0
        }, tt = function () {
            if (et(),
                $(),
                c(n)) {
                for (; c(z());)
                    $();
                return new k
            }
            if (34 == n)
                return nt();
            if (35 == n) {
                if (u(z()) || pt(z(1), z(2))) {
                    var t = new H;
                    return ct(z(1), z(2), z(3)) && (t.type = "id"),
                        t.value = lt(),
                        t
                }
                return new M(n)
            }
            return 36 == n ? 61 == z() ? ($(),
                new L) : new M(n) : 39 == n ? nt() : 40 == n ? new E : 41 == n ? new N : 42 == n ? 61 == z() ? ($(),
                    new J) : new M(n) : 43 == n ? ft() ? (X(),
                        ot()) : new M(n) : 44 == n ? new T : 45 == n ? ft() ? (X(),
                            ot()) : 45 == z(1) && 62 == z(2) ? ($(2),
                                new d) : st() ? (X(),
                                    rt()) : new M(n) : 46 == n ? ft() ? (X(),
                                        ot()) : new M(n) : 58 == n ? new S : 59 == n ? new w : 60 == n ? 33 == z(1) && 45 == z(2) && 45 == z(3) ? ($(3),
                                            new m) : new M(n) : 64 == n ? ct(z(1), z(2), z(3)) ? new F(lt()) : new M(n) : 91 == n ? new g : 92 == n ? at() ? (X(),
                                                rt()) : (_(),
                                                    new M(n)) : 93 == n ? new A : 94 == n ? 61 == z() ? ($(),
                                                        new I) : new M(n) : 123 == n ? new C : 124 == n ? 61 == z() ? ($(),
                                                            new x) : 124 == z() ? ($(),
                                                                new R) : new M(n) : 125 == n ? new b : 126 == n ? 61 == z() ? ($(),
                                                                    new j) : new M(n) : o(n) ? (X(),
                                                                        ot()) : i(n) ? (X(),
                                                                            rt()) : Z() ? new D : new M(n)
        }, et = function () {
            for (; 47 == z(1) && 42 == z(2);)
                for ($(2); ;) {
                    if ($(),
                        42 == n && 47 == z()) {
                        $();
                        break
                    }
                    if (Z())
                        return void _()
                }
        }, ot = function () {
            var t, e = yt();
            return ct(z(1), z(2), z(3)) ? ((t = new Q).value = e.value,
                t.repr = e.repr,
                t.type = e.type,
                t.unit = lt(),
                t) : 37 == z() ? ($(),
                    (t = new W).value = e.value,
                    t.repr = e.repr,
                    t) : ((t = new K).value = e.value,
                        t.repr = e.repr,
                        t.type = e.type,
                        t)
        }, rt = function () {
            var t = lt();
            if ("url" == t.toLowerCase() && 40 == z()) {
                for ($(); c(z(1)) && c(z(2));)
                    $();
                return 34 == z() || 39 == z() ? new P(t) : !c(z()) || 34 != z(2) && 39 != z(2) ? it() : new P(t)
            }
            return 40 == z() ? ($(),
                new P(t)) : new B(t)
        }, nt = function (t) {
            void 0 === t && (t = n);
            for (var e = ""; $();) {
                if (n == t || Z())
                    return new q(e);
                if (a(n))
                    return _(),
                        X(),
                        new h;
                92 == n ? Z(z()) || (a(z()) ? $() : e += f(ut())) : e += f(n)
            }
        }, it = function () {
            for (var t = new G(""); c(z());)
                $();
            if (Z(z()))
                return t;
            for (; $();) {
                if (41 == n || Z())
                    return t;
                if (c(n)) {
                    for (; c(z());)
                        $();
                    return 41 == z() || Z(z()) ? ($(),
                        t) : (vt(),
                            new v)
                }
                if (34 == n || 39 == n || 40 == n || p(n))
                    return _(),
                        vt(),
                        new v;
                if (92 == n) {
                    if (!at())
                        return _(),
                            vt(),
                            new v;
                    t.value += f(ut())
                } else
                    t.value += f(n)
            }
        }, ut = function () {
            if ($(),
                r(n)) {
                for (var t = [n], e = 0; e < 5 && r(z()); e++)
                    $(),
                        t.push(n);
                c(z()) && $();
                var o = parseInt(t.map((function (t) {
                    return String.fromCharCode(t)
                }
                )).join(""), 16);
                return o > 1114111 && (o = 65533),
                    o
            }
            return Z() ? 65533 : n
        }, pt = function (t, e) {
            return 92 == t && !a(e)
        }, at = function () {
            return pt(n, z())
        }, ct = function (t, e, o) {
            return 45 == t ? i(e) || 45 == e || pt(e, o) : !!i(t) || 92 == t && pt(t, e)
        }, st = function () {
            return ct(n, z(1), z(2))
        }, ft = function () {
            return t = n,
                e = z(1),
                r = z(2),
                43 == t || 45 == t ? !!o(e) || !(46 != e || !o(r)) : 46 == t ? !!o(e) : !!o(t);
            var t, e, r
        }, lt = function () {
            for (var t = ""; $();)
                if (u(n))
                    t += f(n);
                else {
                    if (!at())
                        return X(),
                            t;
                    t += f(ut())
                }
        }, yt = function () {
            var t = []
                , e = "integer";
            for (43 != z() && 45 != z() || ($(),
                t += f(n)); o(z());)
                $(),
                    t += f(n);
            if (46 == z(1) && o(z(2)))
                for ($(),
                    t += f(n),
                    $(),
                    t += f(n),
                    e = "number"; o(z());)
                    $(),
                        t += f(n);
            var r = z(1)
                , i = z(2)
                , u = z(3);
            if (69 != r && 101 != r || !o(i)) {
                if ((69 == r || 101 == r) && (43 == i || 45 == i) && o(u))
                    for ($(),
                        t += f(n),
                        $(),
                        t += f(n),
                        $(),
                        t += f(n),
                        e = "number"; o(z());)
                        $(),
                            t += f(n)
            } else
                for ($(),
                    t += f(n),
                    $(),
                    t += f(n),
                    e = "number"; o(z());)
                    $(),
                        t += f(n);
            return {
                type: e,
                value: ht(t),
                repr: t
            }
        }, ht = function (t) {
            return +t
        }, vt = function () {
            for (; $();) {
                if (41 == n || Z())
                    return;
                at() && ut()
            }
        }, kt = 0; !Z(z());)
            if (l.push(tt()),
                ++kt > 2 * t.length)
                return "I'm infinite-looping!";
        return l
    }
    function y() {
        throw "Abstract Base Class"
    }
    function h() {
        return this
    }
    function v() {
        return this
    }
    function k() {
        return this
    }
    function m() {
        return this
    }
    function d() {
        return this
    }
    function S() {
        return this
    }
    function w() {
        return this
    }
    function T() {
        return this
    }
    function O() {
        throw "Abstract Base Class"
    }
    function C() {
        return this.value = "{",
            this.mirror = "}",
            this
    }
    function b() {
        return this.value = "}",
            this.mirror = "{",
            this
    }
    function g() {
        return this.value = "[",
            this.mirror = "]",
            this
    }
    function A() {
        return this.value = "]",
            this.mirror = "[",
            this
    }
    function E() {
        return this.value = "(",
            this.mirror = ")",
            this
    }
    function N() {
        return this.value = ")",
            this.mirror = "(",
            this
    }
    function j() {
        return this
    }
    function x() {
        return this
    }
    function I() {
        return this
    }
    function L() {
        return this
    }
    function J() {
        return this
    }
    function R() {
        return this
    }
    function D() {
        return this
    }
    function M(t) {
        return this.value = f(t),
            this
    }
    function U() {
        throw "Abstract Base Class"
    }
    function B(t) {
        this.value = t
    }
    function P(t) {
        this.value = t,
            this.mirror = ")"
    }
    function F(t) {
        this.value = t
    }
    function H(t) {
        this.value = t,
            this.type = "unrestricted"
    }
    function q(t) {
        this.value = t
    }
    function G(t) {
        this.value = t
    }
    function K() {
        this.value = null,
            this.type = "integer",
            this.repr = ""
    }
    function W() {
        this.value = null,
            this.repr = ""
    }
    function Q() {
        this.value = null,
            this.type = "integer",
            this.repr = "",
            this.unit = ""
    }
    function V(t) {
        for (var o = "", r = (t = "" + t).charCodeAt(0), n = 0; n < t.length; n++) {
            var i = t.charCodeAt(n);
            if (0 == i)
                throw new s("Invalid character: the input contains U+0000.");
            e(i, 1, 31) || 127 == i || 0 == n && e(i, 48, 57) || 1 == n && e(i, 48, 57) && 45 == r ? o += "\\" + i.toString(16) + " " : i >= 128 || 45 == i || 95 == i || e(i, 48, 57) || e(i, 65, 90) || e(i, 97, 122) ? o += t[n] : o += "\\" + t[n]
        }
        return o
    }
    function Y(t) {
        t = "" + t;
        for (var o = "", r = 0; r < t.length; r++) {
            var n = t.charCodeAt(r);
            if (0 == n)
                throw new s("Invalid character: the input contains U+0000.");
            e(n, 1, 31) || 127 == n ? o += "\\" + n.toString(16) + " " : o += 34 == n || 92 == n ? "\\" + t[r] : t[r]
        }
        return o
    }
    function z(t) {
        this.tokens = t,
            this.i = -1
    }
    function $(t, e) {
        return console.log("Parse error at token " + t.i + ": " + t.token + ".\n" + e),
            !0
    }
    function X(t, e) {
        for (var o, r = []; t.consume();)
            if (!(t.token instanceof k)) {
                if (t.token instanceof D)
                    return r;
                if (t.token instanceof m || t.token instanceof d) {
                    if ("top-level" == e)
                        continue;
                    t.reconsume(),
                        (o = _(t)) && r.push(o)
                } else
                    t.token instanceof F ? (t.reconsume(),
                        (o = Z(t)) && r.push(o)) : (t.reconsume(),
                            (o = _(t)) && r.push(o))
            }
    }
    function Z(t) {
        t.consume();
        for (var e = new at(t.token.value); t.consume();) {
            if (t.token instanceof w || t.token instanceof D)
                return e;
            if (t.token instanceof C)
                return e.value = ot(t),
                    e;
            if (t.token instanceof ft && "{" == t.token.name)
                return e.value = t.token,
                    e;
            t.reconsume(),
                e.prelude.push(et(t))
        }
    }
    function _(t) {
        for (var e = new ct; t.consume();) {
            if (t.token instanceof D)
                return void $(t, "Hit EOF when trying to parse the prelude of a qualified rule.");
            if (t.token instanceof C)
                return e.value = ot(t),
                    e;
            if (t.token instanceof ft && "{" == t.token.name)
                return e.value = t.token,
                    e;
            t.reconsume(),
                e.prelude.push(et(t))
        }
    }
    function tt(t) {
        t.consume();
        for (var e = new st(t.token.value); t.next() instanceof k;)
            t.consume();
        if (t.next() instanceof S) {
            for (t.consume(); !(t.next() instanceof D);)
                e.value.push(et(t));
            for (var o = !1, r = e.value.length - 1; r >= 0; r--)
                if (!(e.value[r] instanceof k)) {
                    if (!(e.value[r] instanceof B && e.value[r].ASCIIMatch("important"))) {
                        if (o && e.value[r] instanceof M && "!" == e.value[r].value) {
                            e.value.splice(r, e.value.length),
                                e.important = !0;
                            break
                        }
                        break
                    }
                    o = !0
                }
            return e
        }
        $(t)
    }
    function et(t) {
        return t.consume(),
            t.token instanceof C || t.token instanceof g || t.token instanceof E ? ot(t) : t.token instanceof P ? function (t) {
                for (var e = new lt(t.token.value); t.consume();) {
                    if (t.token instanceof D || t.token instanceof N)
                        return e;
                    t.reconsume(),
                        e.value.push(et(t))
                }
            }(t) : t.token
    }
    function ot(t) {
        for (var e = t.token.mirror, o = new ft(t.token.value); t.consume();) {
            if (t.token instanceof D || t.token instanceof O && t.token.value == e)
                return o;
            t.reconsume(),
                o.value.push(et(t))
        }
    }
    function rt(t) {
        if ("string" == typeof t)
            return new z(l(t));
        if (t instanceof z)
            return t;
        if (void 0 !== t.length)
            return new z(t);
        throw SyntaxError(t)
    }
    function nt(t) {
        return X(t = rt(t))
    }
    function it(t) {
        return function (t) {
            for (var e = []; t.consume();)
                if (t.token instanceof k || t.token instanceof w)
                    ;
                else {
                    if (t.token instanceof D)
                        return e;
                    if (t.token instanceof F)
                        t.reconsume(),
                            e.push(Z(t));
                    else if (t.token instanceof B) {
                        for (var o, r = [t.token]; !(t.next() instanceof w || t.next() instanceof D);)
                            r.push(et(t));
                        (o = tt(new z(r))) && e.push(o)
                    } else
                        for ($(t),
                            t.reconsume(); !(t.next() instanceof w || t.next() instanceof D);)
                            et(t)
                }
        }(t = rt(t))
    }
    function ut() {
        throw "Abstract Base Class"
    }
    function pt() {
        return this.value = [],
            this
    }
    function at(t) {
        return this.name = t,
            this.prelude = [],
            this.value = null,
            this
    }
    function ct() {
        return this.prelude = [],
            this.value = [],
            this
    }
    function st(t) {
        return this.name = t,
            this.value = [],
            this.important = !1,
            this
    }
    function ft(t) {
        return this.name = t,
            this.value = [],
            this
    }
    function lt(t) {
        return this.name = t,
            this.value = [],
            this
    }
    (s.prototype = new Error).name = "InvalidCharacterError",
        y.prototype.toJSON = function () {
            return {
                token: this.tokenType
            }
        }
        ,
        y.prototype.toString = function () {
            return this.tokenType
        }
        ,
        y.prototype.toSource = function () {
            return "" + this
        }
        ,
        h.prototype = Object.create(y.prototype),
        h.prototype.tokenType = "BADSTRING",
        v.prototype = Object.create(y.prototype),
        v.prototype.tokenType = "BADURL",
        k.prototype = Object.create(y.prototype),
        k.prototype.tokenType = "WHITESPACE",
        k.prototype.toString = function () {
            return "WS"
        }
        ,
        k.prototype.toSource = function () {
            return " "
        }
        ,
        m.prototype = Object.create(y.prototype),
        m.prototype.tokenType = "CDO",
        m.prototype.toSource = function () {
            return "\x3c!--"
        }
        ,
        d.prototype = Object.create(y.prototype),
        d.prototype.tokenType = "CDC",
        d.prototype.toSource = function () {
            return "--\x3e"
        }
        ,
        S.prototype = Object.create(y.prototype),
        S.prototype.tokenType = ":",
        w.prototype = Object.create(y.prototype),
        w.prototype.tokenType = ";",
        T.prototype = Object.create(y.prototype),
        T.prototype.tokenType = ",",
        O.prototype = Object.create(y.prototype),
        C.prototype = Object.create(O.prototype),
        C.prototype.tokenType = "{",
        b.prototype = Object.create(O.prototype),
        b.prototype.tokenType = "}",
        g.prototype = Object.create(O.prototype),
        g.prototype.tokenType = "[",
        A.prototype = Object.create(O.prototype),
        A.prototype.tokenType = "]",
        E.prototype = Object.create(O.prototype),
        E.prototype.tokenType = "(",
        N.prototype = Object.create(O.prototype),
        N.prototype.tokenType = ")",
        j.prototype = Object.create(y.prototype),
        j.prototype.tokenType = "~=",
        x.prototype = Object.create(y.prototype),
        x.prototype.tokenType = "|=",
        I.prototype = Object.create(y.prototype),
        I.prototype.tokenType = "^=",
        L.prototype = Object.create(y.prototype),
        L.prototype.tokenType = "$=",
        J.prototype = Object.create(y.prototype),
        J.prototype.tokenType = "*=",
        R.prototype = Object.create(y.prototype),
        R.prototype.tokenType = "||",
        D.prototype = Object.create(y.prototype),
        D.prototype.tokenType = "EOF",
        D.prototype.toSource = function () {
            return ""
        }
        ,
        M.prototype = Object.create(y.prototype),
        M.prototype.tokenType = "DELIM",
        M.prototype.toString = function () {
            return "DELIM(" + this.value + ")"
        }
        ,
        M.prototype.toJSON = function () {
            var t = this.constructor.prototype.constructor.prototype.toJSON.call(this);
            return t.value = this.value,
                t
        }
        ,
        M.prototype.toSource = function () {
            return "\\" == this.value ? "\\\n" : this.value
        }
        ,
        U.prototype = Object.create(y.prototype),
        U.prototype.ASCIIMatch = function (t) {
            return this.value.toLowerCase() == t.toLowerCase()
        }
        ,
        U.prototype.toJSON = function () {
            var t = this.constructor.prototype.constructor.prototype.toJSON.call(this);
            return t.value = this.value,
                t
        }
        ,
        B.prototype = Object.create(U.prototype),
        B.prototype.tokenType = "IDENT",
        B.prototype.toString = function () {
            return "IDENT(" + this.value + ")"
        }
        ,
        B.prototype.toSource = function () {
            return V(this.value)
        }
        ,
        P.prototype = Object.create(U.prototype),
        P.prototype.tokenType = "FUNCTION",
        P.prototype.toString = function () {
            return "FUNCTION(" + this.value + ")"
        }
        ,
        P.prototype.toSource = function () {
            return V(this.value) + "("
        }
        ,
        F.prototype = Object.create(U.prototype),
        F.prototype.tokenType = "AT-KEYWORD",
        F.prototype.toString = function () {
            return "AT(" + this.value + ")"
        }
        ,
        F.prototype.toSource = function () {
            return "@" + V(this.value)
        }
        ,
        H.prototype = Object.create(U.prototype),
        H.prototype.tokenType = "HASH",
        H.prototype.toString = function () {
            return "HASH(" + this.value + ")"
        }
        ,
        H.prototype.toJSON = function () {
            var t = this.constructor.prototype.constructor.prototype.toJSON.call(this);
            return t.value = this.value,
                t.type = this.type,
                t
        }
        ,
        H.prototype.toSource = function () {
            return "id" == this.type ? "#" + V(this.value) : "#" + function (t) {
                for (var o = "", r = ((t = "" + t).charCodeAt(0),
                    0); r < t.length; r++) {
                    var n = t.charCodeAt(r);
                    if (0 == n)
                        throw new s("Invalid character: the input contains U+0000.");
                    n >= 128 || 45 == n || 95 == n || e(n, 48, 57) || e(n, 65, 90) || e(n, 97, 122) ? o += t[r] : o += "\\" + n.toString(16) + " "
                }
                return o
            }(this.value)
        }
        ,
        q.prototype = Object.create(U.prototype),
        q.prototype.tokenType = "STRING",
        q.prototype.toString = function () {
            return '"' + Y(this.value) + '"'
        }
        ,
        G.prototype = Object.create(U.prototype),
        G.prototype.tokenType = "URL",
        G.prototype.toString = function () {
            return "URL(" + this.value + ")"
        }
        ,
        G.prototype.toSource = function () {
            return 'url("' + Y(this.value) + '")'
        }
        ,
        K.prototype = Object.create(y.prototype),
        K.prototype.tokenType = "NUMBER",
        K.prototype.toString = function () {
            return "integer" == this.type ? "INT(" + this.value + ")" : "NUMBER(" + this.value + ")"
        }
        ,
        K.prototype.toJSON = function () {
            var t = this.constructor.prototype.constructor.prototype.toJSON.call(this);
            return t.value = this.value,
                t.type = this.type,
                t.repr = this.repr,
                t
        }
        ,
        K.prototype.toSource = function () {
            return this.repr
        }
        ,
        W.prototype = Object.create(y.prototype),
        W.prototype.tokenType = "PERCENTAGE",
        W.prototype.toString = function () {
            return "PERCENTAGE(" + this.value + ")"
        }
        ,
        W.prototype.toJSON = function () {
            var t = this.constructor.prototype.constructor.prototype.toJSON.call(this);
            return t.value = this.value,
                t.repr = this.repr,
                t
        }
        ,
        W.prototype.toSource = function () {
            return this.repr + "%"
        }
        ,
        Q.prototype = Object.create(y.prototype),
        Q.prototype.tokenType = "DIMENSION",
        Q.prototype.toString = function () {
            return "DIM(" + this.value + "," + this.unit + ")"
        }
        ,
        Q.prototype.toJSON = function () {
            var t = this.constructor.prototype.constructor.prototype.toJSON.call(this);
            return t.value = this.value,
                t.type = this.type,
                t.repr = this.repr,
                t.unit = this.unit,
                t
        }
        ,
        Q.prototype.toSource = function () {
            var t = this.repr
                , o = V(this.unit);
            return "e" != o[0].toLowerCase() || "-" != o[1] && !e(o.charCodeAt(1), 48, 57) || (o = "\\65 " + o.slice(1, o.length)),
                t + o
        }
        ,
        t.tokenize = l,
        t.IdentToken = B,
        t.FunctionToken = P,
        t.AtKeywordToken = F,
        t.HashToken = H,
        t.StringToken = q,
        t.BadStringToken = h,
        t.URLToken = G,
        t.BadURLToken = v,
        t.DelimToken = M,
        t.NumberToken = K,
        t.PercentageToken = W,
        t.DimensionToken = Q,
        t.IncludeMatchToken = j,
        t.DashMatchToken = x,
        t.PrefixMatchToken = I,
        t.SuffixMatchToken = L,
        t.SubstringMatchToken = J,
        t.ColumnToken = R,
        t.WhitespaceToken = k,
        t.CDOToken = m,
        t.CDCToken = d,
        t.ColonToken = S,
        t.SemicolonToken = w,
        t.CommaToken = T,
        t.OpenParenToken = E,
        t.CloseParenToken = N,
        t.OpenSquareToken = g,
        t.CloseSquareToken = A,
        t.OpenCurlyToken = C,
        t.CloseCurlyToken = b,
        t.EOFToken = D,
        t.CSSParserToken = y,
        t.GroupingToken = O,
        z.prototype.tokenAt = function (t) {
            return t < this.tokens.length ? this.tokens[t] : new D
        }
        ,
        z.prototype.consume = function (t) {
            return void 0 === t && (t = 1),
                this.i += t,
                this.token = this.tokenAt(this.i),
                !0
        }
        ,
        z.prototype.next = function () {
            return this.tokenAt(this.i + 1)
        }
        ,
        z.prototype.reconsume = function () {
            this.i--
        }
        ,
        ut.prototype.toString = function (t) {
            return JSON.stringify(this, null, t)
        }
        ,
        ut.prototype.toJSON = function () {
            return {
                type: this.type,
                value: this.value
            }
        }
        ,
        pt.prototype = Object.create(ut.prototype),
        pt.prototype.type = "STYLESHEET",
        at.prototype = Object.create(ut.prototype),
        at.prototype.type = "AT-RULE",
        at.prototype.toJSON = function () {
            var t = this.constructor.prototype.constructor.prototype.toJSON.call(this);
            return t.name = this.name,
                t.prelude = this.prelude,
                t
        }
        ,
        ct.prototype = Object.create(ut.prototype),
        ct.prototype.type = "QUALIFIED-RULE",
        ct.prototype.toJSON = function () {
            var t = this.constructor.prototype.constructor.prototype.toJSON.call(this);
            return t.prelude = this.prelude,
                t
        }
        ,
        st.prototype = Object.create(ut.prototype),
        st.prototype.type = "DECLARATION",
        st.prototype.toJSON = function () {
            var t = this.constructor.prototype.constructor.prototype.toJSON.call(this);
            return t.name = this.name,
                t.important = this.important,
                t
        }
        ,
        ft.prototype = Object.create(ut.prototype),
        ft.prototype.type = "BLOCK",
        ft.prototype.toJSON = function () {
            var t = this.constructor.prototype.constructor.prototype.toJSON.call(this);
            return t.name = this.name,
                t
        }
        ,
        lt.prototype = Object.create(ut.prototype),
        lt.prototype.type = "FUNCTION",
        lt.prototype.toJSON = function () {
            var t = this.constructor.prototype.constructor.prototype.toJSON.call(this);
            return t.name = this.name,
                t
        }
        ;
    var yt = {
        qualified: {
            declarations: !0
        },
        "@media": {
            stylesheet: !0
        },
        "@keyframes": {
            qualified: {
                declarations: !0
            }
        },
        "@font-face": {
            declarations: !0
        },
        "@supports": {
            stylesheet: !0
        },
        "@scope": {
            stylesheet: !0
        },
        "@counter-style": {
            declarations: !0
        },
        "@import": null,
        "@font-feature-values": {
            qualified: !0,
            "@stylistic": {
                declarations: !0
            },
            "@styleset": {
                declarations: !0
            },
            "@character-variants": {
                declarations: !0
            },
            "@swash": {
                declarations: !0
            },
            "@ornaments": {
                declarations: !0
            },
            "@annotation": {
                declarations: !0
            }
        },
        "@viewport": {
            declarations: !0
        },
        "@page": {
            declarations: !0,
            "@top-left-corner": {
                declarations: !0
            },
            "@top-left": {
                declarations: !0
            },
            "@top-center": {
                declarations: !0
            },
            "@top-right": {
                declarations: !0
            },
            "@top-right-corner": {
                declarations: !0
            },
            "@right-top": {
                declarations: !0
            },
            "@right-middle": {
                declarations: !0
            },
            "@right-bottom": {
                declarations: !0
            },
            "@right-bottom-corner": {
                declarations: !0
            },
            "@bottom-right": {
                declarations: !0
            },
            "@bottom-center": {
                declarations: !0
            },
            "@bottom-left": {
                declarations: !0
            },
            "@bottom-left-corner": {
                declarations: !0
            },
            "@left-bottom": {
                declarations: !0
            },
            "@left-center": {
                declarations: !0
            },
            "@left-top": {
                declarations: !0
            }
        },
        "@custom-selector": null,
        "@custom-media": null
    };
    t.CSSParserRule = ut,
        t.Stylesheet = pt,
        t.AtRule = at,
        t.QualifiedRule = ct,
        t.Declaration = st,
        t.SimpleBlock = ft,
        t.Func = lt,
        t.parseAStylesheet = function (t) {
            t = rt(t);
            var e = new pt;
            return e.value = X(t, "top-level"),
                e
        }
        ,
        t.parseAListOfRules = nt,
        t.parseARule = function (t) {
            for (t = rt(t); t.next() instanceof k;)
                t.consume();
            if (t.next() instanceof D)
                throw SyntaxError();
            if (t.next() instanceof F)
                var e = Z(t);
            else if (!(e = _(t)))
                throw SyntaxError();
            for (; t.next() instanceof k;)
                t.consume();
            if (t.next() instanceof D)
                return e;
            throw SyntaxError()
        }
        ,
        t.parseADeclaration = function (t) {
            for (t = rt(t); t.next() instanceof k;)
                t.consume();
            if (!(t.next() instanceof B))
                throw SyntaxError();
            var e = tt(t);
            if (e)
                return e;
            throw SyntaxError()
        }
        ,
        t.parseAListOfDeclarations = it,
        t.parseAComponentValue = function (t) {
            for (t = rt(t); t.next() instanceof k;)
                t.consume();
            if (t.next() instanceof D)
                throw SyntaxError();
            var e = et(t);
            if (!e)
                throw SyntaxError();
            for (; t.next() instanceof k;)
                t.consume();
            if (t.next() instanceof D)
                return e;
            throw SyntaxError()
        }
        ,
        t.parseAListOfComponentValues = function (t) {
            t = rt(t);
            for (var e = []; ;) {
                var o = et(t);
                if (o instanceof D)
                    return e;
                e.push(o)
            }
        }
        ,
        t.parseACommaSeparatedListOfComponentValues = function (t) {
            t = rt(t);
            for (var e = []; ;)
                for (var o = []; ;) {
                    var r = et(t);
                    if (r instanceof D)
                        return e.push(o),
                            e;
                    if (r instanceof T) {
                        e.push(o);
                        break
                    }
                    o.push(r)
                }
        }
        ,
        t.canonicalizeRule = function t(e, o, r) {
            if (void 0 === o && (o = yt),
                void 0 === r && (r = o),
                o) {
                o.stylesheet && (o = r);
                var n = o.unknown || function () { }
            }
            var i = {
                type: e.type.toLowerCase()
            };
            if ("STYLESHEET" == e.type)
                var u = e.value;
            else if ("BLOCK" == e.type) {
                var p = e.value;
                i.name = e.name
            } else if ("QUALIFIED-RULE" == e.type)
                p = e.value.value,
                    i.prelude = e.prelude;
            else if ("AT-RULE" == e.type)
                p = e.value.value,
                    i.name = e.name,
                    i.prelude = e.prelude;
            else if ("DECLARATION" == e.type)
                return i.name = e.name,
                    i.value = e.value,
                    i.important = e.important,
                    i;
            if (p && (o.declarations ? u = it(p) : o.qualified && (u = nt(p))),
                !o)
                return i;
            if (o.declarations) {
                i.declarations = {},
                    i.rules = [],
                    i.errors = [];
                for (var a = 0; a < u.length; a++)
                    if ((e = u[a]) instanceof st) {
                        var c = t(e, {}, r);
                        i.declarations[e.name] = c,
                            i.rules.push(c)
                    } else
                        (s = o["@" + e.name]) ? i.rules.push(t(e, s, r)) : (f = n(e)) ? i.rules.push(f) : i.errors.push(f)
            } else
                for (i.rules = [],
                    i.errors = [],
                    a = 0; a < u.length; a++) {
                    var s, f;
                    (e = u[a]) instanceof ct ? i.rules.push(t(e, o.qualified, r)) : (s = o["@" + e.name]) ? i.rules.push(t(e, s, r)) : (f = n(e)) ? i.rules.push(f) : i.errors.push(f)
                }
            return i
        }
        ,
        t.CSSGrammar = yt
}

func(t);
export default t;
