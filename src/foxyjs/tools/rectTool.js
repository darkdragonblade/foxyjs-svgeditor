import { ct, ut, coordDistance, ni, ja, ai, Zi } from "../utils/common";

class RectTool {
    #pointerdown;
    #disabled = false;
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
        if (sEvent.buttons > 1 || this.#disabled) return;
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

    #painting = (sEvent) => {
        const { clientX, clientY } = sEvent;
        const s = this.#stage.currentContainer || this.#stage.currentWorkspace;

        let type = "planar";

        const style = {
            fill: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-fill'),
            stroke: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke'),
            "stroke-width": getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke-width'),
        }

        const radius = 0;
        this.#stage.undoManager.checkpoint("rectangle", "rect-tool");
        this.#stage.snapManager.snapStart(false);
        let M = new DOMPoint(clientX, clientY);
        M = this.#stage.snapManager.snapPoint(M);
        if ("polar" === type || "planar" === type) {
            let pointermoveEvent;
            let pointerupEvent;
            let m = 1;
            let w = 1;
            let x = "planar" === type ? M.x : M.x - m / 2;
            let y = "planar" === type ? M.y : M.y - w / 2;
            const rect = Zi("svg:rect");
            rect.setAttribute("x", x);
            rect.setAttribute("y", y);
            rect.setAttribute("width", m);
            rect.setAttribute("height", w);
            rect.setAttribute("rx", radius);
            rect.setAttribute("ry", radius);
            s.append(rect);
            ja(rect, style);
            this.#stage.selectedElements.clear(false);
            this.#stage.selectedElements.set(rect);
            const a = ut(rect).inverse();
            const f = ct(rect).multiply(a);
            rect.setAttribute("transform", f.toString());
            this.#stage.ctrlKey &&
                ("polar" === type ? (type = "planar") : "planar" === type && (type = "polar"));
            window.addEventListener(
                "pointermove",
                (pointermoveEvent = (mEvent) => {
                    const { clientX, clientY } = mEvent;
                    let s = new DOMPoint(clientX, clientY);
                    if ("planar" === type) {
                        s = this.#stage.snapManager.snapPoint(s);
                        const r = s.x - M.x || 1;
                        const i = s.y - M.y || 1;
                        m = Math.abs(r);
                        w = Math.abs(i);
                        if (this.#stage.shiftKey) {
                            const a = Math.min(m, w);
                            m = a;
                            w = a;
                        }
                        x = r < 0 ? M.x - m : M.x;
                        y = i < 0 ? M.y - w : M.y;
                    } else {
                        if ("polar" === type) {
                            const o = new DOMPoint(M.x, M.y);
                            const l = new DOMPoint(s.x, s.y);
                            const c = coordDistance(o, l);
                            const p = new DOMPoint(o.x, o.y - c);
                            const h = p.matrixTransform(
                                new DOMMatrix()
                                    .translate(o.x, o.y)
                                    .rotate(-45)
                                    .translate(-o.x, -o.y)
                            );
                            const d = p.matrixTransform(
                                new DOMMatrix()
                                    .translate(o.x, o.y)
                                    .rotate(45)
                                    .translate(-o.x, -o.y)
                            );
                            const g = p.matrixTransform(
                                new DOMMatrix()
                                    .translate(o.x, o.y)
                                    .rotate(135)
                                    .translate(-o.x, -o.y)
                            );
                            const u = coordDistance(h, d);
                            x = M.x - u / 2;
                            y = M.y - u / 2;
                            m = u;
                            w = u;
                            let t = ni(o, g, l);
                            this.#stage.shiftKey && (t = ai(t, 45));
                            let e = new DOMMatrix();
                            e.translateSelf(o.x, o.y);
                            e.rotateSelf(t);
                            e.translateSelf(-o.x, -o.y);
                            rect.setAttribute("transform", f.multiply(e).toString());
                        }
                    }
                    rect.setAttribute("x", x);
                    rect.setAttribute("y", y);
                    rect.setAttribute("width", m);
                    rect.setAttribute("height", w);
                })
            );

            window.addEventListener("pointerup", pointerupEvent = () => {
                window.removeEventListener("pointermove", pointermoveEvent);
                window.removeEventListener("pointerup", pointerupEvent);
                this.#stage.snapManager.snapEnd();
            });
        }
    }
}

export default RectTool;
