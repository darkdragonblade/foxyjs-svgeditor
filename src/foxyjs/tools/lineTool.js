import { Zi, Ae, $e, Ie, pt, Te, ut, te, Kt } from "../utils/common";

class LineTool {
    #stage;
    #outline;
    Ft;
    #pointerdown;
    #disabled = false;

    get enabled() {
        return this.#stage.lineSegHud.hud.hasAttribute("enabled");
    }
    set enabled(val) {
        val
            ? this.#stage.lineSegHud.hud.setAttribute("enabled", "")
            : this.#stage.lineSegHud.hud.removeAttribute("enabled");
    }
    constructor(stage) {
        this.#stage = stage;
    }

    enable = () => {
        this.enabled = true;
        this.#stage.board.style.cursor = "crosshair";
        this.#stage.workspaces.addEventListener(
            "pointerdown",
            (this.#pointerdown = ($event) => {
                this.#paint($event);
            })
        );
    };

    disable = () => {
        this.enabled = false;
    };

    #paint = (event) => {
        const { clientX, clientY, buttons } = event;
        if (buttons > 1) return;
        if (!this.#disabled) {
            this.#disabled = true;
            this.#painting(new DOMPoint(clientX, clientY));
        }
    };

    #painting = ({ x, y }) => {
        const layer = this.#stage.currentContainer || this.#stage.currentWorkspace;
        const style = {
            fill: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-fill'),
            stroke: getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke'),
            "stroke-width": getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-stroke-width'),
            "vector-effect": getComputedStyle(document.documentElement).getPropertyValue('--fx-paint-vector-effect')
        }

    }

    show = (aB, aC) => {
        this["hasAttribute"](drawing) && this['hide']();
        this["setAttribute"](drawing, "");
        (this["C"] = Is(this, '#app'));
        (this["M"] = Is(this, 'bx-board'));
        this["M"]['snapManager']['snapStart'](true);
        let aD = xt(this["M"]['vectorCanvas']);
        let aE = aD['inverse']();
        let aF = aC['matrixTransform'](aE);
        aG = () => {
            (aD = xt(this["M"]['vectorCanvas'])), (aE = aD['inverse']());
            let { ctrl: aH, shift: aI } = this["C"]['modKeys'];
            aJ = ut(aB, this["M"]["vectorCanvas"], true);
            aK = aJ['inverse']();
            aL = aF['matrixTransform'](aK);
            aM = aF['matrixTransform'](aD);
            aN = this["C"]["pointerClientPoint"];
            aN =
                aH && aI
                    ? this["M"]['snapManager']['snapPointToAngleMultiple'](aM, aN, 0xf)
                    : this["M"]['snapManager']['snapPoint'](aN);
            let aO = aN["matrixTransform"](aE)["matrixTransform"](aK);
            (this['#outline']["x1"]["baseVal"]["value"] = aL["x"]);
            (this['#outline']["y1"]['baseVal']["value"] = aL["y"]);
            (this['#outline']["x2"]["baseVal"]['value'] = aO["x"]);
            (this['#outline']["y2"]['baseVal']['value'] = aO["y"]);
            this['#outline']["setAttribute"]('transform', aJ['toString']());
        };
        window.addEventListener(
            "pointermove",
            (this["Yt"] = () => {
                aG();
            })
        );
        window.addEventListener(
            "pointerup",
            (this["qt"] = () => {
                aG();
            })
        );
        this["C"]['addEventListener'](
            'modkeyschange',
            (this["Xt"] = () => {
                aG();
            })
        );
        this["M"]['addEventListener'](
            "zoomchange",
            (this["$"] = () => {
                aG();
            })
        );
        aG();
    };
    hide = () => {
        if (this.hasAttribute("drawing")) {
            this.removeAttribute("drawing");
            this.#outline["x1"].baseVal.value = 0;
            this.#outline["y1"].baseVal.value = 0;
            this.#outline["x2"].baseVal.value = 0;
            this.#outline["y2"].baseVal.value = 0;
            window.removeEventListener("pointermove", this["Yt"]);
            window.removeEventListener('pointerup', this["qt"]);
            this["C"].removeEventListener("modkeyschange", this["Xt"]);
            this["M"].snapManager.snapEnd();
            this["M"].removeEventListener('zoomchange', this["$"]);
        }
    };

    // Wt = (aB) => {
    //     let aC = null;
    //     let aD = null;
    //     if (
    //         ('path' === aB[localName] &&
    //             (aD = aB["ownerSVGElement"]["querySelector"](
    //                 "textPath[href=\x22#" + CSS["escape"](aB["id"]) + "\x22]"
    //             )),
    //             aD)
    //     ) {
    //         let aE;
    //         let aF = aD.closest('text');
    //         aE = aB.closest('defs')
    //             ? ut(aF, this["M"]["vectorCanvas"])
    //             : ut(aF['parentElement'], this["M"]["vectorCanvas"]);
    //         let aG = ot(aB);
    //         aC = aE['multiply'](aG);
    //     } else aC = ut(aB, this);
    //     return aC;
    // };
}
export default LineTool;
