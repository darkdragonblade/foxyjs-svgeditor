import React from "react";
import "./index.css";
import { SVGImage } from "foxyjs";
import * as pdfjs from 'pdfjs-dist';
import PDFWORKERENTRY from 'pdfjs-dist/build/pdf.worker.entry';
pdfjs.GlobalWorkerOptions.workerSrc = PDFWORKERENTRY;
class Menubar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canUndo: false,
            canRedo: false,
        };
    }

    componentDidMount() {
        const stage = window.stage;
        stage.board.addEventListener('undochange', () => {
            this.setState({
                canUndo: stage.undoManager.canUndo(),
                canRedo: stage.undoManager.canRedo(),
            });
        });
    }

    async openSvg(ev) {
        this.pointerDown(ev);
        const config = {
            types: [
                {
                    description: "Svg",
                    accept: {
                        "Svg/*": [".svg"],
                    },
                },
            ],
            excludeAcceptAllOption: true,
            multiple: false,
        };
        try {
            const res = await window.showOpenFilePicker(config);
            const f = await res[0].getFile();
            const reader = new FileReader();
            reader.readAsText(f);
            reader.onload = (res) => {
                // const { height: h } = window.stage.board.getBoundingClientRect();
                const domparser = new DOMParser();
                const doc = domparser.parseFromString(res.target.result, "text/html");
                const svg = doc.querySelector("svg");
                // const { width, height } = svg.viewBox.baseVal;
                window.stage.currentWorkspace.innerHTML = svg.innerHTML;
                window.stage.undoManager.clear();
            };
        } catch (error) { }
    }

    async importSvg(ev) {
        this.pointerDown(ev);
        const config = {
            types: [
                {
                    description: "Svg",
                    accept: {
                        "Svg/*": [".svg"],
                    },
                },
            ],
            excludeAcceptAllOption: true,
            multiple: false,
        };
        try {
            const res = await window.showOpenFilePicker(config);
            const f = await res[0].getFile();
            const reader = new FileReader();
            reader.readAsText(f);
            reader.onload = (res) => {
                const { height: h } = window.stage.board.getBoundingClientRect();
                const domparser = new DOMParser();
                const doc = domparser.parseFromString(res.target.result, "text/html");
                const svg = doc.querySelector("svg");
                // const { width, height } = svg.viewBox.baseVal;
                svg.childNodes.forEach((item) => {
                    if (item.nodeType === 3) return;
                    const cloneNode = item.cloneNode(true);
                    window.stage.addGraph(cloneNode);
                });
            };
        } catch (error) { }
        this.pointerDown(ev);
    }

    async importPdf(ev) {
        this.pointerDown(ev);
        const config = {
            types: [
                {
                    description: "Pdf&Ai",
                    accept: {
                        "Pdf&Ai/*": [".pdf", ".ai"],
                    },
                },
            ],
            excludeAcceptAllOption: true,
            multiple: false,
        };
        try {
            const res = await window.showOpenFilePicker(config);
            const f = await res[0].getFile();
            const reader = new FileReader();
            reader.readAsArrayBuffer(f);
            reader.onload = async (res) => {
                const CMAP_URL = "https://unpkg.com/pdfjs-dist@3.7.107/cmaps/";
                const loadingTask = pdfjs.getDocument({
                    data: res.target.result,
                    cMapUrl: CMAP_URL,
                    cMapPacked: true,
                    fontExtraProperties: true,
                });
                const pdfDocument = await loadingTask.promise;

                const numPages = pdfDocument.numPages;
                for (let i = 1; i <= numPages; i++) {
                    const page = await pdfDocument.getPage(i);
                    const opList = await page.getOperatorList();

                    const svgGfx = new pdfjs.SVGGraphics(
                        page.commonObjs,
                        page.objs,
                /* forceDataSchema = */ true
                    );
                    svgGfx.embedFonts = true;
                    const svg = await svgGfx.getSVG(opList, page.getViewport({ scale: 1 }));
                    // let curNode = null;
                    // let node = document.createNodeIterator(svg, NodeFilter.SHOW_ELEMENT);
                    // for (; curNode = node.nextNode();) {
                    //     if (curNode.localName !== 'svg') {
                    //         console.log(curNode)
                    //         const cloneNode = curNode.cloneNode(true);
                    //     }
                    // }
                    svg.childNodes.forEach((item) => {
                        if (item.nodeType === 3) return;
                        const cloneNode = item.cloneNode(true);
                        window.stage.addGraph(cloneNode);
                    });

                    page.cleanup();
                }
            };
        } catch (error) { }
    }

    async importImage(ev) {
        this.pointerDown(ev);
        const config = {
            types: [
                {
                    description: "Image",
                    accept: {
                        "image/*": [".png", ".gif", ".jpeg", ".jpg"],
                    },
                },
            ],
            excludeAcceptAllOption: true,
            multiple: false,
        };
        try {
            const res = await window.showOpenFilePicker(config);
            const f = await res[0].getFile();
            const reader = new FileReader();
            reader.readAsDataURL(f);
            reader.onload = (res) => {
                const image = new SVGImage({
                    x: 200,
                    y: 200,
                    width: 200,
                    height: 200,
                    href: res.target.result,
                });
                window.stage.addGraph(image);
            };
        } catch (error) { }
        this.pointerDown(ev);
    }

    async exportSvg(ev) {
        this.pointerDown(ev);
        const stage = window.stage;
        const opts = {
            types: [
                {
                    description: "Svg file",
                    accept: { "svg/image": [".svg"] },
                },
            ],
        };

        const res = await window.showSaveFilePicker(opts);
        const writable = await res.createWritable();
        const bgo = document.querySelector("#background-outlines");
        const x = bgo.getAttribute("x");
        const y = bgo.getAttribute("y");
        const w = bgo.getAttribute("width");
        const h = bgo.getAttribute("height");
        const svg = `<svg
            viewBox="${x} ${y} ${w} ${h}"
            width="${w}"
            height="${h}"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
        >${stage.currentWorkspace.innerHTML}</svg>`;
        await writable.write(svg);
        await writable.close();
    }

    async exportImage(ev) {
        this.pointerDown(ev);
        const stage = window.stage;
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const workspaces = stage.currentWorkspace;
        svg.append(workspaces.cloneNode(true));
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

        const image = new Image();
        image.src =
            "data:image/svg+xml;base64," +
            window.btoa(unescape(encodeURIComponent(svg.outerHTML)));

        const img = document.createElement("img");
        img.src = image.src;
        image.onload = () => {
            var canvas = this.convertImageToCanvas(image, 500, 500);
            var url = canvas.toDataURL("image/png");
            var bytes = window.atob(url.split(",")[1]);
            var buffer = new ArrayBuffer(bytes.length);
            var uint = new Uint8Array(buffer);
            for (var i = 0; i < bytes.length; i++) {
                uint[i] = bytes.charCodeAt(i);
            }
            var imageFile = new Blob([buffer]);
            const name = new Date().getTime() + ".png";
            this.saveImage(imageFile, name);
        };
    }

    async saveImage(blob, name) {
        try {
            const handle = await window.showSaveFilePicker({
                suggestedName: name,
                types: [
                    {
                        description: "PNG file",
                        accept: {
                            "image/png": [".png"],
                        },
                    },
                ],
            });
            const writable = await handle.createWritable();
            await writable.write(blob);
            await writable.close();
            return handle;
        } catch (err) {
            console.error(err.name, err.message);
        }
    }

    convertImageToCanvas(image, width, height) {
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(image, 0, 0);
        return canvas;
    }

    pointerDown(ev) {
        ev.target.parentNode.style.display = "none";
        setTimeout(() => {
            ev.target.parentNode.style.display = "";
        });
    }

    undo(ev) {
        window.stage.undoManager.undo();
        this.pointerDown(ev);
    }

    redo(ev) {
        window.stage.undoManager.redo();
        this.pointerDown(ev);
    }

    render() {
        return (
            <div className="menubar">
                <div className="item">
                    <div className="title">File</div>
                    <div className="options">
                        {/* <div className="options-item" onClick={(ev) => {
                            this.openSvg(ev)
                        }}>Open Svg</div>
                        <hr /> */}
                        <div
                            className="options-item"
                            onClick={(ev) => {
                                this.importSvg(ev);
                            }}
                        >
                            Import Svg
                        </div>
                        <div className="options-item" onClick={(ev) => {
                            this.importPdf(ev);
                        }}>Import Pdf & AI(*.ai)</div>
                        <div
                            className="options-item"
                            onClick={(ev) => {
                                this.importImage(ev);
                            }}
                        >
                            Import Image
                        </div>
                        <hr />
                        <div
                            className="options-item"
                            onClick={(ev) => {
                                this.exportSvg(ev);
                            }}
                        >
                            Export Svg
                        </div>
                        <div className="options-item disabled">Export Pdf & AI(*.ai)</div>
                        <div
                            className="options-item"
                            onClick={(ev) => {
                                this.exportImage(ev);
                            }}
                        >
                            Export Image
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="title">Edit</div>
                    <div className="options">
                        <div
                            className={`options-item ${!this.state.canUndo && 'disabled'}`}
                            onClick={(ev) => {
                                this.undo(ev);
                            }}
                        >
                            Undo
                        </div>
                        <div
                            className={`options-item ${!this.state.canRedo && 'disabled'}`}
                            onClick={(ev) => {
                                this.redo(ev);
                            }}
                        >
                            Redo
                        </div>

                    </div>
                </div>
                <div className="item">
                    <div className="title">View</div>
                    <div className="options">
                        <div className="options-item disabled">Ruler</div>
                        <div className="options-item disabled">Smart</div>
                        <div className="options-item disabled">Grid</div>
                    </div>
                </div>
                <div className="item">
                    <div className="title">Help</div>
                    <div className="options">
                        <div className="options-item">
                            <a
                                target="_blank"
                                href="https://github.com/darkdragonblade/foxyjs-svgeditor"
                            >
                                https://github.com/darkdragonblade/foxyjs-svgeditor
                            </a>
                        </div>
                        <hr />
                        <div className="options-item">Give me star</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Menubar;
