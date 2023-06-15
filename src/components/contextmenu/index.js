import React from "react";
import './index.css';
class Contextmenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stage: void 0,
            active: false,
            canGroup: false,
            canUnGroup: false,
            canRaise: false,
            canLower: false,
            x: 0,
            y: 0,
            selectedEelementsLength: 0,
        }
    }

    componentDidMount() {
        const stage = window.stage;
        window.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        })
        stage.workspaces.addEventListener('pointerdown', (event) => {

            const { buttons, x, y } = event;
            if (event.target.closest('.contextmenu')) return;

            this.setState({
                active: (buttons === 2 && this.state.active) ? true : false,
            });
            if (buttons === 2) {

                const { bottom, right } = stage.board.getBoundingClientRect();
                const { height, width } = document.querySelector('.contextmenu').getBoundingClientRect();
                const dx = x + width > right ? y + width - right + 10 : 0;
                const dy = y + height > bottom ? y + height - bottom + 10 : 0;

                setTimeout(() => {
                    this.setState({
                        active: true,
                        x: x - dx,
                        y: y - dy,
                        selectedObjectElementsLength: stage.selectedObjectElements.size,
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

    cut() {
        window.stage.clipboardManager.cut();
        this.setState({
            active: false,
        });
    }

    copy() {
        window.stage.clipboardManager.copy();
        this.setState({
            active: false,
        });
    }

    paste() {
        window.stage.clipboardManager.paste();
        this.setState({
            active: false,
        });
    }

    group() {
        window.stage.groupManager.group();
        this.setState({
            active: false,
        });
    }

    unGroup() {
        window.stage.groupManager.unGroup();
        this.setState({
            active: false,
        });
    }

    raise() {
        window.stage.orderManager.raise();
        this.setState({
            active: false,
        });
    }

    raiseToFront() {
        window.stage.orderManager.raiseToFront();
        this.setState({
            active: false,
        });
    }

    lower() {
        window.stage.orderManager.lower();
        this.setState({
            active: false,
        });
    }

    lowerToBack() {
        window.stage.orderManager.lowerToBack();
        this.setState({
            active: false,
        });
    }

    delete() {
        window.stage.commands.delete();
        this.setState({
            active: false,
        });
    }

    render() {
        return (
            <div style={{ 'left': this.state.x, 'top': this.state.y }} className={`contextmenu ${this.state.active && 'active'}`}>
                <div className={`item ${this.state.selectedObjectElementsLength === 0 && 'disabled'}`} onClick={() => {
                    this.cut();
                }}>cut</div>
                <div className={`item ${this.state.selectedObjectElementsLength === 0 && 'disabled'}`} onClick={() => {
                    this.copy();
                }}>copy</div>
                <div className="item" onClick={() => {
                    this.paste();
                }}>paste</div>
                <hr />
                <div className={`item ${!this.state.canGroup && 'disabled'}`} onClick={() => {
                    this.group();
                }}>group</div>
                <div className={`item ${!this.state.canUnGroup && 'disabled'}`} onClick={() => {
                    this.unGroup()
                }}>ungroup</div>
                <hr />
                <div className={`item ${!this.state.canRaise && 'disabled'}`} onClick={() => {
                    this.raise();
                }}>raise</div>
                <div className={`item ${!this.state.canRaise && 'disabled'}`} onClick={() => {
                    this.raiseToFront();
                }}>raiseToFront</div>
                <div className={`item ${!this.state.canLower && 'disabled'}`} onClick={() => {
                    this.lower();
                }}>lower</div>
                <div className={`item ${!this.state.canLower && 'disabled'}`} onClick={() => {
                    this.lowerToBack();
                }}>lowerToBack</div>
                <hr />
                <div className={`item ${!this.state.canDelete && 'disabled'}`} onClick={() => {
                    this.delete();
                }}>delete</div>
            </div >
        );
    }
}

export default Contextmenu