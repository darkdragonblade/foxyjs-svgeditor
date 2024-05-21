import { SVGPathData } from "../svg-pathdata/src/SVGPathData";
import { coordDistance, Zi, ct, ut, ja, ai, ni } from "../utils/common";
class PathTool {
    #stage;
    #d = "";
    #disabled = false;
    get d() {
        return this.#d;
    }
    set d(val) {
        this.#d = val;
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
        if (!this.d) return console.warn('set D please.');
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

        const style = {
            fill: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-fill'),
            stroke: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke'),
            "stroke-width": getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke-width'),
        }

        this.#stage.undoManager.checkpoint("path-tool", null);
        this.#stage.snapManager.snapStart(false);
        let pSpoint = new DOMPoint(clientX, clientY);
        pSpoint = this.#stage.snapManager.snapPoint(pSpoint);
        const svgPath = Zi("svg:path");
        layer.append(svgPath);
        ja(svgPath, style);
        this.#stage.selectedElements.clear();
        this.#stage.selectedElements.set(svgPath);
        if ("polar" === type || "planar" === type) {

            let pMoveEvent;
            let d = "";
            const o = ut(svgPath).inverse();
            const c = ct(svgPath).multiply(o);
            svgPath.setAttribute("transform", c.toString());
            svgPath.setAttribute("d", this.#d);
            const { width, height } = svgPath.getBoundingClientRect();
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
                        d = new SVGPathData(this.#d)
                            .matrix(sw / width, 0, 0, sh / height, pSpoint.x, pSpoint.y)
                            .encode();
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

                            d = new SVGPathData(this.#d)
                                .matrix(matrixDistance / width, 0, 0, matrixDistance / height, e, f)
                                .encode();

                            let t = ni(startP, g, startM);
                            this.#stage.shiftKey && (t = ai(t, 45));
                            let matrix = new DOMMatrix();
                            matrix.translateSelf(startP.x, startP.y);
                            matrix.rotateSelf(t);
                            matrix.translateSelf(-startP.x, -startP.y);
                            svgPath.setAttribute("transform", c.multiply(matrix).toString());
                        }
                    }
                    svgPath.setAttribute("d", d);
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
export default PathTool;
