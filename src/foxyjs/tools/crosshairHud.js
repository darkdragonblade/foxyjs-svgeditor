import { ut, te, Zi, di, fs, ks } from "../utils/common";
class CrosshairManager {
    #innerHTML = `
            <g class="crosshair-horizontal" transform="translate(-999999, -999999) rotate(90)">
                <line class="inner-line" x1="0" y1="-99999" x2="0" y2="99999"></line>
            </g>
            <g class="crosshair-vertical" transform="translate(-999999, -999999)">
                <line class="inner-line" x1="0" y1="-99999" x2="0" y2="99999"></line>
            </g>
    `;
    #stage;
    #hud = document.querySelector("#crosshair-hud");
    #horizontal;
    #vertical;
    #pointermoveEvent;
    get hud() {
        return this.#hud;
    }
    get enabled() {
        return this.hud.hasAttribute("enabled");
    }
    set enabled(val) {
        val
            ? this.hud.setAttribute("enabled", "")
            : this.hud.removeAttribute("enabled");
    }
    constructor(stage) {
        this.#stage = stage;
        this.#hud.innerHTML = this.#innerHTML;
        this.#horizontal = this.#hud.querySelector('.crosshair-horizontal');
        this.#vertical = this.#hud.querySelector('.crosshair-vertical');
    }
    enable = () => {
        this.enabled = true;
        window.addEventListener("pointermove", this.#pointermoveEvent = ($event) => {
            this.#update($event);
        });
    };
    disable = () => {
        this.enabled = false;
        window.removeEventListener('pointermove', this.#pointermoveEvent);
    }
    #update = ($event) => {

        const { clientX, clientY } = $event;
        const canvasInverse = ut(this.#stage.canvas).inverse();

        const transform = new DOMPoint(clientX, clientY).matrixTransform(canvasInverse);
        const { x, y } = transform;

        this.#horizontal.setAttribute("transform", `translate(${x}, ${y}) rotate(90)`);
        this.#vertical.setAttribute("transform", `translate(${x}, ${y})`);
        // const { x: ox, y: oy } = this.#stage.svg.getBoundingClientRect();
        // this.#vertical.style.left = (x - ox) + 'px';
        // this.#horizontal.style.top = (y - oy) + 'px';
    }

}
export default CrosshairManager;
