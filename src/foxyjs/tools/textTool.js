import { sleep, ut, Ri, Zi, ja, Xl } from "../utils/common";
class TextTool {
    #stage;
    #me;
    #jt;
    #Ae;
    #Vt = {};
    constructor(stage) {
        this.#stage = stage;
    }
    enable = () => {
        let e = !0;
        this.#stage.board.style.cursor = "text";
        this.#Ht();
        this.#stage.workspaces.addEventListener(
            "pointerdown",
            (this.#me = (t) => {
                this.#be(t);
            })
        );
        this.#stage.workspaces.addEventListener(
            "pointerover",
            (this.#jt = (t) => {
                e = null !== t["target"]["closest"]("text");
            })
        );
        window.addEventListener(
            "pointerup",
            (this.#Ae = () => {
                t();
            })
        );
    }
    disable = () => {
        this.#stage.board.style.cursor = "auto";
        this.#stage.workspaces.removeEventListener("pointerdown", this.#me);
        this.#stage.workspaces.removeEventListener("pointerover", this.#jt);
        window.removeEventListener("pointerup", this.#Ae);
    }
    async #be(r) {
        if (!(r["buttons"] > 1) && null === r["target"]["closest"]("text")) {
            this.#stage.undoManager.checkpoint("text", "#text-tool");
            let t = this.#stage.currentContainer || this.#stage.currentWorkspace;

            const textContent = getComputedStyle(document.documentElement).getPropertyValue('--fx-text-content');
            const style = {
                fill: getComputedStyle(document.documentElement).getPropertyValue('--fx-text-fill'),
                "font-size": getComputedStyle(document.documentElement).getPropertyValue('--fx-text-font-size'),
                "font-family": getComputedStyle(document.documentElement).getPropertyValue('--fx-text-font-family'),
            }

            let i = Zi("svg:text");
            i["textContent"] = textContent;
            i["style"]["whiteSpace"] = "pre";
            t["append"](i);
            ja(i, style);
            this.#stage.selectedElements.clear(false);
            this.#stage.selectedElements.set(i);
            let n = ut(i)["inverse"]()["translate"](r["clientX"], r["clientY"]);
            i["setAttribute"]("transform", n["toString"]());
            let a = async () => {
                let t = Ri(i);
                let e = t[0];
                let s = t[t["length"] - 1];
                let n = new Range();
                n["setStart"](e, 0);
                n["setEnd"](s, s["textContent"]["length"]);
                this.#stage.selectedTextRange = null;
                this.#stage.selectedTextRange = n;
                await sleep(100);
                this.#stage.textHud.hud["focus"]();
            };
            a();
            style["font-family"] && (await this.#Wt(style["font-family"]));
            a();
        }
    }
    #Wt(t) {
        return true;
    }
    #Yt(t) { }
    #qt(e, s = !0) {
        return new Promise(async (t) => {
            if (void 0 === this.#Vt[e] && ((this.#Vt[e] = await this.#Yt(e)), s)) {
                for (let t of this.#Vt[e]) t["load"]();
            }
            t(true);
        });
    }
    #Ht(t = !0) {
        return new Promise(async (t) => {
            t(true);
        });
    }
}
export default TextTool;
