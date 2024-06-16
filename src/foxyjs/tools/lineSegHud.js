import { Pi } from "../utils/common";
class LineSegHud {
    #stage;
    #hud = document.querySelector("#line-seg-hud");
    #innerHTML = '<line uid="outline" class="outline" x1="0" y1="0" x2="0" y2="0"></line>';
    #outline;
    Ft;
    #disabled = false;

    get x1() {
        return this.#outline.x1.baseVal.value;
    }
    get y1() {
        return this.#outline.y1.baseVal.value;
    }
    get x2() {
        return this.#outline.x2.baseVal.value;
    }
    get y2() {
        return this.#outline.y2.baseVal.value;
    }
    get points() {
        return [...this.#outline.points].map((p) => DOMPoint.fromPoint(p));
    }

    get hud() {
        return this.#hud;
    }

    get mode() {
        return this.hud.hasAttribute("mode")
            ? this.hud.getAttribute("mode")
            : "edit";
    }
    set mode(val) {
        null === val
            ? this.hud.setAttribute("mode", "edit")
            : this.hud.setAttribute("mode", Pi(val));
    }

    constructor(stage) {
        this.#stage = stage;
        this.hud.innerHTML = this.#innerHTML;
        this.#outline = this.hud.querySelector('[uid="outline"]');
    }
}

export default LineSegHud;