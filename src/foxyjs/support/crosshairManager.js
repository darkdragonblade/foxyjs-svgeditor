import { ut, te, Zi, di, fs, ks } from "../utils/common";
class CrosshairManager {
    #innerHTML = `<div id="horizontal-crosshair"></div><div id="vertical-crosshair"></div>`;
    #stage;
    #crosshair;
    #horizontal;
    #vertical;
    set enabled(val) {
        val
            ? this.crosshair.style.setProperty("display", "block")
            : this.crosshair.style.setProperty("display", "none");
    }
    get enabled() {
        return this.crosshair.style.display === "block";
    }
    get crosshair() {
        return this.#crosshair;
    }
    constructor(stage) {
        this.#stage = stage;
        this.#crosshair = document.createElement("div");
        this.#crosshair.id = "crosshair";
        this.#stage.svg.after(this.#crosshair);
        this.#crosshair.append(fs`${this.#innerHTML}`);
        this.#horizontal = this.#crosshair.querySelector("#horizontal-crosshair");
        this.#vertical = this.#crosshair.querySelector("#vertical-crosshair");
    }
    getRulerTypeFromPoint = (e, t) => {
        let r = document.elementFromPoint(e, t);
        let i = r ? r.closest(".ruler") : null;
        return i ? i.getAttribute("data-type") : null;
    };
    enable = () => {
        this.enabled = true;
    };
    disable = () => {
        this.enabled = false;
    }
    update = (x, y) => {
        if (!this.enabled) return;
        const { x: ox, y: oy } = this.#stage.svg.getBoundingClientRect();
        this.#vertical.style.left = (x - ox) + 'px';
        this.#horizontal.style.top = (y - oy) + 'px';
    }

}
export default CrosshairManager;
