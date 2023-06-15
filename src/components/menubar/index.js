import React from "react";
import './index.css';
class Menubar extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

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
                        <div className="options-item">Open Svg</div>
                        <hr />
                        <div className="options-item">Import Svg</div>
                        <div className="options-item">Import Pdf</div>
                        <div className="options-item">Import AI(*.ai)</div>
                        <div className="options-item">Import Image</div>
                        <hr />
                        <div className="options-item">Export Pdf</div>
                        <div className="options-item">Export AI(*.ai)</div>
                        <div className="options-item">Export Image</div>
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
                        <div className="options-item">Ruler</div>
                        <div className="options-item">Smart</div>
                        <div className="options-item">Grid</div>
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