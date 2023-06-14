import React from "react";
import './index.css';
class Contextmenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stage: void 0,
            active: false,
            barActive: false,
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
        document.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        })
        document.addEventListener('pointerdown', (event) => {

            const { buttons, x, y } = event;

            if (event.target.closest('.contextmenu-bar')) return;

            this.setState({
                active: (buttons === 2 && this.state.active) ? true : false,
                barActive: (buttons === 2 && this.state.barActive) ? true : false,
            });
            if (buttons === 2) {


                // if (!stage.board.matches(':hover')) return;

                setTimeout(() => {
                    this.setState({
                        active: true,
                        barActive: true,
                        x,
                        y,
                        selectedObjectElementsLength: stage.selectedObjectElements.size,
                        canGroup: stage.groupManager.canGroup(),
                        canUnGroup: stage.groupManager.canUnGroup(),
                        canRaise: stage.orderManager.canRaise(),
                        canLower: stage.orderManager.canLower(),
                        canDelete: stage.commands.canDelete(),
                    });
                }, 100);
            }
        });
    }

    cut() {
        window.stage.clipboardManager.cut();
        this.setState({
            active: false,
            barActive: false,
        });
    }

    copy() {
        window.stage.clipboardManager.copy();
        this.setState({
            active: false,
            barActive: false,
        });
    }

    paste() {
        window.stage.clipboardManager.paste();
        this.setState({
            active: false,
            barActive: false,
        });
    }

    group() {
        window.stage.groupManager.group();
        this.setState({
            active: false,
            barActive: false,
        });
    }

    unGroup() {
        window.stage.groupManager.unGroup();
        this.setState({
            active: false,
            barActive: false,
        });
    }

    raise() {
        window.stage.orderManager.raise();
        this.setState({
            active: false,
            barActive: false,
        });
    }

    raiseToFront() {
        window.stage.orderManager.raiseToFront();
        this.setState({
            active: false,
            barActive: false,
        });
    }

    lower() {
        window.stage.orderManager.lower();
        this.setState({
            active: false,
            barActive: false,
        });
    }

    lowerToBack() {
        window.stage.orderManager.lowerToBack();
        this.setState({
            active: false,
            barActive: false,
        });
    }

    delete() {
        window.stage.commands.delete();
        this.setState({
            active: false,
            barActive: false,
        });
    }

    render() {
        return (
            <div className={`contextmenu ${this.state.active && 'active'}`}>
                <div style={{ 'left': this.state.x, 'top': this.state.y }} className={`contextmenu-bar ${this.state.barActive && 'active'}`}>
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
                </div>
            </div >
        );
    }
}

export default Contextmenu