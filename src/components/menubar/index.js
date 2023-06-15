import React from "react";
import './index.css';
import { SVGImage } from "foxyjs";
class Menubar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            canUndo: false,
            canRedo: false,
        }
    }

    componentDidMount() {

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
        }
        try {
            const res = await window.showOpenFilePicker(config);
            const f = (await res[0].getFile());
            const reader = new FileReader();
            reader.readAsText(f);
            reader.onload = (res) => {
                // const { height: h } = window.stage.board.getBoundingClientRect();
                const domparser = new DOMParser();
                const doc = domparser.parseFromString(res.target.result, "text/html");
                const svg = doc.querySelector("svg");
                // const { width, height } = svg.viewBox.baseVal;
                window.stage.currentWorkspace.innerHTML = svg.innerHTML;
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
        }
        try {
            const res = await window.showOpenFilePicker(config);
            const f = (await res[0].getFile());
            const reader = new FileReader();
            reader.readAsText(f);
            reader.onload = (res) => {
                const { height: h } = window.stage.board.getBoundingClientRect();
                const domparser = new DOMParser();
                const doc = domparser.parseFromString(res.target.result, "text/html");
                const svg = doc.querySelector("svg");
                // const { width, height } = svg.viewBox.baseVal;

                window.stage.addGraph(svg);
            };
        } catch (error) { }
        this.pointerDown(ev);
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
        }
        try {
            const res = await window.showOpenFilePicker(config);
            const f = (await res[0].getFile());
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
        const x = bgo.getAttribute("x")
        const y = bgo.getAttribute("y")
        const w = bgo.getAttribute("width")
        const h = bgo.getAttribute("height")
        const svg = `<svg
            viewBox="${x} ${y} ${w} ${h}"
            width="${w}"
            height="${h}"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
        >${(stage.currentWorkspace).innerHTML}</svg>`;
        await writable.write(svg);
        await writable.close();
    }

    async exportImage(ev) {
        this.pointerDown(ev);
        const stage = window.stage;

        const svg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );
        const workspaces = stage.currentWorkspace;
        svg.append(workspaces.cloneNode(true));
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
        const image = new Image();
        image.src =
            "data:image/svg+xml;base64," +
            window.btoa(unescape(encodeURIComponent(svg.outerHTML)));

        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;

        canvas.getContext("2d").drawImage(image, 0, 0);


        const opts = {
            types: [
                {
                    description: "Image file",
                    accept: { "image/*": [".png", ".gif", ".jpeg", ".jpg"] },
                },
            ],
        };

        const res = await window.showSaveFilePicker(opts);
        console.log(res)
    }

    pointerDown(ev) {
        ev.target.parentNode.style.display = 'none';
        setTimeout(() => {
            ev.target.parentNode.style.display = '';
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

    cut(ev) {
        window.stage.clipboardManager.redo();
        this.pointerDown(ev);
    }

    copy(ev) {
        window.stage.clipboardManager.copy();
        this.pointerDown(ev);
    }

    paste(ev) {
        window.stage.clipboardManager.paste();
        this.pointerDown(ev);
    }

    delete(ev) {
        window.stage.commands.delete();
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
                        <div className="options-item" onClick={(ev) => {
                            this.importSvg(ev);
                        }}>Import Svg</div>
                        <div className="options-item disabled">Import Pdf</div>
                        <div className="options-item disabled">Import AI(*.ai)</div>
                        <div className="options-item" onClick={(ev) => {
                            this.importImage(ev);
                        }}>Import Image</div>
                        <hr />
                        <div className="options-item" onClick={(ev) => {
                            this.exportSvg(ev);
                        }}>Export Svg</div>
                        <div className="options-item disabled">Export Pdf</div>
                        <div className="options-item disabled">Export AI(*.ai)</div>
                        <div className="options-item" onClick={(ev) => {
                            this.exportImage(ev);
                        }}>Export Image</div>
                    </div>
                </div>
                <div className="item">
                    <div className="title">Edit</div>
                    <div className="options">
                        <div className="options-item" onClick={(ev) => {
                            this.undo(ev);
                        }}>Undo</div>
                        <div className="options-item" onClick={(ev) => {
                            this.redo(ev);
                        }}>Redo</div>
                        <hr />
                        <div className="options-item" onClick={(ev) => {
                            this.cut(ev);
                        }}>Cut</div>
                        <div className="options-item" onClick={(ev) => {
                            this.copy(ev);
                        }}>Copy</div>
                        <div className="options-item" onClick={(ev) => {
                            this.paste(ev);
                        }}>Paste</div>
                        <hr />
                        <div className="options-item" onClick={(ev) => {
                            this.delete(ev);
                        }}>Delete</div>
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
                            <a target="_blank" href="https://github.com/darkdragonblade/foxyjs-svgeditor">https://github.com/darkdragonblade/foxyjs-svgeditor</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Menubar