import { coordDistance } from "../utils/common";
import ee from "../utils/ee";
class PanTool {
    #stage;
    #startEvent;
    #moveEvent;
    #endEvent;
    #disabled = false;
    #eventDisabled = false;
    constructor(stage) {
        this.#stage = stage;
    }
    enable = () => {
        this.#stage.board.style.cursor = "-webkit-grab";
        this.#stage.workspaces.addEventListener(
            "pointerdown",
            (this.#startEvent = (e) => {
                this.#pointerdown(e);
            })
        );
    }
    disable = () => {
        this.#stage.board.style.cursor = "-webkit-grab";
        this.#stage.workspaces.removeEventListener("pointerdown", this.#startEvent);
    }
    #pointerdown = (sEvent) => {
        if (sEvent.buttons > 1 || !sEvent.isPrimary) return;
        this.#stage.board.style.cursor = "-webkit-grabbing";
        this.#eventDisabled = true;
        const startPoint = new DOMPoint(sEvent.clientX, sEvent.clientY);
        let rPoint = startPoint;
        window.addEventListener(
            "pointermove",
            (this.#moveEvent = (mEvent) => {
                if (mEvent.pointerId !== sEvent.pointerId) return;
                const movePoint = new DOMPoint(mEvent.clientX, mEvent.clientY);
                const timeStamp = mEvent.timeStamp - sEvent.timeStamp;
                if (coordDistance(startPoint, movePoint) >= 3 || timeStamp > 80) {
                    const { x, y } = new ee(rPoint, movePoint);
                    if (!this.#disabled) {
                        this.#stage.scrollBy(x, y);
                    }
                    rPoint = movePoint;
                }
            })
        );
        window.addEventListener(
            "pointerup",
            (this.#endEvent = (eEvent) => {
                if (eEvent.pointerId !== sEvent.pointerId) return;
                window.removeEventListener("pointermove", this.#moveEvent);
                window.removeEventListener("pointerup", this.#endEvent);
                this.#eventDisabled = false;;
                !this.#disabled && (this.#stage.board.style.cursor = "-webkit-grab");
            })
        );
    }
}
export default PanTool;
