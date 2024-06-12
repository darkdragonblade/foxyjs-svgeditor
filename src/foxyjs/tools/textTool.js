import { sleep, ut, Ri, Zi, ja, Xl } from "../utils/common";
class TextTool {
    #stage;
    #pointerdown;
    #pointerover;
    #pointerup;
    #Vt = {};

    constructor(stage) {
        this.#stage = stage;
    }

    enable = () => {
        let e = true;
        this.#stage.board.style.cursor = "text";
        this.#Ht();
        this.#stage.workspaces.addEventListener(
            "pointerdown",
            (this.#pointerdown = (t) => {
                this.#create(t);
            })
        );
        this.#stage.workspaces.addEventListener(
            "pointerover",
            (this.#pointerover = (t) => {
                e = null !== t["target"]["closest"]("text");
            })
        );
        // window.addEventListener(
        //     "pointerup",
        //     (this.#pointerup = () => {
        //         t();
        //     })
        // );
    }

    disable = () => {
        this.#stage.board.style.cursor = "auto";
        this.#stage.workspaces.removeEventListener("pointerdown", this.#pointerdown);
        this.#stage.workspaces.removeEventListener("pointerover", this.#pointerover);
        window.removeEventListener("pointerup", this.#pointerup);
    }

    #create = async (event) => {
        const { clientX, clientY, buttons, target } = event;
        if (!(buttons > 1) && null === target.closest("text")) {
            this.#stage.undoManager.checkpoint("text", "#text-tool");
            const container = this.#stage.currentContainer || this.#stage.currentWorkspace;
            const textContent = getComputedStyle(document.documentElement).getPropertyValue('--fx-text-content');

            const style = {
                fill: getComputedStyle(document.documentElement).getPropertyValue('--fx-text-fill'),
                "font-size": getComputedStyle(document.documentElement).getPropertyValue('--fx-text-font-size'),
                "font-family": getComputedStyle(document.documentElement).getPropertyValue('--fx-text-font-family'),
            }

            const svgText = Zi("svg:text");
            svgText.textContent = textContent;
            svgText.style.whiteSpace = "pre";
            container.append(svgText);
            ja(svgText, style);
            this.#stage.selectedElements.clear(false);
            this.#stage.selectedElements.set(svgText);
            const translate = ut(svgText).inverse().translate(clientX, clientY);
            svgText.setAttribute("transform", translate.toString());
            const updateRange = async () => {
                const texts = Ri(svgText);
                const startText = texts[0];
                const endText = texts[texts.length - 1];
                const range = new Range();
                range.setStart(startText, 0);
                range.setEnd(endText, endText.textContent.length);
                this.#stage.selectedTextRange = null;
                this.#stage.selectedTextRange = range;
                await sleep(100);
                this.#stage.textHud.hud.focus();
            };
            updateRange();
            style["font-family"] && (await this.#Wt(style["font-family"]));
            updateRange();
        }
    }
    #Wt(t) {
        return true;
    }
    #Yt(t) { }
    #qt(e, s = !0) {
        return new Promise(async (t) => {
            if (void 0 === this.#Vt[e] && ((this.#Vt[e] = await this.#Yt(e)), s)) {
                for (let t of this.#Vt[e]) t.load();
            }
            t(true);
        });
    }
    #Ht(t = true) {
        return new Promise(async (t) => {
            t(true);
        });
    }
}
export default TextTool;
