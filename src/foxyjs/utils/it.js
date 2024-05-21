class it {
    currentToken = null;
    position = 0;
    #u;
    constructor(t) {
        this.#u = t;
    }
    read = () => {
        let t = this.#u[this.position];
        this.currentToken = t;
        "EOF" === t.tokenType || (this.position += 1);
        return t;
    };
    reset = (t) => {
        this.position = t;
    };
}
export default it;
