import { ct, ut, coordDistance, ja, Zi } from "../utils/common";
import ee from "../utils/ee";
class EllipseTool {
    #disabled = false;
    #pointerdown;
    #stage;
    constructor(stage) {
        this.#stage = stage;
    }
    enable = () => {
        this.#stage.board.style.cursor = "crosshair";
        this.#stage.workspaces.addEventListener(
            "pointerdown",
            (this.#pointerdown = (event) => {
                this.#paint(event);
            })
        );
    };
    disable = () => {
        this.#stage.board.style.cursor = "auto";
        this.#stage.workspaces.removeEventListener(
            "pointerdown",
            this.#pointerdown
        );
    };
    #paint = (sEvent) => {
        if (sEvent.buttons > 1 || !0 === this.#disabled) return;
        let pointermove;
        let pointerup;
        const board = this.#stage.board;
        const sPoint = new DOMPoint(sEvent.clientX, sEvent.clientY);
        board.addEventListener(
            "pointermove",
            (pointermove = (mEvent) => {
                const { clientX, clientY } = mEvent;
                const mPoint = new DOMPoint(clientX, clientY);
                if (coordDistance(sPoint, mPoint) >= 3) {
                    board.removeEventListener("pointermove", pointermove);
                    board.removeEventListener("pointerup", pointerup);
                    this.#painting(sEvent);
                }
            })
        );
        board.addEventListener(
            "pointerup",
            (pointerup = () => {
                board.removeEventListener("pointermove", pointermove);
                board.removeEventListener("pointerup", pointerup);
            })
        );
    }
    #painting = (pSevent) => {
        const { clientX, clientY } = pSevent;
        const layer = this.#stage.currentContainer || this.#stage.currentWorkspace;
        let mode = "planar";
        let type = "ellipse";
        const style = {
            fill: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-fill'),
            stroke: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke'),
            "stroke-width": getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke-width'),
        }
        this.#stage.undoManager.checkpoint("ellipseangle", "ellipse-tool");
        this.#stage.snapManager.snapStart(false);
        let pSpoint = new DOMPoint(clientX, clientY);
        pSpoint = this.#stage.snapManager.snapPoint(pSpoint);
        if ("ellipse" === type) {
            const svgEllipse = Zi("svg:ellipse");
            layer.append(svgEllipse);
            ja(svgEllipse, style);
            this.#stage.selectedElements.clear(false);
            this.#stage.selectedElements.set(svgEllipse);
            if ("polar" === mode || "planar" === mode) {
                let pointermove;
                let e = ut(svgEllipse).inverse();
                let n = ct(svgEllipse).multiply(e);
                svgEllipse.setAttribute("transform", n.toString());
                this.#stage.ctrlKey &&
                    ("polar" === mode ? (mode = "planar") : "planar" === mode && (mode = "polar"));
                window.addEventListener(
                    "pointermove",
                    (pointermove = (mEvent) => {
                        const { clientX, clientY } = mEvent;
                        let pMpoint = new DOMPoint(clientX, clientY);
                        if ("planar" === mode) {
                            pMpoint = this.#stage.snapManager.snapPoint(pMpoint);
                            const i = pMpoint.x - pSpoint.x || 1;
                            const o = pMpoint.y - pSpoint.y || 1;
                            let t = Math.abs(i);
                            let e = Math.abs(o);
                            if (this.#stage.shiftKey) {
                                const minDis = Math.min(t, e);
                                t = minDis;
                                e = minDis;
                            }
                            const r = i < 0 ? pSpoint.x - t : pSpoint.x;
                            const a = o < 0 ? pSpoint.y - e : pSpoint.y;
                            svgEllipse.setAttribute("cx", r + t / 2);
                            svgEllipse.setAttribute("cy", a + e / 2);
                            svgEllipse.setAttribute("rx", t / 2);
                            svgEllipse.setAttribute("ry", e / 2);
                        } else {
                            if ("polar" === mode) {
                                const d = new ee(pSpoint, pMpoint);
                                svgEllipse.setAttribute("cx", pSevent.x);
                                svgEllipse.setAttribute("cy", pSevent.y);
                                svgEllipse.setAttribute("rx", d.length);
                                svgEllipse.setAttribute("ry", d.length);
                            }
                        }
                    })
                );
                const pointerup = () => {
                    window.removeEventListener("pointermove", pointermove);
                    window.removeEventListener("pointerup", pointerup);
                    this.#stage.snapManager.snapEnd();
                };
                window.addEventListener("pointerup", pointerup);
            }
        }
    }
}
export default EllipseTool;
