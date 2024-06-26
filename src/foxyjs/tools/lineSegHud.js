import { Pi,ut,pt } from "../utils/common";
class LineSegHud {
    #stage;
    #hud = document.querySelector("#line-seg-hud");
    #innerHTML = '<line uid="outline" class="outline" x1="0" y1="0" x2="0" y2="0"></line>';
    #outline;
    Ft;
    #disabled = false;

    pointermove = null;
    pointerup = null;
    modkeyschange = null;
    zoomchange = null;

    ["#container"];
    ["#outline"];
    ["#control-point-1-grippie"];
    ["#control-point-2-grippie"];
    ["#control-line-1"];
    ["#control-line-2"];

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

    show = (ay, az) => {

        this.hud.hasAttribute('drawing') && this.hide();
        this.hud.setAttribute("drawing", "");
        this.#stage.snapManager.snapStart(true);
        let aA = ut(this.#stage.canvas);
        let aB = aA.inverse();
        let aC = az.matrixTransform(aB);

        let aD = ()=>{
            aA = ut(this.#stage.canvas);
            aB = aA.inverse();
            let aG = pt(ay, this.#stage.canvas, true);
            let aH = aG.inverse();
            let aI = aC.matrixTransform(aH);
            let aJ = aC.matrixTransform(aA);
            let aK = this.#stage.pointerClientPoint;
            aK = this.#stage.shiftKey ? 
            this.#stage.snapManager.snapPointToAngleMultiple(aJ, aK, 15) : this.#stage.snapManager.snapPoint(aK);
            let aL = aK.matrixTransform(aB).matrixTransform(aH);
            this.#outline.x1.baseVal.value = aI.x,
            this.#outline.y1.baseVal.value = aI.y,
            this.#outline.x2.baseVal.value = aL.x,
            this.#outline.y2.baseVal.value = aL.y,
            this.#outline.setAttribute("transform", aG.toString());
        };

        window.addEventListener("pointermove", this.pointermove = ()=>{
            aD();
        });

        window.addEventListener("pointerup", this.pointerup = ()=>{
            aD();
        });

        // this['v'].addEventListener("modkeyschange", this.modkeyschange = ()=>{
        //     aD();
        // });

        this.#stage.board.addEventListener("zoomchange", this.zoomchange = ()=>{
            aD();
        });

        aD();
    };
    
    hide = () => {

        // this[D7(0x1950)]('drawing') && (this[D7(0xb2c)](D7(0x70c)),
        // this['#outline']['x1'][D7(0x113d)][D7(0xed6)] = 0x0,
        // this[D7(0x25f)]['y1'][D7(0x113d)]['value'] = 0x0,
        // this[D7(0x25f)]['x2']['baseVal']['value'] = 0x0,
        // this[D7(0x25f)]['y2']['baseVal'][D7(0xed6)] = 0x0,
        // window['removeEventListener'](D7(0x493), this['Ft']),
        // window['removeEventListener'](D7(0x19b8), this['Gt']),
        // this['v']['removeEventListener']('modkeyschange', this['Nt']),
        // this['k'][D7(0xcb8)][D7(0x7ff)](),
        // this['k'][D7(0x4ab)](D7(0x8c3), this['D']));
        if (this.hud.hasAttribute("drawing")) {
            this.hud.removeAttribute("drawing");
            this.#outline["x1"].baseVal.value = 0;
            this.#outline["y1"].baseVal.value = 0;
            this.#outline["x2"].baseVal.value = 0;
            this.#outline["y2"].baseVal.value = 0;
            window.removeEventListener("pointermove", this["Yt"]);
            window.removeEventListener('pointerup', this["qt"]);
            // this["C"].removeEventListener("modkeyschange", this["Xt"]);
            this.#stage.snapManager.snapEnd();
            this.#stage.board.removeEventListener('zoomchange', this["$"]);
        }
    };
}

export default LineSegHud;