import { Zi, pt, os } from "../utils/common";
class GroupManager {
    #stage;
    constructor(stage) {
        this.#stage = stage;
    }
    group = () => {
        this.#stage.undoManager.checkpoint("group", null);
        let s = document.createDocumentFragment();
        let e = [...Array.from(this.#stage.selectedElements.keys())];
        let r = Zi("svg:g");
        e[0].after(r);
        e = os(e);
        for (let t of e) {
            let e = pt(t, r);
            t.setAttribute("transform", e.toString());
            s.append(t);
        }
        r.append(s);
        this.#stage.selectedElements.clear();
        this.#stage.selectedElements.set(r);
    };
    canGroup = () => {
        return this.#stage.selectedObjectElements.size > 0;
    };
    unGroup = () => {
        this.#stage.undoManager.checkpoint("ungroup", null);
        let e = [...Array.from(this.#stage.selectedObjectElements.keys())];
        let l = [];
        for (let t of e)
            if ("g" === t.localName) {
                let r = t;
                let e = document.createDocumentFragment();
                for (let s of [...r.children])
                    if ("bx-title" !== s.localName && "desc" !== s.localName) {
                        if (this.#stage.isSelectableElement(s)) {
                            let e = pt(s, r.parentElement);
                            s.setAttribute("transform", e.toString());
                            l.push(s);
                        }
                        for (let t of r.style) {
                            let e = r.style.getPropertyValue(t);
                            "" === s.style.getPropertyValue(t) && s.style.setProperty(t, e);
                        }
                        e.append(s);
                    }
                r.before(e);
                r.remove();
            } else l.push(t);
        this.#stage.selectedElements.clear();
        this.#stage.selectedElements.sets(l);
    };
    canUnGroup() {
        if (0 === this.#stage.selectedObjectElements.size) return !1;
        for (let e of Array.from(this.#stage.selectedObjectElements.keys()))
            if ("g" === e.localName) return !0;
        return !1;
    }
}
export default GroupManager;
