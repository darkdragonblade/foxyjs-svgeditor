import { ie, ct, ut, di, ci } from "../utils/common";
import nt from "../utils/nt";
class ZoomManager {
    #stage;
    constructor(stage) {
        this.#stage = stage;
    }
    enable = () => {
        this.#stage.board.addEventListener("wheel", this.#wheel, {
            passive: false,
        });
    };
    disable = () => {
        this.#stage.board.removeEventListener("wheel", this.#wheel);
    };
    #wheel = (event) => {
        const { wheelDeltaX, wheelDeltaY, metaKey, ctrlKey, altKey, shiftKey, clientX, clientY } = event;
        event.preventDefault();
        const scrollX = ie(wheelDeltaX, -20, 20, 1);
        const scrollY = ie(wheelDeltaY, -20, 20, 1);
        if ((!metaKey && !ctrlKey) || altKey || shiftKey) {
            this.#stage.scrollBy(scrollX / 1.8, scrollY / 1.8);
        } else {
            const target = new DOMPoint(clientX, clientY);
            const s = 250;
            this.zoom(scrollY / s, target);
        }
    };
    zoom = (e = 0.3, target = null) => {
        const i = 0.1;
        const s = 3e5;
        if (null === target) {
            const { x, y, width, height } = this.#stage.board.getBoundingClientRect();
            target = new DOMPoint(x + width / 2, y + height / 2);
        }
        const canvasMatrix = ct(this.#stage.canvas);
        const scale = canvasMatrix.a;
        const svgMatrixInverse = ut(this.#stage.svg).inverse();
        const { x, y } = target.matrixTransform(svgMatrixInverse);
        if (scale > 0) {
            100 * (scale + e * scale) < i
                ? (e = (i - 100 * scale) / (100 * scale))
                : 100 * (scale + e * scale) > s &&
                (e = (s - 100 * scale) / (100 * scale));
            const matrix = new DOMMatrix();
            matrix.scaleSelf(1 + e, 1 + e, 1, x, y);
            matrix.multiplySelf(canvasMatrix);
            this.#stage.canvas.setAttribute("transform", matrix.toString());
        }
    }
    zoomIn = (t = !0) => {
        t && false ? this.zoom(0.2, this.#stage.pointerClientPoint) : this.zoom(0.2);
    };
    zoomOut = (t = !0) => {
        t && false
            ? this.zoom(-0.2, this.#stage.pointerClientPoint)
            : this.zoom(-0.2);
    };
    zoomToFitView = (t = "top-left", e = 20, i = !0) => {
        const layer = this.#stage.currentWorkspace;
        let o = void 0;
        let a = [];
        if (layer.hasAttribute("viewBox")) {
            const t = nt
                .fromString(this.#stage.currentWorkspace.getAttribute("viewBox"))
                .toRect();
            a.push(t);
        }
        for (let t of layer.querySelectorAll(":scope > view, :scope > defs > view"))
            a.push(t.viewBox.baseVal);
        a.length > 0 && (o = ci(a));
        o && this.zoomToArea(o, t, e, i);
    };
    zoomToArea = (t, position = "top-left", i = 20, s = !0) => { };
}
export default ZoomManager;
