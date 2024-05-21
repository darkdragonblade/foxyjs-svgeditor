import { ut } from "../utils/common";

class RubberBand {
    #rubberBandHud = document.querySelector("#rubber-band-hud");
    #rubberBand;
    get rubberBandHud() {
        return this.#rubberBandHud;
    }
    get enabled() {
        return this.rubberBandHud.hasAttribute("enabled");
    }
    set enabled(val) {
        val
            ? this.rubberBandHud.setAttribute("enabled", "")
            : this.rubberBandHud.removeAttribute("enabled");
    }
    constructor() {
        this.#rubberBandHud.innerHTML = `
        <rect uid="rubber-band" x="0" y="0" width="0" height="0" hidden=""></rect>`;
        this.#rubberBand = this.#rubberBandHud.querySelector('[uid="rubber-band"]');
    }
    grabSelection = (sEvent) => {
        if (!this.enabled) return;
        return new Promise((resolve) => {
            const { clientX, clientY } = sEvent;

            let moveEvent;
            let endEvent;
            const u = ut(this.#rubberBandHud).inverse();
            const d = new DOMPoint(clientX, clientY).matrixTransform(u);
            let x = 0;
            let y = 0;
            let width = 0;
            let height = 0;
            this.#rubberBand.removeAttribute("hidden");
            window.addEventListener(
                "pointermove",
                (moveEvent = (mEvent) => {
                    if (!mEvent.isPrimary) return;
                    const { clientX, clientY } = mEvent;
                    const t = new DOMPoint(clientX, clientY).matrixTransform(u);
                    width = t.x - d.x;
                    height = t.y - d.y;
                    if (width < 0) {
                        width = -width;
                        x = d.x - width;
                    } else {
                        x = d.x;
                    }
                    if (height < 0) {
                        height = -height;
                        y = d.y - height;
                    } else {
                        y = d.y;
                    }
                    this.#rubberBand.setAttribute("x", x + "");
                    this.#rubberBand.setAttribute("y", y + "");
                    this.#rubberBand.setAttribute("width", width + "");
                    this.#rubberBand.setAttribute("height", height + "");
                })
            );
            window.addEventListener(
                "pointerup",
                (endEvent = (eEvent) => {
                    if (!eEvent.isPrimary) return;
                    this.#rubberBand.setAttribute("hidden", "");
                    this.#rubberBand.setAttribute("x", 0 + "");
                    this.#rubberBand.setAttribute("y", 0 + "");
                    this.#rubberBand.setAttribute("width", 0 + "");
                    this.#rubberBand.setAttribute("height", 0 + "");
                    window.removeEventListener("pointermove", moveEvent);
                    window.removeEventListener("pointerup", endEvent);
                    resolve(new DOMRect(x, y, width, height));
                })
            );
        });
    };
}
export default RubberBand;