import { ut, pt, ti } from "../utils/common";
class freehandHud {
    #stage;
    hud = document.querySelector("#freehand-hud");
    ["#outline"];
    Ft;
    get points() {
        return [...this["#outline"].points].map((t) => DOMPoint.fromPoint(t));
    }
    constructor(t) {
        this.#stage = t;
        this.hud.innerHTML =
            '\n  <style>\n    #freehand-hud [uid="outline"] {\n      fill: none;\n      stroke: red;\n      stroke-width: 2.5;\n      vector-effect: non-scaling-stroke;\n      pointer-events: none;\n    }\n  </style>\n\n  <polyline uid="outline"></polyline>\n';
        this["#outline"] = this.hud.querySelector('[uid="outline"]');
    }
    show = (t, n) => {
        this.hud.hasAttribute("drawing") && this.hide();
        this.hud.setAttribute("drawing", "");
        this.#stage.snapManager.snapStart(!0);
        let s = ut(t, !0).inverse();
        let e = pt(t, this.#stage.canvas, !0);
        let o = n.matrixTransform(s);
        let r = !1;
        this["#outline"].setAttribute("points", o["x"] + " " + o["y"]);
        this["#outline"].setAttribute("transform", e.toString());
        window.addEventListener(
            "pointermove",
            (this.Ft = (e) => {
                for (let t of e.getCoalescedEvents()) {
                    let i = new DOMPoint(t.clientX, t.clientY);
                    this.#stage.shiftKey && (r = !0);
                    if (!1 === r) {
                        let t = i.matrixTransform(s);
                        this["#outline"].points.appendItem(ti(t));
                    } else {
                        if (this.#stage.ctrlKey) {
                            let t = this.#stage.snapManager.snapPointToAngleMultiple(
                                n,
                                i,
                                15
                            );
                            t = this.#stage.snapManager.snapPoint(t);
                            let e = t.matrixTransform(s);
                            this["#outline"].setAttribute("points", "");
                            this["#outline"].points.appendItem(ti(o));
                            this["#outline"].points.appendItem(ti(e));
                        } else {
                            let t = this.#stage.snapManager.snapPoint(i).matrixTransform(s);
                            this["#outline"].setAttribute("points", "");
                            this["#outline"].points.appendItem(ti(o));
                            this["#outline"].points.appendItem(ti(t));
                        }
                    }
                }
            })
        );
    };
    hide = () => {
        if (this.hud.hasAttribute("drawing")) {
            this.hud.removeAttribute("drawing");
            this["#outline"].setAttribute("points", "");
            window.removeEventListener("pointermove", this.Ft);
            this.#stage.snapManager.snapEnd();
        }
    };
    clear = () => {
        this["#outline"].setAttribute("points", "");
    };
}
export default freehandHud;
