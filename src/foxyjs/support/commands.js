import { os } from "../utils/common";
class Commands {
    #stage;
    constructor(stage) {
        this.#stage = stage;
    }
    delete = () => {
        this.#stage.undoManager.checkpoint("delete", null);
        const elements = os(Array.from(this.#stage.selectedElements.keys()));
        elements.reverse();
        this.#stage.selectedElements.clear();
        for (let el of elements) el.remove();
    };
    canDelete() {
        return (
            0 !== this.#stage.selectedObjectElements.size ||
            !this.#stage.currentWorkspace.hasAttribute("viewBox")
        );
    }
}
export default Commands;
