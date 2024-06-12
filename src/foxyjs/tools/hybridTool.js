import { coordDistance, Zi, ct, ut, ja, ai, ni, fs } from "../utils/common";
import { scale } from "../utils/matrix";
class HybridTool {
    #stage;
    #node;
    #disabled = false;
    get node() {
        return this.#node;
    }
    set node(val) {
        this.#node = typeof val === 'string' ? fs(val) : val;
    }
    constructor(stage) {
        this.#stage = stage;
    }
    enable = () => {
        this.#stage.board.style.cursor = "crosshair";
        this.#stage.workspaces.addEventListener("pointerdown", this.#pointerdown);
    };
    disable = () => {
        this.#stage.board.style.cursor = "auto";
        this.#stage.workspaces.removeEventListener(
            "pointerdown",
            this.#pointerdown
        );
    };
    #pointerdown = (sEvent) => {
        if (!this.#node) return console.warn('set node please.');
        const { clientX, clientY, buttons } = sEvent;
        if (buttons > 1 || this.#disabled) return;
        let moveEvent;
        let endEvent;
        const board = this.#stage.board;
        const sPoint = new DOMPoint(clientX, clientY);
        board.addEventListener(
            "pointermove",
            (moveEvent = (mEvent) => {
                const { clientX, clientY } = mEvent;
                const mPoint = new DOMPoint(clientX, clientY);
                if (coordDistance(sPoint, mPoint) >= 3) {
                    board.removeEventListener("pointermove", moveEvent);
                    board.removeEventListener("pointerup", endEvent);
                    this.#painting(mEvent);
                }
            })
        );
        board.addEventListener(
            "pointerup",
            (endEvent = () => {
                board.removeEventListener("pointermove", moveEvent);
                board.removeEventListener("pointerup", endEvent);
            })
        );
    };
    #painting = (pSEvent) => {

        const { clientX, clientY } = pSEvent;
        const layer = this.#stage.currentContainer || this.#stage.currentWorkspace;
        let type = "planar";

        this.#stage.undoManager.checkpoint("hybrid-tool", null);
        this.#stage.snapManager.snapStart(false);
        let pSpoint = new DOMPoint(clientX, clientY);
        pSpoint = this.#stage.snapManager.snapPoint(pSpoint);
        const svgPath = this.#node;
        layer.append(svgPath);
        this.#stage.selectedElements.clear();
        this.#stage.selectedElements.set(svgPath);
        if ("polar" === type || "planar" === type) {

            let pMoveEvent;
            const o = ut(svgPath).inverse();
            const transform = ct(svgPath).multiply(o);
            svgPath.setAttribute("transform", transform.toString());
            const { width, height } = svgPath.getBoundingClientRect();
            const { a, b, c, d, e, f } = svgPath.getMatrix();

            this.#stage.ctrlKey &&
                ("polar" === type ? (type = "planar") : "planar" === type && (type = "polar"));
            window.addEventListener(
                "pointermove",
                (pMoveEvent = (pMEvent) => {
                    const { clientX, clientY } = pMEvent;
                    let pMpoint = new DOMPoint(clientX, clientY);
                    if ("planar" === type) {
                        pMpoint = this.#stage.snapManager.snapPoint(pMpoint);
                        const x = pMpoint.x - pSpoint.x || 1;
                        const y = pMpoint.y - pSpoint.y || 1;
                        let sw = x;
                        let sh = y;
                        if (this.#stage.shiftKey) {
                            const minDis = Math.min(x, y);
                            sw = minDis;
                            sh = minDis;
                        }
                        // d = new SVGPathData(this.#d)
                        //     .matrix(sw / width, 0, 0, sh / height, pSpoint.x, pSpoint.y)
                        //     .encode();

                        scale(svgPath, 2, 2, 0, 0)

                    } else {
                        if ("polar" === type) {
                            const startP = pSpoint;
                            const startM = new DOMPoint(pMEvent.x, pMEvent.y);
                            const moveDistance = coordDistance(startP, startM);
                            const p = new DOMPoint(startP.x, startP.y - moveDistance);

                            const a = p.matrixTransform(
                                new DOMMatrix()
                                    .translate(startP.x, startP.y)
                                    .rotate(-45)
                                    .translate(-startP.x, -startP.y)
                            );

                            const h = p.matrixTransform(
                                new DOMMatrix()
                                    .translate(startP.x, startP.y)
                                    .rotate(45)
                                    .translate(-startP.x, -startP.y)
                            );

                            const g = p.matrixTransform(
                                new DOMMatrix()
                                    .translate(startP.x, startP.y)
                                    .rotate(135)
                                    .translate(-startP.x, -startP.y)
                            );

                            const matrixDistance = coordDistance(a, h);
                            const e = pSpoint.x - matrixDistance / 2;
                            const f = pSpoint.y - matrixDistance / 2;

                            // d = new SVGPathData(this.#d)
                            //     .matrix(matrixDistance / width, 0, 0, matrixDistance / height, e, f)
                            //     .encode();

                            let t = ni(startP, g, startM);
                            this.#stage.shiftKey && (t = ai(t, 45));
                            let matrix = new DOMMatrix();
                            matrix.translateSelf(startP.x, startP.y);
                            matrix.rotateSelf(t);
                            matrix.translateSelf(-startP.x, -startP.y);
                            svgPath.setAttribute("transform", c.multiply(matrix).toString());
                        }
                    }
                })
            );

            const pEndEvent = () => {
                window.removeEventListener("pointermove", pMoveEvent);
                window.removeEventListener("pointerup", pEndEvent);
                this.#stage.snapManager.snapEnd();
            };

            window.addEventListener("pointerup", pEndEvent);
        }
    };
}
export default HybridTool;
