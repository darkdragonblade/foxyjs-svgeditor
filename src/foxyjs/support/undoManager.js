const ac = {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true,
};

class UndoManager {
    #stage;
    #Observer;
    #groups = [];
    #position = 0;
    #disabled = false;
    constructor(stage) {
        this.#stage = stage;
        this.#Observer = new MutationObserver((t) => {
            for (let e of t) this.#ti(e);
        });
        this.#ii();
    }
    get groups() {
        return this.#groups;
    }
    get position() {
        return this.#position;
    }
    get disabled() {
        return this.#disabled;
    }
    set disabled(e) {
        var t;
        if ((t = e) === !!t && e !== this.#disabled) {
            this.#disabled = e;
            this.#ii();
        }
    }
    clear = () => {
        this.#groups = [];
        this.#position = 0;
        this.#stage.board.dispatchEvent(
            new CustomEvent("undochange", { detail: "clear" })
        );
    };
    checkpoint = (e, t) => {
        this.#Observer.takeRecords();
        this.#position < this.#groups.length &&
            (this.#groups = this.#groups.slice(0, this.#position));
        let i = { label: e, origin: t || null, transactions: [] };
        this.#groups.push(i);
        this.#position += 1;
    };
    undo = () => {
        if (this.canUndo()) {
            this.#si();
            this.disabled = !0;
            this.#position -= 1;
            let e = this.#groups[this.#position];
            let t = [...e.transactions].reverse();
            let i = e.label || "";
            let s = new Set();
            let a = new Set();
            let r = new Set();
            for (let i of t)
                if ("childList" === i.type) {
                    let t = document.createDocumentFragment();
                    for (let e of i.addedNodes) {
                        i.target.removeChild(e);
                        this.#stage.selectedElements.delete(e);
                        a.add(e);
                        s.delete(e);
                    }
                    for (let e of i.removedNodes) {
                        t.append(e);
                        s.add(e);
                        a.delete(e);
                    }
                    i.nextSibling
                        ? i.target.insertBefore(t, i.nextSibling)
                        : i.previousSibling
                            ? i.target.insertBefore(t, i.previousSibling.nextSibling)
                            : i.target.append(t);
                } else {
                    if ("attributes" === i.type) {
                        if (null === i.oldValue) {
                            i.target.removeAttribute(i.attributeName);
                        } else {
                            i.target.setAttribute(i.attributeName, i.oldValue);
                            r.add(i.target);
                        }
                    } else {
                        if ("characterData" === i.type) {
                            i.target.data = i.oldValue;
                            r.add(i.target);
                        }
                    }
                }


            this.disabled = !1;
            this.#stage.board.dispatchEvent(
                new CustomEvent("undo", {
                    detail: {
                        label: i,
                        addedNodes: s,
                        removedNodes: a,
                        modifiedNodes: r,
                    },
                })
            );
            this.#stage.board.dispatchEvent(
                new CustomEvent("undochange", { detail: "decrement" })
            );
        } else console.info("Can't undo");
    };
    redo = () => {
        if (this.canRedo()) {
            let e = this.#groups[this.#position];
            let t = e.transactions;
            this.disabled = !0;
            this.#position += 1;
            let i = e.label || "";
            let s = new Set();
            let a = new Set();
            let r = new Set();
            for (let i of t)
                if ("childList" === i.type) {
                    let t = document.createDocumentFragment();
                    for (let e of i.removedNodes) {
                        i.target.removeChild(e);
                        this.#stage.selectedElements.delete(e);
                        a.add(e);
                        s.delete(e);
                    }
                    for (let e of i.addedNodes) {
                        t.append(e);
                        s.add(e);
                        a.delete(e);
                    }
                    i.nextSibling
                        ? i.target.insertBefore(t, i.nextSibling)
                        : i.previousSibling
                            ? i.target.insertBefore(t, i.previousSibling.nextSibling)
                            : i.target.append(t);
                } else {
                    if ("attributes" === i.type) {
                        if (null === i.newValue) {
                            i.target.removeAttribute(i.attributeName);
                        } else {
                            i.target.setAttribute(i.attributeName, i.newValue);
                            r.add(i.target);
                        }
                    } else {
                        if ("characterData" === i.type) {
                            i.target.data = i.newValue;
                            r.add(i.target);
                        }
                    }
                }
            this.disabled = !1;
            this.#stage.board.dispatchEvent(
                new CustomEvent("redo", {
                    detail: {
                        label: i,
                        addedNodes: s,
                        removedNodes: a,
                        modifiedNodes: r,
                    },
                })
            );
            this.#stage.board.dispatchEvent(
                new CustomEvent("undochange", { detail: "increment" })
            );
        } else console.info("Can't redo");
    };
    canUndo = () => {
        return (
            0 !== this.#position &&
            !this.disabled &&
            (1 !== this.#position || !this.#ni())
        );
    };
    canRedo = () => {
        return this.#position !== this.#groups.length && !this.disabled;
    };
    getLabel() {
        let t = [];
        return t["join"](" ‣ ");
    }
    #ii() {
        if (this.disabled) {
            this.#Observer.takeRecords();
            this.#Observer.disconnect();
        } else {
            !this.disabled &&
                this.#Observer.observe(this.#stage.workspaces, ac);
        }
    }
    #ti(i) {
        if (0 === this.#groups.length) return;
        let s = this.#groups[this.#groups.length - 1].transactions;
        let e = s.length;
        if ("attributes" === i.type) {
            let t = i.attributeName;
            let e = s.find(
                (e) =>
                    "attributes" === e.type &&
                    e.attributeName === t &&
                    e.target === i.target
            );
            if (e) {
                e.newValue = e.target.getAttribute(t);
            } else {
                e = {
                    type: "attributes",
                    target: i.target,
                    attributeName: t,
                    oldValue: i.oldValue,
                    newValue: i.target.getAttribute(t),
                };
                s.push(e);
            }
        } else {
            if ("characterData" === i.type) {
                let e = s.find(
                    (e) => "characterData" === e.type && e.target === i.target
                );
                if (e) e.newValue = e.target.data;
                else {
                    let e = {
                        type: "characterData",
                        target: i.target,
                        oldValue: i.oldValue,
                        newValue: i.target.data,
                    };
                    s.push(e);
                }
            } else {
                if ("childList" === i.type) {
                    let e = {
                        type: "childList",
                        target: i.target,
                        addedNodes: [...i.addedNodes],
                        removedNodes: [...i.removedNodes],
                        nextSibling: i.nextSibling,
                        previousSibling: i.previousSibling,
                    };
                    s.push(e);
                }
            }
        }
        if (0 === e && s.length > 0) {
            this.#stage.board.dispatchEvent(
                new CustomEvent("undochange", { detail: "increment" })
            );
        }
    }
    #ni = () => {
        return 0 === this.#groups[this.#position - 1].transactions.length;
    };
    #si = () => {
        if (
            this.#position > 0 &&
            0 === this.#groups[this.#position - 1].transactions.length
        ) {
            this.#groups = this.#groups.filter(
                (e) => e !== this.#groups[this.#position]
            );
            this.#position -= 1;
        }
    };
}
export default UndoManager;
