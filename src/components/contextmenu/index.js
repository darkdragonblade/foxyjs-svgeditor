import React from "react";
import "./index.css";
class Contextmenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: void 0,
            active: false,
            canCut: false,
            canCopy: false,
            canGroup: false,
            canUnGroup: false,
            canRaise: false,
            canLower: false,
            x: 0,
            y: 0,
        };
    }

    componentDidMount() {
        const stage = window.stage;
        window.addEventListener("contextmenu", (event) => {
            event.preventDefault();
        });
        stage.workspaces.addEventListener("pointerdown", (event) => {
            const { buttons, x, y } = event;
            if (event.target.closest(".contextmenu")) return;

            this.setState({
                active: buttons === 2 && this.state.active ? true : false,
            });
            if (buttons === 2) {
                const { bottom, right } = stage.board.getBoundingClientRect();
                const { height, width } = document
                    .querySelector(".contextmenu")
                    .getBoundingClientRect();
                const dx = x + width > right ? y + width - right + 10 : 0;
                const dy = y + height > bottom ? y + height - bottom + 10 : 0;

                setTimeout(() => {
                    this.setState({
                        active: true,
                        x: x - dx,
                        y: y - dy,
                        canCut: stage.clipboardManager.canCut(),
                        canCopy: stage.clipboardManager.canCopy(),
                        canGroup: stage.groupManager.canGroup(),
                        canUnGroup: stage.groupManager.canUnGroup(),
                        canRaise: stage.orderManager.canRaise(),
                        canLower: stage.orderManager.canLower(),
                        canDelete: stage.commands.canDelete(),
                    });
                }, 120);
            }
        });
    }

    action(type) {
        const stage = window.stage;
        switch (type) {
            case 'cut':
                stage.clipboardManager.cut();
                break;
            case 'copy':
                stage.clipboardManager.copy();
                break;
            case 'paste':
                stage.clipboardManager.paste();
                break;
            case 'group':
                stage.groupManager.group();
                break;
            case 'unGroup':
                stage.groupManager.unGroup();
                break;
            case 'raise':
                stage.orderManager.raise();
                break;
            case 'raiseToFront':
                stage.orderManager.raiseToFront();
                break;
            case 'lower':
                stage.orderManager.lower();
                break;
            case 'lowerToBack':
                stage.orderManager.lowerToBack();
                break;
            case 'delete':
                stage.commands.delete();
                break;
            default:
        }
        this.setState({
            active: false,
        });
    }

    render() {
        return (
            <div
                style={{ left: this.state.x, top: this.state.y }}
                className={`contextmenu ${this.state.active && "active"}`}
            >
                <div
                    className={`item ${!this.state.canCut && "disabled"}`}
                    onClick={() => {
                        this.action('cut');
                    }}
                >
                    cut
                </div>
                <div
                    className={`item ${!this.state.canCopy && "disabled"}`}
                    onClick={() => {
                        this.action('copy');
                    }}
                >
                    copy
                </div>
                <div
                    className="item"
                    onClick={() => {
                        this.action('paste');
                    }}
                >
                    paste
                </div>
                <hr />
                <div
                    className={`item ${!this.state.canGroup && "disabled"}`}
                    onClick={() => {
                        this.action('group');
                    }}
                >
                    group
                </div>
                <div
                    className={`item ${!this.state.canUnGroup && "disabled"}`}
                    onClick={() => {
                        this.action('unGroup');
                    }}
                >
                    unGroup
                </div>
                <hr />
                <div
                    className={`item ${!this.state.canRaise && "disabled"}`}
                    onClick={() => {
                        this.action('raise');
                    }}
                >
                    raise
                </div>
                <div
                    className={`item ${!this.state.canRaise && "disabled"}`}
                    onClick={() => {
                        this.action('raiseToFront');
                    }}
                >
                    raiseToFront
                </div>
                <div
                    className={`item ${!this.state.canLower && "disabled"}`}
                    onClick={() => {
                        this.action('lower');
                    }}
                >
                    lower
                </div>
                <div
                    className={`item ${!this.state.canLower && "disabled"}`}
                    onClick={() => {
                        this.action('lowerToBack');
                    }}
                >
                    lowerToBack
                </div>
                <hr />
                <div
                    className={`item ${!this.state.canDelete && "disabled"}`}
                    onClick={() => {
                        this.action('delete');
                    }}
                >
                    delete
                </div>
            </div>
        );
    }
}

export default Contextmenu;
