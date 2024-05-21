class ExportManager {
    #stage;
    constructor(stage) {
        this.#stage = stage;
    }
    svg = async () => {
        if (window.showSaveFilePicker) {
            this.#saveSvg();
        } else {
            const t = await this.#convertSvgToBlob();
            this.#download(t, "foxy.svg");
        }
    };
    #convertSvgToBlob = () => {
        return new Promise((resolve) => {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            const currentWorkspace = this.#stage.currentWorkspace;
            svg.append(currentWorkspace.cloneNode(true));
            svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
            const base64 = window.atob(
                window.btoa(unescape(encodeURIComponent(svg.outerHTML)))
            );
            const buffer = new ArrayBuffer(base64.length);
            const s = new Uint8Array(buffer);
            for (var i = 0; i < base64.length; i++) s[i] = base64.charCodeAt(i);
            resolve(new Blob([buffer]));
        });
    };
    #saveSvg = async () => {
        try {
            const picker = await window.showSaveFilePicker({
                suggestedName: "foxyjs",
                types: [{ description: "Svg file", accept: { "svg/*": [".svg"] } }],
            });
            const write = await picker.createWritable();
            const rect = this.#stage.board.querySelector("#background-outlines").querySelector('rect');
            const x = rect.getAttribute("x");
            const y = rect.getAttribute("y");
            const width = rect.getAttribute("width");
            const height = rect.getAttribute("height");
            const svg = `<svg
                viewBox="${x} ${y} ${width} ${height}"
                width="${width}"
                height="${height}"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
            >${this.#stage.currentWorkspace.getInnerHTML()}</svg>`;
            await write.write(svg);
            await write.close();
        } catch (t) { }
    };
    image = async (type = "image/png") => {
        if (window.showSaveFilePicker) {
            this.#saveImage();
        } else {
            this.#download(await this.#svgConverToimage(type), "foxy.png");
        }
    };
    #saveImage = async () => {
        try {
            const picker = await window.showSaveFilePicker({
                suggestedName: "foxyjs",
                types: [
                    {
                        description: "Image file",
                        accept: {
                            "image/png": [".png"],
                            "image/gif": [".gif"],
                            "image/jpeg": [".jpeg"],
                            "image/jpg": [".jpg"],
                            "image/webp": [".webp"],
                        },
                    },
                ],
            });
            const file = await picker.getFile();
            const image = await this.#svgConverToimage(file.type);
            const w = await picker.createWritable();
            await w.write(image);
            await w.close();
            return picker;
        } catch (error) { }
    };
    dxf = () => { };
    #dxf = () => { };
    #svgConverToimage = (type) => {
        return new Promise((resolve) => {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            const e = this.#stage.currentWorkspace;
            svg.append(e.cloneNode(true));
            svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
            const image = new Image();
            image.src =
                "data:image/svg+xml;base64," +
                window.btoa(unescape(encodeURIComponent(svg.outerHTML)));
            image.onload = () => {
                const canvas = this.#convertImageToCanvas(image, 500, 500);
                const base64 = window.atob(canvas.toDataURL(type).split(",")[1]);
                const buffer = new ArrayBuffer(base64.length);
                const n = new Uint8Array(buffer);
                for (var a = 0; a < base64.length; a++) n[a] = base64.charCodeAt(a);
                resolve(new Blob([buffer]));
            };
        });
    };
    #convertImageToCanvas = (image, width, height) => {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(image, 0, 0);
        return canvas;
    };
    #download = (t, e) => {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(t);
        link.download = e;
        link.click();
    };
}
export default ExportManager;
