const Z = (t) => !isNaN(t) && "number" == typeof t;
class ee {
    x = 0;
    y = 0;
    constructor(...t) {
        if (1 === t.length) {
            if (!Z(t[0].x) || !Z(t[0].y)) throw new Error("");
            this.x = t[0].x;
            this.y = t[0].y;
        } else {
            if (2 === t.length) {
                if (Z(t[0]) && Z(t[1])) {
                    this.x = t[0];
                    this.y = t[1];
                } else {
                    if (!(t[0] instanceof DOMPoint && t[1] instanceof DOMPoint))
                        throw new Error("");
                    const e = t[0];
                    const i = t[1];
                    this.x = i.x - e.x;
                    this.y = i.y - e.y;
                }
            } else {
                if (t.length >= 3) throw new Error("");
            }
        }
    }
    static fromVector = (t) => {
        return new ee(t.x, t.y);
    };
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    set length(t) {
        if (0 !== this.length) {
            t /= this.length;
            this.x = this.x * t;
            this.y = this.y * t;
        }
    }
    getNormalVector = () => {
        return new ee(-this.y, this.x);
    };
    getOppositeVector = () => {
        return new ee(-this.x, -this.y);
    };
    negate = () => {
        return this.multiply(-1);
    };
    multiply = (t) => {
        return new ee(this.x * t, this.y * t);
    };
    multiplySelf = (t) => {
        this.x = this.x * t;
        this.y = this.y * t;
        return this;
    };
    divide = (t) => {
        return new ee(this.x / t, this.y / t);
    };
    divideSelf = (t) => {
        this.x = this.x / t;
        this.y = this.y / t;
        return this;
    };
    normalize = () => {
        return 0 === this.length
            ? new ee(this)
            : new ee(this.x / this.length, this.y / this.length);
    };
    scale = (t) => {
        return 0 === this.length
            ? new ee(this)
            : ((t /= this.length), new ee(this.x * t, this.y * t));
    };
    transformPoint = (t) => {
        return new DOMPoint(t.x + this.x, t.y + this.y);
    };
    transformRect = (t) => {
        return new DOMRect(t.x + this.x, t.y + this.y, t.width, t.height);
    };
    matrixTransform = (t) => {
        const e = new DOMPoint(0, 0).matrixTransform(t);
        const i = new DOMPoint(this.x, this.y).matrixTransform(t);
        return new ee(e, i);
    };
    toString = () => {
        return "(" + this.x + ", " + this.y + ")";
    };
}
export default ee;
