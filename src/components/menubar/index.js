import React from "react";
import "./index.css";
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
        const stage = window.stage;
        stage.importManager.svg();
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
        const stage = window.stage;
        stage.importManager.image();
        this.pointerDown(ev);
    }

    async exportSvg(ev) {
        this.pointerDown(ev);
        const stage = window.stage;
        stage.exportManager.svg();
        this.pointerDown(ev);
    }

    async exportImage(ev) {
        this.pointerDown(ev);
        const stage = window.stage;
        stage.exportManager.image('image/png');
        this.pointerDown(ev);
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
                                href="https://github.com/darkdragonblade/foxyjs-svgeditor" rel="noreferrer"
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
