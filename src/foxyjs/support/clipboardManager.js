import { Ig, kc, os, Pc, Rl, ql } from "../utils/common";
class Clipboard {
    #stage;
    constructor(stage) {
        this.#stage = stage;
    }
    cut = () => {
        if (this.#stage.textInputMode) document.execCommand("cut");
        else {
            this.#stage.undoManager.checkpoint("cut", null);
            this.copy();
            let e = os(Array.from(this.#stage.selectedElements.keys()));
            e.reverse();
            this.#stage.selectedElements.clear();
            for (let t of e) t.remove();
        }
    };
    canCut = () => {
        return (
            this.#stage.textInputMode || this.#stage.selectedObjectElements.size > 0
        );
    };
    copy = async () => {
        if (this.#stage.textInputMode) document.execCommand("copy");
        else {
            let t = this.#stage.extractArtworkWithSelectedElements();
            let e = 2;
            let a = kc(t, "html", e);
            let i = kc(t, "xml", e);
            let s = {
                "text/plain": a,
                "text/html": a,
                "image/svg+xml": i,
                "image/png": await Ig(i),
            };
            this.setClipboardData(s);
        }
    };
    canCopy = () => {
        return (
            this.#stage.textInputMode || this.#stage.selectedObjectElements.size > 0
        );
    };
    paste = async () => {
        if (this.#stage.textInputMode) {
            document.execCommand("paste");
        }
        else {
            const e = await this.getClipboardData();
            if (e) {
                const a = this.#stage.board.matches(":hover")
                    ? "pointer"
                    : "boardCenter";
                if (e["text/html"] && Pc(e["text/html"])) {
                    this.#stage.undoManager.checkpoint("paste", null);
                    let t = Rl(e["text/html"]);
                    this.#stage.insertArtwork(t, a);
                } else {
                    if (e["text/plain"] && Pc(e["text/plain"])) {
                        this.#stage.undoManager.checkpoint("paste", null);
                        let t = Rl(e["text/plain"]);
                        this.#stage.insertArtwork(t, a);
                    } else {
                        if (e["image/png"]) {
                            this.#stage.undoManager.checkpoint("paste", null);
                            let t = e["image/png"];
                            this.#stage.insertBitmap(t, a);
                        } else {
                            if (e["text/plain"]) {
                                this.#stage.undoManager.checkpoint("paste", null);
                                let t = Rl(
                                    '<svg><text style="font-size: 36; font-family: Roboto; white-space: pre;">' +
                                    e["text/plain"] +
                                    "</text></svg>"
                                );
                                this.#stage.insertArtwork(t, a);
                            }
                        }
                    }
                }
            }
        }
    };
    setClipboardData = (s) => {
        return new Promise(async (t) => {
            let e = {};
            void 0 !== s["text/plain"] &&
                (e["text/plain"] = new Blob([s["text/plain"]], { type: "text/plain" }));
            void 0 !== s["image/png"] && (e["image/png"] = s["image/png"]);
            let a = new ClipboardItem(e);
            try {
                await navigator.clipboard.write([a]);
            } catch (t) {
                console.error(t);
            }
            let i = {};
            void 0 !== s["text/plain"] && (i["text/plain"] = s["text/plain"]);
            void 0 !== s["text/html"] && (i["text/html"] = s["text/html"]);
            void 0 !== s["image/svg+xml"] &&
                (i["image/svg+xml"] = s["image/svg+xml"]);
            t();
        });
    };
    getClipboardData = () => {
        return new Promise(async (t) => {
            let s = {};
            let e = null;
            try {
                e = await navigator.clipboard.read();
            } catch (t) {
                console.error(t);
            }
            if (e) {
                let i = e[0];
                if (i) {
                    for (let a of i.types)
                        if (
                            "text/plain" === a ||
                            "text/html" === a ||
                            "image/svg+xml" === a
                        ) {
                            let t = await i.getType(a);
                            let e = await ql(t, "text");
                            !1 === e.startsWith("image/") && (s[a] = e);
                        } else {
                            if (
                                "image/png" === a ||
                                "image/jpg" === a ||
                                "image/jpeg" === a ||
                                "image/webp" === a ||
                                "image/avif" === a ||
                                "image/gif" === a
                            ) {
                                let t = await i.getType(a);
                                let e = await ql(t, "dataURL");
                                s[a] = e;
                            }
                        }
                }
            }
            t(s);
        });
    };
}
export default Clipboard;
