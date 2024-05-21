import { SVGImage } from "..";
class ImportManager {
    #stage;
    constructor(stage) {
        this.#stage = stage;
    }
    svg = (type = "open") => {
        this.#importSvg();
    };
    #importSvg = async () => {
        try {
            const picker = await window.showOpenFilePicker({
                types: [{ description: "Svg", accept: { "Svg/*": [".svg"] } }],
                excludeAcceptAllOption: true,
                multiple: false,
            });
            const file = await picker[0].getFile();
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = (event) => {
                const domParser = new DOMParser();
                const html = domParser.parseFromString(event.target.result, "text/html");
                const svg = html.querySelector("svg");
                svg.childNodes.forEach((el) => {
                    if (el.nodeType === 3) return;
                    const cloneNode = el.cloneNode(true);
                    this.#stage.add(cloneNode);
                });
            };
        } catch (error) { }
    };
    image = () => {
        this.#importImage();
    };
    #importImage = async () => {
        try {
            const picker = await window.showOpenFilePicker({
                types: [
                    {
                        description: "Image",
                        accept: { "image/*": [".png", ".gif", ".jpeg", ".jpg"] },
                    },
                ],
                excludeAcceptAllOption: true,
                multiple: false,
            });
            const file = await picker[0].getFile();
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const svgImage = new SVGImage({
                    x: 200,
                    y: 200,
                    width: 200,
                    height: 200,
                    href: event.target.result,
                });
                this.#stage.add(svgImage);
            };
        } catch (error) { }
    };
    dxf = () => { };
    #dxf = () => { };
}
export default ImportManager;
