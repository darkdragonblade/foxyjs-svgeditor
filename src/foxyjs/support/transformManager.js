import { ut, ct, kt, ci, Yi, pt } from "../utils/common";
class TransformManager {
    #stage;
    constructor(stage) {
        this.#stage = stage;
    }
    canRotate = () => {
        return this.#stage.selectedObjectElements.size > 0;
    };
    rotate = (deg = 90, t = null) => {

        this.#stage.undoManager.checkpoint(
            deg > 0 ? "#rotate-clockwise" : "#rotate-counterclockwise",
            t
        );

        const elements = [...Array.from(this.#stage.selectedObjectElements.keys())];
        const l = kt(elements);

        for (let el of elements) {
            const i = ct(el);
            const r = ut(el);
            const a = r.inverse();
            const matrix = DOMMatrix.fromMatrix(i);
            matrix.multiplySelf(a);
            matrix.translateSelf(l.x, l.y);
            matrix.rotateSelf(deg);
            matrix.translateSelf(-l.x, -l.y);
            matrix.multiplySelf(r);
            el.setAttribute("transform", matrix.toString());
        }

    };
    canFlip = () => {
        return this.#stage.selectedObjectElements.size > 0;
    };
    flipX = () => {
        this.#flip("x");
    };
    flipY = () => {
        this.#flip("y");
    };
    #flip(direction = "x") {
        this.#stage.undoManager.checkpoint("flip-" + direction, null);
        const elements = [...Array.from(this.#stage.selectedObjectElements.keys())];
        const e = elements.map((t) => Yi(t));
        const a = ci(e);
        for (let el of elements) {
            let transformMatrix;
            let t = ct(el);
            let s = ut(el);
            let l = s.inverse();
            switch (direction) {
                case "x":
                    {
                        const e = 2 * (a.x + a.width / 2);
                        transformMatrix = new DOMMatrix([-1, 0, 0, 1, e, 0]);
                    }
                    break;
                case "y":
                    {
                        const f = 2 * (a.y + a.height / 2);
                        transformMatrix = new DOMMatrix([1, 0, 0, -1, 0, f]);
                    }
                    break;
            }
            const matrix = DOMMatrix.fromMatrix(t);
            matrix.multiplySelf(l);
            matrix.multiplySelf(transformMatrix);
            matrix.multiplySelf(s);
            el.setAttribute("transform", matrix.toString());
        }
    }
    canMove() {
        return (
            0 !== this.#stage.selectedElements.size ||
            !this.#stage.currentWorkspace.hasAttribute("viewBox")
        );
    }
    move(x, y) {
        this.#stage.undoManager.checkpoint("move", null);
        // let t = false;
        // let e = false;
        // this.#stage.viewTool.enabled
        //     ? (t = this.#stage.viewTool.moveCallback(a, o))
        //     : this.#stage.splineTool.enabled &&
        //     (e = this.#stage.splineTool.moveCallback(a, o));

        // if (!t && !e) {
        for (let el of Array.from(this.#stage.selectedElements.keys()))
            if ("fx-guide" === el.localName) {
            } else {
                let t = ct(el);
                let e = pt(el, this.#stage.currentWorkspace);
                let s = e.inverse();
                let transformMatrix = new DOMMatrix();
                transformMatrix.translateSelf(x, y);
                let matrix = DOMMatrix.fromMatrix(t);
                matrix.multiplySelf(s);
                matrix.multiplySelf(transformMatrix);
                matrix.multiplySelf(e);
                el.setAttribute("transform", matrix.toString());
            }
        // }
    }
}
export default TransformManager;
