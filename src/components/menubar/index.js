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
            scale: 100
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

        window.stage.board.addEventListener('zoomchange', () => {
            this.setState({
                scale: Math.ceil(window.stage.scale * 100)
            })
        });
    }

    async openSvg() {
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

    async importSvg() {
        const stage = window.stage;
        stage.importManager.svg();
    }

    async importImage() {
        const stage = window.stage;
        stage.importManager.image();
    }

    async importPdf() {
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

    async exportSvg() {
        const stage = window.stage;
        stage.exportManager.svg();
    }

    async exportImage() {
        const stage = window.stage;
        stage.exportManager.image('image/png');
    }

    undo() {
        window.stage.undoManager.undo();
    }

    redo() {
        window.stage.undoManager.redo();
    }

    render() {
        return (
            <div className="menubar flex flex-justify-between">
                <div className="left flex">
                    <div className="btn" onClick={() => {
                        this.importSvg();
                    }}>
                        <svg viewBox="0 0 100 100" width="16" height="16">
                            <path d="M 100 49.997 C 100 41.911 93.445 35.356 85.359 35.356 L 85.359 35.356 C 88.007 32.703 89.649 29.043 89.649 24.999 C 89.649 16.909 83.091 10.352 75.002 10.352 C 70.961 10.352 67.298 11.991 64.647 14.643 C 64.647 6.556 58.091 0 50.004 0 C 41.915 0 35.358 6.556 35.358 14.643 C 32.706 11.994 29.047 10.352 25.003 10.352 C 16.912 10.352 10.357 16.909 10.357 24.999 C 10.357 29.04 11.995 32.703 14.646 35.353 C 6.557 35.353 0 41.908 0 49.997 C 0 58.089 6.557 64.644 14.646 64.644 C 11.995 67.292 10.357 70.955 10.357 75 C 10.357 83.087 16.912 89.643 25.003 89.643 C 29.044 89.643 32.706 88.005 35.358 85.353 C 35.358 93.44 41.915 100 50.004 100 C 58.091 100 64.647 93.44 64.647 85.353 L 64.647 85.353 C 67.298 88.005 70.961 89.643 75.002 89.643 C 83.091 89.643 89.646 83.087 89.646 75 C 89.646 70.955 88.007 67.292 85.356 64.641 C 85.359 64.641 85.359 64.641 85.359 64.641 C 93.448 64.641 100 58.089 100 49.997 Z M 74.852 67.074 C 74.904 67.074 74.953 67.071 75.005 67.071 C 79.383 67.071 82.932 70.619 82.932 75 C 82.932 79.376 79.383 82.928 75.005 82.928 C 70.627 82.928 67.079 79.376 67.079 75 C 67.079 74.945 67.082 74.898 67.082 74.847 L 55.504 63.264 L 55.504 79.644 C 56.999 81.084 57.933 83.11 57.933 85.353 C 57.933 89.732 54.382 93.28 50.008 93.28 C 45.629 93.28 42.079 89.732 42.079 85.353 C 42.079 83.107 43.012 81.084 44.507 79.644 L 44.507 63.264 L 32.929 74.847 C 32.929 74.898 32.932 74.948 32.932 75 C 32.932 79.376 29.384 82.928 25.006 82.928 C 20.626 82.928 17.079 79.376 17.079 75 C 17.079 70.619 20.626 67.071 25.006 67.071 C 25.055 67.071 25.107 67.074 25.156 67.074 L 36.738 55.494 L 20.362 55.494 C 18.923 56.993 16.895 57.924 14.652 57.924 C 10.275 57.924 6.726 54.377 6.726 49.997 C 6.726 45.62 10.275 42.071 14.652 42.071 C 16.895 42.071 18.92 43.004 20.362 44.504 L 36.738 44.504 L 25.156 32.921 C 25.107 32.921 25.055 32.925 25.006 32.925 C 20.626 32.925 17.079 29.376 17.079 24.999 C 17.079 20.62 20.63 17.072 25.009 17.072 C 29.387 17.072 32.935 20.62 32.935 24.999 C 32.935 25.047 32.932 25.1 32.932 25.149 L 44.511 36.731 L 44.511 20.356 C 43.015 18.913 42.082 16.89 42.082 14.647 C 42.082 10.266 45.632 6.715 50.011 6.715 C 54.385 6.715 57.937 10.263 57.937 14.647 C 57.937 16.89 57.002 18.913 55.508 20.356 L 55.508 36.731 L 67.085 25.149 C 67.085 25.1 67.082 25.047 67.082 24.999 C 67.082 20.62 70.631 17.072 75.008 17.072 C 79.387 17.072 82.935 20.62 82.935 24.999 C 82.935 29.376 79.387 32.925 75.008 32.925 C 74.956 32.925 74.907 32.921 74.855 32.921 L 63.277 44.504 L 79.653 44.504 C 81.094 43.007 83.121 42.071 85.365 42.071 C 89.739 42.071 93.288 45.62 93.288 49.997 C 93.288 54.377 89.739 57.924 85.365 57.924 C 83.117 57.924 81.094 56.993 79.653 55.494 L 63.277 55.494 L 74.852 67.074 Z"></path>
                        </svg>
                    </div>
                    <div className="btn" onClick={() => {
                        this.importImage();
                    }}>
                        <svg viewBox="0 0 100 100" width="16" height="16">
                            <path d="M 11.111 83.333 L 88.889 83.333 L 63.889 50 L 44.444 75.056 L 30.556 58.333 L 11.111 83.333 Z M 0 0 L 11.111 0 C 11.111 0 11.111 0 11.111 0 L 100 0 L 100 100 L 0 100 L 0 0 Z" ></path>
                            <ellipse fill="#ffffff" cx="25.671" cy="28.88" rx="12.398" ry="12.398"></ellipse>
                        </svg>
                    </div>
                    <div className="btn" onClick={() => {
                        this.importPdf();
                    }}>
                        <svg viewBox="0 0 100 100" width="16" height="16">
                            <g transform="matrix(5, 0, 0, 5, -10, -10)">
                                <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"></path>
                            </g>
                        </svg>
                    </div>
                </div>
                <div className="center">{this.state.scale}%</div>
                <div className="right flex">
                    <div className="btn" disabled={!this.state.canUndo} onClick={(ev) => {
                        this.undo(ev);
                    }}>
                        <svg preserveAspectRatio="none" viewBox="0 0 100 100" width="16" height="16"><path d="M 51.294 32.925 C 38.367 32.925 26.658 37.756 17.633 45.609 L 0.07 28.046 L 0.07 71.953 L 43.976 71.953 L 26.268 54.292 C 47.331 36.369 79.849 45.624 88.321 71.953 L 99.93 68.147 C 93.009 47.147 73.405 32.949 51.294 32.925 Z"></path></svg>
                    </div>
                    <div className="btn" disabled={!this.state.canRedo} onClick={(ev) => {
                        this.redo(ev);
                    }}>
                        <svg preserveAspectRatio="none" viewBox="0 0 100 100" width="16" height="16"><path d="M 51.294 67.074 C 38.367 67.074 26.658 62.243 17.633 54.39 L 0.07 71.953 L 0.07 28.046 L 43.976 28.046 L 26.268 45.707 C 47.331 63.63 79.849 54.375 88.321 28.046 L 99.93 31.852 C 93.009 52.852 73.405 67.05 51.294 67.074 Z" transform="matrix(-1, 0, 0, -1, 100.000001, 99.999004)"></path></svg>
                    </div>
                    <div className="btn" onClick={() => {
                        this.exportSvg();
                    }}>
                        <svg viewBox="0 0 100 100" width="16" height="16">
                            <path d="M 100 49.997 C 100 41.911 93.445 35.356 85.359 35.356 L 85.359 35.356 C 88.007 32.703 89.649 29.043 89.649 24.999 C 89.649 16.909 83.091 10.352 75.002 10.352 C 70.961 10.352 67.298 11.991 64.647 14.643 C 64.647 6.556 58.091 0 50.004 0 C 41.915 0 35.358 6.556 35.358 14.643 C 32.706 11.994 29.047 10.352 25.003 10.352 C 16.912 10.352 10.357 16.909 10.357 24.999 C 10.357 29.04 11.995 32.703 14.646 35.353 C 6.557 35.353 0 41.908 0 49.997 C 0 58.089 6.557 64.644 14.646 64.644 C 11.995 67.292 10.357 70.955 10.357 75 C 10.357 83.087 16.912 89.643 25.003 89.643 C 29.044 89.643 32.706 88.005 35.358 85.353 C 35.358 93.44 41.915 100 50.004 100 C 58.091 100 64.647 93.44 64.647 85.353 L 64.647 85.353 C 67.298 88.005 70.961 89.643 75.002 89.643 C 83.091 89.643 89.646 83.087 89.646 75 C 89.646 70.955 88.007 67.292 85.356 64.641 C 85.359 64.641 85.359 64.641 85.359 64.641 C 93.448 64.641 100 58.089 100 49.997 Z M 74.852 67.074 C 74.904 67.074 74.953 67.071 75.005 67.071 C 79.383 67.071 82.932 70.619 82.932 75 C 82.932 79.376 79.383 82.928 75.005 82.928 C 70.627 82.928 67.079 79.376 67.079 75 C 67.079 74.945 67.082 74.898 67.082 74.847 L 55.504 63.264 L 55.504 79.644 C 56.999 81.084 57.933 83.11 57.933 85.353 C 57.933 89.732 54.382 93.28 50.008 93.28 C 45.629 93.28 42.079 89.732 42.079 85.353 C 42.079 83.107 43.012 81.084 44.507 79.644 L 44.507 63.264 L 32.929 74.847 C 32.929 74.898 32.932 74.948 32.932 75 C 32.932 79.376 29.384 82.928 25.006 82.928 C 20.626 82.928 17.079 79.376 17.079 75 C 17.079 70.619 20.626 67.071 25.006 67.071 C 25.055 67.071 25.107 67.074 25.156 67.074 L 36.738 55.494 L 20.362 55.494 C 18.923 56.993 16.895 57.924 14.652 57.924 C 10.275 57.924 6.726 54.377 6.726 49.997 C 6.726 45.62 10.275 42.071 14.652 42.071 C 16.895 42.071 18.92 43.004 20.362 44.504 L 36.738 44.504 L 25.156 32.921 C 25.107 32.921 25.055 32.925 25.006 32.925 C 20.626 32.925 17.079 29.376 17.079 24.999 C 17.079 20.62 20.63 17.072 25.009 17.072 C 29.387 17.072 32.935 20.62 32.935 24.999 C 32.935 25.047 32.932 25.1 32.932 25.149 L 44.511 36.731 L 44.511 20.356 C 43.015 18.913 42.082 16.89 42.082 14.647 C 42.082 10.266 45.632 6.715 50.011 6.715 C 54.385 6.715 57.937 10.263 57.937 14.647 C 57.937 16.89 57.002 18.913 55.508 20.356 L 55.508 36.731 L 67.085 25.149 C 67.085 25.1 67.082 25.047 67.082 24.999 C 67.082 20.62 70.631 17.072 75.008 17.072 C 79.387 17.072 82.935 20.62 82.935 24.999 C 82.935 29.376 79.387 32.925 75.008 32.925 C 74.956 32.925 74.907 32.921 74.855 32.921 L 63.277 44.504 L 79.653 44.504 C 81.094 43.007 83.121 42.071 85.365 42.071 C 89.739 42.071 93.288 45.62 93.288 49.997 C 93.288 54.377 89.739 57.924 85.365 57.924 C 83.117 57.924 81.094 56.993 79.653 55.494 L 63.277 55.494 L 74.852 67.074 Z"></path>
                        </svg>
                        {/* <svg preserveAspectRatio="none" viewBox="0 0 24.5 25" width="16" height="16">
                            <path d="M 24.5 0 L 15.841 0 L 18.999 3.038 L 11.176 10.115 L 13.532 12.677 L 21.342 5.588 L 24.5 8.547 L 24.5 0 Z" ></path>
                            <path d="M 10.949 5.617 L 10.949 3.118 L 0.018 3.118 L 0.018 25.002 L 20.25 25.002 L 20.25 12.988 L 17.783 12.988 L 17.783 22.491 L 2.559 22.491 L 2.559 5.589 L 10.949 5.617 Z"></path>
                        </svg> */}
                    </div>
                    <div className="btn" onClick={() => {
                        this.exportImage();
                    }}>
                        <svg viewBox="0 0 100 100" width="16" height="16">
                            <path d="M 11.111 83.333 L 88.889 83.333 L 63.889 50 L 44.444 75.056 L 30.556 58.333 L 11.111 83.333 Z M 0 0 L 11.111 0 C 11.111 0 11.111 0 11.111 0 L 100 0 L 100 100 L 0 100 L 0 0 Z" ></path>
                            <ellipse fill="#ffffff" cx="25.671" cy="28.88" rx="12.398" ry="12.398"></ellipse>
                        </svg>
                    </div>
                </div>
            </div>
        );
    }
}

export default Menubar;
